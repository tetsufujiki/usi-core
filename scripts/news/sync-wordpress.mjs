import { readFile, writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import sanitizeHtml from "sanitize-html"

const CMS_ORIGIN = "https://cms.united-studio.com"
const SITE_ORIGIN = "https://united-studio.com"
const CATEGORY_IDS = [3, 1, 5, 272]
const MINIMUM_EXPECTED_POST_COUNT = 191
const PER_PAGE = 100
const FALLBACK_IMAGE = "/og-image.jpg"
const CONTENT_IMAGE_WIDTHS = [384, 640, 750, 828, 1080, 1200, 1920]
const CONTENT_IMAGE_SIZES = "(max-width: 799px) calc(100vw - 2rem), 768px"

const scriptDirectory = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(scriptDirectory, "../..")
const postsOutput = resolve(projectRoot, "lib/news/generated/posts.json")
const redirectsOutput = resolve(projectRoot, "lib/news/generated/redirects.json")
const manualOverridesPath = resolve(projectRoot, "lib/news/manual-overrides.json")

const categoryByWordPressId = new Map([
  [272, "yosakoi"],
  [1, "company"],
  [5, "works"],
  [3, "release"],
])

function rewriteMediaHost(value = "") {
  return value
    .replaceAll("http://united-studio.com/wp-content", `${CMS_ORIGIN}/wp-content`)
    .replaceAll("https://united-studio.com/wp-content", `${CMS_ORIGIN}/wp-content`)
    .replaceAll("http://www.united-studio.com/wp-content", `${CMS_ORIGIN}/wp-content`)
    .replaceAll("https://www.united-studio.com/wp-content", `${CMS_ORIGIN}/wp-content`)
    .replaceAll("http://cms.united-studio.com/wp-content", `${CMS_ORIGIN}/wp-content`)
}

function stripKnownShortcodes(value = "") {
  return value.replace(
    /\[\/?vc_(?:row|column|column_text)(?:\s[^\]]*)?\]/gi,
    "",
  )
}

function isExternalHttpUrl(value) {
  try {
    const url = new URL(value, SITE_ORIGIN)
    return ["http:", "https:"].includes(url.protocol) && url.origin !== SITE_ORIGIN
  } catch {
    return false
  }
}

function isYouTubeEmbed(value = "") {
  try {
    const url = new URL(value)
    return (
      url.protocol === "https:" &&
      ["www.youtube.com", "youtube.com", "www.youtube-nocookie.com", "youtube-nocookie.com"].includes(
        url.hostname,
      ) &&
      url.pathname.startsWith("/embed/")
    )
  } catch {
    return false
  }
}

function nextImageUrl(src, width) {
  const params = new URLSearchParams({ url: src, w: String(width), q: "75" })
  return `/_next/image?${params}`
}

function responsiveContentImage(attribs, mediaById) {
  const mediaIdMatch = attribs.class?.match(/(?:^|\s)wp-image-(\d+)(?:\s|$)/)
  const media = mediaIdMatch ? mediaById.get(Number(mediaIdMatch[1])) : undefined
  const src = rewriteMediaHost(media?.source_url || attribs.src)
  const width = Number(media?.media_details?.width || attribs.width)
  const height = Number(media?.media_details?.height || attribs.height)

  if (
    !src.startsWith(`${CMS_ORIGIN}/wp-content/`) ||
    !Number.isFinite(width) ||
    !Number.isFinite(height) ||
    width <= 0 ||
    height <= 0
  ) {
    return {
      ...attribs,
      src,
      srcset: rewriteMediaHost(attribs.srcset),
      loading: attribs.loading || "lazy",
      decoding: attribs.decoding || "async",
    }
  }

  const candidateWidths = CONTENT_IMAGE_WIDTHS.filter((candidate) => candidate <= width)
  if (candidateWidths.length === 0) candidateWidths.push(CONTENT_IMAGE_WIDTHS[0])
  const fallbackWidth = candidateWidths.find((candidate) => candidate >= 828) ?? candidateWidths.at(-1)

  return {
    ...attribs,
    src: nextImageUrl(src, fallbackWidth),
    srcset: candidateWidths
      .map((candidate) => `${nextImageUrl(src, candidate)} ${candidate}w`)
      .join(", "),
    sizes: CONTENT_IMAGE_SIZES,
    width: String(width),
    height: String(height),
    loading: "lazy",
    decoding: "async",
  }
}

function sanitizeContent(value = "", mediaById = new Map()) {
  const withoutShortcodes = stripKnownShortcodes(rewriteMediaHost(value))

  return sanitizeHtml(withoutShortcodes, {
    allowedTags: [
      "p",
      "br",
      "h2",
      "h3",
      "h4",
      "ul",
      "ol",
      "li",
      "blockquote",
      "table",
      "thead",
      "tbody",
      "tfoot",
      "tr",
      "th",
      "td",
      "figure",
      "figcaption",
      "picture",
      "source",
      "img",
      "a",
      "strong",
      "em",
      "span",
      "div",
      "iframe",
    ],
    allowedAttributes: {
      "*": ["class"],
      a: ["href", "target", "rel"],
      img: ["src", "srcset", "sizes", "alt", "width", "height", "loading", "decoding"],
      source: ["srcset", "sizes", "type", "media", "width", "height"],
      iframe: [
        "src",
        "width",
        "height",
        "title",
        "allow",
        "allowfullscreen",
        "loading",
        "referrerpolicy",
      ],
      th: ["colspan", "rowspan", "scope"],
      td: ["colspan", "rowspan"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowProtocolRelative: false,
    nonTextTags: ["style", "script", "textarea", "option", "noscript"],
    transformTags: {
      a(tagName, attribs) {
        if (isExternalHttpUrl(attribs.href)) {
          return {
            tagName,
            attribs: {
              ...attribs,
              target: "_blank",
              rel: "noopener noreferrer",
            },
          }
        }
        return { tagName, attribs }
      },
      img(tagName, attribs) {
        return {
          tagName,
          attribs: responsiveContentImage(attribs, mediaById),
        }
      },
      iframe(tagName, attribs) {
        return {
          tagName,
          attribs: {
            ...attribs,
            loading: "lazy",
            referrerpolicy: "strict-origin-when-cross-origin",
          },
        }
      },
    },
    exclusiveFilter(frame) {
      return frame.tag === "iframe" && !isYouTubeEmbed(frame.attribs.src)
    },
  }).trim()
}

function plainText(value = "") {
  return sanitizeHtml(stripKnownShortcodes(value), {
    allowedTags: [],
    allowedAttributes: {},
  })
    .replace(/\s+/g, " ")
    .trim()
}

function decodeWordPressValue(value = "") {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

function normalizeSlug(value, wpId) {
  const normalized = decodeWordPressValue(value)
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[’'"`]/g, "")
    .replace(/&amp;|&/g, "-and-")
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "")

  return normalized || `post-${wpId}`
}

function selectCategory(categoryIds) {
  for (const categoryId of [272, 1, 5, 3]) {
    if (categoryIds.includes(categoryId)) return categoryByWordPressId.get(categoryId)
  }
  return "info"
}

function originalPathFor(post) {
  const path = new URL(post.link).pathname.replace(/\/$/, "")
  return path || `/post-${post.id}`
}

function featuredImageFor(post) {
  const media = post._embedded?.["wp:featuredmedia"]?.[0]
  const src = rewriteMediaHost(media?.source_url)

  return {
    src: src || FALLBACK_IMAGE,
    alt: plainText(media?.alt_text) || plainText(post.title?.rendered) || "News article image",
    ...(media?.media_details?.width ? { width: media.media_details.width } : {}),
    ...(media?.media_details?.height ? { height: media.media_details.height } : {}),
  }
}

async function fetchPage(page) {
  const url = new URL("/wp-json/wp/v2/posts", CMS_ORIGIN)
  url.searchParams.set("categories", CATEGORY_IDS.join(","))
  url.searchParams.set("per_page", String(PER_PAGE))
  url.searchParams.set("page", String(page))
  url.searchParams.set("_embed", "1")
  url.searchParams.set("orderby", "date")
  url.searchParams.set("order", "desc")

  const response = await fetch(url, {
    headers: { "User-Agent": "United-Studio-News-Sync/1.0" },
  })

  if (!response.ok) {
    throw new Error(`WordPress request failed (${response.status}): ${url}`)
  }

  return { response, posts: await response.json() }
}

async function fetchAllPosts() {
  const firstPage = await fetchPage(1)
  const total = Number(firstPage.response.headers.get("x-wp-total"))
  const totalPages = Number(firstPage.response.headers.get("x-wp-totalpages"))

  if (!Number.isInteger(total) || !Number.isInteger(totalPages)) {
    throw new Error("WordPress pagination headers are missing")
  }

  const remainingPages = await Promise.all(
    Array.from({ length: Math.max(totalPages - 1, 0) }, (_, index) => fetchPage(index + 2)),
  )
  const posts = [firstPage.posts, ...remainingPages.map((page) => page.posts)].flat()

  if (total < MINIMUM_EXPECTED_POST_COUNT || posts.length !== total) {
    throw new Error(
      `Expected at least ${MINIMUM_EXPECTED_POST_COUNT} posts and a complete payload; received header=${total}, payload=${posts.length}`,
    )
  }

  return { posts, totalPages }
}

function contentMediaIds(posts) {
  const ids = new Set()

  for (const post of posts) {
    for (const match of post.content?.rendered?.matchAll(/\bwp-image-(\d+)\b/g) ?? []) {
      ids.add(Number(match[1]))
    }
  }

  return [...ids]
}

async function fetchContentMedia(posts) {
  const ids = contentMediaIds(posts)
  const chunks = Array.from(
    { length: Math.ceil(ids.length / PER_PAGE) },
    (_, index) => ids.slice(index * PER_PAGE, (index + 1) * PER_PAGE),
  )

  const mediaPages = await Promise.all(
    chunks.map(async (idsChunk) => {
      const url = new URL("/wp-json/wp/v2/media", CMS_ORIGIN)
      url.searchParams.set("include", idsChunk.join(","))
      url.searchParams.set("per_page", String(PER_PAGE))
      url.searchParams.set("_fields", "id,source_url,alt_text,media_details")

      const response = await fetch(url, {
        headers: { "User-Agent": "United-Studio-News-Sync/1.0" },
      })
      if (!response.ok) {
        throw new Error(`WordPress media request failed (${response.status}): ${url}`)
      }
      return response.json()
    }),
  )

  return new Map(mediaPages.flat().map((media) => [media.id, media]))
}

function assertUnique(values, label) {
  const seen = new Set()
  const duplicates = new Set()
  for (const value of values) {
    if (seen.has(value)) duplicates.add(value)
    seen.add(value)
  }
  if (duplicates.size > 0) {
    throw new Error(`Duplicate ${label}: ${[...duplicates].join(", ")}`)
  }
}

async function main() {
  const manualOverrides = JSON.parse(await readFile(manualOverridesPath, "utf8"))
  const manualSlugByPath = new Map(
    manualOverrides.map(({ originalPath, slug }) => [originalPath, slug]),
  )
  const { posts: wordPressPosts, totalPages } = await fetchAllPosts()
  const contentMediaById = await fetchContentMedia(wordPressPosts)

  assertUnique(wordPressPosts.map((post) => post.id), "WordPress IDs")
  assertUnique(wordPressPosts.map((post) => post.slug), "WordPress slugs")

  const usedSlugs = new Set()
  const posts = wordPressPosts.map((post) => {
    const originalPath = originalPathFor(post)
    const preferredSlug = manualSlugByPath.get(originalPath) || normalizeSlug(post.slug, post.id)
    const newSlug = usedSlugs.has(preferredSlug) ? `${preferredSlug}-${post.id}` : preferredSlug
    usedSlugs.add(newSlug)

    return {
      wpId: post.id,
      wpSlug: post.slug,
      title: plainText(post.title?.rendered),
      publishedAt: post.date,
      modifiedAt: post.modified,
      excerpt: plainText(post.excerpt?.rendered),
      contentHtml: sanitizeContent(post.content?.rendered, contentMediaById),
      category: selectCategory(post.categories || []),
      wpCategoryIds: post.categories || [],
      newSlug,
      newUrl: `${SITE_ORIGIN}/news/${newSlug}`,
      originalUrl: `${SITE_ORIGIN}${originalPath}`,
      originalPath,
      featuredImage: featuredImageFor(post),
    }
  })

  assertUnique(posts.map((post) => post.newSlug), "new slugs")
  assertUnique(posts.map((post) => post.originalPath), "original paths")

  const redirects = posts.map((post) => ({
    wpId: post.wpId,
    wpSlug: post.wpSlug,
    source: post.originalPath,
    destination: `/news/${post.newSlug}`,
    originalUrl: post.originalUrl,
  }))

  await Promise.all([
    writeFile(postsOutput, `${JSON.stringify(posts, null, 2)}\n`),
    writeFile(redirectsOutput, `${JSON.stringify(redirects, null, 2)}\n`),
  ])

  console.log(`Synced ${posts.length} WordPress posts from ${totalPages} pages.`)
  console.log(`Generated ${posts.length} posts and ${redirects.length} redirects.`)
  const preservedManualSlugs = manualOverrides.filter(({ originalPath, slug }) =>
    posts.some((post) => post.originalPath === originalPath && post.newSlug === slug),
  ).length
  console.log(`Preserved ${preservedManualSlugs} matching manually curated slugs.`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

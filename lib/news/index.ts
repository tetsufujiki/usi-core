import generatedPosts from "./generated/posts.json"
import { newsItems } from "./mock-data"
import type { ImportedNewsItem, NewsItem, NewsSource } from "./types"

export type { ImportedNewsItem, NewsItem, NewsCategory, NewsSource } from "./types"

const EXCLUDED_NEWS_SLUGS = new Set(["studio-reservation-url-change"])
const REMOVED_CONTENT_IMAGE_URLS = [
  "https://cms.united-studio.com/wp-content/uploads/2022/02/LIO-8mkIV_3-960x720.jpg",
  "https://cms.united-studio.com/wp-content/uploads/2021/04/icon-round-steam.png",
  "https://cms.united-studio.com/wp-content/uploads/2021/04/icon-round-switch.png",
  "http://song.united-studio.com/wp-content/uploads/2011/03/logo.gif",
  "http://usi.united-studio.com/wp-content/uploads/2011/06/about_black.gif",
]
const CONTENT_IMAGE_URL_REPLACEMENTS = new Map([
  [
    "https://cms.united-studio.com/wp-content/uploads/2019/06/thb1.jpg",
    "https://cms.united-studio.com/wp-content/uploads/2019/06/thb1-350x225.jpg",
  ],
  [
    "https://cms.united-studio.com/wp-content/uploads/2018/12/lupin-vs-pat_1.jpg",
    "https://cms.united-studio.com/wp-content/uploads/2018/12/lupin-vs-pat_1-350x225.jpg",
  ],
  [
    "https://cms.united-studio.com/wp-content/uploads/2018/07/ryoma_sm.jpg",
    "https://cms.united-studio.com/wp-content/uploads/2018/07/ryoma_sm-350x446.jpg",
  ],
  [
    "https://cms.united-studio.com/wp-content/uploads/2018/07/IMG_9972.jpg",
    "https://cms.united-studio.com/wp-content/uploads/2018/07/IMG_9972-350x263.jpg",
  ],
  [
    "https://cms.united-studio.com/wp-content/uploads/2016/08/2016t.jpg",
    "https://cms.united-studio.com/wp-content/uploads/2016/08/2016t-350x263.jpg",
  ],
  [
    "https://cms.united-studio.com/wp-content/uploads/2016/08/2016ho.jpg",
    "https://cms.united-studio.com/wp-content/uploads/2016/08/2016ho-350x263.jpg",
  ],
  [
    "https://cms.united-studio.com/wp-content/uploads/2016/08/2016h.jpg",
    "https://cms.united-studio.com/wp-content/uploads/2016/08/2016h-350x263.jpg",
  ],
])

function removeUnavailableContentImages(contentHtml: string): string {
  const contentWithReplacedImages = [...CONTENT_IMAGE_URL_REPLACEMENTS].reduce(
    (html, [sourceUrl, replacementUrl]) => html.replaceAll(sourceUrl, replacementUrl),
    contentHtml,
  )

  return REMOVED_CONTENT_IMAGE_URLS.reduce((html, imageUrl) => {
    const escapedUrl = imageUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    const withoutStandaloneImageLink = html.replace(
      new RegExp(`<p>\\s*<a\\b[^>]*>\\s*<img(?=[^>]*\\bsrc=["']${escapedUrl}["'])[^>]*>\\s*</a>\\s*</p>`, "gi"),
      "",
    )
    const withoutImageLink = withoutStandaloneImageLink.replace(
      new RegExp(`<a\\b[^>]*>\\s*<img(?=[^>]*\\bsrc=["']${escapedUrl}["'])[^>]*>\\s*</a>`, "gi"),
      "",
    )
    return withoutImageLink.replace(
      new RegExp(`<p>\\s*<img(?=[^>]*\\bsrc=["']${escapedUrl}["'])[^>]*>\\s*</p>`, "gi"),
      "",
    )
  }, contentWithReplacedImages)
}

function removeUnavailableLegacyUsiImages(contentHtml: string): string {
  const sourcePattern = "https?:\\/\\/usi\\.united-studio\\.com\\/wp-content\\/uploads\\/[^\"']+"
  const withoutStandaloneImageLink = contentHtml.replace(
    new RegExp(`<p>\\s*<a\\b[^>]*>\\s*<img(?=[^>]*\\bsrc=[\"']${sourcePattern}[\"'])[^>]*>\\s*</a>\\s*</p>`, "gi"),
    "",
  )
  const withoutImageLink = withoutStandaloneImageLink.replace(
    new RegExp(`<a\\b[^>]*>\\s*<img(?=[^>]*\\bsrc=[\"']${sourcePattern}[\"'])[^>]*>\\s*</a>`, "gi"),
    "",
  )
  const withoutLegacyImages = withoutImageLink.replace(
    new RegExp(`<img(?=[^>]*\\bsrc=[\"']${sourcePattern}[\"'])[^>]*>`, "gi"),
    "",
  )

  return withoutLegacyImages.replace(
    /<p>\s*<\/p>/gi,
    "",
  )
}

function pathFromOriginalUrl(originalUrl?: string): string | undefined {
  if (!originalUrl) return undefined
  try {
    return new URL(originalUrl).pathname.replace(/\/$/, "")
  } catch {
    return undefined
  }
}

const manualNewsByOriginalPath = new Map(
  newsItems.map((item) => [pathFromOriginalUrl(item.originalUrl), item]),
)

const generatedNewsItems: NewsItem[] = (generatedPosts as ImportedNewsItem[]).map((post) => ({
  id: `wp-${post.wpId}`,
  wpId: post.wpId,
  wpSlug: post.wpSlug,
  title: post.title,
  date: post.publishedAt.slice(0, 10),
  modifiedAt: post.modifiedAt,
  category: post.category,
  slug: post.newSlug,
  href: `/news/${post.newSlug}`,
  body: [],
  contentHtml: removeUnavailableLegacyUsiImages(
    removeUnavailableContentImages(post.contentHtml),
  ),
  excerpt: post.excerpt,
  featuredImage: post.featuredImage,
  originalUrl: post.originalUrl,
  originalPath: post.originalPath,
  source: "wordpress",
}))

const mergedGeneratedNews = generatedNewsItems.map((generatedItem) => {
  const manualItem = manualNewsByOriginalPath.get(generatedItem.originalPath)
  if (!manualItem) return generatedItem

  return {
    ...generatedItem,
    ...manualItem,
    wpId: generatedItem.wpId,
    wpSlug: generatedItem.wpSlug,
    modifiedAt: generatedItem.modifiedAt,
    featuredImage: generatedItem.featuredImage,
    originalPath: generatedItem.originalPath,
    contentHtml: generatedItem.contentHtml,
  }
})

const generatedPaths = new Set(generatedNewsItems.map((item) => item.originalPath))
const manualOnlyNews = newsItems.filter(
  (item) => !generatedPaths.has(pathFromOriginalUrl(item.originalUrl)),
)
const allNewsItems = [...mergedGeneratedNews, ...manualOnlyNews].filter(
  (item) => !EXCLUDED_NEWS_SLUGS.has(item.slug),
)

/** Shared static source for TOP Activity Signal and the News index. */
const staticNewsSource: NewsSource = {
  async getLatestNews(limit = 3): Promise<NewsItem[]> {
    return [...allNewsItems]
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, limit)
  },
  async getNewsList(): Promise<NewsItem[]> {
    return [...allNewsItems].sort((a, b) => b.date.localeCompare(a.date))
  },
}

const newsSource: NewsSource = staticNewsSource

export function getLatestNews(limit = 3): Promise<NewsItem[]> {
  return newsSource.getLatestNews(limit)
}

/** Alias kept for back-compat; prefer getNewsList(). */
export function getAllNews(): Promise<NewsItem[]> {
  return newsSource.getNewsList()
}

export function getNewsList(): Promise<NewsItem[]> {
  return newsSource.getNewsList()
}

export function getNewsItemBySlug(slug: string): NewsItem | undefined {
  let decodedSlug = slug
  try {
    decodedSlug = decodeURIComponent(slug)
  } catch {
    // Invalid percent encoding cannot match a generated slug.
  }
  return allNewsItems.find((item) => item.slug === decodedSlug)
}

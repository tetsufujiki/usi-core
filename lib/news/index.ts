import generatedPosts from "./generated/posts.json"
import { newsItems } from "./mock-data"
import type { ImportedNewsItem, NewsItem, NewsSource } from "./types"

export type { ImportedNewsItem, NewsItem, NewsCategory, NewsSource } from "./types"

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
  contentHtml: post.contentHtml,
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
    contentHtml: undefined,
  }
})

const generatedPaths = new Set(generatedNewsItems.map((item) => item.originalPath))
const manualOnlyNews = newsItems.filter(
  (item) => !generatedPaths.has(pathFromOriginalUrl(item.originalUrl)),
)
const allNewsItems = [...mergedGeneratedNews, ...manualOnlyNews]

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

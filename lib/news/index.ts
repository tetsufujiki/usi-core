import { mockNews } from "./mock-data"
import type { NewsItem, NewsSource } from "./types"

export type { NewsItem, NewsCategory, NewsSource } from "./types"

/**
 * Static (mock) news source.
 * Swap this for a WordPress REST API implementation later, e.g.:
 *
 *   const wordpressNewsSource: NewsSource = {
 *     async getLatestNews(limit) {
 *       const res = await fetch(`${WP_API}/wp-json/wp/v2/posts?per_page=${limit}`)
 *       ...
 *     },
 *   }
 */
const staticNewsSource: NewsSource = {
  async getLatestNews(limit = 3): Promise<NewsItem[]> {
    return [...mockNews]
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, limit)
  },
  async getAllNews(): Promise<NewsItem[]> {
    return [...mockNews].sort((a, b) => b.date.localeCompare(a.date))
  },
}

const newsSource: NewsSource = staticNewsSource

export function getLatestNews(limit = 3): Promise<NewsItem[]> {
  return newsSource.getLatestNews(limit)
}

export function getAllNews(): Promise<NewsItem[]> {
  return newsSource.getAllNews()
}

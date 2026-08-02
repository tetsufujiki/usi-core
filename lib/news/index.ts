import { mockNews } from "./mock-data"
import type { NewsItem, NewsSource } from "./types"

export type { NewsItem, NewsCategory, NewsSource } from "./types"

/**
 * Static (mock) news source — Phase 1.
 *
 * To migrate to the WordPress REST API, replace `staticNewsSource` with:
 *
 *   const WP_API = "https://cms.united-studio.com"
 *   // pre-migration: "https://united-studio.com"
 *
 *   const wordpressNewsSource: NewsSource = {
 *     async getLatestNews(limit = 3) {
 *       const res = await fetch(
 *         `${WP_API}/wp-json/wp/v2/posts?per_page=${limit}&_fields=id,slug,title,date,categories`,
 *         { next: { revalidate: 300 } },
 *       )
 *       const posts = await res.json()
 *       return posts.map(mapWpPost)
 *     },
 *     async getNewsList() { ... },
 *   }
 */
const staticNewsSource: NewsSource = {
  async getLatestNews(limit = 3): Promise<NewsItem[]> {
    return [...mockNews]
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, limit)
  },
  async getNewsList(): Promise<NewsItem[]> {
    return [...mockNews].sort((a, b) => b.date.localeCompare(a.date))
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

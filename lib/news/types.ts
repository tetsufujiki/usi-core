export type NewsCategory =
  | "company"
  | "studio"
  | "utattemita"
  | "yosakoi"
  | "reserve"
  | "works"
  | "info"
  | "release"
  | "event"

export type NewsItem = {
  id: string
  title: string
  date: string // ISO 8601 (YYYY-MM-DD)
  category: NewsCategory
  /** Link target. Use an absolute URL for external posts, a path for internal pages. */
  href: string
  /** True when href is an external URL. Defaults to false. */
  external?: boolean
  /** Slug for future internal detail pages. */
  slug?: string
  /** Identifies the data origin for debugging / cache invalidation. */
  source?: "mock" | "wordpress"
}

/**
 * Adapter interface for news sources.
 * The initial implementation uses static mock data;
 * a future WordPress REST API implementation can be swapped in
 * without changing any component code.
 */
export interface NewsSource {
  getLatestNews(limit?: number): Promise<NewsItem[]>
  getNewsList(): Promise<NewsItem[]>
}

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
  source?: "static"
}

/**
 * Adapter interface for news sources.
 * TOP and the News index consume the same static source through this interface.
 */
export interface NewsSource {
  getLatestNews(limit?: number): Promise<NewsItem[]>
  getNewsList(): Promise<NewsItem[]>
}

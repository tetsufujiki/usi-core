export type NewsCategory = "info" | "release" | "event"

export type NewsItem = {
  id: string
  title: string
  date: string // ISO 8601 (YYYY-MM-DD)
  category: NewsCategory
  /** External URL (e.g. WordPress permalink). Internal detail pages are not implemented yet. */
  url?: string
}

/**
 * Adapter interface for news sources.
 * The initial implementation uses static mock data;
 * a future implementation can fetch from the WordPress REST API
 * without changing any component code.
 */
export interface NewsSource {
  getLatestNews(limit?: number): Promise<NewsItem[]>
  getAllNews(): Promise<NewsItem[]>
}

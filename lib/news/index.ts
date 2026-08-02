import { newsItems } from "./mock-data"
import type { NewsItem, NewsSource } from "./types"

export type { NewsItem, NewsCategory, NewsSource } from "./types"

/** Shared static source for TOP Activity Signal and the News index. */
const staticNewsSource: NewsSource = {
  async getLatestNews(limit = 3): Promise<NewsItem[]> {
    return [...newsItems]
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, limit)
  },
  async getNewsList(): Promise<NewsItem[]> {
    return [...newsItems].sort((a, b) => b.date.localeCompare(a.date))
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

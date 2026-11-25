import type { NewsItem } from "./types"

type AuthoredNewsItem = Pick<
  NewsItem,
  "slug" | "title" | "date" | "category" | "body" | "excerpt" | "featuredImage"
>

/** New articles are maintained here and published from GitHub. */
export const authoredNews: AuthoredNewsItem[] = []

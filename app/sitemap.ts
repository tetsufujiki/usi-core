import type { MetadataRoute } from "next"
import { getNewsList } from "@/lib/news"
import { SITE_URL } from "@/lib/site"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date("2026-08-02")
  const news = await getNewsList()

  return [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    {
      url: `${SITE_URL}/news`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/archive`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/company`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...news.map((item) => ({
      url: `${SITE_URL}/news/${item.slug}`,
      lastModified: new Date(item.modifiedAt ?? item.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      ...(item.featuredImage?.src
        ? {
            images: [
              item.featuredImage.src.startsWith("http")
                ? item.featuredImage.src
                : `${SITE_URL}${item.featuredImage.src}`,
            ],
          }
        : {}),
    })),
  ]
}

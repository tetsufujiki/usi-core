import type { MetadataRoute } from "next"
import { getNewsList } from "@/lib/news"
import { SITE_URL } from "@/lib/site"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const news = await getNewsList()

  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    {
      url: `${SITE_URL}/news`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/archive`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/company`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      changeFrequency: "monthly",
      priority: 0.7,
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

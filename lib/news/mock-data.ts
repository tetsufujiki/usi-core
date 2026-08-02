import type { NewsItem } from "./types"

/**
 * Mock news data — Phase 1 placeholder.
 * Replace / supplement with the WordPress REST API adapter when CMS integration begins.
 *
 * Future WP REST API endpoint:
 *   https://cms.united-studio.com/wp-json/wp/v2/posts
 * (pre-migration validation):
 *   https://united-studio.com/wp-json/wp/v2/posts
 */
export const mockNews: NewsItem[] = [
  {
    id: "core-launch",
    title: "united-studio.com Core / Hubサイトを公開しました",
    date: "2026-08-02",
    category: "company",
    href: "/news",
    source: "mock",
  },
  {
    id: "utattemita-launch",
    title: "歌ってみた制作サイトを公開しました",
    date: "2026-08-01",
    category: "utattemita",
    href: "https://utattemita.united-studio.com",
    external: true,
    source: "mock",
  },
  {
    id: "reserve-renewal",
    title: "スタジオ予約システムをリニューアルしました",
    date: "2026-08-01",
    category: "reserve",
    href: "https://reserve.united-studio.com",
    external: true,
    source: "mock",
  },
  {
    id: "yosakoi-2026",
    title: "よさこい2026シーズンの楽曲制作受付を開始しました",
    date: "2026-07-15",
    category: "yosakoi",
    href: "https://yosakoi.united-studio.com",
    external: true,
    source: "mock",
  },
  {
    id: "studio-equipment",
    title: "レコーディングスタジオの機材を増強しました",
    date: "2026-05-20",
    category: "studio",
    href: "https://studio.united-studio.com",
    external: true,
    source: "mock",
  },
  {
    id: "partner-2026",
    title: "2026年度の制作パートナー募集を開始しました",
    date: "2026-04-08",
    category: "company",
    href: "/contact",
    source: "mock",
  },
]

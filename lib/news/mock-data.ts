import type { NewsItem } from "./types"

/**
 * Mock news data.
 * Replace with the WordPress REST API adapter when the CMS integration begins.
 */
export const mockNews: NewsItem[] = [
  {
    id: "2026-07-1",
    title: "united-studio.com Core / Hubサイトを公開しました",
    date: "2026-07-28",
    category: "info",
  },
  {
    id: "2026-07-2",
    title: "よさこい2026シーズンの楽曲制作受付を開始しました",
    date: "2026-07-15",
    category: "release",
  },
  {
    id: "2026-06-1",
    title: "スタジオ予約システムをリニューアルしました",
    date: "2026-06-30",
    category: "info",
  },
  {
    id: "2026-06-2",
    title: "歌ってみたミックスプランを更新しました",
    date: "2026-06-12",
    category: "release",
  },
  {
    id: "2026-05-1",
    title: "レコーディングスタジオの機材を増強しました",
    date: "2026-05-20",
    category: "info",
  },
  {
    id: "2026-04-1",
    title: "2026年度の制作パートナー募集を開始しました",
    date: "2026-04-08",
    category: "event",
  },
]

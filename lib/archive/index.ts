export type ArchiveCategory =
  | "Recording / Studio Works"
  | "Production / Direction"
  | "Artist / Creator Support"

export const archiveCategories: ArchiveCategory[] = [
  "Recording / Studio Works",
  "Production / Direction",
  "Artist / Creator Support",
]

export type ArchiveWork = {
  id: string
  title: string
  year: number
  category: ArchiveCategory
  description: string
  featured?: boolean
}

/**
 * Archive works (static data).
 * Separated as a TypeScript array so it can be replaced by a CMS later.
 * Yosakoi works are not listed here — they live in the Yosakoi site's own archive.
 */
export const archiveWorks: ArchiveWork[] = [
  {
    id: "w-2026-01",
    title: "アーティストEPレコーディング&ミックス",
    year: 2026,
    category: "Recording / Studio Works",
    description: "5曲入りEPのレコーディングからミックス・マスタリングまで。",
    featured: true,
  },
  {
    id: "w-2026-02",
    title: "配信シングル制作ディレクション",
    year: 2026,
    category: "Production / Direction",
    description: "楽曲コンセプト設計から制作進行までのトータルディレクション。",
    featured: true,
  },
  {
    id: "w-2025-01",
    title: "ボーカリスト育成・作品制作サポート",
    year: 2025,
    category: "Artist / Creator Support",
    description: "継続的なボーカルディレクションと作品リリースの伴走支援。",
    featured: true,
  },
  {
    id: "w-2025-02",
    title: "バンドフルアルバムレコーディング",
    year: 2025,
    category: "Recording / Studio Works",
    description: "10曲のフルアルバムを一貫したサウンドでレコーディング。",
    featured: true,
  },
  {
    id: "w-2025-03",
    title: "映像作品向け楽曲プロデュース",
    year: 2025,
    category: "Production / Direction",
    description: "映像作品のための書き下ろし楽曲の企画・制作。",
  },
  {
    id: "w-2024-01",
    title: "シンガーソングライター デビュー作品制作",
    year: 2024,
    category: "Artist / Creator Support",
    description: "デビュー作品の制作とリリースまでのサポート。",
  },
  {
    id: "w-2024-02",
    title: "アコースティックセッションレコーディング",
    year: 2024,
    category: "Recording / Studio Works",
    description: "ライブ感を活かしたワンテイク中心のセッション録音。",
  },
  {
    id: "w-2024-03",
    title: "コンピレーション企画・制作進行",
    year: 2024,
    category: "Production / Direction",
    description: "複数アーティスト参加のコンピレーション企画と制作管理。",
  },
]

export function getFeaturedWorks(limit = 4): ArchiveWork[] {
  return archiveWorks
    .filter((w) => w.featured)
    .sort((a, b) => b.year - a.year)
    .slice(0, limit)
}

export function getArchiveYears(): number[] {
  return [...new Set(archiveWorks.map((w) => w.year))].sort((a, b) => b - a)
}

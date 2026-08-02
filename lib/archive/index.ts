/**
 * Archive data layer — Works Memory
 *
 * Data is static TypeScript. Replace `archiveItems` (or swap `getArchiveItems`
 * implementation) when connecting to a CMS or WordPress REST API.
 */

// -------------------------------------------------------------------------
// Categories
// -------------------------------------------------------------------------

export type ArchiveCategory =
  | "songwriting"
  | "composition-arrangement"
  | "arrangement-mix-mastering"
  | "mix-mastering"
  | "label"
  | "sound-design"

export const archiveCategoryLabels: Record<ArchiveCategory, string> = {
  songwriting: "楽曲提供",
  "composition-arrangement": "作編曲",
  "arrangement-mix-mastering": "編曲・ミックス・マスタリング",
  "mix-mastering": "ミックス・マスタリング",
  label: "自社レーベル",
  "sound-design": "サウンド開発（企業案件）",
}

export const archiveCategories = Object.keys(
  archiveCategoryLabels,
) as ArchiveCategory[]

// -------------------------------------------------------------------------
// Type
// -------------------------------------------------------------------------

export type ArchiveItem = {
  id: string
  title: string
  year?: number
  date?: string
  category: ArchiveCategory
  summary: string
  roles: string[]
  client?: string
  artist?: string
  label?: string
  externalUrl?: string
  image?: string
  featured?: boolean
}

/**
 * @deprecated Use ArchiveItem. Kept for backward compatibility.
 */
export type ArchiveWork = ArchiveItem

// -------------------------------------------------------------------------
// Mock data
// Replace this array — or swap getArchiveItems() — when a CMS is connected.
// -------------------------------------------------------------------------

export const archiveItems: ArchiveItem[] = [
  {
    id: "songwriting-sample",
    title: "楽曲提供アーカイブ",
    year: 2026,
    category: "songwriting",
    summary:
      "アーティスト、チーム、企画の目的に合わせた楽曲提供。コンセプト設計から納品まで一貫して担当。",
    roles: ["作曲", "作詞", "制作ディレクション"],
    featured: true,
  },
  {
    id: "composition-arrangement-sample",
    title: "作編曲アーカイブ",
    year: 2026,
    category: "composition-arrangement",
    summary:
      "歌、演舞、映像、企画の目的に合わせた作曲・編曲。ジャンルや用途を問わず対応。",
    roles: ["作曲", "編曲", "サウンドプロデュース"],
    featured: true,
  },
  {
    id: "arrangement-mix-mastering-sample",
    title: "編曲・ミックス・マスタリング アーカイブ",
    year: 2026,
    category: "arrangement-mix-mastering",
    summary:
      "アレンジから最終音源の仕上げまで一貫して制作。配信・CD・映像向けに対応。",
    roles: ["編曲", "ミックス", "マスタリング"],
    featured: true,
  },
  {
    id: "mix-mastering-sample",
    title: "ミックス・マスタリング アーカイブ",
    year: 2025,
    category: "mix-mastering",
    summary:
      "既存音源の質感整理、音圧調整、配信・公開に向けた最終仕上げ。",
    roles: ["ミックス", "マスタリング"],
  },
  {
    id: "label-sample",
    title: "自社レーベル アーカイブ",
    year: 2025,
    category: "label",
    summary:
      "United Studioが企画・制作・発信に関わる自社レーベル作品。",
    roles: ["企画", "制作", "リリース"],
    label: "United Studio Label",
    featured: true,
  },
  {
    id: "sound-design-sample",
    title: "サウンド開発アーカイブ",
    year: 2025,
    category: "sound-design",
    summary:
      "企業・ブランド・プロダクト向けの音楽、効果音、サウンドアイデンティティ設計。",
    roles: ["サウンドデザイン", "音源制作", "企業案件"],
  },
]

// -------------------------------------------------------------------------
// Accessors
// -------------------------------------------------------------------------

/**
 * All items sorted newest-first.
 * Swap this function body to connect a CMS.
 */
export function getArchiveItems(opts?: {
  category?: ArchiveCategory
  year?: number
}): ArchiveItem[] {
  let items = [...archiveItems]
  if (opts?.category) items = items.filter((i) => i.category === opts.category)
  if (opts?.year) items = items.filter((i) => i.year === opts.year)
  return items.sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
}

export function getFeaturedWorks(limit = 3): ArchiveItem[] {
  return archiveItems
    .filter((i) => i.featured)
    .sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
    .slice(0, limit)
}

export function getArchiveYears(): number[] {
  return [
    ...new Set(archiveItems.map((i) => i.year).filter((y): y is number => y != null)),
  ].sort((a, b) => b - a)
}

// Back-compat alias so existing imports of `archiveWorks` still resolve.
export const archiveWorks = archiveItems

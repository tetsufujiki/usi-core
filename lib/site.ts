export const SITE_URL = "https://united-studio.com"

export const SITE_NAME = "United Studio Inc."
export const SITE_NAME_JA = "ユナイテッドスタジオ株式会社"
export const SITE_TAGLINE = "United Studio is a creative system."

export const externalLinks = {
  utattemita: "https://utattemita.united-studio.com",
  studio: "https://studio.united-studio.com",
  yosakoi: "https://yosakoi.united-studio.com",
  reserve: "https://reserve.united-studio.com",
  rec: "https://rec.united-studio.com",
} as const

export type NavItem = {
  label: string
  href: string
}

export const navItems: NavItem[] = [
  { label: "Map", href: "/#map" },
  { label: "News", href: "/news" },
  { label: "Archive", href: "/archive" },
  { label: "Company", href: "/company" },
  { label: "Contact", href: "/contact" },
]

export type EntryCard = {
  title: string
  description: string
  href: string
  external: boolean
  code: string
}

export const entryCards: EntryCard[] = [
  {
    title: "歌ってみる",
    description: "歌ってみたのミックス・制作サポート",
    href: externalLinks.utattemita,
    external: true,
    code: "UTATTEMITA",
  },
  {
    title: "音を録る / 曲をつくる",
    description: "レコーディング・楽曲制作",
    href: externalLinks.studio,
    external: true,
    code: "STUDIO",
  },
  {
    title: "祭りをつくる",
    description: "よさこい楽曲・演舞制作",
    href: externalLinks.yosakoi,
    external: true,
    code: "YOSAKOI",
  },
  {
    title: "作品を残す",
    description: "制作実績・アーカイブ",
    href: "/archive",
    external: false,
    code: "ARCHIVE",
  },
  {
    title: "予約する",
    description: "スタジオ・制作の予約",
    href: externalLinks.reserve,
    external: true,
    code: "RESERVE",
  },
  {
    title: "相談する",
    description: "制作・業務のご相談",
    href: "/contact",
    external: false,
    code: "CONTACT",
  },
  {
    title: "会社を知る",
    description: "会社概要・事業内容",
    href: "/company",
    external: false,
    code: "COMPANY",
  },
]

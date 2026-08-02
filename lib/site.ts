export const SITE_URL = "https://united-studio.com"

export const SITE_NAME = "United Studio Inc."
export const SITE_NAME_JA = "ユナイテッドスタジオ株式会社"
export const SITE_TAGLINE = "United Studio is a creative system."
export const SITE_TITLE = "ユナイテッドスタジオ株式会社｜音楽制作とレコーディングのクリエイティブカンパニー"
export const SITE_DESCRIPTION = "ユナイテッドスタジオ株式会社は、東京・板橋を拠点に、レコーディングスタジオ運営、歌ってみた制作、よさこい演舞曲、オリジナル楽曲制作などを手がける音楽制作会社です。各サービスのご案内、作品、予約・相談窓口をご覧いただけます。"

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

export type Gateway = {
  id: string
  index: string
  title: string
  tagline: string
  href: string
  external: boolean
  destination: string
  color: string
  colorSoft: string
  orbit: number
  duration: number
  angle: number
}

export const gateways: Gateway[] = [
  {
    id: "utattemita",
    index: "01",
    title: "歌ってみる",
    tagline: "歌ってみたのミックス・制作サポート",
    href: externalLinks.utattemita,
    external: true,
    destination: "utattemita.united-studio.com",
    color: "#1fb6cd",
    colorSoft: "rgba(31, 182, 205, 0.14)",
    orbit: 0.92,
    duration: 46,
    angle: 12,
  },
  {
    id: "studio",
    index: "02",
    title: "音を録る・曲をつくる",
    tagline: "レコーディング・楽曲制作",
    href: externalLinks.studio,
    external: true,
    destination: "studio.united-studio.com",
    color: "#3c6fb7",
    colorSoft: "rgba(60, 111, 183, 0.14)",
    orbit: 0.78,
    duration: 58,
    angle: 74,
  },
  {
    id: "yosakoi",
    index: "03",
    title: "祭りをつくる",
    tagline: "よさこい楽曲制作",
    href: externalLinks.yosakoi,
    external: true,
    destination: "yosakoi.united-studio.com",
    color: "#e0813a",
    colorSoft: "rgba(224, 129, 58, 0.15)",
    orbit: 1,
    duration: 66,
    angle: 128,
  },
  {
    id: "archive",
    index: "04",
    title: "作品を残す",
    tagline: "制作実績・アーカイブ",
    href: "/archive",
    external: false,
    destination: "united-studio.com/archive",
    color: "#8d8474",
    colorSoft: "rgba(141, 132, 116, 0.14)",
    orbit: 0.66,
    duration: 40,
    angle: 158,
  },
  {
    id: "rec",
    index: "05",
    title: "用途を知る",
    tagline: "スタジオガイド・よくある質問",
    href: externalLinks.rec,
    external: true,
    destination: "rec.united-studio.com",
    color: "#6f8f76",
    colorSoft: "rgba(111, 143, 118, 0.15)",
    orbit: 0.82,
    duration: 48,
    angle: 204,
  },
  {
    id: "reserve",
    index: "06",
    title: "予約する",
    tagline: "スタジオ・制作の予約",
    href: externalLinks.reserve,
    external: true,
    destination: "reserve.united-studio.com",
    color: "#5b9bd5",
    colorSoft: "rgba(91, 155, 213, 0.14)",
    orbit: 0.86,
    duration: 52,
    angle: 248,
  },
  {
    id: "contact",
    index: "07",
    title: "相談する",
    tagline: "制作・業務のご相談",
    href: "/contact",
    external: false,
    destination: "united-studio.com/contact",
    color: "#c98a8a",
    colorSoft: "rgba(201, 138, 138, 0.15)",
    orbit: 0.72,
    duration: 62,
    angle: 294,
  },
  {
    id: "company",
    index: "08",
    title: "会社を知る",
    tagline: "会社概要・事業内容",
    href: "/company",
    external: false,
    destination: "united-studio.com/company",
    color: "#31578f",
    colorSoft: "rgba(49, 87, 143, 0.13)",
    orbit: 0.96,
    duration: 72,
    angle: 338,
  },
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
    description: "よさこい楽曲制作",
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
    title: "用途を知る",
    description: "スタジオガイド・よくある質問",
    href: externalLinks.rec,
    external: true,
    code: "REC",
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

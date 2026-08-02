import { externalLinks } from "./site"

/** Company profile data. */
export type CompanyHistoryItem = {
  date: string
  description: string
}

export type CompanyField = {
  label: string
  value: string | string[] | CompanyHistoryItem[]
}

export const companyProfile: CompanyField[] = [
  { label: "会社名", value: "ユナイテッドスタジオ株式会社（United Studio Inc.）" },
  {
    label: "沿革",
    value: [
      { date: "2006年　2月", description: "世田谷区にてユナイテッドスタジオ株式会社を設立" },
      { date: "2009年　6月", description: "本社を杉並区へ移転" },
      { date: "2013年　12月", description: "本社を中野区へ移転" },
      { date: "2020年　6月", description: "本社を板橋区へ移転" },
    ],
  },
  { label: "所在地", value: ["東京都板橋区東坂下1-19-24", "志幸42シャンソン110号室"] },
  { label: "役員", value: ["代表取締役　藤木 哲", "取締役　河井 剛二", "取締役　藤木 綾香"] },
  {
    label: "事業内容",
    value:
      "レコーディングスタジオの運営、音楽制作、歌ってみた制作サポート、よさこい楽曲制作、アーティスト / クリエイター支援",
  },
]

export type RelatedService = {
  name: string
  description: string
  url: string
}

export const relatedServices: RelatedService[] = [
  {
    name: "Utattemita",
    description: "歌ってみたミックス・制作サポート",
    url: externalLinks.utattemita,
  },
  {
    name: "Studio",
    description: "レコーディング・楽曲制作",
    url: externalLinks.studio,
  },
  {
    name: "Rec",
    description: "スタジオガイド・よくある質問",
    url: externalLinks.rec,
  },
  {
    name: "Reserve",
    description: "スタジオ・制作予約",
    url: externalLinks.reserve,
  },
  {
    name: "Yosakoi",
    description: "よさこい楽曲制作",
    url: externalLinks.yosakoi,
  },
]

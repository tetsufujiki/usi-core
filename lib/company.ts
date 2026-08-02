import { externalLinks } from "./site"

/**
 * Company profile data.
 * TODO items are unconfirmed values — do not guess them.
 * Replace each TODO with the confirmed value before production launch.
 */
export type CompanyField = {
  label: string
  value: string
  todo?: boolean
}

export const companyProfile: CompanyField[] = [
  { label: "会社名", value: "ユナイテッドスタジオ株式会社（United Studio Inc.）" },
  { label: "設立", value: "TODO: 設立年月日を確認して記載", todo: true },
  { label: "所在地", value: "TODO: 所在地を確認して記載", todo: true },
  { label: "代表", value: "TODO: 代表者名を確認して記載", todo: true },
  {
    label: "事業内容",
    value:
      "レコーディング・楽曲制作、歌ってみた制作サポート、よさこい楽曲・演舞制作、アーティスト / クリエイター支援",
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
    name: "Yosakoi",
    description: "よさこい楽曲・演舞制作",
    url: externalLinks.yosakoi,
  },
  {
    name: "Reserve",
    description: "スタジオ・制作予約",
    url: externalLinks.reserve,
  },
  {
    name: "Rec",
    description: "レコーディング料金・内容",
    url: externalLinks.rec,
  },
]

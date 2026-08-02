import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { NewsList } from "@/components/news-list"
import { getAllNews } from "@/lib/news"

export const metadata: Metadata = {
  title: "News",
  description:
    "ユナイテッドスタジオ株式会社の最新情報。制作・サービス・活動に関するお知らせを掲載しています。",
  alternates: { canonical: "/news" },
  openGraph: {
    title: "News | United Studio Inc.",
    description: "ユナイテッドスタジオ株式会社の最新情報。",
    url: "/news",
  },
}

export default async function NewsPage() {
  const news = await getAllNews()

  return (
    <div>
      <PageHeader
        code="ACTIVITY"
        title="News"
        description="制作・サービス・活動に関するお知らせ。"
      />
      <div className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
        <NewsList items={news} />
      </div>
    </div>
  )
}

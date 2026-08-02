import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { NewsList } from "@/components/news-list"
import { getNewsList } from "@/lib/news"
import { SITE_NAME_JA } from "@/lib/site"

export const metadata: Metadata = {
  title: `News｜${SITE_NAME_JA}`,
  description:
    "ユナイテッドスタジオ株式会社の最新情報、制作実績、各サイトの更新情報をお知らせします。",
  alternates: { canonical: "/news" },
  openGraph: {
    title: `News｜${SITE_NAME_JA}`,
    description:
      "ユナイテッドスタジオ株式会社の最新情報、制作実績、各サイトの更新情報をお知らせします。",
    url: "/news",
  },
}

export default async function NewsPage() {
  const news = await getNewsList()

  return (
    <div>
      <PageHeader
        code="ACTIVITY SIGNAL"
        title="News"
        description="United Studioの活動ログ。"
      />
      <div className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
        <NewsList items={news} />
      </div>
    </div>
  )
}

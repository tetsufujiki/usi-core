import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { PageHeader } from "@/components/page-header"
import { NewsList } from "@/components/news-list"
import { getNewsList } from "@/lib/news"
import { SITE_NAME_JA } from "@/lib/site"

const NEWS_PER_PAGE = 12
const newsDescription =
  "ユナイテッドスタジオ株式会社の最新情報、制作実績、各サイトの更新情報をお知らせします。"

type NewsSearchParams = Promise<{ page?: string | string[] }>

function getPageNumber(pageParam: string | string[] | undefined): number | null {
  const value = Array.isArray(pageParam) ? pageParam[0] : pageParam
  if (!value) return 1
  if (!/^[1-9]\d*$/.test(value)) return null

  return Number(value)
}

function getPageHref(page: number): string {
  return page === 1 ? "/news#news-list" : `/news?page=${page}#news-list`
}

function getPaginationItems(currentPage: number, totalPages: number) {
  const pages = new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1])
  const sortedPages = [...pages]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b)

  return sortedPages.reduce<(number | "ellipsis")[]>((items, page) => {
    const previous = items.at(-1)
    if (typeof previous === "number" && page - previous > 1) items.push("ellipsis")
    items.push(page)
    return items
  }, [])
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: NewsSearchParams
}): Promise<Metadata> {
  const page = getPageNumber((await searchParams).page)
  const canonical = page && page > 1 ? `/news?page=${page}` : "/news"

  return {
    title: `News｜${SITE_NAME_JA}`,
    description: newsDescription,
    alternates: { canonical },
    openGraph: {
      title: `News｜${SITE_NAME_JA}`,
      description: newsDescription,
      url: canonical,
    },
  }
}

export default async function NewsPage({
  searchParams,
}: {
  searchParams: NewsSearchParams
}) {
  const currentPage = getPageNumber((await searchParams).page)
  if (!currentPage) redirect("/news")

  const news = await getNewsList()
  const totalPages = Math.ceil(news.length / NEWS_PER_PAGE)
  if (currentPage > totalPages) redirect("/news")

  const startIndex = (currentPage - 1) * NEWS_PER_PAGE
  const pageItems = news.slice(startIndex, startIndex + NEWS_PER_PAGE)
  const paginationItems = getPaginationItems(currentPage, totalPages)

  return (
    <div>
      <PageHeader
        code="ACTIVITY SIGNAL"
        title="News"
        description="United Studioの活動ログ。"
      />
      <div
        id="news-list"
        className="mx-auto max-w-4xl scroll-mt-6 px-4 py-12 md:px-6 md:py-16"
      >
        <NewsList items={pageItems} />
        {totalPages > 1 ? (
          <nav
            aria-label="Newsのページ送り"
            className="mt-10 flex flex-wrap items-center justify-center gap-2"
          >
            {currentPage > 1 ? (
              <Link
                href={getPageHref(currentPage - 1)}
                className="rounded-md border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                前へ
              </Link>
            ) : (
              <span className="rounded-md border border-border px-3 py-2 text-sm text-muted-foreground/45">
                前へ
              </span>
            )}
            {paginationItems.map((item, index) =>
              item === "ellipsis" ? (
                <span key={`ellipsis-${index}`} className="px-1 text-muted-foreground">
                  …
                </span>
              ) : item === currentPage ? (
                <span
                  key={item}
                  aria-current="page"
                  className="rounded-md border border-accent bg-accent/10 px-3 py-2 text-sm font-medium text-accent"
                >
                  {item}
                </span>
              ) : (
                <Link
                  key={item}
                  href={getPageHref(item)}
                  className="rounded-md border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {item}
                </Link>
              ),
            )}
            {currentPage < totalPages ? (
              <Link
                href={getPageHref(currentPage + 1)}
                className="rounded-md border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                次へ
              </Link>
            ) : (
              <span className="rounded-md border border-border px-3 py-2 text-sm text-muted-foreground/45">
                次へ
              </span>
            )}
          </nav>
        ) : null}
      </div>
    </div>
  )
}

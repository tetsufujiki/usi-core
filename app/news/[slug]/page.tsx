import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { NewsDetailHero } from "@/components/news-detail-hero"
import { getNewsItemBySlug, getNewsList } from "@/lib/news"
import { SITE_NAME_JA } from "@/lib/site"

type NewsDetailPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const news = await getNewsList()
  return news.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const item = getNewsItemBySlug(slug)

  if (!item) return {}

  return {
    title: `${item.title}｜${SITE_NAME_JA}`,
    description: item.excerpt || `${item.date}｜${item.title}`,
    alternates: { canonical: `/news/${item.slug}` },
    openGraph: {
      title: item.title,
      description: item.excerpt || `${item.date}｜${item.title}`,
      url: `/news/${item.slug}`,
      ...(item.featuredImage
        ? {
            images: [
              {
                url: item.featuredImage.src,
                alt: item.featuredImage.alt,
                ...(item.featuredImage.width ? { width: item.featuredImage.width } : {}),
                ...(item.featuredImage.height ? { height: item.featuredImage.height } : {}),
              },
            ],
          }
        : {}),
    },
  }
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params
  const item = getNewsItemBySlug(slug)

  if (!item) notFound()

  const news = await getNewsList()
  const currentIndex = news.findIndex((newsItem) => newsItem.id === item.id)
  const newerItem = currentIndex > 0 ? news[currentIndex - 1] : undefined
  const olderItem = currentIndex >= 0 ? news[currentIndex + 1] : undefined

  return (
    <div>
      <NewsDetailHero
        key={item.slug}
        src={item.featuredImage?.src}
        alt={item.featuredImage?.alt}
        date={item.date}
        title={item.title}
      />
      <div className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
        <article className="flex max-w-3xl flex-col gap-8">
          {item.contentHtml ? (
            <div
              className="news-content text-sm leading-relaxed text-muted-foreground md:text-base"
              dangerouslySetInnerHTML={{ __html: item.contentHtml }}
            />
          ) : (
            <div className="flex flex-col gap-5 text-sm leading-relaxed text-muted-foreground md:text-base">
              {item.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          )}
          {newerItem || olderItem ? (
            <nav
              aria-label="前後のNews記事"
              className="grid gap-3 border-y border-border py-6 md:grid-cols-2 md:gap-6"
            >
              {newerItem ? (
                <Link
                  href={`/news/${newerItem.slug}`}
                  className="group flex min-w-0 flex-col items-start gap-2 rounded-lg border border-border bg-surface px-5 py-4 transition-colors hover:border-accent/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <span className="font-mono text-[10px] tracking-[0.18em] text-accent">
                    ← 新しい記事
                  </span>
                  <span className="text-sm font-medium leading-relaxed text-foreground transition-colors group-hover:text-accent md:text-base">
                    {newerItem.title}
                  </span>
                </Link>
              ) : null}
              {olderItem ? (
                <Link
                  href={`/news/${olderItem.slug}`}
                  className="group flex min-w-0 flex-col items-end gap-2 rounded-lg border border-border bg-surface px-5 py-4 text-right transition-colors hover:border-accent/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:col-start-2"
                >
                  <span className="font-mono text-[10px] tracking-[0.18em] text-accent">
                    古い記事 →
                  </span>
                  <span className="text-sm font-medium leading-relaxed text-foreground transition-colors group-hover:text-accent md:text-base">
                    {olderItem.title}
                  </span>
                </Link>
              ) : null}
            </nav>
          ) : null}
          <footer>
            <Link href="/news" className="system-link">← NEWS一覧へ戻る</Link>
          </footer>
        </article>
      </div>
    </div>
  )
}

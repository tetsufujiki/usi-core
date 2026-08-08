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
          <footer className="border-t border-border pt-8">
            <Link href="/news" className="system-link">← NEWS一覧へ戻る</Link>
          </footer>
        </article>
      </div>
    </div>
  )
}

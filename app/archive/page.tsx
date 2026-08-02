import type { Metadata } from "next"
import Link from "next/link"
import { ArchiveCard } from "@/components/archive-card"
import { ExternalLink } from "@/components/external-link"
import { PageHeader } from "@/components/page-header"
import {
  archiveCategories,
  archiveCategoryLabels,
  getArchiveItems,
  getArchiveYears,
  getFeaturedWorks,
  type ArchiveCategory,
} from "@/lib/archive"
import { externalLinks } from "@/lib/site"

export const metadata: Metadata = {
  title: "Archive｜ユナイテッドスタジオ株式会社",
  description:
    "ユナイテッドスタジオ株式会社が関わるアーティスト作品、楽曲提供、作編曲、ミックス・マスタリング、自社レーベル、企業向けサウンド開発などの制作アーカイブです。",
  alternates: { canonical: "/archive" },
  openGraph: {
    title: "Archive | United Studio Inc.",
    description:
      "アーティスト、作品、配信リンク、担当範囲からたどるUnited Studioの制作アーカイブ。",
    url: "/archive",
  },
}

function buildQuery(year?: string, category?: string): string {
  const params = new URLSearchParams()
  if (year) params.set("year", year)
  if (category) params.set("category", category)
  const query = params.toString()
  return query ? `/archive?${query}` : "/archive"
}

const filterBase =
  "flex min-h-10 items-center rounded-full border px-4 py-1 font-mono text-[10px] tracking-[0.12em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
const filterActive = "border-accent bg-accent-soft text-accent"
const filterInactive =
  "border-border text-muted-foreground hover:border-accent/50 hover:text-foreground"

export default async function ArchivePage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string; category?: string }>
}) {
  const { year, category } = await searchParams
  const years = getArchiveYears()
  const featured = getFeaturedWorks(4)
  const activeYear = year && years.includes(Number(year)) ? Number(year) : null
  const activeCategory = archiveCategories.includes(category as ArchiveCategory)
    ? (category as ArchiveCategory)
    : null
  const filtered = getArchiveItems({
    category: activeCategory ?? undefined,
    year: activeYear ?? undefined,
  })

  return (
    <div className="archive-page">
      <PageHeader
        code="WORKS MEMORY"
        title="Archive"
        description="United Studioが関わってきた音楽、作品、サウンド開発の記録。アーティスト、作品、配信リンク、担当範囲を軸に、制作の記憶をたどれるArchiveです。"
      />

      <div className="mx-auto flex max-w-6xl flex-col gap-20 px-4 py-14 md:px-6 md:py-20">
        <section aria-labelledby="featured-heading" className="flex flex-col gap-7">
          <div className="flex flex-col gap-2">
            <p className="font-mono text-[10px] tracking-[0.28em] text-accent">LISTEN / LOOK / TRACE</p>
            <h2 id="featured-heading" className="text-2xl font-bold tracking-[-0.02em] md:text-3xl">Featured Works</h2>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              作品とアーティストからたどる、United Studioの制作の記憶。
            </p>
          </div>
          <ul className="grid gap-6 md:grid-cols-2" aria-label="注目作品">
            {featured.map((work) => (
              <li key={work.id}><ArchiveCard work={work} variant="featured" /></li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="works-index-heading" className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <p className="font-mono text-[10px] tracking-[0.28em] text-accent">CHRONOLOGICAL MEMORY</p>
            <h2 id="works-index-heading" className="text-2xl font-bold tracking-[-0.02em] md:text-3xl">Works Index</h2>
          </div>

          <div className="flex flex-col gap-5 border-y border-border py-5">
            <nav aria-label="年で作品を絞り込む" className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
              <span className="w-20 shrink-0 font-mono text-[9px] tracking-[0.2em] text-muted-foreground">YEAR</span>
              <ul className="flex flex-wrap gap-2">
                <li><Link href={buildQuery(undefined, activeCategory ?? undefined)} className={`${filterBase} ${!activeYear ? filterActive : filterInactive}`} aria-current={!activeYear ? "page" : undefined}>ALL</Link></li>
                {years.map((itemYear) => (
                  <li key={itemYear}><Link href={buildQuery(String(itemYear), activeCategory ?? undefined)} className={`${filterBase} ${activeYear === itemYear ? filterActive : filterInactive}`} aria-current={activeYear === itemYear ? "page" : undefined}>{itemYear}</Link></li>
                ))}
              </ul>
            </nav>

            <nav aria-label="内部分類で作品を絞り込む" className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
              <span className="w-20 shrink-0 font-mono text-[9px] tracking-[0.2em] text-muted-foreground">CATEGORY</span>
              <ul className="flex flex-wrap gap-2">
                {archiveCategories.map((itemCategory) => (
                  <li key={itemCategory}>
                    <Link
                      href={buildQuery(activeYear ? String(activeYear) : undefined, activeCategory === itemCategory ? undefined : itemCategory)}
                      className={`${filterBase} px-3 text-[9px] ${activeCategory === itemCategory ? filterActive : filterInactive}`}
                      aria-current={activeCategory === itemCategory ? "page" : undefined}
                    >
                      {archiveCategoryLabels[itemCategory]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {filtered.length > 0 ? (
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2" aria-label="作品アーカイブ一覧">
              {filtered.map((work) => <li key={work.id}><ArchiveCard work={work} variant="index" /></li>)}
            </ul>
          ) : (
            <p className="py-16 text-center text-sm text-muted-foreground">条件に一致する作品はありません。</p>
          )}
        </section>

        <aside className="group overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-shadow hover:shadow-md">
          <div className="grid md:grid-cols-[minmax(260px,360px)_1fr]">
            <div className="aspect-[4/3] overflow-hidden bg-[#edf3e9] md:aspect-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/archive/kokushimusou-journey.webp"
                alt="よさこい演舞の様子"
                className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
            <div className="flex flex-col items-start justify-center gap-5 p-6 sm:p-8 md:p-10">
              <div className="flex flex-col gap-2">
                <p className="font-mono text-[10px] tracking-[0.24em] text-accent">YOSAKOI / SOUND WORKS</p>
                <h2 className="text-2xl font-bold tracking-[-0.02em] text-foreground md:text-3xl">Yosakoi Works</h2>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                  よさこい関連の作品は、Yosakoiサイトの専用アーカイブにまとめています。
                </p>
              </div>
              <ExternalLink
                href={externalLinks.yosakoi}
                className="flex min-h-11 items-center gap-2 rounded-full border border-accent/40 bg-accent-soft px-5 text-sm font-medium text-accent transition-colors hover:border-accent hover:bg-accent hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Yosakoi Archiveを見る
              </ExternalLink>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

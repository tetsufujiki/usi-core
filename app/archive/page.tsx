import type { Metadata } from "next"
import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { ArchiveCard } from "@/components/archive-card"
import { ExternalLink } from "@/components/external-link"
import {
  archiveCategories,
  archiveCategoryLabels,
  getArchiveItems,
  getArchiveYears,
  type ArchiveCategory,
} from "@/lib/archive"
import { externalLinks } from "@/lib/site"

export const metadata: Metadata = {
  title: "Archive｜ユナイテッドスタジオ株式会社",
  description:
    "ユナイテッドスタジオ株式会社が手がける楽曲提供、作編曲、ミックス・マスタリング、自社レーベル、企業向けサウンド開発などの制作アーカイブです。",
  alternates: { canonical: "/archive" },
  openGraph: {
    title: "Archive | United Studio Inc.",
    description:
      "ユナイテッドスタジオ株式会社の制作アーカイブ。楽曲提供から企業向けサウンド開発まで。",
    url: "/archive",
  },
}

function buildQuery(year?: string, category?: string): string {
  const params = new URLSearchParams()
  if (year) params.set("year", year)
  if (category) params.set("category", category)
  const qs = params.toString()
  return qs ? `/archive?${qs}` : "/archive"
}

const chipBase =
  "flex min-h-10 items-center rounded-full border px-4 py-1 font-mono text-xs tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
const chipActive = "border-accent bg-accent-soft text-accent"
const chipInactive =
  "border-border text-muted-foreground hover:border-accent/50 hover:text-foreground"

export default async function ArchivePage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string; category?: string }>
}) {
  const { year, category } = await searchParams
  const years = getArchiveYears()

  const activeYear =
    year && years.includes(Number(year)) ? Number(year) : null
  const activeCategory = archiveCategories.includes(
    category as ArchiveCategory,
  )
    ? (category as ArchiveCategory)
    : null

  const filtered = getArchiveItems({
    category: activeCategory ?? undefined,
    year: activeYear ?? undefined,
  })

  return (
    <div>
      {/* ── Hero ── */}
      <PageHeader
        code="WORKS MEMORY"
        title="Archive"
        description="United Studioが手がけてきた音楽制作、作品づくり、サウンド開発の記録。楽曲提供、作編曲、ミックス・マスタリング、自社レーベル、企業案件まで、制作のかたちごとに整理しています。"
      />

      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-12 md:px-6 md:py-16">

        {/* ── Category Overview ── */}
        <section aria-labelledby="category-overview-heading">
          <h2 id="category-overview-heading" className="mb-5 font-mono text-[11px] tracking-[0.3em] text-accent">
            CATEGORY
          </h2>
          <ul className="flex flex-wrap gap-2.5" aria-label="制作カテゴリ一覧">
            {archiveCategories.map((cat) => (
              <li key={cat}>
                <Link
                  href={buildQuery(
                    activeYear ? String(activeYear) : undefined,
                    activeCategory === cat ? undefined : cat,
                  )}
                  className={`${chipBase} ${activeCategory === cat ? chipActive : chipInactive}`}
                  aria-current={activeCategory === cat ? "true" : undefined}
                  aria-label={
                    activeCategory === cat
                      ? `${archiveCategoryLabels[cat]}（選択中）`
                      : `${archiveCategoryLabels[cat]}で絞り込む`
                  }
                >
                  {archiveCategoryLabels[cat]}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Year filter ── */}
        <nav aria-label="年で絞り込む">
          <ul className="flex flex-wrap gap-2">
            <li>
              <Link
                href={buildQuery(undefined, activeCategory ?? undefined)}
                className={`${chipBase} text-[10px] ${!activeYear ? chipActive : chipInactive}`}
                aria-current={!activeYear ? "true" : undefined}
              >
                ALL YEARS
              </Link>
            </li>
            {years.map((y) => (
              <li key={y}>
                <Link
                  href={buildQuery(String(y), activeCategory ?? undefined)}
                  className={`${chipBase} text-[10px] ${activeYear === y ? chipActive : chipInactive}`}
                  aria-current={activeYear === y ? "true" : undefined}
                >
                  {y}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Archive list ── */}
        {filtered.length > 0 ? (
          <ul
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            aria-label="制作アーカイブ一覧"
          >
            {filtered.map((item) => (
              <li key={item.id}>
                <ArchiveCard work={item} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-16 text-center text-sm text-muted-foreground">
            条件に一致する作品はありません。
          </p>
        )}

        {/* ── Yosakoi works pointer ── */}
        <div className="flex flex-col items-start gap-4 rounded-xl border border-border bg-surface p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-base font-bold text-foreground">
              Yosakoi Works
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              よさこい関連の制作実績は、Yosakoiサイトのアーカイブに掲載しています。
            </p>
          </div>
          <ExternalLink
            href={externalLinks.yosakoi}
            className="flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-border px-5 text-sm text-foreground transition-colors hover:border-accent/60 hover:text-accent"
          >
            Yosakoi Archiveへ
          </ExternalLink>
        </div>
      </div>
    </div>
  )
}

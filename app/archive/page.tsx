import type { Metadata } from "next"
import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { ArchiveCard } from "@/components/archive-card"
import { ExternalLink } from "@/components/external-link"
import {
  archiveCategories,
  archiveWorks,
  getArchiveYears,
  type ArchiveCategory,
} from "@/lib/archive"
import { externalLinks } from "@/lib/site"

export const metadata: Metadata = {
  title: "Archive",
  description:
    "ユナイテッドスタジオ株式会社の制作実績アーカイブ。レコーディング、プロダクション、アーティストサポートの作品を掲載しています。",
  alternates: { canonical: "/archive" },
  openGraph: {
    title: "Archive | United Studio Inc.",
    description: "ユナイテッドスタジオ株式会社の制作実績アーカイブ。",
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

const filterLinkBase =
  "flex min-h-11 items-center rounded-full border px-4 text-xs font-mono tracking-[0.1em] transition-colors"
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

  const activeYear = year && years.includes(Number(year)) ? Number(year) : null
  const activeCategory = archiveCategories.includes(category as ArchiveCategory)
    ? (category as ArchiveCategory)
    : null

  const filtered = archiveWorks
    .filter((w) => (activeYear ? w.year === activeYear : true))
    .filter((w) => (activeCategory ? w.category === activeCategory : true))
    .sort((a, b) => b.year - a.year)

  return (
    <div>
      <PageHeader
        code="WORKS"
        title="Archive"
        description="レコーディング、プロダクション、アーティストサポートの制作実績。"
      />

      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 md:px-6 md:py-16">
        {/* Filters */}
        <div className="flex flex-col gap-4">
          <nav aria-label="年で絞り込む">
            <ul className="flex flex-wrap gap-2">
              <li>
                <Link
                  href={buildQuery(undefined, activeCategory ?? undefined)}
                  className={`${filterLinkBase} ${!activeYear ? filterActive : filterInactive}`}
                  aria-current={!activeYear ? "true" : undefined}
                >
                  ALL YEARS
                </Link>
              </li>
              {years.map((y) => (
                <li key={y}>
                  <Link
                    href={buildQuery(String(y), activeCategory ?? undefined)}
                    className={`${filterLinkBase} ${activeYear === y ? filterActive : filterInactive}`}
                    aria-current={activeYear === y ? "true" : undefined}
                  >
                    {y}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="カテゴリで絞り込む">
            <ul className="flex flex-wrap gap-2">
              <li>
                <Link
                  href={buildQuery(
                    activeYear ? String(activeYear) : undefined,
                    undefined,
                  )}
                  className={`${filterLinkBase} ${!activeCategory ? filterActive : filterInactive}`}
                  aria-current={!activeCategory ? "true" : undefined}
                >
                  ALL CATEGORIES
                </Link>
              </li>
              {archiveCategories.map((c) => (
                <li key={c}>
                  <Link
                    href={buildQuery(
                      activeYear ? String(activeYear) : undefined,
                      c,
                    )}
                    className={`${filterLinkBase} ${activeCategory === c ? filterActive : filterInactive}`}
                    aria-current={activeCategory === c ? "true" : undefined}
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Works */}
        {filtered.length > 0 ? (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((work) => (
              <li key={work.id}>
                <ArchiveCard work={work} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-12 text-center text-sm text-muted-foreground">
            条件に一致する作品はありません。
          </p>
        )}

        {/* Yosakoi works pointer */}
        <div className="flex flex-col items-start gap-3 rounded-xl border border-border bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
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
            className="flex min-h-11 shrink-0 items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm text-foreground transition-colors hover:border-accent/60"
          >
            Yosakoi Archiveへ
          </ExternalLink>
        </div>
      </div>
    </div>
  )
}

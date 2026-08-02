import Link from "next/link"
import { CreativeMap } from "@/components/creative-map"
import { EntryCards } from "@/components/entry-cards"
import { NewsList } from "@/components/news-list"
import { ArchiveCard } from "@/components/archive-card"
import { SectionHeading } from "@/components/section-heading"
import { getLatestNews } from "@/lib/news"
import { getFeaturedWorks } from "@/lib/archive"
import { SITE_NAME_JA } from "@/lib/site"

export default async function HomePage() {
  const latestNews = await getLatestNews(3)
  const featuredWorks = getFeaturedWorks(4)

  return (
    <div className="flex flex-col">
      {/* 1. HERO */}
      <section
        aria-label="ヒーロー"
        className="relative overflow-hidden border-b border-border"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,rgba(103,226,245,0.12),transparent_60%),radial-gradient(ellipse_at_85%_110%,rgba(200,240,101,0.06),transparent_50%)]"
        />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-24 text-center md:px-6 md:py-36">
          <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground">
            {SITE_NAME_JA}
          </p>
          <p className="font-mono text-sm tracking-[0.15em] text-accent md:text-base">
            United Studio is a creative system.
          </p>
          <h1 className="text-4xl font-bold leading-tight text-foreground text-balance md:text-6xl">
            <span className="md:hidden">
              創作の入口は、
              <br />
              ここから。
            </span>
            <span className="hidden md:inline">創作の入口は、ここから。</span>
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
            歌、音、祭り、作品、予約、相談。
            <br />
            それぞれの入口へ、ここからつながります。
          </p>
        </div>
      </section>

      {/* 2. Creative System Map */}
      <section
        id="map"
        aria-labelledby="map-heading"
        className="scroll-mt-20 border-b border-border"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 md:px-6 md:py-24">
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="font-mono text-[11px] tracking-[0.3em] text-accent">
              CREATIVE SYSTEM MAP
            </p>
            <h2
              id="map-heading"
              className="text-2xl font-bold text-foreground text-balance md:text-3xl"
            >
              創作の中枢と、それぞれの入口
            </h2>
          </div>
          <CreativeMap />
        </div>
      </section>

      {/* 3. Entry Cards */}
      <section
        aria-labelledby="entry-heading"
        className="border-b border-border"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 md:px-6 md:py-24">
          <SectionHeading id="entry-heading" code="ENTRY" title="入口を選ぶ" />
          <EntryCards />
        </div>
      </section>

      {/* 4. Latest News */}
      <section
        aria-labelledby="news-heading"
        className="border-b border-border"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-16 md:px-6 md:py-24">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading
              id="news-heading"
              code="ACTIVITY"
              title="Latest News"
            />
            <Link
              href="/news"
              className="flex min-h-11 items-center gap-1 whitespace-nowrap font-mono text-xs tracking-[0.15em] text-accent transition-colors hover:text-foreground"
            >
              ALL NEWS →
            </Link>
          </div>
          <NewsList items={latestNews} />
        </div>
      </section>

      {/* 5. Selected Archive */}
      <section
        aria-labelledby="archive-heading"
        className="border-b border-border"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-16 md:px-6 md:py-24">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading
              id="archive-heading"
              code="WORKS"
              title="Selected Archive"
            />
            <Link
              href="/archive"
              className="flex min-h-11 items-center gap-1 whitespace-nowrap font-mono text-xs tracking-[0.15em] text-accent transition-colors hover:text-foreground"
            >
              ALL WORKS →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredWorks.map((work) => (
              <ArchiveCard key={work.id} work={work} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Company summary */}
      <section
        aria-labelledby="company-heading"
        className="border-b border-border"
      >
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-16 md:flex-row md:items-center md:justify-between md:px-6 md:py-24">
          <div className="flex max-w-xl flex-col gap-4">
            <SectionHeading
              id="company-heading"
              code="COMPANY"
              title="ユナイテッドスタジオ株式会社"
            />
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
              レコーディング・楽曲制作、歌ってみた制作サポート、よさこい楽曲・演舞制作、アーティスト /
              クリエイター支援。複数の創作の入口をひとつのシステムとして束ねています。
            </p>
          </div>
          <Link
            href="/company"
            className="flex min-h-11 items-center rounded-lg border border-border bg-surface px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent/60"
          >
            会社概要を見る
          </Link>
        </div>
      </section>

      {/* 7. Contact */}
      <section aria-labelledby="contact-heading">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-16 text-center md:px-6 md:py-24">
          <SectionHeading id="contact-heading" code="CONTACT" title="相談する" />
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground text-pretty">
            歌ってみた、よさこい制作、会社・業務のご相談。
            用途に合わせた窓口へご案内します。
          </p>
          <Link
            href="/contact"
            className="flex min-h-11 items-center rounded-lg bg-accent px-8 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            お問い合わせへ
          </Link>
        </div>
      </section>
    </div>
  )
}

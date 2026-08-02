import Link from 'next/link'
import { OrbitalCore } from '@/components/orbital-core'
import { NewsList } from '@/components/news-list'
import { ArchiveCard } from '@/components/archive-card'
import { SectionHeading } from '@/components/section-heading'
import { getLatestNews } from '@/lib/news'
import { getFeaturedWorks } from '@/lib/archive'
import { SITE_NAME_JA, SITE_TAGLINE } from '@/lib/site'

export default async function HomePage() {
  const latestNews = await getLatestNews(3)
  const featuredWorks = getFeaturedWorks(4)

  return (
    <div className="home-shell flex flex-col">
      <section id="map" aria-labelledby="core-heading" className="core-hero scroll-mt-20 border-b border-border">
        <div className="core-lines" aria-hidden="true" />
        <div className="core-dust" aria-hidden="true">
          <span /><span /><span /><span /><span />
        </div>
        <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-14 pt-10 md:px-6 lg:grid lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-12 lg:pb-20 lg:pt-16">
          <div className="flex flex-col items-start gap-5 lg:sticky lg:top-24 lg:pt-6">
            <p className="font-mono text-[10px] tracking-[0.28em] text-accent">{SITE_TAGLINE.toUpperCase()}</p>
            <p className="text-xs tracking-[0.14em] text-muted-foreground">{SITE_NAME_JA}</p>
            <h1
              id="core-heading"
              className="text-4xl font-bold leading-[1.14] tracking-[-0.03em] text-balance text-foreground md:text-5xl lg:text-6xl"
            >
              創作の入口は、
              <br />
              ここから。
            </h1>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
              歌、音、祭り、作品、予約、相談。United Studioは、異なる創作活動をひとつのシステムとしてつなぐ会社です。光の軌道から、あなたの入口を選んでください。
            </p>
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.18em] text-muted-foreground">
              <span className="status-dot" aria-hidden="true" /> TAP A LIGHT OR SELECT BELOW
            </div>
          </div>

          <OrbitalCore />
        </div>
      </section>

      <section aria-labelledby="news-heading" className="home-panel border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:px-6 lg:grid-cols-[0.35fr_1fr] lg:py-24">
          <div className="flex flex-col gap-4">
            <SectionHeading id="news-heading" code="ACTIVITY SIGNAL" title="いま、動いていること" />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">創作システムから届く、小さな活動信号。</p>
            <Link href="/news" className="system-link">ALL SIGNALS <span aria-hidden="true">↗</span></Link>
          </div>
          <NewsList items={latestNews} />
        </div>
      </section>

      <section aria-labelledby="archive-heading" className="home-panel border-b border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 md:px-6 lg:py-24">
          <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
            <SectionHeading id="archive-heading" code="WORKS MEMORY" title="記憶された創作" />
            <Link href="/archive" className="system-link">OPEN ARCHIVE <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {featuredWorks.map((work) => <ArchiveCard key={work.id} work={work} />)}
          </div>
        </div>
      </section>

      <section aria-labelledby="identity-heading" className="home-panel border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:px-6 lg:grid-cols-2 lg:py-24">
          <SectionHeading id="identity-heading" code="CORE IDENTITY" title="ユナイテッドスタジオ株式会社" />
          <div className="flex max-w-xl flex-col items-start gap-6">
            <p className="text-lg leading-relaxed text-foreground">ひとつの専門領域に閉じず、複数の創作の入口をひとつのシステムとして束ねる会社です。</p>
            <p className="text-sm leading-relaxed text-muted-foreground">レコーディング・楽曲制作、歌ってみた制作サポート、よさこい楽曲・演舞制作、アーティスト / クリエイター支援。</p>
            <Link href="/company" className="system-link">VIEW COMPANY <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="contact-heading" className="next-action">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-4 py-16 md:flex-row md:items-end md:px-6 lg:py-24">
          <div className="flex max-w-2xl flex-col gap-5">
            <p className="font-mono text-[10px] tracking-[0.26em] text-accent">NEXT ACTION / CONTACT</p>
            <h2 id="contact-heading" className="text-4xl font-bold tracking-[-0.04em] text-balance md:text-6xl">次の創作を、ここから。</h2>
          </div>
          <Link href="/contact" className="action-button">相談をはじめる <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </div>
  )
}

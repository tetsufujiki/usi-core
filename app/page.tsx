import Link from 'next/link'
import { OrbitalCore } from '@/components/orbital-core'
import { NewsList } from '@/components/news-list'
import { ArchiveCard } from '@/components/archive-card'
import { SectionHeading } from '@/components/section-heading'
import { SiteJsonLd } from '@/components/json-ld'
import { getLatestNews } from '@/lib/news'
import { getFeaturedWorks } from '@/lib/archive'
import { SITE_NAME_JA, SITE_TAGLINE } from '@/lib/site'

export default async function HomePage() {
  const latestNews = await getLatestNews(3)
  const featuredWorks = getFeaturedWorks(4)

  return (
    <div className="home-shell flex flex-col">
      <SiteJsonLd />
      <section id="map" aria-labelledby="core-heading" className="core-hero scroll-mt-20 border-b border-border">
        <div className="core-lines" aria-hidden="true" />
        <div className="core-dust" aria-hidden="true">
          <span /><span /><span /><span /><span />
        </div>
        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-14 pt-10 md:gap-14 md:px-6 md:pb-20 md:pt-14 lg:gap-16 lg:pb-24 lg:pt-16">
          <div className="flex max-w-3xl flex-col items-start gap-5">
            <p className="font-mono text-[10px] tracking-[0.28em] text-accent">{SITE_TAGLINE.toUpperCase()}</p>
            <p className="text-2xl font-bold tracking-[0.06em] text-foreground/85 md:text-3xl">{SITE_NAME_JA}</p>
            <h1
              id="core-heading"
              className="text-4xl font-bold leading-[1.14] tracking-[-0.03em] text-balance text-foreground md:text-5xl lg:text-6xl"
            >
              創作の入口は、
              <br />
              ここから。
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
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
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:px-6 lg:grid-cols-[minmax(300px,0.42fr)_minmax(0,1fr)] lg:gap-12 lg:py-24">
          <div className="flex flex-col gap-4">
            <div className="lg:[&_h2]:whitespace-nowrap">
              <SectionHeading id="news-heading" code="ACTIVITY SIGNAL" title="いま、動いていること" />
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">創作システムから届く、小さな活動信号。</p>
          </div>
          <div className="flex min-w-0 flex-col">
            <NewsList items={latestNews} variant="home" />
            <div className="flex justify-end pt-6">
              <Link href="/news" className="system-link">ALL SIGNALS <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="archive-heading" className="home-panel border-b border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 md:px-6 lg:py-24">
          <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
            <SectionHeading id="archive-heading" code="WORKS MEMORY" title="制作の記録" />
            <Link href="/archive" className="system-link self-end md:self-auto">OPEN ARCHIVE <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-px sm:overflow-hidden sm:rounded-lg sm:border sm:border-border sm:bg-border lg:grid-cols-4">
            {featuredWorks.map((work) => <ArchiveCard key={work.id} work={work} variant="home" />)}
          </div>
        </div>
      </section>

      <section aria-labelledby="identity-heading" className="home-panel border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:px-6 lg:grid-cols-2 lg:py-24">
          <SectionHeading id="identity-heading" code="CORE IDENTITY" title="ユナイテッドスタジオ株式会社" />
          <div className="flex max-w-xl flex-col items-start gap-6">
            <p className="text-lg leading-relaxed text-foreground">ひとつの専門領域に閉じず、複数の創作の入口をひとつのシステムとして束ねる会社です。</p>
            <p className="text-sm leading-relaxed text-muted-foreground">レコーディング・楽曲制作、歌ってみた制作サポート、よさこい楽曲制作、アーティスト / クリエイター支援。</p>
            <Link href="/company" className="system-link self-end md:self-auto">VIEW COMPANY <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="contact-heading" className="next-action">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-4 py-16 md:flex-row md:items-end md:px-6 lg:py-24">
          <div className="flex max-w-2xl flex-col gap-5">
            <p className="font-mono text-[10px] tracking-[0.26em] text-accent">NEXT ACTION / CONTACT</p>
            <h2 id="contact-heading" className="text-4xl font-bold tracking-[-0.04em] text-balance md:text-6xl">次の創作を、ここから。</h2>
          </div>
          <Link href="/contact" className="action-button shrink-0 self-end whitespace-nowrap md:self-auto">相談をはじめる <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </div>
  )
}

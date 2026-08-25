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
        <div className="home-container">
          <OrbitalCore>
            <div className="hero-copy flex flex-col items-start gap-5">
              <p className="font-mono text-[10px] tracking-[0.28em] text-accent">{SITE_TAGLINE.toUpperCase()}</p>
              <p className="hero-company font-bold tracking-[0.06em] text-foreground/85">{SITE_NAME_JA}</p>
              <h1 id="core-heading" className="hero-title font-bold leading-[1.08] tracking-[-0.045em] text-foreground">
                <span className="block whitespace-nowrap">創作の入口は、</span>
                <span className="block whitespace-nowrap">ここから。</span>
              </h1>
              <p className="hero-description text-sm leading-relaxed text-muted-foreground md:text-base">
                歌、音、祭り、作品、予約、相談。United Studioは、異なる創作活動をひとつのシステムとしてつなぐ会社です。光の軌道から、あなたの入口を選んでください。
              </p>
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.18em] text-muted-foreground">
                <span className="status-dot" aria-hidden="true" /> TAP A LIGHT OR SELECT BELOW
              </div>
            </div>
          </OrbitalCore>
        </div>
      </section>

      <section aria-labelledby="news-heading" className="home-panel border-b border-border">
        <div className="home-container home-section news-layout">
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

      <section aria-labelledby="archive-heading" className="home-panel home-panel-hero-background border-b border-border">
        <div className="home-container home-section archive-layout">
          <div className="archive-heading-row flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
            <SectionHeading id="archive-heading" code="WORKS MEMORY" title="制作の記録" />
            <Link href="/archive" className="system-link self-end md:self-auto">OPEN ARCHIVE <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="home-archive-grid">
            {featuredWorks.map((work) => <ArchiveCard key={work.id} work={work} variant="home" />)}
          </div>
        </div>
      </section>

      <section aria-labelledby="identity-heading" className="home-panel border-b border-border">
        <div className="home-container home-section identity-layout">
          <SectionHeading id="identity-heading" code="CORE IDENTITY" title="ユナイテッドスタジオ株式会社" />
          <div className="identity-copy flex flex-col items-start gap-6">
            <p className="text-lg leading-relaxed text-foreground">ひとつの専門領域に閉じず、複数の創作の入口をひとつのシステムとして束ねる会社です。</p>
            <p className="text-sm leading-relaxed text-muted-foreground">レコーディング・楽曲制作、歌ってみた制作サポート、よさこい楽曲制作、アーティスト / クリエイター支援。</p>
            <Link href="/company" className="system-link self-end md:self-auto">VIEW COMPANY <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="contact-heading" className="next-action">
        <div className="home-container contact-layout">
          <div className="contact-copy">
            <p className="next-action-label font-mono text-[10px] tracking-[0.26em]">NEXT ACTION / CONTACT</p>
            <h2 id="contact-heading" className="contact-title font-bold tracking-[-0.045em]">
              次の創作を、<span className="contact-title-tail">ここから。</span>
            </h2>
            <Link href="/contact" className="action-button shrink-0 whitespace-nowrap">相談をはじめる <span aria-hidden="true">→</span></Link>
          </div>

          <div className="next-action-wide-visual" aria-hidden="true">
            <svg viewBox="0 0 1440 855" preserveAspectRatio="none" role="presentation" focusable="false">
              <defs>
                <linearGradient id="next-action-wide-orbit" x1="86" y1="470" x2="1300" y2="72" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="var(--next-gold-light)" stopOpacity="0.14" />
                  <stop offset="0.56" stopColor="var(--next-gold)" stopOpacity="0.72" />
                  <stop offset="1" stopColor="var(--next-gold-light)" stopOpacity="0.34" />
                </linearGradient>
                <linearGradient id="next-action-wide-distance" x1="1220" y1="410" x2="1435" y2="855" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="var(--next-gold-light)" stopOpacity="0.42" />
                  <stop offset="0.58" stopColor="var(--next-gold)" stopOpacity="0.15" />
                  <stop offset="1" stopColor="var(--next-gold)" stopOpacity="0" />
                </linearGradient>
                <radialGradient id="next-action-wide-light">
                  <stop offset="0" stopColor="var(--surface)" stopOpacity="1" />
                  <stop offset="0.14" stopColor="var(--next-gold-light)" stopOpacity="0.98" />
                  <stop offset="0.44" stopColor="var(--next-gold)" stopOpacity="0.38" />
                  <stop offset="1" stopColor="var(--next-gold)" stopOpacity="0" />
                </radialGradient>
                <filter id="next-action-wide-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="7" />
                </filter>
              </defs>

              <ellipse className="next-action-wide-orbit next-action-wide-orbit-main" cx="1270" cy="72" rx="1050" ry="590" />
              <ellipse className="next-action-wide-orbit next-action-wide-orbit-inner" cx="1280" cy="74" rx="920" ry="515" />
              <ellipse className="next-action-wide-orbit next-action-wide-orbit-near" cx="1290" cy="78" rx="805" ry="450" />
              <ellipse className="next-action-wide-orbit next-action-wide-orbit-far" cx="1240" cy="54" rx="1190" ry="670" />

              <path className="next-action-wide-trace" d="M1088 356C1132 375 1175 399 1220 430C1264 461 1310 479 1370 486" />
              <circle className="next-action-wide-origin" cx="1088" cy="356" r="3.8" />
              <g className="next-action-departure-point">
                <circle className="next-action-wide-light" cx="1220" cy="430" r="68" />
                <circle className="next-action-wide-core" cx="1220" cy="430" r="5.6" />
              </g>
              <circle className="next-action-wide-future" cx="1370" cy="486" r="2.4" />
              <path className="next-action-wide-distance" d="M1220 430C1328 523 1302 624 1364 710C1403 765 1426 813 1438 855" />

              <ellipse className="next-action-wide-horizon next-action-wide-horizon-main" cx="-80" cy="1110" rx="1110" ry="610" />
              <ellipse className="next-action-wide-horizon next-action-wide-horizon-near" cx="210" cy="1190" rx="1320" ry="700" />
              <ellipse className="next-action-wide-horizon next-action-wide-horizon-far" cx="-310" cy="1280" rx="1510" ry="790" />
            </svg>
          </div>

          <div className="next-action-mobile-visual" aria-hidden="true">
            <svg viewBox="0 0 390 705" preserveAspectRatio="xMidYMid slice" role="presentation" focusable="false">
              <defs>
                <linearGradient id="next-action-mobile-orbit" x1="72" y1="312" x2="386" y2="20" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="var(--next-gold-light)" stopOpacity="0.18" />
                  <stop offset="0.58" stopColor="var(--next-gold)" stopOpacity="0.74" />
                  <stop offset="1" stopColor="var(--next-gold-light)" stopOpacity="0.36" />
                </linearGradient>
                <linearGradient id="next-action-mobile-distance" x1="350" y1="350" x2="389" y2="705" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="var(--next-gold-light)" stopOpacity="0.42" />
                  <stop offset="0.58" stopColor="var(--next-gold)" stopOpacity="0.17" />
                  <stop offset="1" stopColor="var(--next-gold)" stopOpacity="0" />
                </linearGradient>
                <radialGradient id="next-action-mobile-light">
                  <stop offset="0" stopColor="var(--surface)" stopOpacity="1" />
                  <stop offset="0.14" stopColor="var(--next-gold-light)" stopOpacity="0.98" />
                  <stop offset="0.44" stopColor="var(--next-gold)" stopOpacity="0.38" />
                  <stop offset="1" stopColor="var(--next-gold)" stopOpacity="0" />
                </radialGradient>
                <filter id="next-action-mobile-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="5" />
                </filter>
              </defs>

              <ellipse className="next-action-mobile-orbit next-action-mobile-orbit-main" cx="355" cy="92" rx="270" ry="245" />
              <ellipse className="next-action-mobile-orbit next-action-mobile-orbit-inner" cx="360" cy="92" rx="235" ry="210" />
              <ellipse className="next-action-mobile-orbit next-action-mobile-orbit-far" cx="350" cy="80" rx="305" ry="270" />
              <path className="next-action-mobile-trace" d="M304 286C321 309 334 329 350 350C365 370 376 379 389 387" />

              <circle className="next-action-mobile-origin" cx="304" cy="286" r="3" />
              <g className="next-action-departure-point">
                <circle className="next-action-mobile-light" cx="350" cy="350" r="40" />
                <circle className="next-action-mobile-core" cx="350" cy="350" r="4.6" />
              </g>
              <circle className="next-action-mobile-future" cx="386" cy="384" r="1.8" />
              <path className="next-action-mobile-distance" d="M350 350C382 420 356 492 373 558C382 600 387 649 389 705" />

              <ellipse className="next-action-mobile-horizon next-action-mobile-horizon-main" cx="-35" cy="760" rx="430" ry="330" />
              <ellipse className="next-action-mobile-horizon next-action-mobile-horizon-near" cx="20" cy="800" rx="500" ry="390" />
              <ellipse className="next-action-mobile-horizon next-action-mobile-horizon-far" cx="-60" cy="850" rx="560" ry="460" />
            </svg>
          </div>
        </div>
      </section>
    </div>
  )
}

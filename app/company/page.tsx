import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { ExternalLink } from "@/components/external-link"
import { companyProfile, relatedServices, type CompanyField } from "@/lib/company"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Company",
  description:
    "ユナイテッドスタジオ株式会社の会社概要。事業内容、主要サイト、関連サービスをご案内します。",
  alternates: { canonical: "/company" },
  openGraph: {
    title: "Company | United Studio Inc.",
    description: "ユナイテッドスタジオ株式会社の会社概要。",
    url: "/company",
  },
}

function isCompanyHistory(
  value: CompanyField["value"],
): value is Extract<CompanyField["value"], Array<{ date: string; description: string }>> {
  return Array.isArray(value) && value.length > 0 && typeof value[0] === "object"
}

export default function CompanyPage() {
  return (
    <div>
      <PageHeader
        code="COMPANY"
        title="会社概要"
        description="ユナイテッドスタジオ株式会社について。"
      />

      <div className="mx-auto flex max-w-4xl flex-col gap-14 px-4 py-12 md:px-6 md:py-16">
        <section
          aria-labelledby="identity-heading"
          className="grid gap-6 md:grid-cols-[0.95fr_1.05fr] md:gap-10"
        >
          <div className="flex flex-col gap-2">
            <p className="font-mono text-xs tracking-[0.25em] text-accent">CORE IDENTITY</p>
            <h2
              id="identity-heading"
              className="text-2xl font-bold tracking-[-0.02em] text-foreground md:text-[28px] lg:whitespace-nowrap"
            >
              <span className="whitespace-nowrap">ユナイテッド</span>
              <span className="whitespace-nowrap">スタジオ株式会社</span>
            </h2>
          </div>
          <div className="flex max-w-2xl flex-col gap-5 text-sm leading-relaxed text-muted-foreground md:text-base">
            <p>
              ユナイテッドスタジオは、音楽と表現に関わる複数の創作領域を、ひとつのシステムとして束ねる会社です。
            </p>
            <p>
              レコーディング・楽曲制作、歌ってみた制作サポート、よさこい楽曲制作、アーティスト / クリエイター支援を通じて、作品が生まれ、残り、届いていくまでを支えています。
            </p>
          </div>
        </section>

        {/* Profile */}
        <section aria-labelledby="profile-heading" className="flex flex-col gap-6">
          <h2
            id="profile-heading"
            className="font-mono text-xs tracking-[0.25em] text-accent"
          >
            PROFILE
          </h2>
          <dl className="flex flex-col divide-y divide-border rounded-xl border border-border bg-surface">
            {companyProfile.map((field) => (
              <div key={field.label} className="flex flex-col px-5 py-4">
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-8">
                  <dt className="w-28 shrink-0 text-sm font-medium text-muted-foreground">
                    {field.label}
                  </dt>
                  <dd className="text-sm leading-relaxed text-foreground">
                    {isCompanyHistory(field.value) ? (
                      <ol className="flex flex-col gap-3">
                        {field.value.map((item) => (
                          <li key={item.date} className="flex flex-col gap-0.5">
                            <span className="font-mono text-xs tracking-[0.08em] text-muted-foreground">
                              {item.date}
                            </span>
                            <span>{item.description}</span>
                          </li>
                        ))}
                      </ol>
                    ) : Array.isArray(field.value)
                      ? field.value.map((line) => (
                          <span key={line} className="block">{line}</span>
                        ))
                      : field.value}
                  </dd>
                </div>
                {field.label === "所在地" && (
                  <div className="mt-4 overflow-hidden rounded-lg border border-border bg-muted sm:ml-36">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d103574.31488427622!2d139.6287528!3d35.7828103!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018f3a2b77fc8d1%3A0xb4b171924c684959!2z44Om44OK44Kk44OG44OD44OJ44K544K_44K444Kq44ix!5e0!3m2!1sja!2sjp!4v1783082476218!5m2!1sja!2sjp"
                      title="ユナイテッドスタジオの地図"
                      className="h-64 w-full grayscale md:h-72"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            ))}
          </dl>
        </section>

        {/* Main site */}
        <section aria-labelledby="site-heading" className="flex flex-col gap-6">
          <h2
            id="site-heading"
            className="font-mono text-xs tracking-[0.25em] text-accent"
          >
            MAIN SITE
          </h2>
          <ExternalLink
            href={SITE_URL}
            className="group flex min-h-11 flex-col gap-1 rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/60 [&>svg]:mt-1 [&>svg]:text-muted-foreground"
            showIcon={false}
          >
            <span className="flex items-center gap-2 font-mono text-sm font-bold tracking-[0.1em] text-foreground group-hover:text-accent">
              United Studio Core / Hub
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-3 text-muted-foreground"
              >
                <path d="M6.5 3.5H3.5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V9.5" />
                <path d="M9.5 2.5h4v4" />
                <path d="M13.5 2.5 7 9" />
              </svg>
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              {SITE_URL.replace("https://", "")}
            </span>
          </ExternalLink>
        </section>

        {/* Related services */}
        <section
          aria-labelledby="services-heading"
          className="flex flex-col gap-6"
        >
          <h2
            id="services-heading"
            className="font-mono text-xs tracking-[0.25em] text-accent"
          >
            RELATED SERVICES
          </h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {relatedServices.map((service) => (
              <li key={service.name}>
                <ExternalLink
                  href={service.url}
                  className="group flex min-h-11 flex-col gap-1 rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/60 [&>svg]:mt-1 [&>svg]:text-muted-foreground"
                  showIcon={false}
                >
                  <span className="flex items-center gap-2 font-mono text-sm font-bold tracking-[0.1em] text-foreground group-hover:text-accent">
                    {service.name}
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-3 text-muted-foreground"
                    >
                      <path d="M6.5 3.5H3.5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V9.5" />
                      <path d="M9.5 2.5h4v4" />
                      <path d="M13.5 2.5 7 9" />
                    </svg>
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {service.description}
                  </span>
                </ExternalLink>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

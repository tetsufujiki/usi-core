import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { ExternalLink } from "@/components/external-link"
import { companyProfile, relatedServices } from "@/lib/company"
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

export default function CompanyPage() {
  return (
    <div>
      <PageHeader
        code="COMPANY"
        title="会社概要"
        description="ユナイテッドスタジオ株式会社について。"
      />

      <div className="mx-auto flex max-w-4xl flex-col gap-14 px-4 py-12 md:px-6 md:py-16">
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
              <div
                key={field.label}
                className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:gap-8"
              >
                <dt className="w-28 shrink-0 text-sm font-medium text-muted-foreground">
                  {field.label}
                </dt>
                <dd
                  className={`text-sm leading-relaxed ${
                    field.todo ? "italic text-muted-foreground" : "text-foreground"
                  }`}
                >
                  {field.todo ? "（準備中）" : field.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="text-xs text-muted-foreground">
            一部の項目は確認中のため準備中と表示しています。
          </p>
        </section>

        {/* Main site */}
        <section aria-labelledby="site-heading" className="flex flex-col gap-6">
          <h2
            id="site-heading"
            className="font-mono text-xs tracking-[0.25em] text-accent"
          >
            MAIN SITE
          </h2>
          <div className="rounded-xl border border-border bg-surface px-5 py-4">
            <p className="text-sm text-foreground">
              United Studio Core / Hub
              <span className="ml-3 font-mono text-xs text-muted-foreground">
                {SITE_URL.replace("https://", "")}
              </span>
            </p>
          </div>
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

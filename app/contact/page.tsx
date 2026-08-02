import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { ContactForm } from "@/components/contact-form"
import { ExternalLink } from "@/components/external-link"
import { externalLinks } from "@/lib/site"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "ユナイテッドスタジオ株式会社へのお問い合わせ。歌ってみた、よさこい制作、会社・業務のご相談窓口をご案内します。",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | United Studio Inc.",
    description: "ユナイテッドスタジオ株式会社へのお問い合わせ。",
    url: "/contact",
  },
}

const purposeCards = [
  {
    title: "歌ってみた",
    description: "ミックス・制作サポートのご相談は、Utattemitaサイトへ。",
    href: externalLinks.utattemita,
    external: true,
    cta: "Utattemitaサイトへ",
  },
  {
    title: "よさこい制作",
    description: "楽曲・演舞制作のご相談は、Yosakoiサイトへ。",
    href: externalLinks.yosakoi,
    external: true,
    cta: "Yosakoiサイトへ",
  },
  {
    title: "会社・業務",
    description: "取材、協業、その他業務に関するご相談は、下記フォームから。",
    href: "#business-form",
    external: false,
    cta: "フォームへ",
  },
]

export default function ContactPage() {
  return (
    <div>
      <PageHeader
        code="CONTACT"
        title="相談する"
        description="用途に合わせた窓口をご案内します。"
      />

      <div className="mx-auto flex max-w-4xl flex-col gap-14 px-4 py-12 md:px-6 md:py-16">
        {/* Purpose selection */}
        <section aria-labelledby="purpose-heading" className="flex flex-col gap-6">
          <h2
            id="purpose-heading"
            className="font-mono text-xs tracking-[0.25em] text-accent"
          >
            SELECT PURPOSE
          </h2>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {purposeCards.map((card) => (
              <li key={card.title} className="h-full">
                <div className="flex h-full flex-col gap-3 rounded-xl border border-border bg-surface p-5">
                  <h3 className="text-base font-bold text-foreground">
                    {card.title}
                  </h3>
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                    {card.description}
                  </p>
                  {card.external ? (
                    <ExternalLink
                      href={card.href}
                      className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border px-4 text-sm text-foreground transition-colors hover:border-accent/60"
                    >
                      {card.cta}
                    </ExternalLink>
                  ) : (
                    <a
                      href={card.href}
                      className="flex min-h-11 items-center justify-center rounded-lg bg-accent px-4 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
                    >
                      {card.cta}
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Business form */}
        <section
          id="business-form"
          aria-labelledby="form-heading"
          className="flex scroll-mt-24 flex-col gap-6"
        >
          <div className="flex flex-col gap-2">
            <h2
              id="form-heading"
              className="font-mono text-xs tracking-[0.25em] text-accent"
            >
              BUSINESS FORM
            </h2>
            <p className="text-xl font-bold text-foreground">
              会社・業務に関するご相談
            </p>
          </div>
          <ContactForm />
        </section>
      </div>
    </div>
  )
}

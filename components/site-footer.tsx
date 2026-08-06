import Link from "next/link"
import { ExternalLink } from "@/components/external-link"
import { externalLinks, SITE_TAGLINE } from "@/lib/site"

const serviceLinks = [
  { label: "Utattemita", href: externalLinks.utattemita },
  { label: "Studio", href: externalLinks.studio },
  { label: "Rec", href: externalLinks.rec },
  { label: "Reserve", href: externalLinks.reserve },
  { label: "Yosakoi", href: externalLinks.yosakoi },
]

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 md:px-6">
        <div className="flex flex-col gap-2">
          <p className="font-mono text-sm font-bold tracking-[0.2em]">
            UNITED STUDIO INC
          </p>
          <p className="text-sm text-muted-foreground">{SITE_TAGLINE}</p>
        </div>

        <nav aria-label="関連サービス">
          <ul className="flex flex-wrap gap-x-1 gap-y-2">
            {serviceLinks.map((s) => (
              <li key={s.label}>
                <ExternalLink
                  href={s.href}
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-md px-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {s.label}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-border pt-6 md:flex-row md:items-center">
          <ul className="flex gap-1">
            <li>
              <Link
                href="/privacy"
                className="inline-flex min-h-11 items-center rounded-md px-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                Privacy
              </Link>
            </li>
          </ul>
          <a
            href="https://united-studio.com"
            className="inline-flex min-h-11 items-center text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            © {year} United Studio Inc.
          </a>
        </div>
      </div>
    </footer>
  )
}

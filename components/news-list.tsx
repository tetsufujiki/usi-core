import Link from "next/link"
import type { NewsItem } from "@/lib/news"
import { ExternalLinkIcon } from "@/components/external-link"

const categoryLabels: Record<NewsItem["category"], string> = {
  company: "COMPANY",
  studio: "STUDIO",
  utattemita: "UTATTEMITA",
  yosakoi: "YOSAKOI",
  reserve: "RESERVE",
  works: "WORKS",
  // legacy values kept for back-compat
  info: "INFO",
  release: "RELEASE",
  event: "EVENT",
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-")
  return `${y}.${m}.${d}`
}

export function NewsList({ items }: { items: NewsItem[] }) {
  return (
    <ul className="flex flex-col divide-y divide-border">
      {items.map((item) => (
        <li key={item.id}>
          <article className="flex min-h-11 flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-5">
            <div className="flex shrink-0 items-center gap-3">
              <time
                dateTime={item.date}
                className="font-mono text-xs text-muted-foreground"
              >
                {formatDate(item.date)}
              </time>
              <span className="rounded-sm border border-border px-1.5 py-0.5 font-mono text-[9px] tracking-[0.15em] text-accent">
                {categoryLabels[item.category] ?? item.category.toUpperCase()}
              </span>
            </div>
            <h3 className="text-sm font-medium leading-relaxed text-foreground text-pretty">
              {item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition-colors"
                >
                  {item.title}
                  <ExternalLinkIcon className="size-3 shrink-0 text-muted-foreground" />
                  <span className="sr-only">（外部サイトが新しいタブで開きます）</span>
                </a>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition-colors"
                >
                  {item.title}
                </Link>
              )}
            </h3>
          </article>
        </li>
      ))}
    </ul>
  )
}

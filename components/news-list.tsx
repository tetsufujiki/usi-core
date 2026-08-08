import Link from "next/link"
import type { NewsItem } from "@/lib/news"
import { ExternalLinkIcon } from "@/components/external-link"
import { NewsThumbnail } from "@/components/news-thumbnail"

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

type NewsListProps = {
  items: NewsItem[]
  variant?: "default" | "home" | "index"
}

const articleClasses = {
  default: "min-h-20 gap-3 py-4 sm:gap-5",
  home: "min-h-20 gap-3 py-4 sm:gap-5 lg:min-h-28 lg:gap-6 lg:py-5",
  index: "min-h-20 gap-3 py-4 sm:gap-5 lg:min-h-28 lg:gap-6 lg:py-6",
} as const

const metaClasses = {
  default: "",
  home: "lg:text-sm",
  index: "lg:text-sm",
} as const

const categoryClasses = {
  default: "",
  home: "lg:text-[10px]",
  index: "lg:text-[10px]",
} as const

const titleClasses = {
  default: "",
  home: "lg:text-base lg:leading-7",
  index: "lg:text-lg lg:leading-8",
} as const

export function NewsList({ items, variant = "default" }: NewsListProps) {
  return (
    <ul className="flex flex-col divide-y divide-border">
      {items.map((item) => (
        <li key={item.id}>
          <article className={`flex items-start ${articleClasses[variant]}`}>
            {item.external ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 rounded-md transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <NewsThumbnail
                  src={item.featuredImage?.src}
                  alt={item.featuredImage?.alt}
                  title={item.title}
                  variant={variant}
                />
              </a>
            ) : (
              <Link
                href={item.href}
                className="shrink-0 rounded-md transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <NewsThumbnail
                  src={item.featuredImage?.src}
                  alt={item.featuredImage?.alt}
                  title={item.title}
                  variant={variant}
                />
              </Link>
            )}
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="flex flex-wrap items-center gap-3">
                <time
                  dateTime={item.date}
                  className={`font-mono text-xs text-muted-foreground ${metaClasses[variant]}`}
                >
                  {formatDate(item.date)}
                </time>
                <span className={`rounded-sm border border-border px-1.5 py-0.5 font-mono text-[9px] tracking-[0.15em] text-accent ${categoryClasses[variant]}`}>
                  {categoryLabels[item.category] ?? item.category.toUpperCase()}
                </span>
              </div>
              <h3 className={`text-sm font-medium leading-relaxed text-foreground text-pretty ${titleClasses[variant]}`}>
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
            </div>
          </article>
        </li>
      ))}
    </ul>
  )
}

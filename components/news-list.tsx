import type { NewsItem } from "@/lib/news"

const categoryLabels: Record<NewsItem["category"], string> = {
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
                {categoryLabels[item.category]}
              </span>
            </div>
            <h3 className="text-sm font-medium leading-relaxed text-foreground text-pretty">
              {item.title}
            </h3>
          </article>
        </li>
      ))}
    </ul>
  )
}

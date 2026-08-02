import Link from "next/link"
import { ExternalLinkIcon } from "@/components/external-link"
import { entryCards, externalLinks } from "@/lib/site"

export function EntryCards() {
  return (
    <div className="flex flex-col gap-4">
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {entryCards.map((card) => {
          const inner = (
            <>
              <span className="font-mono text-[10px] tracking-[0.25em] text-accent">
                {card.code}
              </span>
              <span className="text-lg font-bold text-foreground">
                {card.title}
                {card.external && (
                  <>
                    <ExternalLinkIcon className="ml-1.5 inline size-3.5 align-baseline text-muted-foreground" />
                    <span className="sr-only">（外部サイトが新しいタブで開きます）</span>
                  </>
                )}
              </span>
              <span className="text-sm leading-relaxed text-muted-foreground">
                {card.description}
              </span>
            </>
          )

          const className =
            "group flex min-h-11 flex-col gap-1.5 rounded-xl border border-border bg-surface p-5 shadow-[0_2px_12px_rgba(0,0,0,0.25)] transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[0_8px_28px_rgba(103,226,245,0.12)] focus-visible:border-accent"

          return (
            <li key={card.code}>
              {card.external ? (
                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {inner}
                </a>
              ) : (
                <Link href={card.href} className={className}>
                  {inner}
                </Link>
              )}
            </li>
          )
        })}

        {/* Rec: auxiliary link between Studio and Reserve */}
        <li className="sm:col-span-2 lg:col-span-3">
          <a
            href={externalLinks.rec}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-transparent px-5 py-3 text-sm text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
          >
            <span className="font-mono text-[10px] tracking-[0.25em]">REC</span>
            料金・内容を見る
            <ExternalLinkIcon />
            <span className="sr-only">（外部サイトが新しいタブで開きます）</span>
          </a>
        </li>
      </ul>
    </div>
  )
}

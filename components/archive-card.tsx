import type { ArchiveItem } from "@/lib/archive"
import { archiveCategoryLabels } from "@/lib/archive"

type ArchiveCardProps = {
  work: ArchiveItem
  variant?: "featured" | "index" | "home"
}

export function ArchiveCard({ work, variant = "index" }: ArchiveCardProps) {
  const categoryLabel = archiveCategoryLabels[work.category]
  const subject = work.artist ?? work.client ?? work.label ?? "United Studio"
  const isFeatured = variant === "featured"

  return (
    <article
      className={`archive-card archive-card-${variant} flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm`}
      aria-labelledby={`archive-${variant}-${work.id}`}
    >
      {variant !== "index" && (
        <div className="archive-artwork" aria-hidden={!work.artwork}>
          {work.artwork ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={work.artwork} alt={`${subject}「${work.title}」のアートワーク`} />
          ) : (
            <div className="archive-artwork-placeholder" aria-hidden="true">
              <span className="archive-artwork-orbit" />
              <span className="archive-artwork-wave">UNITED STUDIO · WORKS MEMORY</span>
            </div>
          )}
        </div>
      )}

      <div className={`flex grow flex-col ${isFeatured ? "gap-5 p-6 md:p-7" : "gap-3 p-5"}`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          {work.year && <span className="font-mono text-[11px] tracking-[0.16em] text-accent">{work.year}</span>}
          <span className="archive-category-chip">{categoryLabel}</span>
        </div>

        <div className="flex flex-col gap-1.5">
          <p className={`font-mono tracking-[0.14em] text-muted-foreground ${isFeatured ? "text-xs" : "text-[10px]"}`}>
            {subject}
          </p>
          <h3
            id={`archive-${variant}-${work.id}`}
            className={`font-bold leading-snug text-foreground text-pretty ${isFeatured ? "text-2xl md:text-3xl" : "text-lg"}`}
          >
            {work.title}
          </h3>
          {(work.format || work.collectionTitle) && (
            <p className="text-xs leading-relaxed text-muted-foreground">
              {[work.format, work.collectionTitle].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>

        {work.summary && variant !== "home" && (
          <p className="text-sm leading-relaxed text-muted-foreground">{work.summary}</p>
        )}

        {work.links && work.links.length > 0 && variant !== "home" && (
          <ul aria-label={`${subject}「${work.title}」の配信・関連リンク`} className="flex flex-wrap gap-2">
            {work.links.map((link) => (
              <li key={`${link.platform}-${link.label}`}>
                {link.href === "#" ? (
                  <span className="archive-platform-link is-sample" aria-disabled="true" title="リンク準備中">
                    {link.label}<span className="font-sans text-[9px] tracking-normal">準備中</span>
                  </span>
                ) : (
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="archive-platform-link">
                    {link.label}<span aria-hidden="true">↗</span>
                    <span className="sr-only">（外部サイトが新しいタブで開きます）</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}

        {work.roles.length > 0 && (
          <div className="flex flex-col gap-2">
            {isFeatured && <p className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground">ROLE</p>}
            <ul aria-label="United Studioの担当範囲" className="flex flex-wrap gap-1.5">
              {work.roles.map((role) => <li key={role} className="archive-role-pill">{role}</li>)}
            </ul>
          </div>
        )}

        {(work.genre || work.label) && variant !== "home" && (
          <dl className="mt-auto grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 border-t border-border pt-3 font-mono text-[9px] leading-relaxed text-muted-foreground">
            {work.genre && <><dt>GENRE</dt><dd>{work.genre}</dd></>}
            {work.label && <><dt>PUBLISHER</dt><dd>{work.label}</dd></>}
          </dl>
        )}

        {work.externalUrl && !work.links?.length && variant !== "home" && (
          <a href={work.externalUrl} target="_blank" rel="noopener noreferrer" className="archive-ext-link">
            詳細を見る <span aria-hidden="true">↗</span>
            <span className="sr-only">（外部サイトが新しいタブで開きます）</span>
          </a>
        )}
      </div>
    </article>
  )
}

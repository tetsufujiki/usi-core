import type { ArchiveItem } from "@/lib/archive"
import { archiveCategoryLabels } from "@/lib/archive"

function ExternalLinkIcon() {
  return (
    <svg
      aria-hidden="true"
      width="11"
      height="11"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M2 10 10 2M10 2H5M10 2v5" />
    </svg>
  )
}

export function ArchiveCard({ work }: { work: ArchiveItem }) {
  const categoryLabel = archiveCategoryLabels[work.category]

  const card = (
    <article
      className="archive-card flex h-full flex-col gap-4 rounded-xl border border-border bg-surface p-5 shadow-sm transition-shadow"
      aria-label={work.title}
    >
      {/* Header row */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        {work.year && (
          <span className="font-mono text-xs font-semibold text-accent">
            {work.year}
          </span>
        )}
        <span className="archive-category-chip">
          {categoryLabel}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-base font-bold leading-snug text-foreground text-pretty">
        {work.title}
      </h3>

      {/* Summary */}
      <p className="grow text-sm leading-relaxed text-muted-foreground">
        {work.summary}
      </p>

      {/* Roles */}
      {work.roles.length > 0 && (
        <ul
          aria-label="担当ロール"
          className="flex flex-wrap gap-1.5"
        >
          {work.roles.map((role) => (
            <li key={role} className="archive-role-pill">
              {role}
            </li>
          ))}
        </ul>
      )}

      {/* Contextual meta */}
      {(work.artist ?? work.client ?? work.label) && (
        <p className="font-mono text-[10.5px] text-muted-foreground">
          {work.artist && <span>Artist: {work.artist}</span>}
          {work.client && <span>Client: {work.client}</span>}
          {work.label && <span>Label: {work.label}</span>}
        </p>
      )}

      {/* External link */}
      {work.externalUrl && (
        <a
          href={work.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="archive-ext-link"
        >
          詳細を見る
          <ExternalLinkIcon />
          <span className="sr-only">（外部サイトが開きます）</span>
        </a>
      )}
    </article>
  )

  return card
}

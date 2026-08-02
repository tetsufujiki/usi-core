import type { ArchiveWork } from "@/lib/archive"

export function ArchiveCard({ work }: { work: ArchiveWork }) {
  return (
    <article className="flex h-full flex-col gap-2 rounded-xl border border-border bg-surface p-5">
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-accent">{work.year}</span>
        <span className="rounded-sm border border-border px-1.5 py-0.5 font-mono text-[9px] tracking-[0.1em] text-muted-foreground">
          {work.category}
        </span>
      </div>
      <h3 className="text-base font-bold text-foreground text-pretty">
        {work.title}
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {work.description}
      </p>
    </article>
  )
}

type PageHeaderProps = {
  code: string
  title: string
  description?: string
}

export function PageHeader({ code, title, description }: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-40%,rgba(103,226,245,0.1),transparent_60%)]"
      />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-3 px-4 py-14 md:px-6 md:py-20">
        <p className="font-mono text-[11px] tracking-[0.3em] text-accent">
          {code}
        </p>
        <h1 className="text-3xl font-bold text-foreground text-balance md:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}

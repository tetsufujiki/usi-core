import { entryCards } from '@/lib/site'

export function CreativeCoreFallback() {
  return (
    <div className="mobile-core" aria-label="創作の入口">
      <div className="mobile-core-center" aria-hidden="true">
        <span className="font-mono text-[9px] tracking-[0.22em]">UNITED STUDIO</span>
        <strong>Creative Core</strong>
      </div>
      <nav aria-label="創作システムの入口" className="mobile-core-links">
        {entryCards.map((entry, index) => (
          <a
            key={entry.code}
            href={entry.href}
            target={entry.external ? '_blank' : undefined}
            rel={entry.external ? 'noopener noreferrer' : undefined}
            className="mobile-core-link"
          >
            <span className="mobile-core-index font-mono">0{index + 1}</span>
            <span className="flex min-w-0 flex-col gap-1">
              <span className="font-mono text-[9px] tracking-[0.18em] text-accent">{entry.code}</span>
              <strong className="text-sm text-foreground">{entry.title}</strong>
            </span>
            <span className="ml-auto text-accent" aria-hidden="true">↗</span>
          </a>
        ))}
      </nav>
    </div>
  )
}

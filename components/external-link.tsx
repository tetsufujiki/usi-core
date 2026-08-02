import type { ReactNode } from "react"

type ExternalLinkProps = {
  href: string
  children: ReactNode
  className?: string
  showIcon?: boolean
  ariaLabel?: string
}

export function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "size-3.5"}
    >
      <path d="M6.5 3.5H3.5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V9.5" />
      <path d="M9.5 2.5h4v4" />
      <path d="M13.5 2.5 7 9" />
    </svg>
  )
}

export function ExternalLink({
  href,
  children,
  className,
  showIcon = true,
  ariaLabel,
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel}
    >
      {children}
      {showIcon && <ExternalLinkIcon />}
      <span className="sr-only">（外部サイトが新しいタブで開きます）</span>
    </a>
  )
}

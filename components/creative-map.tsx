import Link from "next/link"
import { ExternalLinkIcon } from "@/components/external-link"
import { externalLinks } from "@/lib/site"

type MapNode = {
  id: string
  label: string
  labelJa: string
  href: string
  external: boolean
  /** percent coordinates within the desktop map */
  x: number
  y: number
  kind: "service" | "info" | "aux"
}

const nodes: MapNode[] = [
  {
    id: "studio",
    label: "STUDIO",
    labelJa: "音を録る / 曲をつくる",
    href: externalLinks.studio,
    external: true,
    x: 18,
    y: 22,
    kind: "service",
  },
  {
    id: "utattemita",
    label: "UTATTEMITA",
    labelJa: "歌ってみる",
    href: externalLinks.utattemita,
    external: true,
    x: 82,
    y: 22,
    kind: "service",
  },
  {
    id: "yosakoi",
    label: "YOSAKOI",
    labelJa: "祭りをつくる",
    href: externalLinks.yosakoi,
    external: true,
    x: 86,
    y: 66,
    kind: "service",
  },
  {
    id: "archive",
    label: "ARCHIVE",
    labelJa: "作品を残す",
    href: "/archive",
    external: false,
    x: 14,
    y: 66,
    kind: "service",
  },
  {
    id: "reserve",
    label: "RESERVE",
    labelJa: "予約する",
    href: externalLinks.reserve,
    external: true,
    x: 50,
    y: 90,
    kind: "service",
  },
  {
    id: "rec",
    label: "REC",
    labelJa: "料金・内容",
    href: externalLinks.rec,
    external: true,
    x: 30,
    y: 80,
    kind: "aux",
  },
  {
    id: "company",
    label: "COMPANY",
    labelJa: "会社を知る",
    href: "/company",
    external: false,
    x: 33,
    y: 44,
    kind: "info",
  },
  {
    id: "contact",
    label: "CONTACT",
    labelJa: "相談する",
    href: "/contact",
    external: false,
    x: 67,
    y: 44,
    kind: "info",
  },
]

const CORE = { x: 50, y: 55 }

/** lines from core to nodes + aux connections */
const lines: Array<{ x1: number; y1: number; x2: number; y2: number; aux?: boolean }> = [
  ...nodes
    .filter((n) => n.kind !== "aux")
    .map((n) => ({ x1: CORE.x, y1: CORE.y, x2: n.x, y2: n.y })),
  // Rec connects Studio and Reserve
  { x1: 18, y1: 22, x2: 30, y2: 80, aux: true },
  { x1: 30, y1: 80, x2: 50, y2: 90, aux: true },
]

function NodeLink({ node }: { node: MapNode }) {
  const isService = node.kind === "service"
  const isAux = node.kind === "aux"

  return (
    <Link
      href={node.href}
      target={node.external ? "_blank" : undefined}
      rel={node.external ? "noopener noreferrer" : undefined}
      className={`group flex min-h-11 flex-col items-center justify-center rounded-lg border px-3 py-2 text-center shadow-[0_4px_16px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_6px_24px_rgba(103,226,245,0.18),inset_0_1px_0_rgba(255,255,255,0.08)] focus-visible:border-accent ${
        isService
          ? "border-border bg-surface-raised/90"
          : isAux
            ? "border-border/70 bg-surface/80"
            : "border-border bg-surface/90"
      }`}
    >
      <span
        className={`font-mono font-bold tracking-[0.15em] transition-colors group-hover:text-accent ${
          isService ? "text-xs text-foreground" : "text-[10px] text-muted-foreground"
        }`}
      >
        {node.label}
        {node.external && (
          <>
            <ExternalLinkIcon className="ml-1 inline size-2.5 align-baseline opacity-60" />
            <span className="sr-only">（外部サイト）</span>
          </>
        )}
      </span>
      <span className="text-[10px] leading-tight text-muted-foreground">
        {node.labelJa}
      </span>
    </Link>
  )
}

function CoreBadge() {
  return (
    <div className="map-core flex flex-col items-center justify-center rounded-full border border-accent/40 bg-[radial-gradient(circle_at_35%_30%,rgba(103,226,245,0.22),rgba(16,26,48,0.95)_65%)] shadow-[0_0_50px_rgba(103,226,245,0.22),inset_0_1px_0_rgba(255,255,255,0.1)]">
      <span className="font-mono text-[11px] font-bold tracking-[0.25em] text-foreground md:text-xs">
        UNITED STUDIO
      </span>
      <span className="font-mono text-[9px] tracking-[0.3em] text-accent md:text-[10px]">
        CREATIVE CORE
      </span>
    </div>
  )
}

export function CreativeMap() {
  return (
    <div>
      {/* ---------- Desktop: radial network ---------- */}
      <div className="relative mx-auto hidden aspect-[4/3] max-w-3xl md:block">
        {/* ambient glow */}
        <div
          aria-hidden="true"
          className="map-glow pointer-events-none absolute left-1/2 top-[55%] size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(103,226,245,0.14),transparent_70%)]"
        />
        <svg
          aria-hidden="true"
          className="absolute inset-0 size-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {lines.map((l, i) => (
            <line
              key={i}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              className={l.aux ? "" : "map-line"}
              stroke={l.aux ? "var(--border-soft)" : "var(--accent)"}
              strokeOpacity={l.aux ? 0.8 : 0.35}
              strokeWidth="0.3"
              vectorEffect="non-scaling-stroke"
              strokeDasharray={l.aux ? "2 3" : undefined}
            />
          ))}
        </svg>

        {/* core */}
        <div
          className="absolute size-40 -translate-x-1/2 -translate-y-1/2 lg:size-44"
          style={{ left: `${CORE.x}%`, top: `${CORE.y}%` }}
        >
          <div className="size-full [&>div]:size-full">
            <CoreBadge />
          </div>
        </div>

        {/* nodes */}
        {nodes.map((node) => (
          <div
            key={node.id}
            className="map-node absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <NodeLink node={node} />
          </div>
        ))}

        {/* News: outside the network as ACTIVITY */}
        <div className="absolute right-0 top-0">
          <Link
            href="/news"
            className="group flex min-h-11 items-center gap-2 rounded-full border border-border bg-surface/70 px-4 py-2 transition-colors hover:border-lime/60"
          >
            <span
              aria-hidden="true"
              className="map-glow size-1.5 rounded-full bg-lime"
            />
            <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground transition-colors group-hover:text-foreground">
              ACTIVITY / LATEST NEWS
            </span>
          </Link>
        </div>
      </div>

      {/* ---------- Mobile: vertical network ---------- */}
      <div className="relative mx-auto flex max-w-sm flex-col items-center gap-3 md:hidden">
        <div
          aria-hidden="true"
          className="absolute inset-y-4 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-accent/30 to-transparent"
        />

        <div className="relative z-10 flex size-36 items-center justify-center [&>div]:size-full">
          <CoreBadge />
        </div>

        <ul className="relative z-10 flex w-full flex-col items-center gap-3">
          {nodes
            .filter((n) => n.kind === "service")
            .map((node) => (
              <li key={node.id} className="w-full max-w-64">
                <NodeLink node={node} />
              </li>
            ))}
          <li className="w-full max-w-52">
            <NodeLink node={nodes.find((n) => n.id === "rec")!} />
          </li>
          <li className="flex w-full max-w-64 gap-3">
            <div className="flex-1">
              <NodeLink node={nodes.find((n) => n.id === "company")!} />
            </div>
            <div className="flex-1">
              <NodeLink node={nodes.find((n) => n.id === "contact")!} />
            </div>
          </li>
        </ul>

        <Link
          href="/news"
          className="relative z-10 mt-1 flex min-h-11 items-center gap-2 rounded-full border border-border bg-surface/70 px-4 py-2"
        >
          <span aria-hidden="true" className="size-1.5 rounded-full bg-lime" />
          <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
            ACTIVITY / LATEST NEWS
          </span>
        </Link>
      </div>
    </div>
  )
}

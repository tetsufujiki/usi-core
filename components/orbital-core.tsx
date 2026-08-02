"use client"

import Link from "next/link"
import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import { gateways, type Gateway } from "@/lib/site"

const AUX_LINKS = [
  { label: "Rec / 料金・内容を見る", href: "https://rec.united-studio.com", external: true },
  { label: "News / Activity", href: "/news", external: false },
]

function navigateTo(gateway: Gateway, router: ReturnType<typeof useRouter>) {
  if (gateway.external) {
    window.open(gateway.href, "_blank", "noopener,noreferrer")
  } else {
    router.push(gateway.href)
  }
}

export function OrbitalCore() {
  const router = useRouter()
  const [selectedId, setSelectedId] = useState<string>(gateways[0].id)
  const selected = gateways.find((g) => g.id === selectedId) ?? gateways[0]

  const handleDotTap = useCallback(
    (gateway: Gateway) => {
      if (gateway.id === selectedId) {
        navigateTo(gateway, router)
      } else {
        setSelectedId(gateway.id)
      }
    },
    [selectedId, router],
  )

  return (
    <div className="orbital-wrap">
      {/* Orbital stage */}
      <div className="orbital-stage" role="group" aria-label="クリエイティブ・コア 入口マップ">
        <div className="orbital-rings" aria-hidden="true">
          <span className="orbital-ring" style={{ inset: "2%" }} />
          <span className="orbital-ring" style={{ inset: "11%" }} />
          <span className="orbital-ring" style={{ inset: "20%" }} />
          <span className="orbital-ring orbital-ring-dashed" style={{ inset: "29%" }} />
        </div>

        {/* Center core */}
        <div className="orbital-center" style={{ "--sel-color": selected.color, "--sel-soft": selected.colorSoft } as React.CSSProperties}>
          <p className="orbital-center-code">CREATIVE CORE</p>
          <p className="orbital-center-title">{selected.title}</p>
          <p className="orbital-center-dest">{selected.destination}</p>
        </div>

        {/* Orbiting light points */}
        {gateways.map((g) => {
          const isSelected = g.id === selectedId
          return (
            <div
              key={g.id}
              className={`orbital-track${isSelected ? " is-selected" : ""}`}
              style={
                {
                  "--dur": `${g.duration}s`,
                  "--delay": `${-(g.angle / 360) * g.duration}s`,
                  "--static-angle": `${g.angle}deg`,
                  "--radius": `${g.orbit * 50}%`,
                  "--dot-color": g.color,
                  "--dot-soft": g.colorSoft,
                } as React.CSSProperties
              }
            >
              <div className="orbital-arm">
                <button
                  type="button"
                  className="orbital-dot"
                  aria-pressed={isSelected}
                  onClick={() => handleDotTap(g)}
                >
                  <span className="orbital-dot-core" aria-hidden="true" />
                  <span className="orbital-dot-label">
                    <span className="sr-only">{isSelected ? `${g.title}へ進む` : `${g.title}を選択`}</span>
                    <span aria-hidden="true">{g.index}</span>
                  </span>
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Gateway menu */}
      <div className="gateway-menu" role="group" aria-label="入口メニュー">
        <ul className="gateway-grid">
          {gateways.map((g) => {
            const isSelected = g.id === selectedId
            return (
              <li key={g.id}>
                <button
                  type="button"
                  className={`gateway-item${isSelected ? " is-selected" : ""}`}
                  style={{ "--gw-color": g.color, "--gw-soft": g.colorSoft } as React.CSSProperties}
                  aria-pressed={isSelected}
                  onClick={() => setSelectedId(g.id)}
                >
                  <span className="gateway-index" aria-hidden="true">{g.index}</span>
                  <span className="gateway-copy">
                    <strong>{g.title}</strong>
                    <small>{g.tagline}</small>
                  </span>
                  <span className="gateway-glow" aria-hidden="true" />
                </button>
              </li>
            )
          })}
        </ul>

        {/* Selected destination + CTA */}
        <div className="gateway-cta" style={{ "--gw-color": selected.color, "--gw-soft": selected.colorSoft } as React.CSSProperties}>
          <div className="gateway-cta-copy">
            <p className="gateway-cta-title">{selected.title}</p>
            <p className="gateway-cta-dest">{selected.destination}</p>
          </div>
          {selected.external ? (
            <a href={selected.href} target="_blank" rel="noopener noreferrer" className="gateway-cta-go">
              入口へ進む <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <Link href={selected.href} className="gateway-cta-go">
              入口へ進む <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>

        {/* Auxiliary links */}
        <ul className="gateway-aux">
          {AUX_LINKS.map((l) =>
            l.external ? (
              <li key={l.href}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="gateway-aux-link">
                  {l.label} <span aria-hidden="true">↗</span>
                </a>
              </li>
            ) : (
              <li key={l.href}>
                <Link href={l.href} className="gateway-aux-link">
                  {l.label} <span aria-hidden="true">→</span>
                </Link>
              </li>
            ),
          )}
        </ul>
      </div>
    </div>
  )
}

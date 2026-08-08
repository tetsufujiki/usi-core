"use client"

import Script from "next/script"
import { useCallback, useEffect, useRef, useState } from "react"

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string
      action: string
      theme: "light"
      size: "flexible"
      callback: (token: string) => void
      "expired-callback": () => void
      "error-callback": () => void
      "response-field": false
    },
  ) => string
  remove: (widgetId: string) => void
  reset: (widgetId: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

type TurnstileWidgetProps = {
  onTokenChange: (token: string) => void
  resetSignal: number
}

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

export function TurnstileWidget({
  onTokenChange,
  resetSignal,
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const [widgetError, setWidgetError] = useState(false)

  const renderWidget = useCallback(() => {
    if (!siteKey || !containerRef.current || !window.turnstile || widgetIdRef.current) {
      return
    }

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      action: "contact",
      theme: "light",
      size: "flexible",
      callback: (token) => {
        setWidgetError(false)
        onTokenChange(token)
      },
      "expired-callback": () => onTokenChange(""),
      "error-callback": () => {
        setWidgetError(true)
        onTokenChange("")
      },
      "response-field": false,
    })
  }, [onTokenChange])

  useEffect(() => {
    renderWidget()

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [renderWidget])

  useEffect(() => {
    if (resetSignal > 0 && widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current)
      onTokenChange("")
    }
  }, [onTokenChange, resetSignal])

  if (!siteKey) {
    return (
      <p role="alert" className="text-sm leading-relaxed text-muted-foreground">
        現在フォームを送信できません。時間をおいて再度お試しください。
      </p>
    )
  }

  return (
    <div className="min-h-16 max-w-full overflow-hidden">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={renderWidget}
        onError={() => setWidgetError(true)}
      />
      <div ref={containerRef} className="max-w-full" />
      {widgetError ? (
        <p role="alert" className="mt-2 text-sm leading-relaxed text-muted-foreground">
          認証を読み込めませんでした。ページを再読み込みしてお試しください。
        </p>
      ) : null}
    </div>
  )
}

"use client"

import { useCallback, useRef, useState, type FormEvent } from "react"
import { TurnstileWidget } from "@/components/turnstile-widget"

const inputClass =
  "w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus-visible:border-accent"

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [turnstileToken, setTurnstileToken] = useState("")
  const [turnstileResetSignal, setTurnstileResetSignal] = useState(0)
  const formStartedAt = useRef(Date.now())
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  const handleTurnstileToken = useCallback((token: string) => {
    setTurnstileToken(token)
  }, [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          organization: formData.get("organization"),
          message: formData.get("message"),
          website: formData.get("website"),
          formStartedAt: formStartedAt.current,
          turnstileToken,
        }),
      })
      const result = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(result?.error ?? "メール送信に失敗しました。")
      }

      form.reset()
      setSubmitted(true)
    } catch (submissionError) {
      setTurnstileResetSignal((signal) => signal + 1)
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "メール送信に失敗しました。時間をおいて再度お試しください。",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-3 rounded-xl border border-border bg-surface p-8 text-center"
      >
        <p className="text-base font-bold text-foreground">
          送信が完了しました
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
          お問い合わせありがとうございます。内容を確認のうえ、ご連絡いたします。
        </p>
        <button
          type="button"
          onClick={() => {
            formStartedAt.current = Date.now()
            setTurnstileToken("")
            setSubmitted(false)
          }}
          className="mt-2 flex min-h-11 items-center rounded-lg border border-border px-5 text-sm text-foreground transition-colors hover:border-accent/60"
        >
          フォームに戻る
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex flex-col gap-5">
      <div
        aria-hidden="true"
        className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
      >
        <label htmlFor="contact-website">Webサイト</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          autoComplete="off"
          tabIndex={-1}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-name" className="text-sm font-medium">
          お名前 <span className="text-accent">*</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          maxLength={100}
          autoComplete="name"
          className={inputClass}
          placeholder="山田 太郎"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-email" className="text-sm font-medium">
          メールアドレス <span className="text-accent">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          maxLength={254}
          autoComplete="email"
          className={inputClass}
          placeholder="you@example.com"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-org" className="text-sm font-medium">
          会社名・団体名
        </label>
        <input
          id="contact-org"
          name="organization"
          type="text"
          maxLength={200}
          autoComplete="organization"
          className={inputClass}
          placeholder="株式会社〇〇"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className="text-sm font-medium">
          ご相談内容 <span className="text-accent">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          maxLength={5000}
          rows={6}
          className={inputClass}
          placeholder="ご相談内容をご記入ください"
        />
      </div>

      {error && (
        <p role="alert" className="rounded-lg border border-border bg-rose-soft px-4 py-3 text-sm leading-relaxed text-foreground">
          {error}
        </p>
      )}

      <TurnstileWidget
        onTokenChange={handleTurnstileToken}
        resetSignal={turnstileResetSignal}
      />

      <button
        type="submit"
        disabled={isSubmitting || !turnstileSiteKey || !turnstileToken}
        className="flex min-h-11 items-center justify-center rounded-lg bg-accent px-8 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "送信中…" : "送信する"}
      </button>
    </form>
  )
}

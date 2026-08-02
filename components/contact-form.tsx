"use client"

import { useState, type FormEvent } from "react"

const inputClass =
  "w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus-visible:border-accent"

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // NOTE: 送信バックエンドは未決定のため、実際の送信は行いません。
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-3 rounded-xl border border-border bg-surface p-8 text-center"
      >
        <p className="text-base font-bold text-foreground">
          フォームは現在準備中です
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
          送信機能は準備中のため、内容はまだ送信されていません。
          お急ぎの場合は各サービスサイトの窓口をご利用ください。
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-2 flex min-h-11 items-center rounded-lg border border-border px-5 text-sm text-foreground transition-colors hover:border-accent/60"
        >
          フォームに戻る
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-name" className="text-sm font-medium">
          お名前 <span className="text-accent">*</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
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
          rows={6}
          className={inputClass}
          placeholder="ご相談内容をご記入ください"
        />
      </div>

      <p className="text-xs leading-relaxed text-muted-foreground">
        送信機能は現在準備中です。フォームの内容はまだ送信されません。
      </p>

      <button
        type="submit"
        className="flex min-h-11 items-center justify-center rounded-lg bg-accent px-8 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
      >
        送信する
      </button>
    </form>
  )
}

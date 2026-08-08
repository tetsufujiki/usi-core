export const runtime = "nodejs"

type ContactPayload = {
  name?: unknown
  email?: unknown
  organization?: unknown
  message?: unknown
  website?: unknown
  formStartedAt?: unknown
  turnstileToken?: unknown
}

type TurnstileResult = {
  success?: boolean
  action?: string
}

type RateLimitEntry = {
  timestamps: number[]
}

const MAX_REQUEST_LENGTH = 20_000
const MIN_SUBMISSION_TIME_MS = 3_000
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1_000
const RATE_LIMIT_MAX_REQUESTS = 3
const TURNSTILE_TIMEOUT_MS = 8_000
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const urlPattern = /(?:https?:\/\/|www\.)[^\s]+/i
const salesKeywords = [
  "相互リンク",
  "バックリンク",
  "被リンク",
  "SEO対策",
  "リンク掲載",
  "管理番号",
  "ご一報",
]

const globalRateLimitStore = globalThis as typeof globalThis & {
  contactRateLimitStore?: Map<string, RateLimitEntry>
}
const rateLimitStore =
  globalRateLimitStore.contactRateLimitStore ?? new Map<string, RateLimitEntry>()
globalRateLimitStore.contactRateLimitStore = rateLimitStore

function successResponse() {
  return Response.json({ ok: true })
}

function getRequiredText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return null
  const text = value.trim()
  if (!text || text.length > maxLength) return null
  return text
}

function getOptionalText(value: unknown, maxLength: number) {
  if (value === undefined || value === null || value === "") return ""
  if (typeof value !== "string") return null
  const text = value.trim()
  return text.length <= maxLength ? text : null
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")
  return forwardedFor?.split(",")[0]?.trim() || "unknown"
}

function isRateLimited(ip: string, now = Date.now()) {
  const cutoff = now - RATE_LIMIT_WINDOW_MS
  const existing = rateLimitStore.get(ip)?.timestamps.filter((time) => time > cutoff) ?? []

  if (existing.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitStore.set(ip, { timestamps: existing })
    return true
  }

  rateLimitStore.set(ip, { timestamps: [...existing, now] })

  if (rateLimitStore.size > 1_000) {
    for (const [key, entry] of rateLimitStore) {
      if (entry.timestamps.every((time) => time <= cutoff)) rateLimitStore.delete(key)
    }
  }

  return false
}

function isLikelySalesSpam(message: string) {
  const keywordCount = salesKeywords.filter((keyword) =>
    message.toLocaleLowerCase("ja").includes(keyword.toLocaleLowerCase("ja")),
  ).length

  return keywordCount >= 2 && urlPattern.test(message)
}

async function verifyTurnstile(token: string, secret: string, ip: string) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), TURNSTILE_TIMEOUT_MS)

  try {
    const body = new FormData()
    body.set("secret", secret)
    body.set("response", token)
    if (ip !== "unknown") body.set("remoteip", ip)
    body.set("idempotency_key", crypto.randomUUID())

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body,
        signal: controller.signal,
      },
    )
    if (!response.ok) return false

    const result = (await response.json()) as TurnstileResult
    return result.success === true && result.action === "contact"
  } catch {
    return false
  } finally {
    clearTimeout(timeoutId)
  }
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0)
  if (contentLength > MAX_REQUEST_LENGTH) {
    return Response.json({ error: "送信内容が大きすぎます。" }, { status: 413 })
  }

  let payload: ContactPayload

  try {
    const rawBody = await request.text()
    if (rawBody.length > MAX_REQUEST_LENGTH) {
      return Response.json({ error: "送信内容が大きすぎます。" }, { status: 413 })
    }
    const parsedPayload = JSON.parse(rawBody) as unknown
    if (!parsedPayload || typeof parsedPayload !== "object" || Array.isArray(parsedPayload)) {
      return Response.json({ error: "送信内容を確認できませんでした。" }, { status: 400 })
    }
    payload = parsedPayload as ContactPayload
  } catch {
    return Response.json({ error: "送信内容を確認できませんでした。" }, { status: 400 })
  }

  const name = getRequiredText(payload.name, 100)
  const email = getRequiredText(payload.email, 254)
  const organization = getOptionalText(payload.organization, 200)
  const message = getRequiredText(payload.message, 5_000)
  const website = getOptionalText(payload.website, 500)
  const turnstileToken = getRequiredText(payload.turnstileToken, 2_048)

  if (typeof payload.website === "string" && payload.website.trim()) {
    console.info("contact blocked: honeypot")
    return successResponse()
  }

  if (!name || !email || organization === null || !message || website === null) {
    return Response.json({ error: "入力内容を確認してください。" }, { status: 400 })
  }

  if (!emailPattern.test(email)) {
    return Response.json({ error: "メールアドレスの形式を確認してください。" }, { status: 400 })
  }

  const formStartedAt =
    typeof payload.formStartedAt === "number" && Number.isFinite(payload.formStartedAt)
      ? payload.formStartedAt
      : null
  if (!formStartedAt || Date.now() - formStartedAt < MIN_SUBMISSION_TIME_MS) {
    console.info("contact blocked: too-fast")
    return successResponse()
  }

  const ip = getClientIp(request)
  if (isRateLimited(ip)) {
    console.info("contact blocked: rate-limit")
    return successResponse()
  }

  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY
  if (!turnstileSecret) {
    console.error("Contact Turnstile environment variable is not configured")
    return Response.json(
      { error: "現在フォームを送信できません。時間をおいて再度お試しください。" },
      { status: 503 },
    )
  }

  if (!turnstileToken || !(await verifyTurnstile(turnstileToken, turnstileSecret, ip))) {
    console.info("contact blocked: turnstile")
    return Response.json(
      { error: "認証を確認できませんでした。もう一度お試しください。" },
      { status: 400 },
    )
  }

  if (isLikelySalesSpam(message)) {
    console.info("contact blocked: spam-score")
    return successResponse()
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL

  if (!apiKey || !to || !from) {
    console.error("Contact email environment variables are not configured")
    return Response.json(
      { error: "現在メールを送信できません。時間をおいて再度お試しください。" },
      { status: 500 },
    )
  }

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: `【お問い合わせ】${name}`,
        text: [
          "United Studio Webサイトからのお問い合わせ",
          "",
          `お名前: ${name}`,
          `メールアドレス: ${email}`,
          `会社名・団体名: ${organization || "未入力"}`,
          "",
          "ご相談内容:",
          message,
        ].join("\n"),
      }),
    })

    if (!resendResponse.ok) {
      console.error("Resend contact email failed", { status: resendResponse.status })
      return Response.json(
        { error: "メール送信に失敗しました。時間をおいて再度お試しください。" },
        { status: 502 },
      )
    }
  } catch {
    console.error("Resend contact email request failed")
    return Response.json(
      { error: "メール送信に失敗しました。時間をおいて再度お試しください。" },
      { status: 502 },
    )
  }

  return successResponse()
}

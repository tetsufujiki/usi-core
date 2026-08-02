export const runtime = "nodejs"

type ContactPayload = {
  name?: unknown
  email?: unknown
  organization?: unknown
  message?: unknown
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function getText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : ""
}

export async function POST(request: Request) {
  let payload: ContactPayload

  try {
    payload = await request.json()
  } catch {
    return Response.json({ error: "送信内容を確認できませんでした。" }, { status: 400 })
  }

  const name = getText(payload.name, 200)
  const email = getText(payload.email, 320)
  const organization = getText(payload.organization, 200)
  const message = getText(payload.message, 5_000)

  if (!name || !email || !message) {
    return Response.json({ error: "必須項目を入力してください。" }, { status: 400 })
  }

  if (!emailPattern.test(email)) {
    return Response.json({ error: "メールアドレスの形式を確認してください。" }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL

  if (!apiKey || !to || !from) {
    console.error("Contact email environment variables are not configured")
    return Response.json({ error: "現在メールを送信できません。時間をおいて再度お試しください。" }, { status: 500 })
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
      return Response.json({ error: "メール送信に失敗しました。時間をおいて再度お試しください。" }, { status: 502 })
    }
  } catch (error) {
    console.error("Resend contact email request failed", error)
    return Response.json({ error: "メール送信に失敗しました。時間をおいて再度お試しください。" }, { status: 502 })
  }

  return Response.json({ ok: true })
}

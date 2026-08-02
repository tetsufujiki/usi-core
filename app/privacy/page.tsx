import type { Metadata } from "next"
import type { ReactNode } from "react"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "ユナイテッドスタジオ株式会社のプライバシーポリシー。",
  alternates: { canonical: "/privacy" },
  robots: { index: false },
}

export default function PrivacyPage() {
  return (
    <div>
      <PageHeader code="LEGAL" title="プライバシーポリシー" />
      <div className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
        <article className="flex max-w-3xl flex-col gap-10 text-sm leading-relaxed text-muted-foreground md:text-base">
          <p>
            ユナイテッドスタジオ株式会社（以下「当社」）は、当ウェブサイトおよび当社サービスにおいて取得する個人情報を、以下のとおり適切に取り扱います。
          </p>

          <PrivacySection title="取得する情報">
            <p>当社は、お問い合わせ、予約、各種サービスのご利用にあたり、以下の情報を取得することがあります。</p>
            <PrivacyList items={["お名前", "メールアドレス", "電話番号", "お問い合わせ内容", "サービスのご利用に関する情報", "アクセス解析により取得される閲覧情報"]} />
          </PrivacySection>

          <PrivacySection title="利用目的">
            <p>取得した情報は、以下の目的のために利用します。</p>
            <PrivacyList items={["お問い合わせへの回答", "サービスのご案内およびご連絡", "予約・制作・各種依頼に関する確認", "当社サービスの提供、改善および品質向上", "ウェブサイトの利用状況の分析", "法令またはポリシーに基づく必要な対応"]} />
          </PrivacySection>

          <PrivacySection title="個人情報の管理">
            <p>当社は、取得した個人情報を適切に管理し、不正アクセス、紛失、破壊、改ざん、漏洩等を防止するために、必要かつ適切な安全管理措置を講じます。</p>
          </PrivacySection>

          <PrivacySection title="第三者提供">
            <p>当社は、以下の場合を除き、お客様の個人情報を第三者に提供しません。</p>
            <PrivacyList items={["お客様の同意がある場合", "法令に基づく場合", "人の生命、身体または財産の保護のために必要があり、お客様の同意を得ることが困難な場合", "業務遂行に必要な範囲で、業務委託先に取り扱いを委託する場合"]} />
          </PrivacySection>

          <PrivacySection title="外部サービス">
            <p>当ウェブサイトでは、アクセス解析、サイト改善、メール送信、予約管理等のために外部サービスを利用する場合があります。</p>
            <p>利用する外部サービスには、以下が含まれる場合があります。</p>
            <PrivacyList items={["Google Tag Manager / Google Analytics", "Microsoft Clarity", "メール送信サービス", "予約管理・データ管理サービス"]} />
            <p>各サービスによるデータの取り扱いについては、各サービスのプライバシーポリシーをご確認ください。</p>
          </PrivacySection>

          <PrivacySection title="Cookieについて">
            <p>当ウェブサイトでは、アクセス解析やサイト改善のためにCookieを使用する場合があります。</p>
            <p>Cookieにより取得される情報には、個人を直接特定する情報は含まれません。ブラウザの設定により、Cookieの使用を拒否することができます。</p>
          </PrivacySection>

          <PrivacySection title="開示・訂正・削除">
            <p>お客様ご自身の個人情報について、開示、訂正、削除、利用停止等をご希望の場合は、下記のお問い合わせ先までご連絡ください。本人確認のうえ、合理的な期間内に対応いたします。</p>
          </PrivacySection>

          <PrivacySection title="お問い合わせ">
            <p>個人情報の取り扱いに関するお問い合わせは、当ウェブサイトのお問い合わせフォーム、または当社指定の連絡先よりご連絡ください。</p>
          </PrivacySection>

          <PrivacySection title="ポリシーの変更">
            <p>当社は、法令の改正やサービス内容の変更に応じて、本ポリシーを変更することがあります。変更後のポリシーは、当ウェブサイトへの掲載をもって効力を生じます。</p>
          </PrivacySection>
        </article>
      </div>
    </div>
  )
}

function PrivacySection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-bold tracking-[-0.01em] text-foreground">{title}</h2>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  )
}

function PrivacyList({ items }: { items: string[] }) {
  return (
    <ul className="flex list-disc flex-col gap-1.5 pl-5 marker:text-accent">
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  )
}

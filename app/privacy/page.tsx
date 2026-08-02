import type { Metadata } from "next"
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
      <PageHeader code="LEGAL" title="Privacy Policy" />
      <div className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
        <p className="text-sm leading-relaxed text-muted-foreground">
          プライバシーポリシーは現在準備中です。公開まで今しばらくお待ちください。
        </p>
      </div>
    </div>
  )
}

import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "ユナイテッドスタジオ株式会社の利用規約。",
  alternates: { canonical: "/terms" },
  robots: { index: false },
}

export default function TermsPage() {
  return (
    <div>
      <PageHeader code="LEGAL" title="Terms of Service" />
      <div className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
        <p className="text-sm leading-relaxed text-muted-foreground">
          利用規約は現在準備中です。公開まで今しばらくお待ちください。
        </p>
      </div>
    </div>
  )
}

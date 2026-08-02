import type { Metadata, Viewport } from "next"
import { Zen_Kaku_Gothic_New, Geist_Mono } from "next/font/google"
import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/lib/site"

const zenKaku = Zen_Kaku_Gothic_New({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-zen-kaku",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s｜United Studio Inc.",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "United Studio Inc.",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "ユナイテッドスタジオ株式会社" }],
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og-image.jpg`],
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "512x512" }],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "512x512" }],
  },
}

export const viewport: Viewport = {
  themeColor: "#0a1120",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ja"
      className={`${zenKaku.variable} ${geistMono.variable} h-full bg-background antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          本文へスキップ
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  )
}

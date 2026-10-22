import Script from 'next/script'
import { journeyScript } from '@/lib/analytics-journey'

export function AnalyticsJourney() {
  return <Script id="usi-analytics-policy" strategy="beforeInteractive"
    dangerouslySetInnerHTML={{ __html: journeyScript('united-studio.com', 'core',
      process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV === 'production') }} />
}

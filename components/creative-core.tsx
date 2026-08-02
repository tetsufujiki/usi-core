'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { CreativeCoreFallback } from '@/components/creative-core-fallback'

const CreativeCoreScene = dynamic(() => import('@/components/creative-core-scene'), {
  ssr: false,
  loading: () => <div className="core-loading" aria-hidden="true" />,
})

export function CreativeCore() {
  const [desktop, setDesktop] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 1024px)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => {
      setDesktop(desktopQuery.matches)
      setReducedMotion(motionQuery.matches)
    }
    sync()
    desktopQuery.addEventListener('change', sync)
    motionQuery.addEventListener('change', sync)
    return () => {
      desktopQuery.removeEventListener('change', sync)
      motionQuery.removeEventListener('change', sync)
    }
  }, [])

  return (
    <div className="creative-core-stage">
      {desktop ? <CreativeCoreScene reducedMotion={reducedMotion} /> : <CreativeCoreFallback />}
    </div>
  )
}

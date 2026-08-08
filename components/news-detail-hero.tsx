"use client"

import Image from "next/image"
import { useState } from "react"

const FALLBACK_IMAGE = "/og-image.jpg"

type NewsDetailHeroProps = {
  src?: string
  alt?: string
  date: string
  title: string
}

export function NewsDetailHero({ src, alt, date, title }: NewsDetailHeroProps) {
  const [imageSrc, setImageSrc] = useState(src || FALLBACK_IMAGE)

  return (
    <section className="relative min-h-[22rem] overflow-hidden border-b border-border md:min-h-[32rem]">
      <Image
        src={imageSrc}
        alt={alt || title}
        fill
        preload
        sizes="100vw"
        className="object-cover"
        onError={() => {
          if (imageSrc !== FALLBACK_IMAGE) setImageSrc(FALLBACK_IMAGE)
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-slate-950/20"
      />
      <div className="relative mx-auto flex min-h-[22rem] max-w-6xl flex-col justify-end gap-5 px-4 py-10 text-white md:min-h-[32rem] md:px-6 md:py-16">
        <p className="font-mono text-[10px] tracking-[0.28em] text-white/75">
          ACTIVITY SIGNAL / NEWS
        </p>
        <time dateTime={date} className="font-mono text-xs tracking-[0.12em] text-white/80 md:text-sm">
          {date.replaceAll("-", ".")}
        </time>
        <h1 className="max-w-4xl text-3xl font-bold leading-tight tracking-[-0.03em] text-balance text-white drop-shadow-sm sm:text-4xl md:text-5xl lg:text-6xl">
          {title}
        </h1>
      </div>
    </section>
  )
}

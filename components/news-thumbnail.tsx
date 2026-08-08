"use client"

import Image from "next/image"
import { useState } from "react"

const FALLBACK_IMAGE = "/og-image.jpg"

type NewsThumbnailProps = {
  src?: string
  alt?: string
  title: string
}

export function NewsThumbnail({ src, alt, title }: NewsThumbnailProps) {
  const [imageSrc, setImageSrc] = useState(src || FALLBACK_IMAGE)

  return (
    <span className="relative block h-14 w-20 overflow-hidden rounded-md border border-border bg-surface-raised sm:h-16 sm:w-24">
      <Image
        src={imageSrc}
        alt={alt || title}
        fill
        sizes="(max-width: 639px) 80px, 96px"
        className="object-cover"
        onError={() => {
          if (imageSrc !== FALLBACK_IMAGE) setImageSrc(FALLBACK_IMAGE)
        }}
      />
    </span>
  )
}

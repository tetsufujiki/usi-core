"use client"

import Image from "next/image"
import { useState } from "react"

const FALLBACK_IMAGE = "/og-image.jpg"

type NewsThumbnailProps = {
  src?: string
  alt?: string
  title: string
  variant?: "default" | "home" | "index"
}

const sizeClasses = {
  default: "h-14 w-20 sm:h-16 sm:w-24",
  home: "h-14 w-20 sm:h-16 sm:w-24 lg:h-20 lg:w-[120px]",
  index: "h-14 w-20 sm:h-16 sm:w-24 lg:h-20 lg:w-[120px]",
} as const

const imageSizes = {
  default: "(max-width: 639px) 80px, 96px",
  home: "(max-width: 639px) 80px, (max-width: 1023px) 96px, 120px",
  index: "(max-width: 639px) 80px, (max-width: 1023px) 96px, 120px",
} as const

export function NewsThumbnail({
  src,
  alt,
  title,
  variant = "default",
}: NewsThumbnailProps) {
  const [imageSrc, setImageSrc] = useState(src || FALLBACK_IMAGE)

  return (
    <span
      className={`relative block overflow-hidden rounded-md border border-border bg-surface-raised ${sizeClasses[variant]}`}
    >
      <Image
        src={imageSrc}
        alt={alt || title}
        fill
        sizes={imageSizes[variant]}
        className="object-cover"
        onError={() => {
          if (imageSrc !== FALLBACK_IMAGE) setImageSrc(FALLBACK_IMAGE)
        }}
      />
    </span>
  )
}

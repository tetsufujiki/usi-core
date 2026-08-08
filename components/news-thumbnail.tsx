"use client"

import Image from "next/image"
import { useState } from "react"

const FALLBACK_IMAGE = "/og-image.jpg"

type NewsThumbnailProps = {
  src?: string
  alt?: string
  title: string
  width?: number
  height?: number
  variant?: "list" | "detail"
}

export function NewsThumbnail({
  src,
  alt,
  title,
  width,
  height,
  variant = "list",
}: NewsThumbnailProps) {
  const [imageSrc, setImageSrc] = useState(src || FALLBACK_IMAGE)
  const isDetail = variant === "detail"

  return (
    <span
      className={
        isDetail
          ? "relative block w-full overflow-hidden rounded-lg border border-border bg-surface-raised shadow-sm"
          : "relative block h-14 w-20 overflow-hidden rounded-md border border-border bg-surface-raised sm:h-16 sm:w-24"
      }
      style={isDetail ? { aspectRatio: `${width || 1200} / ${height || 630}` } : undefined}
    >
      <Image
        src={imageSrc}
        alt={alt || title}
        fill
        sizes={isDetail ? "(max-width: 767px) calc(100vw - 32px), 768px" : "(max-width: 639px) 80px, 96px"}
        className="object-cover"
        onError={() => {
          if (imageSrc !== FALLBACK_IMAGE) setImageSrc(FALLBACK_IMAGE)
        }}
      />
    </span>
  )
}

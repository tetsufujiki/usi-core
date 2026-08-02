"use client"

import { useState } from "react"
import { getYouTubeVideoId } from "@/lib/archive/youtube"

type ArchiveYouTubePreviewProps = {
  title: string
  url: string
}

export function ArchiveYouTubePreview({
  title,
  url,
}: ArchiveYouTubePreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoId = getYouTubeVideoId(url)

  if (!videoId) return null

  return (
    <div className="archive-card-media archive-youtube-preview">
      {isPlaying ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={`${title} - YouTube`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button
          type="button"
          className="archive-youtube-play"
          onClick={() => setIsPlaying(true)}
          aria-label={`${title} をYouTubeで再生する`}
        >
          {/* The button label already describes this decorative thumbnail. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            decoding="async"
          />
          <span className="archive-youtube-wash" aria-hidden="true" />
          <span className="archive-youtube-play-icon" aria-hidden="true">▶</span>
          <span className="archive-youtube-caption" aria-hidden="true">PLAY ON CARD</span>
        </button>
      )}
    </div>
  )
}

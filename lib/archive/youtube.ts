const YOUTUBE_VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/

/** Extracts a video ID from supported, trusted YouTube URL formats. */
export function getYouTubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url)
    const hostname = parsed.hostname.toLowerCase().replace(/^www\./, "")
    let candidate: string | null = null

    if (hostname === "youtu.be") {
      candidate = parsed.pathname.split("/").filter(Boolean)[0] ?? null
    } else if (hostname === "youtube.com" || hostname === "m.youtube.com") {
      if (parsed.pathname === "/watch") {
        candidate = parsed.searchParams.get("v")
      } else if (parsed.pathname.startsWith("/embed/")) {
        candidate = parsed.pathname.split("/").filter(Boolean)[1] ?? null
      }
    }

    return candidate && YOUTUBE_VIDEO_ID_PATTERN.test(candidate)
      ? candidate
      : null
  } catch {
    return null
  }
}

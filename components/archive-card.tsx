import type { ArchiveCategory, ArchiveItem } from "@/lib/archive"
import { archiveCategoryLabels, archiveWorkTypeLabels } from "@/lib/archive"
import { ArchiveYouTubePreview } from "@/components/archive-youtube-preview"

type ArchiveCardProps = {
  work: ArchiveItem
  variant?: "featured" | "index" | "home"
}

const archiveCardCategoryLabels: Record<ArchiveCategory, string> = {
  ...archiveCategoryLabels,
  composition: "作曲",
  "sound-design": "サウンド開発",
}

export function ArchiveCard({ work, variant = "index" }: ArchiveCardProps) {
  const categoryLabel = work.categoryLabel ?? archiveCategoryLabels[work.categories[0]]
  const categoryLabels = work.categories.map((category) => archiveCardCategoryLabels[category])
  const workTypeLabel = archiveWorkTypeLabels[work.workType]
  const subject = work.artist ?? work.client ?? work.label ?? "United Studio"
  const isFeatured = variant === "featured"
  const isIndex = variant === "index"
  const youtubeLink = work.links?.find((link) => link.platform === "youtube")
  const hasArtworks = work.artworks && work.artworks.length > 0
  const containsArtwork = work.artworks?.some((artwork) => artwork.fit === "contain")

  return (
    <article
      className={`archive-card archive-card-${variant} flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm`}
      aria-labelledby={`archive-${variant}-${work.id}`}
    >
      {youtubeLink ? (
        <ArchiveYouTubePreview
          title={`${subject}「${work.title}」`}
          url={youtubeLink.href}
          thumbnailUrl={work.artwork}
        />
      ) : hasArtworks ? (
        <div
          className={`archive-card-media archive-artworks${containsArtwork ? " archive-artworks-contain" : ""}`}
        >
          {work.artworks?.map((artwork) => (
            <figure key={artwork.src} className="archive-artwork-tile">
              {artwork.href ? (
                <a
                  href={artwork.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="archive-artwork-link"
                  aria-label={`${artwork.label ?? artwork.alt} の販売ページを開く`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className={artwork.fit === "contain" ? "archive-artwork-image-contain" : undefined}
                    src={artwork.src}
                    alt={artwork.alt}
                  />
                  <span className="sr-only">（外部サイトが新しいタブで開きます）</span>
                </a>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className={artwork.fit === "contain" ? "archive-artwork-image-contain" : undefined}
                  src={artwork.src}
                  alt={artwork.alt}
                />
              )}
              {artwork.label && <figcaption>{artwork.label}</figcaption>}
            </figure>
          ))}
        </div>
      ) : work.artwork ? (
        <div className="archive-card-media archive-artwork">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={work.artwork} alt={`${subject}「${work.title}」のアートワーク`} />
        </div>
      ) : variant !== "index" && (
        <div className="archive-card-media archive-artwork" aria-hidden="true">
          <div className="archive-artwork-placeholder">
            <span className="archive-artwork-orbit" />
            <span className="archive-artwork-wave">UNITED STUDIO · WORKS MEMORY</span>
          </div>
        </div>
      )}

      <div className={`flex grow flex-col ${isFeatured ? "gap-5 p-6 md:p-7" : "gap-3 p-5"}`}>
        <div className="flex flex-wrap items-start justify-between gap-2">
          {work.year && <span className="font-mono text-[11px] tracking-[0.16em] text-accent">{work.year}</span>}
          {isIndex ? (
            <ul aria-label="作品カテゴリ" className="flex max-w-full flex-wrap justify-end gap-1.5">
              {categoryLabels.map((label) => (
                <li key={label} className="archive-category-chip">{label}</li>
              ))}
            </ul>
          ) : (
            <span className="archive-category-chip">{categoryLabel}</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <p className={`font-mono tracking-[0.14em] text-muted-foreground ${isFeatured ? "text-xs" : "text-[10px]"}`}>
            {subject}
          </p>
          <h3
            id={`archive-${variant}-${work.id}`}
            className={`font-bold leading-snug text-foreground text-pretty ${isFeatured ? "text-2xl md:text-3xl" : "text-lg"}`}
          >
            {work.title}
          </h3>
          {(work.format || work.collectionTitle) && (
            <p className="text-xs leading-relaxed text-muted-foreground">
              {[work.format, work.collectionTitle].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>

        {work.summary && variant !== "home" && (
          <p className="text-sm leading-relaxed text-muted-foreground">{work.summary}</p>
        )}

        {work.links && work.links.length > 0 && variant !== "home" && (
          <ul aria-label={`${subject}「${work.title}」の配信・関連リンク`} className="flex flex-wrap gap-2">
            {work.links.map((link) => (
              <li key={`${link.platform}-${link.label}`}>
                {link.href === "#" ? (
                  <span className="archive-platform-link is-sample" aria-disabled="true" title="リンク準備中">
                    {link.label}<span className="font-sans text-[9px] tracking-normal">準備中</span>
                  </span>
                ) : (
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="archive-platform-link">
                    {link.platform === "youtube"
                      ? "YouTubeで開く"
                      : link.platform === "spotify"
                        ? "Spotifyで聴く"
                        : link.platform === "apple-music"
                          ? "Apple Musicで聴く"
                          : link.label}<span aria-hidden="true">↗</span>
                    <span className="sr-only">（外部サイトが新しいタブで開きます）</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}

        {work.roles.length > 0 && (
          <div className="flex flex-col gap-2">
            {isFeatured && <p className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground">ROLE</p>}
            <ul aria-label="United Studioの担当範囲" className="flex flex-wrap gap-1.5">
              {work.roles.map((role) => <li key={role} className="archive-role-pill">{role}</li>)}
            </ul>
          </div>
        )}

        {variant !== "home" && (
          <dl className="mt-auto grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 border-t border-border pt-3 font-mono text-[9px] leading-relaxed text-muted-foreground">
            <dt>TYPE</dt><dd>{workTypeLabel}</dd>
            {work.genre && <><dt>GENRE</dt><dd>{work.genre}</dd></>}
            {work.label && <><dt>PUBLISHER</dt><dd>{work.label}</dd></>}
          </dl>
        )}

        {work.externalUrl && !work.links?.length && variant !== "home" && (
          <a href={work.externalUrl} target="_blank" rel="noopener noreferrer" className="archive-ext-link">
            詳細を見る <span aria-hidden="true">↗</span>
            <span className="sr-only">（外部サイトが新しいタブで開きます）</span>
          </a>
        )}
      </div>
    </article>
  )
}

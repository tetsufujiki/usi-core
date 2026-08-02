type SectionHeadingProps = {
  code: string
  title: string
  as?: "h1" | "h2"
  id?: string
}

export function SectionHeading({
  code,
  title,
  as = "h2",
  id,
}: SectionHeadingProps) {
  const Tag = as
  return (
    <div className="flex flex-col gap-2">
      <p className="font-mono text-[11px] tracking-[0.3em] text-accent">
        {code}
      </p>
      <Tag
        id={id}
        className="text-2xl font-bold text-foreground text-balance md:text-3xl"
      >
        {title}
      </Tag>
    </div>
  )
}

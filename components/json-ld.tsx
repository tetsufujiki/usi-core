import { SITE_DESCRIPTION, SITE_NAME, SITE_NAME_JA, SITE_TITLE, SITE_URL, externalLinks } from "@/lib/site"

const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME_JA,
      alternateName: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/icon.png`,
      image: `${SITE_URL}/og-image.jpg`,
      description: SITE_DESCRIPTION,
      address: {
        "@type": "PostalAddress",
        addressCountry: "JP",
        addressRegion: "東京都",
        addressLocality: "板橋区",
        streetAddress: "東坂下1-19-24 志幸42シャンソン110号室",
      },
      foundingDate: "2006-02",
      founder: { "@type": "Person", name: "藤木 哲" },
      sameAs: [
        externalLinks.utattemita,
        externalLinks.studio,
        externalLinks.rec,
        externalLinks.reserve,
        externalLinks.yosakoi,
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      alternateName: SITE_NAME_JA,
      url: SITE_URL,
      inLanguage: "ja",
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      inLanguage: "ja",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
    },
  ],
}

export function SiteJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
    />
  )
}

type BreadcrumbItem = {
  name: string
  path: string
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.name,
        item: `${SITE_URL}${item.path}`,
      })),
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

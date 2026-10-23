import type { Metadata } from "next"

import AtlasExplorer from "@/components/atlas-explorer"

export const metadata: Metadata = {
  title: "The Olfaction Atlas — OpenSmell",
  description:
    "A curated evidence map of e-nose builders, datasets, papers, hardware, and claims. Each record names its evidence grade, what it supports, and what it refuses to claim.",
  alternates: { canonical: "/atlas" },
  openGraph: {
    title: "The Olfaction Atlas — OpenSmell",
    description:
      "A curated evidence map of e-nose builders, datasets, papers, hardware, and claims.",
    url: "https://www.opensmell.xyz/atlas",
    siteName: "OpenSmell",
    type: "website",
  },
}

export default function AtlasPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "The Olfaction Atlas",
    description:
      "A curated evidence map of e-nose datasets, papers, hardware, and claims, with explicit evidence grades and limits.",
    url: "https://www.opensmell.xyz/atlas",
    license: "https://creativecommons.org/licenses/by/4.0/",
    creator: { "@type": "Organization", name: "OpenSmell" },
    isAccessibleForFree: true,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AtlasExplorer />
    </>
  )
}

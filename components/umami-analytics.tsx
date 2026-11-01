import Script from "next/script"

export default function UmamiAnalytics() {
  const configuredUrl = process.env.NEXT_PUBLIC_UMAMI_URL
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID

  if (!configuredUrl && !websiteId) return null
  if (!configuredUrl || !websiteId) {
    throw new Error("Set both NEXT_PUBLIC_UMAMI_URL and NEXT_PUBLIC_UMAMI_WEBSITE_ID to enable Umami.")
  }

  const url = new URL(configuredUrl)
  if (
    !["http:", "https:"].includes(url.protocol) ||
    url.pathname !== "/" ||
    url.search ||
    url.hash ||
    url.username ||
    url.password
  ) {
    throw new Error("NEXT_PUBLIC_UMAMI_URL must be an HTTP(S) origin without a path, query, or credentials.")
  }

  return (
    <Script
      src={`${url.origin}/script.js`}
      data-website-id={websiteId}
      data-auto-track="true"
      strategy="afterInteractive"
    />
  )
}

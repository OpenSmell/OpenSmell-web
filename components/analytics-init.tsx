"use client"

import { useEffect } from "react"
import { injectUmami } from "@/lib/analytics"

/**
 * Injects the configured analytics tracker once on mount. Rendered in the
 * root layout; a no-op unless NEXT_PUBLIC_UMAMI_URL and
 * NEXT_PUBLIC_UMAMI_WEBSITE_ID are set.
 */
export default function AnalyticsInit() {
  useEffect(() => {
    injectUmami()
  }, [])
  return null
}

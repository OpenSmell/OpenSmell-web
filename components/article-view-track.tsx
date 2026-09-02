"use client"

import { useEffect } from "react"
import { track } from "@/lib/analytics"

/**
 * Fires an "article_view" event on mount for Academy content. No-op unless
 * analytics is configured.
 */
export default function ArticleViewTrack({ slug }: { slug: string }) {
  useEffect(() => {
    track("article_view", { slug })
  }, [slug])
  return null
}

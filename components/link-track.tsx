"use client"

import { useEffect } from "react"
import { track } from "@/lib/analytics"

/**
 * Fires an "outbound" event for any click that leaves the site (GitHub, PyPI,
 * dataset sources, docs repos). One delegated listener — no per-link wiring —
 * so the whole funnel is captured without touching every component.
 *
 * No-op unless Umami is configured. Never throws into navigation.
 */
export default function LinkTrack() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      const anchor = target?.closest?.("a")
      if (!anchor) return
      const href = anchor.getAttribute("href") || ""
      if (!href || href.startsWith("#")) return
      let url: URL
      try {
        url = new URL(href, window.location.href)
      } catch {
        return
      }
      if (url.host === window.location.host) return
      track("outbound", { host: url.host, path: url.pathname })
    }
    document.addEventListener("click", onClick, true)
    return () => document.removeEventListener("click", onClick, true)
  }, [])
  return null
}

declare global {
  interface Window {
    umami?: {
      track: (payload: Record<string, unknown>) => void
      trackEvent: (eventName?: string, eventData?: Record<string, unknown>) => void
      identify: (data: Record<string, unknown>) => void
    }
  }
}

// Umami is inert unless the self-hosted instance is configured at build time.
const SCRIPT =
  process.env.NEXT_PUBLIC_UMAMI_URL && process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID

/**
 * Inject the Umami tracker script onto the page once. Safe to call from any
 * client component; it is a no-op unless the tracker is configured.
 */
export function injectUmami(): void {
  if (!SCRIPT) return
  if (document.querySelector('script[data-umami-tracker]')) return
  const s = document.createElement("script")
  s.setAttribute("data-umami-tracker", "1")
  s.src = `${process.env.NEXT_PUBLIC_UMAMI_URL}/script.js`
  s.setAttribute("data-website-id", process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID as string)
  s.setAttribute("data-auto-track", "true")
  s.async = true
  document.head.appendChild(s)
}

/**
 * Track a custom event, e.g. a download or an article read. No-op when the
 * tracker is unconfigured or the script has not loaded yet.
 */
export function track(
  eventName: string,
  data?: Record<string, unknown>,
): void {
  if (!SCRIPT) return
  try {
    const umami = window.umami
    if (umami?.trackEvent) umami.trackEvent(eventName, data)
    else if (umami?.track) umami.track({ name: eventName, data })
  } catch {
    /* analytics must never break navigation */
  }
}

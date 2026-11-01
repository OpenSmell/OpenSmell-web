type AnalyticsEventData = Record<string, string | number | boolean>

declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: AnalyticsEventData) => void
    }
  }
}

export function trackEvent(eventName: string, eventData?: AnalyticsEventData) {
  if (typeof window !== "undefined") {
    window.umami?.track(eventName, eventData)
  }
}

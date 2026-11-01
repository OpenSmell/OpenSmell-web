import { trackEvent } from "@/lib/analytics"

export interface SmellMonitorRequest {
  name: FormDataEntryValue | null
  company: FormDataEntryValue | null
  email: FormDataEntryValue | null
  process: FormDataEntryValue | null
  units: FormDataEntryValue | null
}

export type WaitlistPlacement = "homepage" | "smell_monitor_page"

export async function submitSmellMonitorRequest(
  payload: SmellMonitorRequest,
  placement: WaitlistPlacement
) {
  try {
    const response = await fetch("/api/smell-monitor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    const result: unknown = await response.json().catch(() => null)
    const isSuccessful =
      typeof result === "object" &&
      result !== null &&
      "ok" in result &&
      result.ok === true

    if (!response.ok || !isSuccessful) {
      const message =
        typeof result === "object" &&
        result !== null &&
        "error" in result &&
        typeof result.error === "string"
          ? result.error
          : "We couldn't submit your request. Please try again or email praise@opensmell.xyz."

      throw new Error(message)
    }
  } catch (error) {
    trackEvent("waitlist_submit_error", { placement })
    throw error
  }

  trackEvent("waitlist_submit_success", { placement })
}

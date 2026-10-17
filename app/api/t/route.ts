import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

// Single, tiny ingest path for opt-in desktop telemetry (see private/ANALYTICS.md).
// Aggregate counts only — never readings, file names, device IDs or identifiers.
// Inert (204) unless the Umami env vars are configured.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const event = typeof body?.event === "string" ? body.event : "";
    if (!event) return new NextResponse(null, { status: 204 });

    const url = process.env.NEXT_PUBLIC_UMAMI_URL;
    const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
    if (url && websiteId) {
      await fetch(`${url.replace(/\/$/, "")}/api/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "event",
          payload: {
            website: websiteId,
            name: `desktop_${event}`,
            data: body.props ?? undefined,
          },
        }),
      }).catch(() => {});
    }
  } catch {
    // Never fail the caller: telemetry is best-effort.
  }
  return new NextResponse(null, { status: 204 });
}

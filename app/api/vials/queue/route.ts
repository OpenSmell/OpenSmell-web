import { NextResponse } from "next/server"

import { assertAdmin, listSubmissionIssues } from "@/lib/vial-registry"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    assertAdmin(request)
    const items = await listSubmissionIssues()
    return NextResponse.json({ ok: true, items })
  } catch (error) {
    const message = error instanceof Error ? error.message : "The Vial queue could not be read."
    const status = message === "Not authorized." ? 401 : 503
    return NextResponse.json({ ok: false, error: message }, { status })
  }
}

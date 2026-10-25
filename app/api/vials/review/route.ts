import { NextResponse } from "next/server"

import { assertAdmin, reviewVialSubmission } from "@/lib/vial-registry"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    assertAdmin(request)
    const body = await request.json().catch(() => null) as Record<string, unknown> | null
    const issueNumber = Number(body?.issueNumber)
    const decision = body?.decision
    if (!Number.isInteger(issueNumber) || issueNumber <= 0) {
      return NextResponse.json({ ok: false, error: "issueNumber is required." }, { status: 400 })
    }
    if (decision !== "approve" && decision !== "reject") {
      return NextResponse.json({ ok: false, error: "decision must be approve or reject." }, { status: 400 })
    }
    const result = await reviewVialSubmission(issueNumber, decision)
    return NextResponse.json(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : "The review failed."
    const status = message === "Not authorized." ? 401 : 422
    return NextResponse.json({ ok: false, error: message }, { status })
  }
}

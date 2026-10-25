import { NextResponse } from "next/server"

import { createSubmissionIssue, prepareVial, type VialSubmission } from "@/lib/vial-registry"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null) as Record<string, unknown> | null
    if (!body) return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 })
    if (body.honey) return NextResponse.json({ ok: true })

    const field = (value: unknown, max: number): string =>
      typeof value === "string" ? value.trim().slice(0, max) : ""
    const manifestUrl = field(body.manifestUrl, 2000)
    const sourceUrl = field(body.sourceUrl, 2000)
    const evidenceUrl = field(body.evidenceUrl, 2000)
    if (!manifestUrl) {
      return NextResponse.json({ ok: false, error: "The raw manifest URL is required." }, { status: 400 })
    }
    if (!process.env.GITHUB_TOKEN) {
      return NextResponse.json(
        { ok: false, configured: false, error: "The registry queue is not configured on this deployment. Use the email submission fallback." },
        { status: 503 },
      )
    }

    const submission: VialSubmission = {
      manifestUrl,
      sourceUrl: sourceUrl || undefined,
      evidenceUrl: evidenceUrl || undefined,
      name: field(body.name, 200) || undefined,
      author: field(body.author, 200) || undefined,
      email: field(body.email, 320) || undefined,
      notes: field(body.notes, 4000) || undefined,
    }
    const prepared = await prepareVial(manifestUrl, sourceUrl || undefined)
    const issue = await createSubmissionIssue(submission, prepared)
    return NextResponse.json({
      ok: true,
      configured: true,
      issue,
      id: prepared.entry.id,
      version: prepared.entry.version,
      hash: prepared.entry.hash,
      assets: prepared.entry.assets,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : "The submission could not be queued."
    return NextResponse.json({ ok: false, error: message }, { status: 422 })
  }
}

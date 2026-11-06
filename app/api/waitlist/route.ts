import { NextResponse } from "next/server"

const TARGET_EMAIL = "praise@opensmell.xyz"
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${TARGET_EMAIL}`

function validEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null)
    const email = validEmail(body?.email) ? body.email.trim() : ""
    const source =
      typeof body?.source === "string" && body.source.length > 0
        ? body.source.slice(0, 80)
        : "website"

    if (!email) {
      return NextResponse.json(
        { ok: false, error: "Enter a valid email address." },
        { status: 400 }
      )
    }

    const ownerForm = new URLSearchParams()
    ownerForm.set("_subject", "[OpenSmell] Hardware pilot waitlist")
    ownerForm.set("_template", "table")
    ownerForm.set("_cc", email)
    ownerForm.set("email", email)
    ownerForm.set("interest", "Hardware pilot / updates")
    ownerForm.set("source", source)

    const ownerRes = await fetch(FORMSUBMIT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: ownerForm.toString(),
    })

    const ownerData = await ownerRes.json().catch(() => null)
    if (!ownerRes.ok || ownerData?.success !== "true") {
      return NextResponse.json(
        {
          ok: false,
          error:
            ownerData?.message ||
            "Could not add you to the list. Please try again or email praise@opensmell.xyz.",
        },
        { status: 502 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("Waitlist error:", err)
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 })
  }
}

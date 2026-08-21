import { NextResponse } from "next/server"

const TARGET_EMAIL = "praise@opensmell.xyz"
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${TARGET_EMAIL}`

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null)
    if (!body) {
      return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 })
    }

    const { name, company, email, process: proc, units } = body
    if (!name || !email || !proc) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 })
    }

    // 1. Send notification to owner
    const ownerForm = new URLSearchParams()
    ownerForm.set("_subject", `[Smell Monitor] New Pilot Request from ${name}`)
    ownerForm.set("_template", "table")
    ownerForm.set("_cc", email)
    ownerForm.set("name", name)
    ownerForm.set("company", company || "—")
    ownerForm.set("email", email)
    ownerForm.set("process", proc)
    ownerForm.set("units", units || "Not specified")

    const ownerRes = await fetch(FORMSUBMIT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: ownerForm.toString(),
    })

    const ownerData = await ownerRes.json().catch(() => null)
    console.log("FormSubmit owner response:", ownerRes.status, ownerData)
    if (!ownerRes.ok || ownerData?.success !== "true") {
      return NextResponse.json(
        { ok: false, error: ownerData?.message || "Could not send request. Please try again." },
        { status: 502 }
      )
    }

    // 2. Send confirmation to user
    const userForm = new URLSearchParams()
    userForm.set("_subject", "We received your Smell Monitor pilot request")
    userForm.set("_template", "table")
    userForm.set("name", name)
    userForm.set("message", `Hi ${name},\n\nThanks for your interest in the Smell Monitor.\n\nWe've received your pilot request and will get back to you within 2-3 business days with pricing and details.\n\nIf you have questions in the meantime, reply to this email.\n\n— The OpenSmell Team`)
    userForm.set("_replyto", TARGET_EMAIL)

    await fetch(FORMSUBMIT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: userForm.toString(),
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("FormSubmit error:", err)
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 })
  }
}

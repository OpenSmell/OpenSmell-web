import { NextResponse } from "next/server"

const TARGET_EMAIL = "praisejx@proton.me"
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${TARGET_EMAIL}`

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null)
    if (!body) {
      return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 })
    }

    if (body.honey) {
      return NextResponse.json({ ok: true })
    }

    const { name, type, description, author, email, price, link, tags } = body
    if (!name || !author || !description) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 })
    }

    const form = new URLSearchParams()
    form.set("_subject", `[OpenSmell AppStore] ${name}`)
    form.set("_template", "table")
    form.set("name", name)
    form.set("type", type)
    form.set("description", description)
    form.set("author", author)
    form.set("contact", email)
    form.set("price", price || "Free")
    form.set("link", link || "—")
    form.set("tags", Array.isArray(tags) ? tags.join(", ") : "")

    const res = await fetch(FORMSUBMIT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form.toString(),
    })

    const data = await res.json().catch(() => null)
    if (res.ok && data?.success === "true") {
      return NextResponse.json({ ok: true })
    }

    return NextResponse.json(
      { ok: false, error: data?.message || "Submission could not be delivered. Please try again." },
      { status: 502 }
    )
  } catch {
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 })
  }
}

"use client"

import { useEffect, useState, type FormEvent, type ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  CheckCircle,
  ExternalLink,
  Github,
  MessageSquare,
  Send,
  X,
} from "lucide-react"
import DownloadOsmograph from "@/components/download-osmograph"
import { trackEvent } from "@/lib/analytics"
import { submitSmellMonitorRequest } from "@/lib/smell-monitor-form"

const RELEASE_NOTES =
  "https://github.com/OpenSmell/osmograph-desktop/releases/tag/v0.1.2-beta.2"
const INTEROP = "https://github.com/OpenSmell/interoperability"

const facts = [
  {
    value: "MIT",
    label: "code + firmware",
    href: "https://github.com/OpenSmell/osmograph-desktop",
    external: true,
  },
  {
    value: "Python + Rust",
    label: "SDKs",
    href: "https://github.com/OpenSmell",
    external: true,
  },
  { value: "MOX", label: "sensor array", href: "/smell-monitor", external: false },
  { value: "10 Hz", label: "raw readings", href: "/osmograph", external: false },
  {
    value: "Open",
    label: "firmware + protocol",
    href: "https://github.com/OpenSmell/smell-monitor",
    external: true,
  },
]

const detectPoints = [
  "Drift-corrected against your own baseline",
  "Alerts you can tune to your process",
  "The evidence stays visible: traces, features, quality",
]

const claimsDo = [
  "Detect chemical change against your own baseline",
  "Track and correct sensor drift over time",
  "Dedicated-sensor alarms for a known target",
  "Closed-set classification on a fixed panel",
  "Transfer a model across matched devices",
  "Molecule → odour descriptors (Pyrfume / Chemoprint)",
]

const claimsDont = [
  "Identify arbitrary unknown mixtures from a cheap array",
  "Report absolute VOC concentrations from index sensors",
  "Claim one accuracy that generalises everywhere",
  "Replace lab-grade GC-MS for regulated results",
]

const evidence = [
  {
    value: "93.3%",
    label: "Classification on the UCI Gas Sensor Array Drift benchmark",
    note: "Drift-corrected, scored out-of-sample. Dataset-specific — not a general accuracy claim.",
    source: "Vergara et al. 2012 · interoperability",
    href: INTEROP,
  },
  {
    value: "838K",
    label: "Food-freshness samples",
    note: "Electronic-nose recordings released under CC BY 4.0.",
    source: "Zenodo · 10.5281/zenodo.17285312",
    href: "https://zenodo.org/records/17285312",
  },
  {
    value: "828K",
    label: "SmellNet acquisition steps",
    note: "50 food substances, six MOX sensors, MIT-licensed.",
    source: "MIT-MI · SmellNet",
    href: "https://github.com/MIT-MI/SmellNet",
  },
]

const datasets = [
  {
    name: "Food Freshness",
    meta: "838K samples · MQ array",
    licence: "CC BY 4.0",
    note: "Licence at the source.",
    source: "Zenodo",
    href: "https://zenodo.org/records/17285312",
    warn: false,
  },
  {
    name: "SmellNet",
    meta: "828K steps · 50 substances",
    licence: "MIT",
    note: "Commercial use permitted.",
    source: "MIT-MI · GitHub",
    href: "https://github.com/MIT-MI/SmellNet",
    warn: false,
  },
  {
    name: "Beef Spoilage",
    meta: "12 cuts · 11 MQ",
    licence: "CC0 1.0",
    note: "Public-domain dedication.",
    source: "Harvard Dataverse",
    href: "https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/XNFVTS",
    warn: false,
  },
  {
    name: "UCI Gas Drift",
    meta: "13,910 × 128 · 16 MOX",
    licence: "CC BY 4.0 field",
    note: "Donor text says research-only. Link only, not rehosted.",
    source: "UCI 224",
    href: "https://archive.ics.uci.edu/dataset/224/gas+sensor+array+drift+dataset",
    warn: true,
  },
]

function Eyebrow({ children, warn = false }: { children: ReactNode; warn?: boolean }) {
  return (
    <p
      className={`font-mono text-[10px] uppercase tracking-[0.18em] ${
        warn ? "text-warn" : "text-muted-foreground"
      }`}
    >
      {children}
    </p>
  )
}

function PilotModal({
  open,
  onClose,
  defaultEmail,
}: {
  open: boolean
  onClose: () => void
  defaultEmail?: string
}) {
  const [submitting, setSubmitting] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [formStarted, setFormStarted] = useState(false)
  const [unitCount, setUnitCount] = useState("1")

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = previous
    }
  }, [open, onClose])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError(null)
    const data = new FormData(e.currentTarget)

    try {
      await submitSmellMonitorRequest(
        {
          name: data.get("name"),
          company: data.get("company"),
          email: data.get("email"),
          process: data.get("process"),
          units: data.get("units"),
        },
        "homepage"
      )
      setFormSubmitted(true)
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "We couldn't submit your request. Please try again or email praise@opensmell.xyz."
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pilot-title"
    >
      <div className="absolute inset-0 bg-foreground/40" onClick={onClose} />
      <div className="relative max-h-[90vh] w-full max-w-md overflow-y-auto border border-foreground bg-background">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em]">
            Smell Monitor · pilot access
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="border border-border p-1.5 transition-colors hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {formSubmitted ? (
          <div className="px-5 py-10 text-center">
            <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center border border-border">
              <CheckCircle className="h-5 w-5" />
            </div>
            <h3 id="pilot-title" className="text-lg font-semibold tracking-tight">
              Request received.
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              We&apos;ll email you within 2–3 business days with scope, price, and lead time.
            </p>
            <button type="button" onClick={onClose} className="btn-primary mt-6">
              Close
            </button>
          </div>
        ) : (
          <div className="px-5 py-6">
            <h3 id="pilot-title" className="text-xl font-semibold tracking-tight">
              Put a nose on your process.
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Tell us what you want to watch. We&apos;ll reply with scope, price, and lead time.
            </p>

            <form
              onSubmit={handleSubmit}
              onFocusCapture={() => {
                if (!formStarted) {
                  setFormStarted(true)
                  trackEvent("waitlist_form_start", { placement: "homepage" })
                }
              }}
              className="mt-5 space-y-4"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="pilot-name"
                    className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.14em]"
                  >
                    Name
                  </label>
                  <input
                    id="pilot-name"
                    name="name"
                    type="text"
                    required
                    className="w-full border border-border bg-card px-3 py-2 text-sm outline-none transition-colors focus:border-foreground"
                  />
                </div>
                <div>
                  <label
                    htmlFor="pilot-company"
                    className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.14em]"
                  >
                    Company <span className="normal-case">(optional)</span>
                  </label>
                  <input
                    id="pilot-company"
                    name="company"
                    type="text"
                    className="w-full border border-border bg-card px-3 py-2 text-sm outline-none transition-colors focus:border-foreground"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="pilot-email"
                  className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.14em]"
                >
                  Email
                </label>
                <input
                  id="pilot-email"
                  name="email"
                  type="email"
                  required
                  defaultValue={defaultEmail}
                  className="w-full border border-border bg-card px-3 py-2 text-sm outline-none transition-colors focus:border-foreground"
                />
              </div>
              <div>
                <label
                  htmlFor="pilot-process"
                  className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.14em]"
                >
                  What do you want to watch?
                </label>
                <input
                  id="pilot-process"
                  name="process"
                  type="text"
                  required
                  placeholder="fermentation, cold storage, VOC, breath research"
                  className="w-full border border-border bg-card px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-foreground"
                />
              </div>
              <div>
                <label
                  htmlFor="pilot-units"
                  className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.14em]"
                >
                  Units
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="pilot-units"
                    name="units"
                    type="number"
                    min="1"
                    required
                    value={unitCount}
                    onChange={(e) => setUnitCount(e.target.value)}
                    className="w-20 border border-border bg-card px-3 py-2 text-sm outline-none transition-colors focus:border-foreground"
                  />
                  <div className="flex gap-1.5">
                    {["1", "5", "10", "25"].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setUnitCount(n)}
                        className={`border px-2.5 py-1 text-[11px] transition-colors ${
                          unitCount === n
                            ? "border-foreground bg-foreground text-background"
                            : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              {submitError && (
                <p role="alert" className="text-sm text-destructive">
                  {submitError}
                </p>
              )}
              <button
                type="submit"
                disabled={submitting}
                data-umami-event="waitlist_submit_click"
                data-umami-event-placement="homepage"
                className="btn-primary w-full disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
                {submitting ? "Sending..." : "Request pilot access"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Home() {
  const [pilotOpen, setPilotOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [leadState, setLeadState] = useState<"idle" | "loading" | "done" | "error">("idle")
  const [leadError, setLeadError] = useState("")
  const [copied, setCopied] = useState(false)

  async function submitLead(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email.trim()) return
    setLeadState("loading")
    setLeadError("")
    trackEvent("hero_waitlist_submit", { placement: "homepage_hero" })

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "homepage_hero" }),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok || !data?.ok) {
        throw new Error(
          typeof data?.error === "string"
            ? data.error
            : "Could not add you to the list. Please try again."
        )
      }
      setLeadState("done")
      trackEvent("hero_waitlist_success", { placement: "homepage_hero" })
    } catch (error) {
      setLeadState("error")
      setLeadError(
        error instanceof Error
          ? error.message
          : "Could not add you to the list. Please try again."
      )
      trackEvent("hero_waitlist_error", { placement: "homepage_hero" })
    }
  }

  async function copyDonationAddress() {
    try {
      await navigator.clipboard.writeText("0x699d0178f16484509f57d4d77f310b6b617621ce")
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        {/* HERO */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-6 pb-16 pt-28 sm:pb-24 sm:pt-32">
            <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
              <div>
                <Eyebrow>Open infrastructure for digital olfaction</Eyebrow>
                <h1 className="mt-5 max-w-xl text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl">
                  Digital smell,
                  <br />
                  <span className="text-muted-foreground">on open hardware.</span>
                </h1>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  A modular gas-sensor platform that detects chemical change in your process —
                  open data, open firmware, and every number linked to its source.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <DownloadOsmograph fullWidth />
                  <button
                    type="button"
                    onClick={() => setPilotOpen(true)}
                    data-umami-event="hero_pilot_click"
                    className="btn-outline w-full sm:w-auto"
                  >
                    Get the hardware
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                  <span>Open beta</span>
                  <span>macOS · Windows · Linux</span>
                  <a
                    href={RELEASE_NOTES}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-foreground"
                  >
                    Release notes <ArrowRight className="h-3 w-3" />
                  </a>
                </div>

                <div className="mt-8 max-w-lg border-t border-border pt-5">
                  <div className="flex items-baseline justify-between gap-4">
                    <label
                      htmlFor="hero-email"
                      className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground"
                    >
                      Get pilot access
                    </label>
                    <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                      Email only
                    </span>
                  </div>

                  {leadState === "done" ? (
                    <div
                      role="status"
                      className="mt-3 flex items-start gap-2 border border-border bg-card p-3 text-sm"
                    >
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                      <span>
                        You&apos;re on the list. We&apos;ll email you when pilot units are ready.
                      </span>
                    </div>
                  ) : (
                    <form onSubmit={submitLead} className="mt-2 flex flex-col gap-2 sm:flex-row">
                      <input
                        id="hero-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="min-w-0 flex-1 border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-foreground"
                      />
                      <button
                        type="submit"
                        disabled={leadState === "loading"}
                        data-umami-event="hero_waitlist_submit"
                        className="btn-primary w-full disabled:opacity-50 sm:w-auto"
                      >
                        <Send className="h-3.5 w-3.5" />
                        {leadState === "loading" ? "Joining..." : "Join"}
                      </button>
                    </form>
                  )}

                  {leadState === "error" && (
                    <p role="alert" className="mt-2 text-xs text-destructive">
                      {leadError} Or email{" "}
                      <a href="mailto:praise@opensmell.xyz" className="underline underline-offset-2">
                        praise@opensmell.xyz
                      </a>
                      .
                    </p>
                  )}

                  <p className="mt-2 text-[11px] text-muted-foreground">
                    No sensor data. We&apos;ll only email you about pilot units.
                  </p>
                </div>
              </div>

              <div>
                <figure className="border border-border bg-card p-2">
                  <div className="flex items-center justify-between border-b border-border px-2 pb-2">
                    <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                      Osmograph · Explore
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                      real session data
                    </span>
                  </div>
                  <Image
                    src="/osmograph/osmograph_gallery.png"
                    alt="Osmograph Explore screen showing six-channel fingerprints for 64 smells from 380 real recordings"
                    width={1318}
                    height={672}
                    priority
                    sizes="(min-width: 1024px) 46vw, 100vw"
                    className="mt-2 w-full border border-border"
                  />
                  <figcaption className="flex items-center justify-between px-2 pt-2 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                    <span>64 smells · 6 channels</span>
                    <span>380 recordings</span>
                  </figcaption>
                </figure>
                <p className="mt-3 text-right font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                  Playground · no rig required
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCT FACTS */}
        <section className="border-b border-border bg-card">
          <div className="mx-auto max-w-7xl px-6 py-5">
            <div className="grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3 lg:grid-cols-5">
              {facts.map((fact) => {
                const body = (
                  <>
                    <span className="block font-mono text-lg tracking-tight">{fact.value}</span>
                    <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                      {fact.label}
                    </span>
                  </>
                )
                return fact.external ? (
                  <a
                    key={fact.label}
                    href={fact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-background px-4 py-3 transition-colors hover:bg-muted"
                  >
                    {body}
                  </a>
                ) : (
                  <Link
                    key={fact.label}
                    href={fact.href}
                    className="bg-background px-4 py-3 transition-colors hover:bg-muted"
                  >
                    {body}
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* PILLAR 1 — DETECT */}
        <section className="border-b border-border py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <Eyebrow>01 — Detect</Eyebrow>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Detect change. Don&apos;t guess smells.
                </h2>
                <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
                  A cheap MOX array is good at noticing that chemistry moved. Osmograph compares
                  a live fingerprint with your own baseline, corrects drift, and flags the change
                  — instead of pretending to name an arbitrary mixture.
                </p>
                <ul className="mt-6 divide-y divide-border border-y border-border">
                  {detectPoints.map((point) => (
                    <li key={point} className="flex items-start gap-3 py-3 text-sm">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 bg-foreground" />
                      {point}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/osmograph"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline"
                >
                  See detection in Osmograph <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <figure className="border border-border bg-card p-2">
                <Image
                  src="/osmograph/osmograph_compare_overlay.png"
                  alt="Osmograph Compare view overlaying two real recordings across six sensor channels"
                  width={1318}
                  height={672}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="w-full border border-border"
                />
                <figcaption className="px-2 pt-2 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                  Compare · two real recordings · one lane per channel
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* PILLAR 2 — OPEN */}
        <section className="border-b border-border bg-card py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <Eyebrow>02 — Open</Eyebrow>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Open by construction.
                </h2>
                <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
                  MIT software, open firmware, open datasets with their licences attached. We
                  link to the source and never silently rehost a restricted corpus.
                </p>
                <a
                  href="https://github.com/OpenSmell/data-commons"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline"
                >
                  Read the data policy <ArrowRight className="h-4 w-4" />
                </a>
              </div>
              <div className="grid grid-cols-2 gap-px border border-border bg-border">
                {[
                  {
                    value: "MIT",
                    label: "Osmograph code + firmware",
                    href: "https://github.com/OpenSmell/osmograph-desktop",
                  },
                  {
                    value: "Python + Rust",
                    label: "SDKs and protocol",
                    href: "https://github.com/OpenSmell",
                  },
                  {
                    value: "CC BY / CC0 / MIT",
                    label: "dataset licences, at the source",
                    href: "#data",
                  },
                  {
                    value: "Link, don't rehost",
                    label: "restricted corpora stay at the source",
                    href: "https://github.com/OpenSmell/data-commons",
                  },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="bg-background p-5 transition-colors hover:bg-muted"
                  >
                    <span className="block font-mono text-sm tracking-tight">{item.value}</span>
                    <span className="mt-2 block text-xs leading-relaxed text-muted-foreground">
                      {item.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PILLAR 3 — RIGOUR */}
        <section className="border-b border-border py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-2xl">
              <Eyebrow>03 — Rigour</Eyebrow>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                What we claim — and what we don&apos;t.
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Cheap gas sensors have narrow, real limits. Stating them is the point.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <div className="border border-border bg-card p-6">
                <Eyebrow>We do — with evidence</Eyebrow>
                <ul className="mt-4 divide-y divide-border border-t border-border">
                  {claimsDo.map((claim) => (
                    <li key={claim} className="flex items-start gap-3 py-3 text-sm">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 bg-foreground" />
                      {claim}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-border bg-card p-6">
                <Eyebrow warn>We don&apos;t — and won&apos;t pretend to</Eyebrow>
                <ul className="mt-4 divide-y divide-border border-t border-border">
                  {claimsDont.map((claim) => (
                    <li key={claim} className="flex items-start gap-3 py-3 text-sm">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 bg-warn" />
                      {claim}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mt-5 text-xs text-muted-foreground">
              Scored out-of-sample on open data. The harness is public at{" "}
              <a
                href={INTEROP}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-foreground"
              >
                github.com/OpenSmell/interoperability
              </a>
              .
            </p>
          </div>
        </section>

        {/* EVIDENCE */}
        <section className="border-b border-border py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <Eyebrow>Evidence</Eyebrow>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Numbers with a source.
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                Dataset-specific results, linked. No number appears here without its source and
                scope.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {evidence.map((item) => (
                <a
                  key={item.value}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group border border-border bg-card p-6 transition-colors hover:bg-muted"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-3xl tracking-tight">{item.value}</span>
                    <ExternalLink className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                  </div>
                  <p className="mt-3 text-sm font-medium">{item.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {item.note}
                  </p>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                    {item.source}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* TWO DOORS */}
        <section className="border-b border-border bg-card py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-2xl">
              <Eyebrow>Start here</Eyebrow>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Two ways in.
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Use the software, or put a sensor on a process.
              </p>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              <div className="flex flex-col border border-border bg-background p-6 sm:p-8">
                <Eyebrow>Software</Eyebrow>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight">Use Osmograph.</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Download the desktop app, open the Playground, and work with real recordings —
                  no rig required.
                </p>
                <div className="mt-6">
                  <DownloadOsmograph fullWidth />
                </div>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs">
                  {[
                    { label: "Aromatory", href: "/appstore" },
                    { label: "Academy", href: "/academy" },
                    { label: "Docs", href: "/docs" },
                    { label: "Scent Search", href: "/search" },
                  ].map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="inline-flex items-center gap-1 underline-offset-4 hover:underline"
                    >
                      {link.label} <ArrowRight className="h-3 w-3" />
                    </Link>
                  ))}
                </div>
                <p className="mt-auto pt-6 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                  macOS · Windows · Linux · Open beta
                </p>
              </div>

              <div className="flex flex-col border border-border bg-background p-6 sm:p-8">
                <Eyebrow>Hardware</Eyebrow>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                  Deploy a Smell Monitor.
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                  A modular MOX sensor array for continuous chemical monitoring. Channel count and
                  sensor mix are scoped to the process. Join the pilot and we&apos;ll scope it with you.
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => setPilotOpen(true)}
                    data-umami-event="door_pilot_click"
                    className="btn-primary w-full sm:w-auto"
                  >
                    Request pilot access <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                <Link
                  href="/smell-monitor"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline"
                >
                  See the hardware <ArrowRight className="h-4 w-4" />
                </Link>
                <p className="mt-auto pt-6 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                  Pilot units · not a finished consumer product
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* DATA COMMONS */}
        <section id="data" className="border-b border-border py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-2xl">
              <Eyebrow>Data</Eyebrow>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                The data commons.
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Every dataset carries its licence. We link to the source; restricted corpora are
                not rehosted.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {datasets.map((dataset) => (
                <a
                  key={dataset.name}
                  href={dataset.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col border border-border bg-background p-5 transition-colors hover:bg-card"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold">{dataset.name}</h3>
                    <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" />
                  </div>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                    {dataset.meta}
                  </p>
                  <div className="mt-auto pt-5">
                    <div className="flex items-baseline justify-between gap-3 border-t border-border pt-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                        Licence
                      </span>
                      <span
                        className={`text-right font-mono text-[11px] ${
                          dataset.warn ? "text-warn" : "text-foreground"
                        }`}
                      >
                        {dataset.licence}
                      </span>
                    </div>
                    <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground">
                      {dataset.note}
                    </p>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                      {dataset.source}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-6 flex flex-col justify-between gap-3 border-t border-border pt-5 sm:flex-row sm:items-center">
              <p className="max-w-2xl text-xs leading-relaxed text-muted-foreground">
                UCI gas datasets carry conflicting licence text — the structured field says CC BY
                4.0, the donor notes say research-only — so they are linked, not rehosted. Every
                dataset keeps its own licence.
              </p>
              <a
                href="https://github.com/OpenSmell/data-commons"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-shrink-0 items-center gap-2 text-sm font-medium underline-offset-4 hover:underline"
              >
                Full registry and provenance <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* LEARN / SUPPORT */}
        <section className="border-b border-border py-16">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-2">
            <div>
              <Eyebrow>Learn</Eyebrow>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">Go deeper.</h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                Sensor fundamentals to ML pipelines, without the hand-waving.
              </p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                <Link href="/academy" className="inline-flex items-center gap-1 hover:underline">
                  Academy <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link href="/docs" className="inline-flex items-center gap-1 hover:underline">
                  Docs <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <a
                  href="https://discord.gg/CGER3tHxbH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:underline"
                >
                  <MessageSquare className="h-3.5 w-3.5" /> Discord
                </a>
                <a
                  href="https://github.com/OpenSmell"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:underline"
                >
                  <Github className="h-3.5 w-3.5" /> GitHub
                </a>
              </div>
            </div>

            <div>
              <Eyebrow>Support</Eyebrow>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">Keep it open.</h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                Donations fund compute, sensor prototyping, and community. USDC on Polygon:
              </p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <code className="min-w-0 flex-1 break-all border border-border bg-card px-3 py-2 font-mono text-[10px]">
                  0x699d0178f16484509f57d4d77f310b6b617621ce
                </code>
                <button
                  type="button"
                  onClick={copyDonationAddress}
                  className="btn-outline flex-shrink-0"
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <Eyebrow>Open beta</Eyebrow>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              Put a nose on your process.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Start with the software. Add hardware when you need it.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <DownloadOsmograph fullWidth />
              <button
                type="button"
                onClick={() => setPilotOpen(true)}
                data-umami-event="final_pilot_click"
                className="btn-outline w-full sm:w-auto"
              >
                Request pilot access <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
              <a href={RELEASE_NOTES} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                Release notes
              </a>
            </p>
          </div>
        </section>
      </main>

      <PilotModal
        open={pilotOpen}
        onClose={() => setPilotOpen(false)}
        defaultEmail={email}
      />
    </div>
  )
}

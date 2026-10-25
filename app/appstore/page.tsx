"use client"

import { useMemo, useRef, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  FlaskConical,
  Loader2,
  Upload,
  X,
} from "lucide-react"

import registry from "../../public/vials/registry.json"
import { addSubmission, submitToServer, type SubmissionType } from "@/lib/appstore-submissions"

interface RegistryVial {
  id: string
  name: string
  version: string
  author: string
  license: string
  domain: string
  tagline: string
  summary: string
  hasUi?: boolean
  evidence?: "A" | "B" | "C" | "D"
  hash?: string
  manifestUrl: string | null
  sourceUrl: string | null
}

function CopyUrl({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 border border-foreground px-3 py-2 text-xs font-medium hover:bg-foreground hover:text-background transition-colors"
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? "Copied" : "Copy manifest URL"}
    </button>
  )
}

function VialCard({ vial }: { vial: RegistryVial }) {
  return (
    <article className="bg-background border border-border p-5 sm:p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-[10px] uppercase tracking-wider font-mono text-muted-foreground border border-border px-2 py-0.5">
              {vial.domain}
            </span>
            <span className="text-[10px] uppercase tracking-wider font-mono text-muted-foreground">
              v{vial.version}
            </span>
            {vial.evidence ? (
              <span className="text-[10px] uppercase tracking-wider font-mono border border-foreground px-2 py-0.5">
                evidence {vial.evidence}
              </span>
            ) : null}
          </div>
          <h3 className="text-lg font-semibold leading-tight">{vial.name}</h3>
          <p className="text-xs text-muted-foreground mt-1 font-mono">
            {vial.author} · {vial.license}
          </p>
        </div>
        <FlaskConical className="w-5 h-5 text-muted-foreground shrink-0 mt-1" />
      </div>

      <p className="text-sm font-medium">{vial.tagline}</p>
      <p className="text-sm text-muted-foreground leading-relaxed">{vial.summary}</p>

      <div className="mt-auto pt-3 border-t border-border flex flex-wrap items-center gap-2">
        {vial.manifestUrl ? <CopyUrl url={vial.manifestUrl} /> : null}
        {vial.hash ? (
          <span className="text-xs font-mono text-muted-foreground" title="sha256 of the manifest — Osmograph refuses a mismatch">
            sha256 {vial.hash.slice(0, 12)}…
          </span>
        ) : null}
        {vial.sourceUrl ? (
          <a
            href={vial.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors ml-auto"
          >
            Source <ExternalLink className="w-3 h-3" />
          </a>
        ) : null}
      </div>
    </article>
  )
}

export default function AromatoryPage() {
  const vials = registry.vials as RegistryVial[]
  const withUi = useMemo(() => vials.filter((v) => v.hasUi), [vials])

  const [showForm, setShowForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState("")
  const [honey, setHoney] = useState("")
  const [form, setForm] = useState({
    name: "",
    author: "",
    email: "",
    manifestUrl: "",
    sourceUrl: "",
    evidenceUrl: "",
    notes: "",
  })

  const formRef = useRef<HTMLDivElement>(null)

  const openForm = () => {
    setShowForm(true)
    window.setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100)
  }

  const handleSubmit = async () => {
    if (honey) return
    setError("")
    if (!form.manifestUrl.startsWith("https://")) {
      setError("The manifest URL must be a raw HTTPS URL.")
      return
    }
    const payload = {
      name: form.name,
      type: "vial" as SubmissionType,
      description: [form.notes, `manifest: ${form.manifestUrl}`, form.evidenceUrl ? `evidence: ${form.evidenceUrl}` : ""]
        .filter(Boolean)
        .join("\n"),
      author: form.author,
      email: form.email,
      price: "",
      link: form.manifestUrl,
      tags: [form.sourceUrl].filter(Boolean),
    }
    setSending(true)
    const res = await submitToServer(payload)
    setSending(false)
    if (!res.ok) {
      setError(res.error || "Something went wrong. Please try again.")
      return
    }
    addSubmission(payload)
    setSubmitted(true)
    window.setTimeout(() => {
      setSubmitted(false)
      setShowForm(false)
      setError("")
      setForm({ name: "", author: "", email: "", manifestUrl: "", sourceUrl: "", evidenceUrl: "", notes: "" })
    }, 4000)
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <main>
        <section className="pt-32 pb-16 border-b border-border bg-grid">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border text-xs text-muted-foreground mb-6">
                <FlaskConical className="w-3.5 h-3.5" />
                The Aromatory
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-[0.95]">
                Vials for
                <br />
                <span className="text-muted-foreground">Osmograph.</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mb-8 leading-relaxed">
                Each Vial is an author-hosted manifest: a detection profile, a domain UI, and the
                evidence behind it. Osmograph fetches the manifest, verifies its hash, and runs the
                profile through the same gate as a local import.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={openForm} className="hex-btn hex-btn-primary w-full sm:w-auto">
                  <Upload className="w-4 h-4" />
                  Submit a Vial
                </button>
                <Link href="/docs/vials" className="hex-btn hex-btn-outline no-underline w-full sm:w-auto">
                  Authoring guide
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border py-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border">
              {[
                { value: String(vials.length), label: "Listed Vials" },
                { value: String(withUi.length), label: "With a domain UI" },
                { value: registry.updated, label: "Registry updated" },
              ].map((stat) => (
                <div key={stat.label} className="bg-background p-8 text-center">
                  <div className="text-2xl font-bold tracking-tight mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {showForm && (
          <section ref={formRef} className="border-b border-border py-12 scroll-mt-20">
            <div className="max-w-3xl mx-auto px-6">
              <div className="border border-border p-8 bg-background hex-box">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-bold tracking-tight">Submit a Vial</h2>
                  <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  A person reviews every submission before it is listed. Nothing is published
                  automatically.
                </p>
                {submitted ? (
                  <div className="text-center py-12">
                    <Check className="w-12 h-12 mx-auto mb-4 text-green-500" />
                    <h3 className="text-lg font-semibold mb-2">Submitted for review</h3>
                    <p className="text-sm text-muted-foreground">
                      We will check the manifest, the gate result, and the evidence before listing it.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <input
                      type="text"
                      value={honey}
                      onChange={(e) => setHoney(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="hidden"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-muted-foreground mb-1.5 block">Vial name *</label>
                        <input
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Fermentation Lab"
                          className="w-full bg-transparent border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1.5 block">Author *</label>
                        <input
                          value={form.author}
                          onChange={(e) => setForm({ ...form, author: e.target.value })}
                          placeholder="Your name or org"
                          className="w-full bg-transparent border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 block">Email *</label>
                      <input
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        type="email"
                        placeholder="you@example.com"
                        className="w-full bg-transparent border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 block">Manifest URL (raw HTTPS) *</label>
                      <input
                        value={form.manifestUrl}
                        onChange={(e) => setForm({ ...form, manifestUrl: e.target.value })}
                        placeholder="https://raw.githubusercontent.com/you/vial/main/vial.json"
                        className="w-full bg-transparent border border-border px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-foreground transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-muted-foreground mb-1.5 block">Source repository</label>
                        <input
                          value={form.sourceUrl}
                          onChange={(e) => setForm({ ...form, sourceUrl: e.target.value })}
                          placeholder="https://github.com/you/vial"
                          className="w-full bg-transparent border border-border px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-foreground transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1.5 block">Evidence report</label>
                        <input
                          value={form.evidenceUrl}
                          onChange={(e) => setForm({ ...form, evidenceUrl: e.target.value })}
                          placeholder="https://… (FAR, latency, MDE)"
                          className="w-full bg-transparent border border-border px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-foreground transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 block">Notes</label>
                      <textarea
                        value={form.notes}
                        onChange={(e) => setForm({ ...form, notes: e.target.value })}
                        placeholder="What process it is for, what it detects, and what it refuses."
                        rows={3}
                        className="w-full bg-transparent border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors resize-none"
                      />
                    </div>
                    {error ? <p className="text-sm text-red-600">{error}</p> : null}
                    <button
                      onClick={handleSubmit}
                      disabled={sending || !form.name || !form.author || !form.email || !form.manifestUrl}
                      className="hex-btn hex-btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                      {sending ? "Sending" : "Submit for review"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Listed Vials</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Install from the manifest URL. Osmograph checks the hash before it runs.
                </p>
              </div>
              <span className="text-[10px] uppercase tracking-wider font-mono text-muted-foreground">
                {vials.length} listed
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {vials.map((vial) => (
                <VialCard key={vial.id} vial={vial} />
              ))}
              <article className="bg-background border border-dashed border-border p-5 sm:p-6 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 text-muted-foreground" />
                  <h3 className="text-lg font-semibold">Your Vial here</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Scaffold with <code className="font-mono text-xs">noses new</code>, validate with{" "}
                  <code className="font-mono text-xs">noses lint</code>, then submit the raw manifest
                  URL. Your repo stays the source; the registry is only an index.
                </p>
                <Link
                  href="/docs/vials"
                  className="inline-flex items-center gap-2 text-xs font-medium border border-foreground px-3 py-2 hover:bg-foreground hover:text-background transition-colors mt-auto w-fit no-underline"
                >
                  Start from the scaffold <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </article>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

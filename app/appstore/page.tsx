"use client"

import { useRef, useState, useMemo } from "react"
import Link from "next/link"
import { Store, Download, Upload, Cpu, Search, BookOpen, Monitor, ExternalLink, ChevronRight, Tag, Check, Shield, TrendingUp, Grid3X3, Database, Puzzle, X, Send, Coins, Loader2, BarChart3 } from "lucide-react"

import { AppstoreArt } from "@/components/hero-art"
import { loadSubmissions, addSubmission, submitToServer, loadApproved, type SubmissionType, type AppStoreSubmission } from "@/lib/appstore-submissions"

const builtinApps = [
  {
    name: "Osmograph",
    desc: "Zero-code GUI for e-nose recording and classification. Flash firmware, record traces, train models.",
    author: "OpenSmell Core",
    rating: 4.9,
    reviews: 128,
    downloads: "3.4k",
    price: "Free",
    tags: ["GUI", "Recording", "Classification"],
    rigs: ["v1 e-nose", "v2 e-nose"],
    icon: Monitor,
    href: "https://github.com/OpenSmell/osmograph-desktop",
    featured: true,
    type: "app" as SubmissionType,
  },
  {
    name: "Osmograph Web",
    desc: "Browser-based sensor dashboard. No install required — open, connect, and start recording.",
    author: "OpenSmell Core",
    rating: 4.8,
    reviews: 42,
    downloads: "1.8k",
    price: "Free",
    tags: ["Web", "Dashboard", "Realtime"],
    rigs: ["v1 e-nose", "v2 e-nose"],
    icon: Monitor,
    href: "https://mox.opensmell.xyz",
    featured: true,
    type: "app" as SubmissionType,
  },
  {
    name: "Data Commons",
    desc: "Community-contributed sensor recordings. Open, versioned datasets for ML training.",
    author: "OpenSmell Core",
    rating: 4.7,
    reviews: 31,
    downloads: "2.1k",
    price: "Free",
    tags: ["Dataset", "Community", "Open Data"],
    rigs: ["v1 e-nose", "v2 e-nose", "DIY"],
    icon: Database,
    href: "https://github.com/opensmell/data-commons",
    featured: true,
    type: "dataset" as SubmissionType,
  },
  {
    name: "Python SDK",
    desc: "Extract 187-dimensional framework features and build custom pipelines with pip install opensmell.",
    author: "OpenSmell Core",
    rating: 4.9,
    reviews: 89,
    downloads: "8.7k",
    price: "Free",
    tags: ["SDK", "Python", "Pipeline"],
    rigs: ["Any"],
    icon: Tag,
    href: "https://github.com/opensmell/opensmell",
    featured: false,
    type: "plugin" as SubmissionType,
  },
  {
    name: "Sensor Dashboard",
    desc: "Real-time multi-sensor visualisation with signal quality validation and CSV export.",
    author: "Community",
    rating: 4.6,
    reviews: 31,
    downloads: "890",
    price: "Free",
    tags: ["Visualisation", "Dashboard", "Realtime"],
    rigs: ["v1 e-nose", "v2 e-nose", "DIY"],
    icon: TrendingUp,
    href: "#",
    featured: false,
    type: "plugin" as SubmissionType,
  },
  {
    name: "BrewMinder",
    desc: "Fermentation monitoring plugin. Track pH, temp, and VOC profiles during brewing.",
    author: "Community",
    rating: 4.5,
    reviews: 18,
    downloads: "560",
    price: "$9.99",
    tags: ["Fermentation", "Food", "Monitoring"],
    rigs: ["v2 e-nose"],
    icon: Cpu,
    href: "#",
    featured: false,
    type: "plugin" as SubmissionType,
  },
  {
    name: "Air Quality Mapper",
    desc: "Urban air quality mapping tool. Log GPS-tagged sensor readings and visualise pollution heatmaps.",
    author: "Community",
    rating: 4.4,
    reviews: 23,
    downloads: "720",
    price: "Free",
    tags: ["Mapping", "Environment", "GPS"],
    rigs: ["v1 e-nose", "DIY"],
    icon: Grid3X3,
    href: "#",
    featured: false,
    type: "app" as SubmissionType,
  },
]

const typeIcons: Record<SubmissionType, typeof Monitor> = {
  dataset: Database,
  plugin: Puzzle,
  app: Monitor,
}

const typeLabels: Record<SubmissionType, string> = {
  dataset: "Dataset",
  plugin: "Plugin",
  app: "App",
}

export default function AppStorePage() {
  const [filter, setFilter] = useState<SubmissionType | "all">("all")
  const [showForm, setShowForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [honey, setHoney] = useState("")
  const [form, setForm] = useState({
    name: "",
    type: "plugin" as SubmissionType,
    description: "",
    author: "",
    email: "",
    price: "",
    link: "",
    tags: "",
  })

  const formRef = useRef<HTMLDivElement>(null)

  const openForm = () => {
    setShowForm(true)
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 100)
  }

  const handleSubmit = async () => {
    if (honey) return
    setSubmitError("")
    const payload = {
      name: form.name,
      type: form.type,
      description: form.description,
      author: form.author,
      email: form.email,
      price: form.price,
      link: form.link,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    }
    setSending(true)
    const res = await submitToServer(payload)
    setSending(false)
    if (!res.ok) {
      setSubmitError(res.error || "Something went wrong. Please try again.")
      return
    }
    addSubmission({ ...payload, tags: payload.tags })
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setShowForm(false)
      setSubmitError("")
      setForm({ name: "", type: "plugin", description: "", author: "", email: "", price: "", link: "", tags: "" })
    }, 3500)
  }

  const filtered = useMemo(() => {
    const items = builtinApps.map((a) => ({ ...a, source: "builtin" as const }))
    const approved = loadApproved().map((s) => ({
      name: s.name,
      desc: s.description,
      author: s.author,
      rating: 0,
      reviews: 0,
      downloads: "0",
      price: s.price || "Free",
      tags: s.tags,
      rigs: [] as string[],
      icon: Puzzle,
      href: s.link,
      featured: false,
      type: s.type,
      source: "community" as const,
    }))
    const all = [...items, ...approved]
    return filter === "all" ? all : all.filter((a) => a.type === filter)
  }, [filter])

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">

      <main>
        <section className="pt-32 pb-20 border-b border-border bg-grid">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border text-xs text-muted-foreground mb-6">
                  <Store className="w-3.5 h-3.5" />
                  Appstore
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-[0.95]">
                  Ecosystem
                  <br />
                  <span className="text-muted-foreground">of olfaction tools.</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mb-8 leading-relaxed">
                  Datasets, plugins, and apps built by the community for the OpenSmell platform.
                  Download free tools, buy from the community, or sell your own work —
                  every submission is manually reviewed before it goes live.
                </p>
                <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                  Preview — the store is not open yet. The cards below are sample listings
                  to show how submissions will look; metrics and counts are placeholders.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={openForm}
                    className="hex-btn hex-btn-primary w-full sm:w-auto"
                  >
                    <Upload className="w-4 h-4" />
                    Submit Your Work
                  </button>
                </div>
              </div>
              <div className="hidden lg:flex items-center justify-center">
                <AppstoreArt className="w-80 h-72 lg:w-96 lg:h-80 text-foreground" />
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
              {[
                { icon: Store, val: "Preview", label: "Status" },
                { icon: Shield, val: "Manual", label: "Review Process" },
                { icon: Database, val: "3", label: "Categories" },
                { icon: Upload, val: "Open", label: "Submissions" },
              ].map((s) => (
                <div key={s.label} className="bg-background p-8 text-center">
                  <s.icon className="w-6 h-6 mx-auto mb-3 text-muted-foreground" />
                  <div className="text-2xl font-bold tracking-tight mb-1">{s.val}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {showForm && (
          <section ref={formRef} className="border-b border-border py-12 scroll-mt-20">
            <div className="max-w-3xl mx-auto px-6">
              <div className="border border-border p-8 bg-background hex-box">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold tracking-tight">Submit to the Appstore</h2>
                  <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {submitted ? (
                  <div className="text-center py-12">
                    <Check className="w-12 h-12 mx-auto mb-4 text-green-500" />
                    <h3 className="text-lg font-semibold mb-2">Submission received</h3>
                    <p className="text-sm text-muted-foreground">Thanks — we&apos;ve got it and will review it soon.</p>
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
                        <label className="text-xs text-muted-foreground mb-1.5 block">Name *</label>
                        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="My Awesome Plugin"
                          className="w-full bg-transparent border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors" />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1.5 block">Type *</label>
                        <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as SubmissionType })}
                          className="w-full bg-transparent border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors">
                          <option value="plugin">Plugin (Osmograph)</option>
                          <option value="dataset">Dataset</option>
                          <option value="app">Independent App</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-muted-foreground mb-1.5 block">Author *</label>
                        <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })}
                          placeholder="Your name or org"
                          className="w-full bg-transparent border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors" />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1.5 block">Email *</label>
                        <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email"
                          placeholder="you@example.com"
                          className="w-full bg-transparent border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 block">Description *</label>
                      <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                        placeholder="What does it do? What problem does it solve?"
                        rows={3}
                        className="w-full bg-transparent border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors resize-none" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-muted-foreground mb-1.5 block">Price</label>
                        <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                          placeholder="Free, or $9.99"
                          className="w-full bg-transparent border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors" />
                        <p className="text-[10px] text-muted-foreground mt-1">Release it free or sell it. Pricing is displayed on your listing.</p>
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1.5 block">Repo / download link</label>
                        <input value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })}
                          placeholder="https://github.com/yourname/your-repo"
                          className="w-full bg-transparent border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors" />
                        <p className="text-[10px] text-muted-foreground mt-1">A public repo (e.g. GitHub) lets us download and test your work.</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 block">Tags (comma-separated)</label>
                      <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}
                        placeholder="food, monitoring, python"
                        className="w-full bg-transparent border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors" />
                    </div>
                    <div className="border border-border p-4">
                      <p className="text-xs font-semibold mb-2">Tips for a strong submission</p>
                      <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
                        <li>Link a public repo with source code and a README so reviewers can test it.</li>
                        <li>Add a short demo video or GIF to your repo.</li>
                        <li>Mention which rigs it works with (v1 / v2 e-nose, DIY).</li>
                        <li>Keep the description focused on what it does and the problem it solves.</li>
                      </ul>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button onClick={handleSubmit}
                        disabled={!form.name || !form.author || !form.email || !form.description || sending}
                        className="hex-btn hex-btn-primary disabled:opacity-40">
                        {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        {sending ? "Submitting…" : "Submit"}
                      </button>
                      {submitError && (
                        <p className="text-xs text-red-500 self-center">{submitError}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <span className="hex-icon text-muted-foreground" />
                <h2 className="text-2xl font-bold tracking-tight">
                  {filter === "all" ? "All Items" : `${typeLabels[filter]}s`}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                {(["all", "dataset", "plugin", "app"] as const).map((f) => (
                  <button key={f} onClick={() => setFilter(f)}
                    className={`text-xs px-3 py-1.5 border transition-all ${
                      filter === f ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:text-foreground"
                    }`}>
                    {f === "all" ? "All" : `${typeLabels[f]}s`}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
              {filtered.map((app) => {
                const TypeIcon = typeIcons[app.type]
                  return (
                    <div key={app.name} className="bg-background p-6 hex-box group flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <TypeIcon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{typeLabels[app.type]}</span>
                      <span className="ml-auto inline-flex items-center gap-1 text-xs font-semibold border border-border px-2 py-0.5">
                        <Coins className="w-3 h-3 text-muted-foreground" />
                        {app.price}
                      </span>
                    </div>
                    <h3 className="font-semibold mb-1">{app.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3 leading-relaxed line-clamp-2">{app.desc}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {app.tags.slice(0, 4).map((t) => (
                        <span key={t} className="text-[10px] border border-border px-1.5 py-0.5 text-muted-foreground">{t}</span>
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground mb-4 mt-auto">
                      {app.rigs.join(", ")}
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <a href={app.href} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-foreground text-background px-3 py-2 text-xs font-medium hover:opacity-90 transition-opacity">
                        <Download className="w-3.5 h-3.5" />
                        {app.price === "Free" ? "Download" : "Buy"}
                      </a>
                      <a href={app.href} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium hover:underline">
                        Details <ChevronRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="border-t border-border py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="hex-icon text-muted-foreground" />
                <h2 className="text-2xl font-bold tracking-tight">Build for the ecosystem</h2>
              </div>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Built a plugin, dataset, or tool for the OpenSmell platform?
                Sell it or release it free. Buy from the community or download
                free tools. Every submission is manually reviewed for
                compatibility, security, and quality.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border mb-8">
                {[
                  { icon: Upload, title: "Submit", desc: "Fill the form with your project details" },
                  { icon: Shield, title: "Review", desc: "Manual review for quality and compatibility" },
                  { icon: Coins, title: "Publish", desc: "Go live as free or paid — you set the price" },
                ].map((s) => (
                  <div key={s.title} className="bg-background p-6 text-center">
                    <s.icon className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                    <h3 className="text-sm font-semibold mb-1">{s.title}</h3>
                    <p className="text-xs text-muted-foreground">{s.desc}</p>
                  </div>
                ))}
              </div>
              <button onClick={openForm}
                className="hex-btn hex-btn-primary w-full sm:w-auto">
                <Upload className="w-4 h-4" />
                Submit Your Work
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

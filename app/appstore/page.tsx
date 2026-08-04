"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Store, Download, Star, Upload, Cpu, Search, BookOpen, Monitor, ExternalLink, ChevronRight, Tag, Check, Shield, Users, TrendingUp, Grid3X3, Filter, Database, Puzzle, X, Send } from "lucide-react"
import ThemeToggle from "@/components/theme-toggle"
import MobileNav from "@/components/mobile-nav"
import { loadSubmissions, addSubmission, buildMailto, loadApproved, type SubmissionType, type AppStoreSubmission } from "@/lib/appstore-submissions"

const builtinApps = [
  {
    name: "Osmograph",
    desc: "Zero-code GUI for e-nose recording and classification. Flash firmware, record traces, train models.",
    author: "OpenSmell Core",
    rating: 4.9,
    reviews: 128,
    downloads: "3.4k",
    tags: ["GUI", "Recording", "Classification"],
    rigs: ["v1 e-nose", "v2 e-nose"],
    icon: Monitor,
    href: "https://github.com/opensmell/Osmograph",
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
    tags: ["Web", "Dashboard", "Realtime"],
    rigs: ["v1 e-nose", "v2 e-nose"],
    icon: Monitor,
    href: "https://mox.opensmell.xyz",
    featured: true,
    type: "app" as SubmissionType,
  },
  {
    name: "Data Commons",
    desc: "Community-contributed sensor recordings. Open, versioned, device-invariant datasets for ML training.",
    author: "OpenSmell Core",
    rating: 4.7,
    reviews: 31,
    downloads: "2.1k",
    tags: ["Dataset", "Community", "Open Data"],
    rigs: ["v1 e-nose", "v2 e-nose", "DIY"],
    icon: Database,
    href: "https://github.com/opensmell/data-commons",
    featured: true,
    type: "dataset" as SubmissionType,
  },
  {
    name: "Python SDK",
    desc: "Extract 145-dimensional framework features and build custom pipelines with pip install opensmell.",
    author: "OpenSmell Core",
    rating: 4.9,
    reviews: 89,
    downloads: "8.7k",
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
  const [hydrated, setHydrated] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [filter, setFilter] = useState<SubmissionType | "all">("all")
  const [showForm, setShowForm] = useState(false)
  const [approved, setApproved] = useState<AppStoreSubmission[]>([])
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
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => { setHydrated(true); setApproved(loadApproved()) }, [])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (!hydrated) return null

  const allApps = [
    ...builtinApps,
    ...approved.map((s) => ({
      name: s.name,
      desc: s.description,
      author: s.author,
      rating: 0,
      reviews: 0,
      downloads: "—",
      tags: s.tags,
      rigs: ["Community"],
      icon: typeIcons[s.type],
      href: s.link || "#",
      featured: false,
      type: s.type,
    })),
  ]

  const filtered = filter === "all" ? allApps : allApps.filter((a) => a.type === filter)

  const handleSubmit = () => {
    if (!form.name || !form.author || !form.email || !form.description) return
    addSubmission({
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    })
    window.open(buildMailto({
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    }), "_blank")
    setSubmitted(true)
    setTimeout(() => { setSubmitted(false); setShowForm(false); setForm({ name: "", type: "plugin", description: "", author: "", email: "", price: "", link: "", tags: "" }) }, 3000)
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
          <Link href="/" className="flex items-center gap-3 no-underline group">
            <div className="relative w-8 h-8">
              <Image src="/opensmell_logo.png" alt="OpenSmell" fill className="object-contain" priority sizes="32px" />
            </div>
            <span className="text-lg font-semibold tracking-tight">OpenSmell</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <Link href="/search" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1">
              <Search className="w-3.5 h-3.5" />
              Search
            </Link>
            <Link href="/osmograph" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1">
              <Monitor className="w-3.5 h-3.5" />
              Osmograph
            </Link>
            <Link href="/appstore" className="text-foreground font-medium inline-flex items-center gap-1">
              <Store className="w-3.5 h-3.5" />
              Appstore
            </Link>
            <Link href="/academy" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              Academy
            </Link>
            <a href="https://discord.gg/CGER3tHxbH" target="_blank" rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1">
              <ExternalLink className="w-3.5 h-3.5" />
              Community
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <MobileNav />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main>
        <section className="pt-32 pb-20 border-b border-border bg-hex">
          <div className="max-w-7xl mx-auto px-6">
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
                Every submission is reviewed for compatibility and quality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition-all"
                >
                  <Upload className="w-4 h-4" />
                  Submit Your Work
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border py-16 bg-hex">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
              {[
                { icon: Download, val: "28k+", label: "Total Downloads" },
                { icon: Users, val: "12", label: "Published Items" },
                { icon: Shield, val: "100%", label: "Reviewed" },
                { icon: Database, val: "3", label: "Categories" },
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
          <section className="border-b border-border py-12">
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
                    <p className="text-sm text-muted-foreground">Your email client should open shortly. We&apos;ll review your submission and get back to you.</p>
                  </div>
                ) : (
                  <div className="space-y-5">
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
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1.5 block">Link</label>
                        <input value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })}
                          placeholder="https://github.com/..."
                          className="w-full bg-transparent border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 block">Tags (comma-separated)</label>
                      <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}
                        placeholder="food, monitoring, python"
                        className="w-full bg-transparent border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors" />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button onClick={handleSubmit}
                        disabled={!form.name || !form.author || !form.email || !form.description}
                        className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-2.5 text-sm font-medium hover:opacity-90 transition-all disabled:opacity-40">
                        <Send className="w-4 h-4" />
                        Submit &amp; Email
                      </button>
                      <p className="text-xs text-muted-foreground self-center">Opens your email client with submission details pre-filled to praisejx@proton.me</p>
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
                  <div key={app.name} className="bg-background p-6 hex-box group">
                    <div className="flex items-center gap-2 mb-3">
                      <TypeIcon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{typeLabels[app.type]}</span>
                      <span className="text-xs text-muted-foreground ml-auto">{app.author}</span>
                    </div>
                    <h3 className="font-semibold mb-1">{app.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3 leading-relaxed line-clamp-2">{app.desc}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {app.tags.slice(0, 4).map((t) => (
                        <span key={t} className="text-[10px] border border-border px-1.5 py-0.5 text-muted-foreground">{t}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      {app.rating > 0 ? (
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current" />
                          {app.rating}
                        </span>
                      ) : <span />}
                      <span>{app.downloads} dl</span>
                    </div>
                    <a href={app.href} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium hover:underline">
                      View details <ChevronRight className="w-3 h-3" />
                    </a>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="border-t border-border py-20 bg-hex">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="hex-icon text-muted-foreground" />
                <h2 className="text-2xl font-bold tracking-tight">Build for the ecosystem</h2>
              </div>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Built a plugin, dataset, or tool for the OpenSmell platform?
                Submit it here. Every submission is manually reviewed for
                compatibility, security, and quality. Set your price or release for free.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border mb-8">
                {[
                  { icon: Upload, title: "Submit", desc: "Fill the form with your project details" },
                  { icon: Shield, title: "Review", desc: "Manual review for quality and compatibility" },
                  { icon: Check, title: "Publish", desc: "Go live with tags, pricing, and categories" },
                ].map((s) => (
                  <div key={s.title} className="bg-background p-6 text-center">
                    <s.icon className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                    <h3 className="text-sm font-semibold mb-1">{s.title}</h3>
                    <p className="text-xs text-muted-foreground">{s.desc}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => { setShowForm(true); window.scrollTo({ top: 0, behavior: "smooth" }) }}
                className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition-all">
                <Upload className="w-4 h-4" />
                Submit Your Work
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="relative w-6 h-6">
              <Image src="/opensmell_logo.png" alt="OpenSmell" fill className="object-contain" sizes="24px" />
            </div>
            OpenSmell Appstore
          </div>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Back to Home</Link>
        </div>
      </footer>
    </div>
  )
}

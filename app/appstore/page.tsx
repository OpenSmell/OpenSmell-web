"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Store, Download, Star, Upload, Cpu, Search, BookOpen, Monitor, ExternalLink, ChevronRight, Tag, Check, Shield, Users, TrendingUp, Grid3X3, Filter } from "lucide-react"
import ThemeToggle from "@/components/theme-toggle"

const apps = [
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
  },
  {
    name: "Chemoprint SDK",
    desc: "29-dimensional physicochemical vector extraction from SMILES. Core perceptual fingerprinting library.",
    author: "OpenSmell Core",
    rating: 4.8,
    reviews: 64,
    downloads: "12k",
    tags: ["SDK", "Chemoinformatics", "Python"],
    rigs: ["Any"],
    icon: Tag,
    href: "https://github.com/opensmell/chemoprint",
    featured: true,
  },
  {
    name: "Sensor Dashboard",
    desc: "Real-time multi-sensor visualisation dashboard with signal quality validation and export.",
    author: "Community",
    rating: 4.6,
    reviews: 31,
    downloads: "890",
    tags: ["Visualisation", "Dashboard", "Realtime"],
    rigs: ["v1 e-nose", "v2 e-nose", "DIY"],
    icon: TrendingUp,
    href: "#",
    featured: false,
  },
  {
    name: "Data Commons Uploader",
    desc: "Upload and tag your sensor recordings for the community dataset. Versioned, validated, open.",
    author: "OpenSmell Core",
    rating: 4.7,
    reviews: 42,
    downloads: "1.2k",
    tags: ["Upload", "Dataset", "Community"],
    rigs: ["v1 e-nose", "v2 e-nose"],
    icon: Upload,
    href: "#",
    featured: false,
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
  },
  {
    name: "Odor Classifier Trainer",
    desc: "Custom classifier training interface. Record samples, label, train with one click.",
    author: "OpenSmell Core",
    rating: 4.8,
    reviews: 37,
    downloads: "1.1k",
    tags: ["ML", "Training", "Classification"],
    rigs: ["v1 e-nose", "v2 e-nose"],
    icon: Filter,
    href: "#",
    featured: false,
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
    icon: BookOpen,
    href: "https://github.com/opensmell/opensmell",
    featured: false,
  },
]

export default function AppStorePage() {
  const [hydrated, setHydrated] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => { setHydrated(true) }, [])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (!hydrated) return null

  return (
    <div className="min-h-screen bg-background text-foreground">
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
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main>
        <section className="pt-32 pb-20 border-b border-border bg-grid">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border text-xs text-muted-foreground mb-6">
                <Store className="w-3.5 h-3.5" />
                Appstore
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-[0.95]">
                Ecosystem
                <br />
                <span className="text-muted-foreground">of olfaction apps.</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mb-8 leading-relaxed">
                Discover and install community-built apps, plugins, and SDKs for your
                electronic nose. Every app is reviewed for compatibility and quality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition-all">
                  <Download className="w-4 h-4" />
                  Browse All Apps
                </button>
                <button className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 text-sm font-medium hover:bg-foreground hover:text-background transition-all">
                  <Upload className="w-4 h-4" />
                  Submit Your App
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
                { icon: Users, val: "12", label: "Published Apps" },
                { icon: Shield, val: "100%", label: "Reviewed" },
                { icon: Cpu, val: "3", label: "Compatible Rigs" },
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

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <span className="hex-icon text-muted-foreground" />
                <h2 className="text-2xl font-bold tracking-tight">Featured Apps</h2>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Filter className="w-3.5 h-3.5" />
                Filter by rig compatibility
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
              {apps.filter(a => a.featured).map((app) => (
                <div key={app.name} className="bg-background p-8 hex-box group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="border border-border p-2.5">
                        <app.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{app.name}</h3>
                        <p className="text-xs text-muted-foreground">by {app.author}</p>
                      </div>
                    </div>
                    <a href={app.href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 bg-foreground text-background px-4 py-2 text-xs font-medium hover:opacity-90 transition-all">
                      <Download className="w-3.5 h-3.5" />
                      Install
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{app.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {app.tags.map((t) => (
                      <span key={t} className="text-xs border border-border px-2 py-1 text-muted-foreground">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        {app.rating}
                      </span>
                      <span>{app.reviews} reviews</span>
                      <span className="flex items-center gap-1">
                        <Download className="w-3.5 h-3.5" />
                        {app.downloads}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Cpu className="w-3 h-3" />
                      <span>{app.rigs.join(", ")}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border py-16 bg-hex">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-8">
              <span className="hex-icon text-muted-foreground" />
              <h2 className="text-2xl font-bold tracking-tight">All Apps</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
              {apps.map((app) => (
                <div key={app.name} className="bg-background p-6 hex-box group">
                  <div className="flex items-center gap-2 mb-3">
                    <app.icon className="w-5 h-5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{app.author}</span>
                  </div>
                  <h3 className="font-semibold mb-1">{app.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{app.desc}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {app.tags.map((t) => (
                      <span key={t} className="text-[10px] border border-border px-1.5 py-0.5 text-muted-foreground">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      {app.rating}
                    </span>
                    <span>{app.downloads} dl</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground mb-3">
                    <Cpu className="w-3 h-3" />
                    {app.rigs.join(", ")}
                  </div>
                  <a href={app.href} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium hover:underline">
                    View details <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="hex-icon text-muted-foreground" />
                <h2 className="text-2xl font-bold tracking-tight">Publish your app</h2>
              </div>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Built a plugin, dashboard, or tool for the OpenSmell ecosystem?
                Submit it to the Appstore. Every submission is reviewed for
                compatibility, security, and quality. Tag your app with supported
                sensor rigs and categories so the community finds it.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border mb-8">
                {[
                  { icon: Upload, title: "Upload", desc: "Package your app with metadata and screenshots" },
                  { icon: Shield, title: "Review", desc: "Automated compatibility and security checks" },
                  { icon: Check, title: "Publish", desc: "Go live with tags, ratings, and rig support" },
                ].map((s) => (
                  <div key={s.title} className="bg-background p-6 text-center">
                    <s.icon className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                    <h3 className="text-sm font-semibold mb-1">{s.title}</h3>
                    <p className="text-xs text-muted-foreground">{s.desc}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://github.com/opensmell" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition-all">
                  <ExternalLink className="w-4 h-4" />
                  Submission Guide
                </a>
                <a href="https://discord.gg/CGER3tHxbH" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 text-sm font-medium hover:bg-foreground hover:text-background transition-all">
                  Discuss on Discord
                </a>
              </div>
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

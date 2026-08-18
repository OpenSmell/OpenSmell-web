"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Search, Github, MessageSquare, ChevronRight, ExternalLink, BookOpen, Hexagon, Sigma, Database, Cpu, Monitor, Store, BarChart3, Settings, Wind, Plug, AlertTriangle, Code } from "lucide-react"
import { useTheme } from "next-themes"
import AnimatedHero from "@/components/animated-hero"
import ThemeToggle from "@/components/theme-toggle"
import MobileNav from "@/components/mobile-nav"

export default function Home() {
  const [hydrated, setHydrated] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { theme } = useTheme()

  useEffect(() => {
    setHydrated(true)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleSearchSubmit = (query: string, type: "odor" | "chemical") => {
    if (!query.trim()) return
    router.push(`/search?type=${type}&q=${encodeURIComponent(query.trim())}`)
  }

  const isDark = theme === "dark"

  if (!hydrated) return null

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
          <Link href="/" className="flex items-center gap-3 no-underline group">
            <div className="relative w-8 h-8">
              <Image
                src="/opensmell_logo.png"
                alt="OpenSmell"
                fill
                className="object-contain"
                priority
                sizes="32px"
              />
            </div>
            <span className="text-lg font-semibold tracking-tight">OpenSmell</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm">
            <Link
              href="/search"
              className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              <Search className="w-3.5 h-3.5" />
              Search
            </Link>
            <Link
              href="/smell-monitor"
              className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              <Monitor className="w-3.5 h-3.5" />
              Smell Monitor
            </Link>
            <Link
              href="/osmograph"
              className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              <Monitor className="w-3.5 h-3.5" />
              Osmograph
            </Link>
            <Link
              href="/appstore"
              className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              <Store className="w-3.5 h-3.5" />
              Appstore
            </Link>
            <Link
              href="/academy"
              className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Academy
            </Link>
            <a
              href="https://discord.gg/CGER3tHxbH"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Community
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <MobileNav />
            <ThemeToggle />
            <a
              href="https://github.com/opensmell"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="relative min-h-screen flex items-center overflow-hidden">
          <AnimatedHero />
          <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-24 pb-32">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border text-xs text-muted-foreground mb-6">
                <Sigma className="w-3.5 h-3.5" />
                Open source Infrastructure
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tighter mb-6 leading-[0.95]">
                Digital Smell
                <br />
                <span className="text-muted-foreground">for everyone.</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
                The open platform for digital olfaction. Hardware, software, and data —
                built for researchers, operators, and developers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/smell-monitor"
                  className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition-all"
                >
                  <Monitor className="w-4 h-4" />
                  The Smell Monitor
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://mox.opensmell.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 text-sm font-medium hover:bg-foreground hover:text-background transition-all"
                >
                  <Monitor className="w-4 h-4" />
                  Try Osmograph Web
                </a>
                <button
                  onClick={() => searchRef.current?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 text-sm font-medium hover:bg-foreground hover:text-background transition-all"
                >
                  <Search className="w-4 h-4" />
                  Scent Search
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-background">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              {[
                { label: "Open Repositories", value: "15" },
                { label: "Chemical–Odour Pairs", value: "4,800+" },
                { label: "Community ★", value: "42" },
                { label: "ML Features / Recording", value: "145" },
                { label: "E-Nose Parts (all in)", value: "<$50" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold tracking-tight mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border text-xs text-muted-foreground mb-6">
                  <Monitor className="w-3.5 h-3.5" />
                  Hardware Product
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                  The Smell Monitor.
                </h2>
                <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                  Continuous chemical anomaly detection for industrial processes.
                </p>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  A modular, plug-and-play monitoring node with hot-swappable sensor
                  cartridges. Connect via Bluetooth to Osmograph for analytics, or run
                  standalone with local alerts. Built for fermentation lines, VOC
                  monitoring, and cold-chain storage.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/smell-monitor"
                    className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition-all"
                  >
                    Learn More
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="https://github.com/opensmell/Osmograph"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 text-sm font-medium hover:bg-foreground hover:text-background transition-all"
                  >
                    <Code className="w-4 h-4" />
                    Open-Source SDK
                  </a>
                </div>
              </div>
              <div className="hex-box border border-border p-8 bg-background">
                <div className="text-xs text-muted-foreground mb-4 font-mono uppercase tracking-wider">How it works</div>
                <div className="space-y-4">
                  {[
                    { step: "1", icon: Plug, text: "Insert a sensor cartridge for your environment" },
                    { step: "2", icon: Wind, text: "Active airflow pulls air across the sensor in real-time" },
                    { step: "3", icon: AlertTriangle, text: "Get instant local alerts + stream to Osmograph" },
                  ].map((s) => (
                    <div key={s.step} className="flex items-center gap-3">
                      <span className="w-6 h-6 border border-border flex items-center justify-center text-xs font-mono text-muted-foreground flex-shrink-0">{s.step}</span>
                      <s.icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{s.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="hex-icon text-muted-foreground" />
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  The open stack for smell
                </h2>
                <span className="hex-icon text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Four pillars that together make digitised olfaction possible.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Cpu,
                  title: "Open Hardware",
                  desc: "The Smell Monitor — a modular industrial monitoring node. Open-source 4-pin sensor interface.",
                  link: "/smell-monitor",
                },
                {
                  icon: Database,
                  title: "Open Data",
                  desc: "Community-contributed Data Commons for training shared, device-invariant representations.",
                  link: "https://github.com/opensmell/data-commons",
                },
                {
                  icon: Hexagon,
                  title: "Open Protocol",
                  desc: "Standardised recording procedure making temporal features reproducible across devices.",
                  link: "https://github.com/opensmell/interoperability",
                },
                {
                  icon: Sigma,
                  title: "Open Software",
                  desc: "Zero-code GUI (Osmograph) + Python SDK. Flash firmware, record, classify with clicks.",
                  link: "https://github.com/opensmell/Osmograph",
                },
              ].map((item) => (
                <a
                  key={item.title}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hex-box group p-6 border border-border hover:bg-foreground hover:text-background transition-all duration-300"
                >
                  <item.icon className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground group-hover:text-background/70 transition-colors">
                    {item.desc}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border text-xs text-muted-foreground mb-6">
                  <Hexagon className="w-3.5 h-3.5" />
                  What You Can Build
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
                  Real applications, real hardware.
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  From industrial fermentation monitoring to cold-chain storage to
                  custom gas detection — the open stack lets you build olfactory
                  applications that actually work.
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    { title: "Detect spoilage before it happens", desc: "Track fermentation, coffee roast, or fruit ripening with live sensor traces." },
                    { title: "Build gas leak alarms", desc: "LPG, methane, CO — classify dangerous gases in real time with a $15 sensor array." },
                    { title: "Monitor cold-chain storage", desc: "Early warning for mold and degradation in sealed storage environments." },
                  ].map((item) => (
                    <div key={item.title} className="border border-border p-4">
                      <div className="font-semibold text-sm mb-1">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{item.desc}</div>
                    </div>
                  ))}
                </div>
                <Link
                  href="/smell-monitor"
                  className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
                >
                  See the Smell Monitor <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="hex-box border border-border p-8 bg-background">
                <div className="text-xs text-muted-foreground mb-4 font-mono uppercase tracking-wider">How it works</div>
                <div className="space-y-4">
                  {[
                    { step: "1", icon: Cpu, text: "Get a Smell Monitor or build an open e-nose" },
                    { step: "2", icon: Monitor, text: "Connect to Osmograph (Bluetooth or USB)" },
                    { step: "3", icon: BarChart3, text: "Record live sensor traces of any smell" },
                    { step: "4", icon: Settings, text: "Train a classifier — no coding required" },
                    { step: "5", icon: Database, text: "Share data to the community Data Commons" },
                  ].map((s) => (
                    <div key={s.step} className="flex items-center gap-3">
                      <span className="w-6 h-6 border border-border flex items-center justify-center text-xs font-mono text-muted-foreground flex-shrink-0">{s.step}</span>
                      <s.icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{s.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={searchRef} className="border-t border-border py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="hex-icon text-muted-foreground" />
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  Scent Search
                </h2>
                <span className="hex-icon text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">
                Explore 4,800+ chemical-odor relationships from Pyrfume.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="border border-border p-6">
                <h3 className="font-semibold mb-1">Find chemicals by smell</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  e.g. citrus, floral, woody, aldehydic
                </p>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="citrus, floral, woody..."
                    className="flex-1 bg-transparent border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      handleSearchSubmit(e.currentTarget.value, "odor")
                    }
                  />
                  <button
                    onClick={() => {
                      const el = document.querySelector<HTMLInputElement>(
                        'input[placeholder*="citrus"]'
                      )
                      handleSearchSubmit(el?.value || "citrus", "odor")
                    }}
                    className="bg-foreground text-background px-4 py-3 hover:opacity-90 transition-opacity"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {["citrus", "floral", "woody", "aldehydic"].map((term) => (
                    <button
                      key={term}
                      onClick={() => handleSearchSubmit(term, "odor")}
                      className="text-xs border border-border px-3 py-1.5 hover:bg-foreground hover:text-background transition-all"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
              <div className="border border-border p-6">
                <h3 className="font-semibold mb-1">Find smells by chemical</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  e.g. vanillin, limonene, benzaldehyde
                </p>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="vanillin, limonene..."
                    className="flex-1 bg-transparent border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      handleSearchSubmit(e.currentTarget.value, "chemical")
                    }
                  />
                  <button
                    onClick={() => {
                      const el = document.querySelector<HTMLInputElement>(
                        'input[placeholder*="vanillin"]'
                      )
                      handleSearchSubmit(el?.value || "vanillin", "chemical")
                    }}
                    className="bg-foreground text-background px-4 py-3 hover:opacity-90 transition-opacity"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {["vanillin", "limonene", "benzaldehyde", "eugenol"].map(
                    (term) => (
                      <button
                        key={term}
                        onClick={() => handleSearchSubmit(term, "chemical")}
                        className="text-xs border border-border px-3 py-1.5 hover:bg-foreground hover:text-background transition-all"
                      >
                        {term}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border py-24 bg-hex">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="hex-icon text-muted-foreground" />
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  Join the mission
                </h2>
                <span className="hex-icon text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg mb-10">
                OpenSmell is a community endeavour. We need builders, developers,
                researchers, and domain experts. The future of smell is open.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://discord.gg/CGER3tHxbH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  Join Discord
                </a>
                <a
                  href="https://github.com/opensmell"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 text-sm font-medium hover:bg-foreground hover:text-background transition-all"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="hex-icon text-muted-foreground" />
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  Support open research
                </h2>
                <span className="hex-icon text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                OpenSmell is funded by the community. Donations go directly to cloud compute,
                sensor prototyping, and community building. 100% transparent — usage documented in Discord.
              </p>
              <div className="flex flex-col items-center gap-4 border border-border p-8 bg-background/80 backdrop-blur-sm w-full max-w-xl mx-auto">
                <div className="text-xs text-muted-foreground font-mono uppercase tracking-widest">
                  Donate USDC — Polygon Network
                </div>
                <div className="flex items-center gap-3 w-full min-w-0">
                  <code className="flex-1 min-w-0 text-xs font-mono border border-border px-4 py-3 bg-foreground/5 truncate">
                    0x699d0178f16484509f57d4d77f310b6b617621ce
                  </code>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("0x699d0178f16484509f57d4d77f310b6b617621ce")
                    }}
                    className="flex items-center gap-2 bg-foreground text-background px-4 py-3 text-sm font-medium hover:opacity-90 transition-all flex-shrink-0"
                  >
                    Copy
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Every contribution helps build the infrastructure for digital smell.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-8 h-8">
                  <Image
                    src="/opensmell_logo.png"
                    alt="OpenSmell"
                    fill
                    className="object-contain"
                    sizes="32px"
                  />
                </div>
                <span className="font-semibold">OpenSmell</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">
                Building the digital infrastructure for olfaction. Open source,
                community-driven.
              </p>
            </div>
            {[
              {
                title: "Protocol",
                links: [
                  { label: "Chemoprint", href: "https://github.com/opensmell/chemoprint" },
                  { label: "Interoperability", href: "https://github.com/opensmell/interoperability" },
                  { label: "Encoder", href: "https://github.com/opensmell/encoder" },
                ],
              },
              {
                title: "Hardware",
                links: [
                  { label: "Smell Monitor", href: "/smell-monitor" },
                  { label: "Osmograph", href: "https://github.com/opensmell/Osmograph" },
                  { label: "Electronic Nose", href: "https://github.com/opensmell/electronic-nose" },
                  { label: "Data Commons", href: "https://github.com/opensmell/data-commons" },
                ],
              },
              {
                title: "Community",
                links: [
                  { label: "Discord", href: "https://discord.gg/CGER3tHxbH" },
                  { label: "GitHub", href: "https://github.com/opensmell" },
                  { label: "Academy", href: "/academy" },
                ],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} OpenSmell. Open source research to digitise olfaction.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

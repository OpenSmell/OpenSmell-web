"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Search, Github, MessageSquare, ChevronRight, ExternalLink, BookOpen, Hexagon, Sigma, Database, Cpu, Monitor, Store } from "lucide-react"
import { useTheme } from "next-themes"
import AnimatedHero from "@/components/animated-hero"
import ThemeToggle from "@/components/theme-toggle"

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
    <div className="min-h-screen bg-background text-foreground">
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
                v1.0 — Open Infrastructure
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tighter mb-6 leading-[0.95]">
                Digital smell
                <br />
                <span className="text-muted-foreground">for everyone.</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
                We're building the open standards, hardware, and data infrastructure
                to make smell as programmable as light and sound.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://github.com/opensmell/electronic-nose"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition-all"
                >
                  <Cpu className="w-4 h-4" />
                  Get the E-Nose Kit
                  <ChevronRight className="w-4 h-4" />
                </a>
                <Link
                  href="/osmograph"
                  className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 text-sm font-medium hover:bg-foreground hover:text-background transition-all"
                >
                  <Monitor className="w-4 h-4" />
                  Try Osmograph
                </Link>
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
                { label: "Chemoprint Dimensions", value: "29" },
                { label: "Validation R² (ODT)", value: "0.88" },
                { label: "Molecules in Index", value: "4,800+" },
                { label: "Hardware Validation R²", value: "0.982" },
                { label: "Open Repositories", value: "15" },
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

        <section className="border-t border-border py-24 bg-hex">
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
                  desc: "Reference e-nose design using cheap off-the-shelf components. No PCB milling required.",
                  link: "https://github.com/opensmell/electronic-nose",
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

        <section className="border-t border-border py-24 bg-grid">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border text-xs text-muted-foreground mb-6">
                  <Hexagon className="w-3.5 h-3.5" />
                  Core Standard
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="hex-icon text-muted-foreground" />
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                    The Chemoprint
                  </h2>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  A 29-dimensional physicochemical vector computable from a SMILES string.
                  Human-interpretable, deterministic, MIT-licensed. Each dimension corresponds
                  to molecular weight, LogP, functional groups, and topological indices.
                </p>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Validated against the UCI Gas Sensor Array Drift Dataset (R² = 0.982)
                  and against odor detection thresholds for 717 molecules (R² = 0.88).
                </p>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { val: "0–11", label: "Base properties" },
                    { val: "12–14", label: "Topological indices" },
                    { val: "15–28", label: "Functional groups" },
                  ].map((d) => (
                    <div key={d.val} className="border border-border p-4">
                      <div className="text-lg font-bold">{d.val}</div>
                      <div className="text-xs text-muted-foreground mt-1">{d.label}</div>
                    </div>
                  ))}
                </div>
                <a
                  href="https://github.com/opensmell/chemoprint"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
                >
                  Read the full spec <ChevronRight className="w-4 h-4" />
                </a>
              </div>
              <div className="hex-box border border-border p-8 bg-background">
                <div className="text-xs text-muted-foreground mb-4 font-mono">chemoprint.py</div>
                <pre className="text-sm leading-relaxed font-mono text-muted-foreground">
                  <span className="text-foreground">from</span> chemoprint{" "}
                  <span className="text-foreground">import</span> chemoprint_from_smiles{"\n\n"}
                  smiles = <span className="text-foreground">"CCO"</span>{"  "}# ethanol{"\n"}
                  vec = chemoprint_from_smiles(smiles){"\n"}
                  <span className="text-foreground">print</span>(vec.shape){"  "}# (29,)
                </pre>
                <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                  {[
                    { k: "License", v: "MIT" },
                    { k: "Dimensions", v: "29" },
                    { k: "Validation (Sensor)", v: "R² = 0.982" },
                    { k: "Validation (ODT)", v: "R² = 0.88" },
                  ].map((x) => (
                    <div key={x.k} className="flex justify-between border-b border-border pb-1">
                      <span className="text-muted-foreground">{x.k}</span>
                      <span className="font-mono">{x.v}</span>
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
                  What you can build
                </h2>
                <span className="hex-icon text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                From gas leak alarms to breath analysis — the open stack enables
                a new generation of olfactory applications.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
              {[
                {
                  title: "Safety & Monitoring",
                  items: [
                    "Gas leak alarms (LPG, methane, CO)",
                    "Urban air quality mapping",
                    "Industrial odour detection",
                  ],
                },
                {
                  title: "Food & Agriculture",
                  items: [
                    "Fruit ripening tracking",
                    "Coffee roast profiling",
                    "Honey & spice authenticity",
                  ],
                },
                {
                  title: "Health & Science",
                  items: [
                    "Breath analysis (ketosis markers)",
                    "Fermentation monitoring",
                    "Substance classification",
                  ],
                },
              ].map((cat) => (
                <div key={cat.title} className="bg-background p-8">
                  <h3 className="text-lg font-semibold mb-4">{cat.title}</h3>
                  <ul className="space-y-3">
                    {cat.items.map((item) => (
                      <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-muted-foreground flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
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

        <section className="border-t border-border py-24 bg-grid">
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

        <section className="border-t border-border py-24 bg-hex">
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
              <div className="inline-flex flex-col items-center gap-4 border border-border p-8 bg-background/80 backdrop-blur-sm">
                <div className="text-xs text-muted-foreground font-mono uppercase tracking-widest">
                  Donate USDC — Polygon Network
                </div>
                <div className="flex items-center gap-3 w-full max-w-xl">
                  <code className="flex-1 text-xs font-mono border border-border px-4 py-3 bg-foreground/5 truncate">
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
                  { label: "Electronic Nose", href: "https://github.com/opensmell/electronic-nose" },
                  { label: "Osmograph", href: "https://github.com/opensmell/Osmograph" },
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

"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Monitor, Download, GitBranch, Play, BarChart3, Settings, Upload, BookOpen, ExternalLink, ChevronRight, Cpu, Search, Globe, Usb, Wifi, Bluetooth } from "lucide-react"
import ThemeToggle from "@/components/theme-toggle"
import MobileNav from "@/components/mobile-nav"

export default function OsmographPage() {
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
            <Link href="/osmograph" className="text-foreground font-medium inline-flex items-center gap-1">
              <Monitor className="w-3.5 h-3.5" />
              Osmograph
            </Link>
            <Link href="/enose" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5" />
              E-Nose
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
            <a href="https://github.com/opensmell/Osmograph" target="_blank" rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity">
              <ExternalLink className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="pt-32 pb-20 border-b border-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border text-xs text-muted-foreground mb-6">
                  <Monitor className="w-3.5 h-3.5" />
                  Open Software
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-[0.95]">
                  Osmograph
                </h1>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Zero-code GUI for your electronic nose. Flash firmware, record sensor traces,
                  train classifiers — all with button clicks. No electronics background or coding required.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="https://mox.opensmell.xyz" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition-all">
                    <Globe className="w-4 h-4" />
                    Try Osmograph Web
                    <ChevronRight className="w-4 h-4" />
                  </a>
                  <a href="https://github.com/opensmell/Osmograph/releases" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 text-sm font-medium hover:bg-foreground hover:text-background transition-all">
                    <Download className="w-4 h-4" />
                    Download Desktop
                  </a>
                  <a href="https://github.com/opensmell/Osmograph" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 text-sm font-medium hover:bg-foreground hover:text-background transition-all">
                    <GitBranch className="w-4 h-4" />
                    Source Code
                  </a>
                </div>
              </div>
              <div className="border border-border p-8 bg-background hex-box">
                <div className="text-xs text-muted-foreground mb-4 font-mono uppercase tracking-wider">Quick Start</div>
                <div className="space-y-4">
                  {[
                    { step: "1", icon: Download, text: "Download Osmograph for your OS" },
                    { step: "2", icon: Cpu, text: "Plug in your e-nose via USB" },
                    { step: "3", icon: Play, text: "Osmograph flashes the matching firmware (one click)" },
                    { step: "4", icon: BarChart3, text: "Record live sensor traces" },
                    { step: "5", icon: Settings, text: "Train a classifier with one click" },
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

        <section className="border-t border-border py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border text-xs text-muted-foreground mb-6">
                  <Play className="w-3.5 h-3.5" />
                  Demo
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">See it in action</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Live sensor recording, classification, and trace visualisation — no code required.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Real-time sensor traces as smells pass the array",
                    "One-click classifier training on recorded samples",
                    "Automatic signal quality validation before export",
                  ].map((item) => (
                    <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 bg-muted-foreground flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="https://mox.opensmell.xyz" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium hover:underline">
                  Try it yourself <ChevronRight className="w-4 h-4" />
                </a>
              </div>
              <div className="border border-border overflow-hidden bg-background hex-box">
                <video
                  src="/osmograph.webm"
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full max-h-72 h-auto object-contain bg-background"
                  poster="/opensmell_logo.png"
                >
                  Your browser does not support the video tag.
                </video>
                <div className="border-t border-border px-4 py-2 flex items-center justify-between text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
                  <span>osmograph_demo.webm</span>
                  <span>~20s · 1.3 MB</span>
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
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Features</h2>
                <span className="hex-icon text-muted-foreground" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
              {[
                { icon: Upload, title: "One-click firmware", desc: "Flashes a pre-compiled ESP32 binary with a click after board detection. No PlatformIO or manual setup." },
                { icon: BarChart3, title: "Live sensor traces", desc: "Displays real-time sensor readings with automatic signal quality validation." },
                { icon: Settings, title: "Button-click training", desc: "Train substance classifiers without writing a single line of code." },
                { icon: Monitor, title: "Zero-code GUI", desc: "Built for builders. No electronics background or programming required." },
                { icon: GitBranch, title: "Signal validation", desc: "Validates incoming samples and filters bootloader chatter automatically." },
                { icon: Download, title: "Cross-platform", desc: "Works on Windows, macOS, and Linux. One download, everything included." },
              ].map((f) => (
                <div key={f.title} className="bg-background p-8 hex-box">
                  <f.icon className="w-8 h-8 mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="hex-icon text-muted-foreground" />
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Streaming modes</h2>
                <span className="hex-icon text-muted-foreground" />
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Same sensor, three ways to get the data off the board. The one-click firmware runs USB Serial and WiFi at once — no modes to select.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
              {[
                {
                  icon: Usb,
                  title: "USB Serial",
                  tag: "On the one-click firmware",
                  desc: "Data over the USB cable, always on.",
                  pts: [
                    "OSM-prefixed CSV at 115200 baud, every 500 ms",
                    "Default path for recording sessions",
                    "The OSM prefix keeps bootloader chatter out of your traces",
                  ],
                },
                {
                  icon: Wifi,
                  title: "WiFi AP",
                  tag: "On the one-click firmware",
                  desc: "Stream over the air once it is flashed.",
                  pts: [
                    "ESP32 broadcasts its own network — no router needed",
                    "TCP server on port 8080, mDNS advertises _osmograph._tcp",
                    "Power from a battery bank and unplug the laptop",
                  ],
                },
                {
                  icon: Bluetooth,
                  title: "BLE",
                  tag: "Separate firmware variant",
                  desc: "Untethered, lower power, 10 Hz streaming.",
                  pts: [
                    "Flashing the BLE variant + Osmograph's BLE reader",
                    "Same CSV payload pushed over BLE notify",
                    "Best for long, battery-powered sessions",
                  ],
                },
              ].map((s) => (
                <div key={s.title} className="bg-background p-8 hex-box flex flex-col">
                  <span className="inline-flex self-start items-center gap-2 px-3 py-1 border border-border text-[11px] text-muted-foreground mb-4">{s.tag}</span>
                  <s.icon className="w-8 h-8 mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{s.desc}</p>
                  <ul className="space-y-2 mt-auto">
                    {s.pts.map((p) => (
                      <li key={p} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 bg-muted-foreground flex-shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-8 max-w-3xl mx-auto text-center">
              The one-click binary is compiled for the classic ESP32. ESP32-S3, C3, Uno, and Pico share the same
              CSV stream contract but need their own toolchain —{" "}
              <Link href="/enose" className="text-foreground font-medium hover:underline">
                compare boards in the e-nose builder
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="border-t border-border py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-2xl font-bold tracking-tight mb-4">For developers</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Osmograph is built on a modular Python backend. You can extract the
                  145-dimensional framework features and build custom pipelines with
                  <code className="text-foreground font-mono text-sm mx-1">pip install opensmell</code>.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Extract framework features for custom ML pipelines",
                    "Extend with your own sensor drivers and classifiers",
                    "Contribute to the open-source codebase on GitHub",
                    "Integrate with the OpenSmell Data Commons",
                  ].map((item) => (
                    <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 bg-muted-foreground flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="https://github.com/opensmell/opensmell" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium hover:underline">
                  View the Python SDK <ChevronRight className="w-4 h-4" />
                </a>
              </div>
              <div className="border border-border p-6 bg-background hex-box">
                <div className="text-xs text-muted-foreground mb-4 font-mono">pip install opensmell</div>
                <pre className="text-sm leading-relaxed font-mono text-muted-foreground overflow-x-auto">
                  <span className="text-foreground">from</span> opensmell{" "}
                  <span className="text-foreground">import</span> extract_features{"\n\n"}
                  features = extract_features(<span className="text-foreground">"recordings/"</span>){"\n"}
                  <span className="text-foreground">print</span>(features.shape){"  "}# (n_samples, 145)
                </pre>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Ready to build?</h2>
              <p className="text-muted-foreground mb-8">
                Order the parts, assemble your e-nose, and Osmograph handles the rest.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/enose"
                  className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition-all">
                  <Cpu className="w-4 h-4" />
                  Build an e-nose
                </Link>
                <a href="https://github.com/opensmell/Osmograph" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 text-sm font-medium hover:bg-foreground hover:text-background transition-all">
                  <GitBranch className="w-4 h-4" />
                  Osmograph on GitHub
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
            Osmograph — OpenSmell
          </div>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Back to Home</Link>
        </div>
      </footer>
    </div>
  )
}

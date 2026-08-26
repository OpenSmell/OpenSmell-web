"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Search, Github, MessageSquare, ChevronRight, ExternalLink, BookOpen,
  Cpu, Monitor, BarChart3, Wind, AlertTriangle,
  FlaskConical, Store, Shield, Zap, Activity, Leaf, Factory, Thermometer
} from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from "@/components/ui/carousel"
import AnimatedHero from "@/components/animated-hero"

const products = [
  {
    eyebrow: "SEARCH",
    icon: Search,
    title: "Scent Search",
    desc: "Explore 4,800+ chemical-odour relationships. Search by smell or by molecule, then dive into PubChem data.",
    cta: "Start searching",
    href: "/search",
  },
  {
    eyebrow: "HARDWARE",
    icon: Monitor,
    title: "Smell Monitor",
    desc: "Continuous chemical monitoring for industrial processes. Modular sensor arrays, Bluetooth, open-source firmware.",
    cta: "See the hardware",
    href: "/smell-monitor",
  },
  {
    eyebrow: "SOFTWARE",
    icon: BarChart3,
    title: "Osmograph",
    desc: "Zero-code e-nose workflow. Flash firmware, record live traces, train classifiers — no coding required.",
    cta: "Open Osmograph",
    href: "/osmograph",
  },
  {
    eyebrow: "E-NOSE",
    icon: FlaskConical,
    title: "Build Your Own",
    desc: "Open reference hardware with a live configurator. Pick sensors, preview your rig, download a build plan.",
    cta: "Build your rig",
    href: "/enose",
  },
  {
    eyebrow: "LEARNING",
    icon: BookOpen,
    title: "Academy",
    desc: "Essays on the science, data, and engineering behind digitising smell.",
    cta: "Read the essays",
    href: "/academy",
  },
  {
    eyebrow: "ECOSYSTEM",
    icon: Store,
    title: "Appstore",
    desc: "A community home for e-nose apps, datasets, and rigs. Launching soon.",
    cta: "Preview",
    href: "/appstore",
  },
]

const useCases = [
  { icon: Leaf, title: "Food Safety", stat: "93.3%", statLabel: "accuracy", desc: "838K samples, 59 food types, 10 MOX sensors. Mahalanobis anomaly detection with EWMA drift correction." },
  { icon: Factory, title: "Industrial VOC", stat: "alpha=0.001", statLabel: "EWMA", desc: "Continuous monitoring with configurable drift correction. Fermentation, safety, or research presets." },
  { icon: Shield, title: "Poisoning Detection", stat: "4", statLabel: "signals", desc: "Sensitivity decay, noise floor, recovery rate, baseline drift. Triple-redundant flagging." },
  { icon: AlertTriangle, title: "Gas Leak", stat: "3-sigma", statLabel: "threshold", desc: "Mahalanobis distance. Triple-redundant voting: standard, conservative, sensitive detectors." },
  { icon: Thermometer, title: "Cold Chain", stat: "5 sec", statLabel: "cold start", desc: "DHT11 temp/humidity compensation. Chemical changes detected before temperature loggers register." },
  { icon: FlaskConical, title: "Breath Analysis", stat: "97.1%", statLabel: "COPD", desc: "8 MOX sensors on exhaled-VOC data (Acevedo et al. 2021). Single-dataset result — larger validation needed." },
  { icon: Zap, title: "Smart Agriculture", stat: "6", statLabel: "sensor slots", desc: "Soil health, crop decay. Fleet management for multiple field sensors." },
  { icon: Cpu, title: "Robotics", stat: "Open", statLabel: "SDK", desc: "Embed chemical sensing into autonomous systems. Open protocol, 4-pin sensor interface." },
]

export default function Home() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)
  const [activeProduct, setActiveProduct] = useState(0)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (!carouselApi) return
    const onSelect = () => setActiveProduct(carouselApi.selectedScrollSnap())
    onSelect()
    carouselApi.on("select", onSelect)
    return () => { carouselApi.off("select", onSelect) }
  }, [carouselApi])

  const handleSearchSubmit = (query: string, type: "odor" | "chemical") => {
    if (!query.trim()) return
    router.push(`/search?type=${type}&q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <main>
        {/* HERO */}
        <section className="relative h-screen flex items-center overflow-hidden">
          <AnimatedHero />
          <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-2xl">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-8">
                Σ Open infrastructure
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-4 leading-[0.95]">
                Digital smell
                <br />
                <span className="text-muted-foreground">for everyone.</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-10 max-w-lg leading-relaxed">
                Hardware, data, and software for digital olfaction. Open-source, reproducible, built for research and industry.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/smell-monitor" className="hex-btn hex-btn-primary">
                  Smell Monitor
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link href="/osmograph" className="hex-btn hex-btn-outline">
                  Open Osmograph
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* STATS BAR */}
        <section className="border-t border-b border-border bg-grid">
          <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Validated Samples", value: "1M+" },
                { label: "EWMA Accuracy", value: "93.3%" },
                { label: "Cold Start", value: "5 sec" },
                { label: "Anomaly Detection", value: "100%" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold tracking-tight mb-1 font-mono">{stat.value}</div>
                  <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-[0.15em]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SMELL MONITOR + DETECTION PIPELINE (merged) */}
        <section className="border-t border-border py-20 relative">
          <span className="section-marginalia">Detection Pipeline</span>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="coord-tag mb-3">001 // Smell Monitor</div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
                  Continuous chemical anomaly monitoring.
                </h2>
                <p className="text-muted-foreground mb-5 leading-relaxed">
                  Modular gas-sensor arrays with automatic drift correction. Detect chemical changes in fermentation, food storage, industrial processes, or any environment where air composition matters.
                </p>
                <div className="space-y-2 mb-6">
                  {[
                    "Up to 6 MOX sensor channels — configure for your chemistry",
                    "Temperature and humidity compensation (DHT11)",
                    "OLED status display and programmable buzzer",
                    "IMU for motion compensation — no false alarms from vibration",
                    "Fleet management for multiple devices",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1 h-1 bg-foreground mt-2 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <Link href="/smell-monitor" className="hex-btn hex-btn-primary">
                  See the Smell Monitor
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="hud-corners border border-border p-6 bg-background relative">
                <div className="hud-corners-inner absolute inset-0 pointer-events-none" />
                <div className="coord-tag mb-3">Pipeline</div>
                <div className="space-y-3 data-readout">
                  {[
                    { step: "01", text: "Raw MOX readings at 10 Hz" },
                    { step: "02", text: "EWMA baseline correction (alpha configurable)" },
                    { step: "03", text: "Mahalanobis distance anomaly detection" },
                    { step: "04", text: "Triple-redundant fail-safe voting" },
                    { step: "05", text: "Poisoning detector flags degradation" },
                    { step: "06", text: "User labels events — adaptive learning" },
                  ].map((s) => (
                    <div key={s.step} className="flex items-center gap-3">
                      <span className="text-muted-foreground opacity-50 font-mono text-xs">{s.step}</span>
                      <span className="h-px flex-1 bg-border" />
                      <span className="text-sm text-muted-foreground">{s.text}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Without EWMA: 71.4% accuracy. With alpha=0.001: 93.3%.
                    EWMA is not suitable for all use cases — fermentation monitoring requires different parameters because the target signal is slow-changing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* USE CASES — single grid, no duplication */}
        <section className="border-t border-border py-20 bg-hex">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="hex-icon text-muted-foreground" />
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Applications</h2>
                <span className="hex-icon text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm max-w-xl mx-auto">
                From food safety to clinical diagnostics — every number from our experiments on MOX sensor data.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {useCases.map((uc) => (
                <div key={uc.title} className="hud-corners border border-border p-5 bg-background hover:bg-foreground hover:text-background transition-all duration-300 group relative">
                  <div className="hud-corners-inner absolute inset-0 pointer-events-none" />
                  <div className="flex items-start justify-between mb-2">
                    <uc.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <div className="text-right">
                      <div className="text-lg font-bold tracking-tight font-mono">{uc.stat}</div>
                      <div className="text-[9px] text-muted-foreground group-hover:text-background/70 font-mono uppercase tracking-wider">{uc.statLabel}</div>
                    </div>
                  </div>
                  <div className="h-px bg-border my-2" />
                  <h3 className="text-sm font-semibold mb-1">{uc.title}</h3>
                  <p className="text-xs text-muted-foreground group-hover:text-background/70 leading-relaxed transition-colors">{uc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OPEN DATA — datasets only, no redundant summary cards */}
        <section className="border-t border-border py-20 relative">
          <span className="section-marginalia">Data Commons</span>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="hex-icon text-muted-foreground" />
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Validated on open data</h2>
                <span className="hex-icon text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm max-w-xl mx-auto">
                1M+ samples across 4 independent datasets. Every claim traceable to a source.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: "Food Freshness", samples: "838K", sensors: "10 MOX", fdr: "321M", source: "Zenodo", url: "https://zenodo.org/records/17285312" },
                { name: "SmellNet", samples: "150K", sensors: "6 gas", fdr: "8.1E+18", source: "HuggingFace", url: "https://huggingface.co/datasets/DeweiFeng/SmellNet" },
                { name: "Beef Spoilage", samples: "26K", sensors: "12 MOX", fdr: "3.85", source: "Harvard Dataverse", url: "https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/XNFVTS" },
                { name: "UCI Gas Drift", samples: "14K", sensors: "128", fdr: "1.05", source: "UCI ML Repository", url: "https://archive.ics.uci.edu/dataset/224/gas+sensor+array+drift+dataset" },
              ].map((ds) => (
                <a
                  key={ds.name}
                  href={ds.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hud-corners border border-border p-4 hover:bg-foreground hover:text-background transition-all duration-300 group relative"
                >
                  <div className="hud-corners-inner absolute inset-0 pointer-events-none" />
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-sm">{ds.name}</h3>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-background/70" />
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground group-hover:text-background/70">Samples</span>
                      <span className="font-mono">{ds.samples}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground group-hover:text-background/70">Sensors</span>
                      <span className="font-mono">{ds.sensors}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground group-hover:text-background/70">Best FDR</span>
                      <span className="font-mono">{ds.fdr}</span>
                    </div>
                    <div className="flex justify-between border-t border-border pt-1 mt-1">
                      <span className="text-muted-foreground group-hover:text-background/70">Source</span>
                      <span className="font-mono text-[10px]">{ds.source}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* THE STACK CAROUSEL */}
        <section className="border-t border-border py-20 bg-hex relative">
          <span className="section-marginalia">Stack</span>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="hex-icon text-muted-foreground" />
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">The open stack</h2>
                <span className="hex-icon text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm mt-1">
                Search, hardware, software, e-nose builder, appstore, academy.
              </p>
            </div>
            <div className="flex items-center gap-2 md:gap-3 flex-wrap mb-10 justify-center">
              {products.map((m, i) => (
                <button
                  key={m.title}
                  type="button"
                  aria-label={m.title}
                  onClick={() => carouselApi?.scrollTo(i)}
                  className={`w-10 h-11 sm:w-12 sm:h-14 flex items-center justify-center transition-all duration-300 ${
                    i === activeProduct
                      ? "bg-foreground text-background"
                      : "border border-border text-muted-foreground hover:text-foreground hover:border-foreground"
                  }`}
                  style={{ clipPath: "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)" }}
                >
                  <m.icon className="w-5 h-5" />
                </button>
              ))}
            </div>
            <Carousel
              className="max-w-4xl mx-auto"
              opts={{ loop: true, align: "center" }}
              setApi={setCarouselApi}
            >
              <CarouselContent>
                {products.map((m, i) => (
                  <CarouselItem key={m.title} className="basis-[88%] md:basis-[72%]">
                    <div
                      className={`hud-corners relative border border-border p-8 md:p-10 text-center bg-background h-full transition-all duration-500 ${
                        i === activeProduct ? "opacity-100" : "opacity-40"
                      }`}
                    >
                      <div className="hud-corners-inner absolute inset-0 pointer-events-none" />
                      <span
                        aria-hidden
                        className="absolute top-3 right-5 text-5xl md:text-6xl font-bold text-foreground/[0.05] select-none leading-none"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="coord-tag mb-2">{m.eyebrow}</div>
                      <div
                        className="mx-auto w-14 h-14 flex items-center justify-center mb-5 bg-border"
                        style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                      >
                        <m.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-2">{m.title}</h3>
                      <p className="text-sm text-muted-foreground max-w-lg mx-auto mb-6 leading-relaxed">
                        {m.desc}
                      </p>
                      <Link href={m.href} className="hex-btn hex-btn-primary">
                        {m.cta}
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </div>
        </section>

        {/* FLEET MANAGEMENT */}
        <section className="border-t border-border py-20 relative">
          <span className="section-marginalia">Fleet</span>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="coord-tag mb-3">002 // Fleet Management</div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                  Not one device. A fleet.
                </h2>
                <p className="text-muted-foreground mb-5 text-sm leading-relaxed">
                  Deploy multiple units across a production line, warehouse, or field site. Each device operates independently; Osmograph Desktop aggregates everything into one view.
                </p>
                <div className="space-y-2 mb-6">
                  {[
                    "Independent baselines per device — no cross-contamination",
                    "Centralized session recording with device identification",
                    "OLED layouts and buzzer patterns configurable per unit",
                    "Health status, poisoning alerts at a glance",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1 h-1 bg-foreground mt-2 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <Link href="/osmograph" className="hex-btn hex-btn-primary">
                  Manage with Osmograph
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="hud-corners border border-border p-6 bg-background relative">
                <div className="hud-corners-inner absolute inset-0 pointer-events-none" />
                <div className="coord-tag mb-3">Fleet Overview</div>
                <div className="space-y-3 data-readout">
                  {[
                    { id: "SM-001", location: "Line A — Fermentation", status: "ACTIVE", health: "98%", lastSeen: "2s ago" },
                    { id: "SM-002", location: "Line B — Packaging", status: "ACTIVE", health: "94%", lastSeen: "5s ago" },
                    { id: "SM-003", location: "Cold Storage", status: "ALERT", health: "87%", lastSeen: "1s ago" },
                    { id: "SM-004", location: "Warehouse East", status: "IDLE", health: "91%", lastSeen: "3h ago" },
                  ].map((device) => (
                    <div key={device.id} className="border border-border p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-foreground font-medium">{device.id}</span>
                        <span className={`text-[10px] font-mono ${device.status === "ALERT" ? "text-red-400" : device.status === "IDLE" ? "text-muted-foreground" : "text-green-400"}`}>
                          {device.status}
                        </span>
                      </div>
                      <div className="text-[10px] text-muted-foreground">{device.location}</div>
                      <div className="flex items-center justify-between mt-1 text-[10px] text-muted-foreground">
                        <span>Health: {device.health}</span>
                        <span>Last: {device.lastSeen}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SCENT SEARCH */}
        <section ref={searchRef} className="border-t border-border py-20 bg-hex">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="hex-icon text-muted-foreground" />
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Scent Search</h2>
                <span className="hex-icon text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm mt-1">
                4,800+ chemical-odour relationships from Pyrfume.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-4xl mx-auto">
              <div className="hud-corners border border-border p-5 relative">
                <div className="hud-corners-inner absolute inset-0 pointer-events-none" />
                <h3 className="font-semibold text-sm mb-1">Find chemicals by smell</h3>
                <p className="text-xs text-muted-foreground mb-3">e.g. citrus, floral, woody, aldehydic</p>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="citrus, floral, woody..."
                    className="flex-1 bg-transparent border border-border px-3 py-2 text-sm focus:outline-none focus:border-foreground transition-colors"
                    onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit(e.currentTarget.value, "odor")}
                  />
                  <button
                    onClick={() => {
                      const el = document.querySelector<HTMLInputElement>('input[placeholder*="citrus"]')
                      handleSearchSubmit(el?.value || "citrus", "odor")
                    }}
                    className="bg-foreground text-background px-3 py-2 hover:opacity-90 transition-opacity"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {["citrus", "floral", "woody", "aldehydic"].map((term) => (
                    <button key={term} onClick={() => handleSearchSubmit(term, "odor")}
                      className="text-xs border border-border px-2.5 py-1 hover:bg-foreground hover:text-background transition-all">
                      {term}
                    </button>
                  ))}
                </div>
              </div>
              <div className="hud-corners border border-border p-5 relative">
                <div className="hud-corners-inner absolute inset-0 pointer-events-none" />
                <h3 className="font-semibold text-sm mb-1">Find smells by chemical</h3>
                <p className="text-xs text-muted-foreground mb-3">e.g. vanillin, limonene, benzaldehyde</p>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="vanillin, limonene..."
                    className="flex-1 bg-transparent border border-border px-3 py-2 text-sm focus:outline-none focus:border-foreground transition-colors"
                    onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit(e.currentTarget.value, "chemical")}
                  />
                  <button
                    onClick={() => {
                      const el = document.querySelector<HTMLInputElement>('input[placeholder*="vanillin"]')
                      handleSearchSubmit(el?.value || "vanillin", "chemical")
                    }}
                    className="bg-foreground text-background px-3 py-2 hover:opacity-90 transition-opacity"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {["vanillin", "limonene", "benzaldehyde", "eugenol"].map((term) => (
                    <button key={term} onClick={() => handleSearchSubmit(term, "chemical")}
                      className="text-xs border border-border px-2.5 py-1 hover:bg-foreground hover:text-background transition-all">
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DONATE */}
        <section className="border-t border-border py-20 relative">
          <span className="section-marginalia">Support</span>
          <div className="max-w-xl mx-auto text-center px-6">
            <p className="text-muted-foreground text-sm mb-4">
              Donations go to cloud compute, sensor prototyping, and community building.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <a href="https://discord.gg/CGER3tHxbH" target="_blank" rel="noopener noreferrer"
                className="hex-btn hex-btn-outline">
                <MessageSquare className="w-4 h-4" />
                Join Discord
              </a>
              <a href="https://github.com/opensmell" target="_blank" rel="noopener noreferrer"
                className="hex-btn hex-btn-outline">
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </div>
            <div className="hud-corners border border-border p-4 bg-background/80 backdrop-blur-sm w-full relative">
              <div className="hud-corners-inner absolute inset-0 pointer-events-none" />
              <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest mb-2">
                Donate USDC — Polygon
              </div>
              <div className="flex items-center gap-2 w-full min-w-0">
                <code className="flex-1 min-w-0 text-xs font-mono border border-border px-3 py-2 bg-foreground/5 truncate">
                  0x699d0178f16484509f57d4d77f310b6b617621ce
                </code>
                <button
                  onClick={() => navigator.clipboard.writeText("0x699d0178f16484509f57d4d77f310b6b617621ce")}
                  className="hex-btn hex-btn-primary flex-shrink-0"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Search, Github, MessageSquare, ChevronRight, ExternalLink, BookOpen,
  Hexagon, Sigma, Database, Cpu, Monitor, BarChart3, Wind, AlertTriangle,
  FlaskConical, Store, Shield, Zap, Activity, Leaf, Factory, Thermometer
} from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from "@/components/ui/carousel"
import { useTheme } from "next-themes"
import AnimatedHero from "@/components/animated-hero"
import ThemeToggle from "@/components/theme-toggle"
import MobileNav from "@/components/mobile-nav"

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
    title: "The Smell Monitor",
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
  {
    icon: Leaf,
    title: "Food Safety",
    tagline: "Detect spoilage before it reaches the shelf.",
    desc: "Mahalanobis anomaly detection on 838K food-freshness samples. 59 food types, 10 MOX sensors, 5-second cold-start.",
    stat: "93.3%",
    statLabel: "accuracy with EWMA",
  },
  {
    icon: Factory,
    title: "Industrial Monitoring",
    tagline: "Continuous VOC monitoring with drift correction.",
    desc: "EWMA alpha=0.001 maintains 93.3% accuracy across tested drift rates. Configurable per use case — fermentation, safety, or research.",
    stat: "93.3%",
    statLabel: "with drift correction",
  },
  {
    icon: Shield,
    title: "Poisoning Detection",
    tagline: "Detect sensor degradation before it corrupts your data.",
    desc: "Sensitivity decay, noise floor, recovery rate, and baseline drift. Triple-redundant detectors flag issues before false results.",
    stat: "4",
    statLabel: "signals tracked",
  },
  {
    icon: AlertTriangle,
    title: "Gas Leak Detection",
    tagline: "Anomaly detection with fail-safe escalation.",
    desc: "Mahalanobis distance at 3-sigma threshold. Triple-redundant voting: standard, conservative, sensitive detectors.",
    stat: "3-sigma",
    statLabel: "detection threshold",
  },
  {
    icon: Thermometer,
    title: "Cold Chain Storage",
    tagline: "Temperature excursion detection in real-time.",
    desc: "DHT11 temperature/humidity compensation. Sensors detect chemical changes before temperature loggers register the event.",
    stat: "5 sec",
    statLabel: "cold start",
  },
  {
    icon: FlaskConical,
    title: "Breath Analysis Research",
    tagline: "MOX sensor arrays for exhaled-VOC studies.",
    desc: "Open protocol for reproducible experiments. 8 MOX sensors achieved 97.1% accuracy on COPD breath data (Acevedo et al. 2021).",
    stat: "97.1%",
    statLabel: "COPD accuracy",
  },
  {
    icon: Zap,
    title: "Smart Agriculture",
    tagline: "Soil health and crop decay monitoring.",
    desc: "6-slot sensor array with swappable elements. Fleet management for multiple field sensors.",
    stat: "6",
    statLabel: "sensor slots",
  },
  {
    icon: Cpu,
    title: "Robotics & Custom",
    tagline: "Embed chemical sensing into autonomous systems.",
    desc: "Open SDK, open protocol, 4-pin sensor interface. Build custom software profiles for any environment.",
    stat: "Open",
    statLabel: "SDK & protocol",
  },
]

export default function Home() {
  const [hydrated, setHydrated] = useState(false)
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)
  const [activeProduct, setActiveProduct] = useState(0)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { theme } = useTheme()

  useEffect(() => { setHydrated(true) }, [])

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

  const isDark = theme === "dark"

  if (!hydrated) return null

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <main>
        {/* HERO — compact, CTAs above fold */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden">
          <AnimatedHero />
          <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-28 pb-16">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3 leading-[1.1]">
                Machines can see. Machines can hear.<br />
                We build for machines to <span className="text-muted-foreground">smell.</span>
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground max-w-lg mb-6 leading-relaxed">
                Continuous chemical anomaly monitoring using modular gas-sensor arrays. Open-source firmware, SDK, and data commons.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/smell-monitor"
                  className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-all"
                >
                  Explore Smell Monitor
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/enose"
                  className="inline-flex items-center justify-center gap-2 border border-border px-5 py-2.5 text-sm font-medium hover:bg-foreground hover:text-background transition-all"
                >
                  Build with OpenSmell
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* STATS BAR — compact */}
        <section className="border-t border-border bg-background">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Validated Samples", value: "1M+" },
                { label: "EWMA-Corrected Accuracy", value: "93.3%" },
                { label: "Cold-Start Time", value: "5 sec" },
                { label: "Anomaly Detection", value: "100%" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold tracking-tight mb-0.5">{stat.value}</div>
                  <div className="text-[11px] text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SMELL MONITOR — primary product */}
        <section className="border-t border-border py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border text-xs font-mono text-muted-foreground mb-4">
                  <Monitor className="w-3.5 h-3.5" />
                  SMELL MONITOR
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
                  Continuous chemical anomaly monitoring.
                </h2>
                <p className="text-muted-foreground mb-5 leading-relaxed">
                  Modular gas-sensor arrays with automatic drift correction. Detect chemical changes in fermentation, food storage, industrial processes, or any environment where air composition matters.
                </p>
                <div className="space-y-2 mb-6">
                  {[
                    "Up to 6 MOX sensor channels — configure for your chemistry",
                    "Temperature and humidity compensation",
                    "OLED status display and programmable buzzer",
                    "Fleet management for multiple devices",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1 h-1 bg-foreground mt-2 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <Link
                  href="/smell-monitor"
                  className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-all"
                >
                  See the Smell Monitor
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="hex-box border border-border p-6 bg-background">
                <div className="coord-tag mb-3">Detection Pipeline</div>
                <div className="space-y-4 data-readout">
                  {[
                    { step: "01", text: "Raw MOX readings at 10Hz" },
                    { step: "02", text: "EWMA baseline correction" },
                    { step: "03", text: "Mahalanobis distance anomaly detection" },
                    { step: "04", text: "Triple-redundant fail-safe voting" },
                    { step: "05", text: "Poisoning detector flags degradation" },
                    { step: "06", text: "User labels events — adaptive learning" },
                  ].map((s) => (
                    <div key={s.step} className="flex items-center gap-3">
                      <span className="text-muted-foreground opacity-50">{s.step}</span>
                      <span className="h-px flex-1 bg-border" />
                      <span className="text-sm text-muted-foreground">{s.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* USE CASES — compact grid */}
        <section className="border-t border-border py-20 bg-hex">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                Applications
              </h2>
              <p className="text-muted-foreground text-sm max-w-xl">
                From food safety to clinical diagnostics — backed by measured results on real sensor data.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {useCases.map((uc) => (
                <div key={uc.title} className="hex-box border border-border p-5 bg-background hover:bg-foreground hover:text-background transition-all duration-300 group">
                  <div className="flex items-start justify-between mb-3">
                    <uc.icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    <div className="text-right">
                      <div className="text-xl font-bold tracking-tight">{uc.stat}</div>
                      <div className="text-[10px] text-muted-foreground group-hover:text-background/70">{uc.statLabel}</div>
                    </div>
                  </div>
                  <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest mb-0.5">{uc.tagline}</div>
                  <h3 className="text-sm font-semibold mb-1">{uc.title}</h3>
                  <p className="text-xs text-muted-foreground group-hover:text-background/70 leading-relaxed transition-colors">{uc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DETECTION PIPELINE — honest numbers */}
        <section className="border-t border-border py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                Detection pipeline
              </h2>
              <p className="text-muted-foreground text-sm max-w-xl">
                Every number comes from our experiments on real MOX sensor datasets.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {[
                { metric: "Food Freshness Accuracy", value: "93.3%", source: "838K samples, 10 MOX sensors, 59 food types — with EWMA correction" },
                { metric: "Anomaly Detection", value: "100%", source: "Mahalanobis distance at 3-sigma threshold across all datasets" },
                { metric: "Cold-Start Minimum", value: "5 sec", source: "50 samples at 10Hz — plateaus at 100+, 75 recommended" },
                { metric: "EWMA Drift Correction", value: "alpha=0.001", source: "Maintains 93.3% accuracy across tested drift rates. Configurable per use case." },
              ].map((item) => (
                <div key={item.metric} className="border border-border p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm">{item.metric}</span>
                    <span className="font-mono text-sm font-bold">{item.value}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{item.source}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
              Without EWMA correction, accuracy drops to 71.4%. With alpha=0.001, it holds at 93.3%.
              EWMA is not suitable for all use cases — fermentation monitoring, for example, requires different parameters because the signal you want to detect is slow-changing. See the detection pipeline docs for details.
            </p>
          </div>
        </section>

        {/* OPEN DATA — link to evaluation */}
        <section className="border-t border-border py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                Validated on open data
              </h2>
              <p className="text-muted-foreground text-sm max-w-xl">
                1M+ samples across 4 independent datasets. Every claim traceable to a source.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
                  className="border border-border p-4 hover:bg-foreground hover:text-background transition-all duration-300 group"
                >
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="border border-border p-4">
                <h4 className="font-semibold text-sm mb-1">EWMA Baseline Correction</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">alpha=0.001 maintains 93.3% across tested drift rates. Without it: 71.4%.</p>
              </div>
              <div className="border border-border p-4">
                <h4 className="font-semibold text-sm mb-1">Cold-Start Performance</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">50 samples (5 seconds) minimum viable. 75 recommended. Plateaus at 100+.</p>
              </div>
              <div className="border border-border p-4">
                <h4 className="font-semibold text-sm mb-1">Clinical Breath Analysis</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">97.1% LOO accuracy on COPD data (Acevedo et al. 2021, 8 sensors, 68 patients, CC BY 4.0). Single-dataset result — larger validation needed.</p>
              </div>
            </div>
          </div>
        </section>

        {/* THE STACK CAROUSEL */}
        <section className="border-t border-border py-20 bg-hex">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                The open stack
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Search, hardware, software, e-nose builder, appstore, academy.
              </p>
            </div>
            <div className="flex items-center gap-2 md:gap-3 flex-wrap mb-10">
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
                      className={`hex-box relative border border-border p-8 md:p-10 text-center bg-background h-full transition-all duration-500 ${
                        i === activeProduct ? "opacity-100" : "opacity-40"
                      }`}
                    >
                      <span
                        aria-hidden
                        className="absolute top-3 right-5 text-5xl md:text-6xl font-bold text-foreground/[0.05] select-none leading-none"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div
                        className="mx-auto w-14 h-14 flex items-center justify-center mb-5 bg-border"
                        style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                      >
                        <m.icon className="w-6 h-6" />
                      </div>
                      <div className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-2">
                        {m.eyebrow}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-2">{m.title}</h3>
                      <p className="text-sm text-muted-foreground max-w-lg mx-auto mb-6 leading-relaxed">
                        {m.desc}
                      </p>
                      <Link
                        href={m.href}
                        className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-all"
                      >
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

        {/* THE FOUR PILLARS */}
        <section className="border-t border-border py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                The four pillars
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Hardware, data, protocol, software — each open, each essential.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Cpu, title: "Open Hardware", desc: "Modular monitoring node. Open 4-pin sensor interface. Cartridge-swap architecture.", link: "/smell-monitor" },
                { icon: Database, title: "Open Data", desc: "5-metric quality scoring. SHA-256 dedup. 1M+ samples validated across 4 datasets.", link: "https://github.com/opensmell/data-commons" },
                { icon: Hexagon, title: "Open Protocol", desc: "OSM serial format. .osmell data files. Temporal features reproducible across devices.", link: "https://github.com/opensmell/interoperability" },
                { icon: Sigma, title: "Open SDK", desc: "Mahalanobis detection, adaptive baselines, fail-safe system, poisoning detection.", link: "https://github.com/opensmell/Osmograph" },
              ].map((item) => (
                <a
                  key={item.title}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hex-box group p-5 border border-border hover:bg-foreground hover:text-background transition-all duration-300"
                >
                  <item.icon className="w-7 h-7 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-sm font-semibold mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground group-hover:text-background/70 transition-colors leading-relaxed">
                    {item.desc}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FLEET MANAGEMENT */}
        <section className="border-t border-border py-20 bg-hex">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border text-xs text-muted-foreground mb-4">
                  <Monitor className="w-3.5 h-3.5" />
                  Fleet Management
                </div>
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
                <Link
                  href="/osmograph"
                  className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-all"
                >
                  Manage with Osmograph
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="hex-box hud-corners border border-border p-6 bg-background relative">
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
        <section ref={searchRef} className="border-t border-border py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Scent Search
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                4,800+ chemical-odour relationships from Pyrfume.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-4xl mx-auto">
              <div className="border border-border p-5">
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
              <div className="border border-border p-5">
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

        {/* MULTI-PATH CTA */}
        <section className="border-t border-border py-20 bg-hex">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Start here
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  eyebrow: "I want to monitor",
                  title: "Deploy Smell Monitor",
                  desc: "Industrial monitoring, food safety, leak detection. Plug in sensors, connect via USB or Bluetooth, start getting readings.",
                  cta: "See the hardware",
                  href: "/smell-monitor",
                },
                {
                  eyebrow: "I want to build",
                  title: "Use the OpenSmell SDK",
                  desc: "Anomaly detection, adaptive baselines, poisoning detection. Open protocol, reproducible results.",
                  cta: "Read the docs",
                  href: "https://github.com/opensmell/Osmograph",
                },
                {
                  eyebrow: "I want to research",
                  title: "Explore the data",
                  desc: "4,800+ chemical-odor relationships, 1M+ validated samples, open datasets.",
                  cta: "Try Scent Search",
                  href: "/search",
                },
              ].map((path) => (
                <Link
                  key={path.title}
                  href={path.href}
                  className="hex-box border border-border p-5 hover:bg-foreground hover:text-background transition-all duration-300 group"
                >
                  <div className="coord-tag mb-2">{path.eyebrow}</div>
                  <h3 className="text-base font-semibold mb-1">{path.title}</h3>
                  <p className="text-xs text-muted-foreground group-hover:text-background/70 leading-relaxed mb-4">{path.desc}</p>
                  <div className="inline-flex items-center gap-1.5 text-sm font-medium">
                    {path.cta}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
              <a href="https://discord.gg/CGER3tHxbH" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-border px-5 py-2.5 text-sm font-medium hover:bg-foreground hover:text-background transition-all">
                <MessageSquare className="w-4 h-4" />
                Join Discord
              </a>
              <a href="https://github.com/opensmell" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-border px-5 py-2.5 text-sm font-medium hover:bg-foreground hover:text-background transition-all">
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </div>
        </section>

        {/* DONATE */}
        <section className="border-t border-border py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                Support open research
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                Donations go directly to cloud compute, sensor prototyping, and community building.
              </p>
              <div className="flex flex-col items-center gap-3 border border-border p-6 bg-background/80 backdrop-blur-sm w-full">
                <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
                  Donate USDC — Polygon Network
                </div>
                <div className="flex items-center gap-2 w-full min-w-0">
                  <code className="flex-1 min-w-0 text-xs font-mono border border-border px-3 py-2 bg-foreground/5 truncate">
                    0x699d0178f16484509f57d4d77f310b6b617621ce
                  </code>
                  <button
                    onClick={() => navigator.clipboard.writeText("0x699d0178f16484509f57d4d77f310b6b617621ce")}
                    className="flex items-center gap-1.5 bg-foreground text-background px-3 py-2 text-xs font-medium hover:opacity-90 transition-all flex-shrink-0"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

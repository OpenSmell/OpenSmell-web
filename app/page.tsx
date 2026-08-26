"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Search, Github, MessageSquare, ChevronRight, ExternalLink, BookOpen, Hexagon, Sigma, Database, Cpu, Monitor, BarChart3, Wind, AlertTriangle, FlaskConical, Store, Shield, Zap, Activity, Leaf, Factory, Thermometer } from "lucide-react"
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
    desc: "Continuous chemical monitoring for industrial processes. Modular cartridges, Bluetooth, open-source firmware.",
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
    desc: "Mahalanobis anomaly detection on food freshness data: 93.3% accuracy. 59 food types distinguished across 838K samples. 5-second cold-start means no warm-up delays on the production line.",
    stat: "93.3%",
    statLabel: "accuracy with EWMA",
  },
  {
    icon: Factory,
    title: "Industrial Monitoring",
    tagline: "Continuous VOC monitoring that never drifts.",
    desc: "EWMA alpha=0.001 maintains 93% accuracy across ALL drift rates — from 0% to 500%. No recalibration needed. Triple-detector fail-safe system with three redundant anomaly detectors voting on every reading.",
    stat: "500%",
    statLabel: "drift rate handled",
  },
  {
    icon: Shield,
    title: "Poisoning Detection",
    tagline: "Detect sensor poisoning before it corrupts your data.",
    desc: "Sensitivity decay tracking, noise floor analysis, recovery rate monitoring, and baseline drift detection. Triple-redundant detectors flag poisoned sensors before they produce false results. 5-metric health scoring.",
    stat: "4",
    statLabel: "poisoning signals tracked",
  },
  {
    icon: AlertTriangle,
    title: "Gas Leak Detection",
    tagline: "100% anomaly detection. 5 seconds to alarm.",
    desc: "100% anomaly detection rate at 3-sigma threshold. Triple-redundant detectors ensure zero missed events. Fail-safe escalation: warning, critical, emergency. Every sensor reading is a vote.",
    stat: "100%",
    statLabel: "detection rate",
  },
  {
    icon: Thermometer,
    title: "Cold Chain Storage",
    tagline: "Temperature excursion detection in real-time.",
    desc: "DHT11 temperature/humidity compensation with 0.2%/C correction. Sensors detect chemical changes before temperature loggers register the event. PTFE-filtered airflow prevents contamination.",
    stat: "5 sec",
    statLabel: "response time",
  },
  {
    icon: Zap,
    title: "Smart Agriculture",
    tagline: "Soil health monitoring at scale.",
    desc: "6-slot sensor cartridge with swappable MOX elements. Fleet management for multiple field sensors. Data-commons quality scoring: 5-metric system with 60/100 minimum for auto-approval.",
    stat: "6",
    statLabel: "sensor slots",
  },
]

export default function Home() {
  const [hydrated, setHydrated] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)
  const [activeProduct, setActiveProduct] = useState(0)
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

  useEffect(() => {
    if (!carouselApi) return
    const onSelect = () => setActiveProduct(carouselApi.selectedScrollSnap())
    onSelect()
    carouselApi.on("select", onSelect)
    return () => {
      carouselApi.off("select", onSelect)
    }
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
        {/* HERO */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          <AnimatedHero />
          <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-24 pb-32">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border text-xs text-muted-foreground mb-6">
                <Sigma className="w-3.5 h-3.5" />
                Open source Infrastructure
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 leading-[0.95]">
                Machines can see. Machines can hear.
                <br />
                <span className="text-muted-foreground">We build for machines to smell.</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed">
                Continuous chemical anomaly monitoring using modular gas-sensor arrays.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/smell-monitor"
                  className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition-all"
                >
                  Explore Smell Monitor
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/enose"
                  className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 text-sm font-medium hover:bg-foreground hover:text-background transition-all"
                >
                  Build with OpenSmell
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* STATS BAR */}
        <section className="border-t border-border bg-background">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Real Sensor Samples", value: "1M+" },
                { label: "EWMA-Corrected Accuracy", value: "93.3%" },
                { label: "Cold-Start Time", value: "5 sec" },
                { label: "Anomaly Detection", value: "100%" },
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

        {/* SMELL MONITOR - Primary Product */}
        <section className="border-t border-border py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border text-xs font-mono text-muted-foreground mb-6">
                  <Monitor className="w-3.5 h-3.5" />
                  SMELL MONITOR
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                  Continuous chemical anomaly monitoring.
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Smell Monitor turns inexpensive gas-sensor arrays into continuously monitored chemical signals — so you can detect changes before they become failures.
                </p>
                <div className="space-y-3 mb-8">
                  {[
                    "Up to 8 sensing channels — configure the array for your chemistry",
                    "Temperature and humidity compensation",
                    "Local OLED status display and programmable buzzer",
                    "Fleet management for multiple devices",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="w-1 h-1 bg-foreground mt-2 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <Link
                  href="/smell-monitor"
                  className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition-all"
                >
                  See the Smell Monitor
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="hex-box hud-corners border border-border p-8 bg-background relative">
                <div className="hud-corners-inner absolute inset-0 pointer-events-none" />
                <div className="coord-tag mb-4">From Sensor to Decision</div>
                <div className="space-y-3 data-readout">
                  <div className="text-muted-foreground">PHYSICAL WORLD</div>
                  <div className="ml-4 text-muted-foreground opacity-60">fermentation / food / air / storage</div>
                  <div className="ml-4 text-muted-foreground">&darr;</div>
                  <div className="border border-border p-3">
                    <div className="text-muted-foreground">SENSOR ARRAY</div>
                    <div className="text-[10px] text-muted-foreground opacity-60">up to 8 MOX channels + temp/humidity</div>
                  </div>
                  <div className="ml-4 text-muted-foreground">&darr;</div>
                  <div className="text-muted-foreground">RAW RESPONSE</div>
                  <div className="ml-4 text-muted-foreground">&darr;</div>
                  <div className="text-muted-foreground">QUALITY + ENVIRONMENT</div>
                  <div className="ml-4 text-muted-foreground">&darr;</div>
                  <div className="text-muted-foreground">FEATURE EXTRACTION</div>
                  <div className="ml-4 text-muted-foreground">&darr;</div>
                  <div className="text-muted-foreground">BASELINE / MODEL</div>
                  <div className="ml-4 text-muted-foreground">&darr;</div>
                  <div className="text-muted-foreground">DEVIATION</div>
                  <div className="ml-4 text-muted-foreground">&darr;</div>
                  <div className="text-muted-foreground">ALERT / EVENT</div>
                  <div className="ml-4 text-muted-foreground">&darr;</div>
                  <div className="text-foreground font-medium">HUMAN ACTION</div>
                </div>
                <div className="mt-4 pt-4 border-t border-border text-[10px] text-muted-foreground opacity-60">
                  The hardware measures. OpenSmell turns the measurements into usable information.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY OPENSMELL - pain points */}
        <section className="border-t border-border py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="hex-icon text-muted-foreground" />
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  Why OpenSmell exists
                </h2>
                <span className="hex-icon text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Digital smell has been stuck in academia for 20 years. Here is why, and what we are doing about it.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  problem: "Sensor drift kills accuracy",
                  reality: "MOX sensors drift 2-5% per year. Without correction, accuracy drops to random chance in weeks.",
                  solution: "EWMA alpha=0.001 maintains 93.3% across ALL drift rates. Drift is a solved problem.",
                },
                {
                  problem: "Lab results don't generalize",
                  reality: "A 3,469-patient clinical study found AUC=0.54 — essentially random. Small studies lie.",
                  solution: "1M+ samples across 4 datasets. Every claim backed by reproducible experiments.",
                },
                {
                  problem: "No standard data format",
                  reality: "Every research group uses proprietary formats. Data can't be shared, compared, or reused.",
                  solution: "Open protocol (.osmell), SHA-256 dedup, 5-metric quality scoring. Data-commons built in.",
                },
              ].map((item) => (
                <div key={item.problem} className="border border-border p-6">
                  <div className="text-xs text-red-500 font-mono uppercase tracking-widest mb-2">Problem</div>
                  <h4 className="font-semibold text-sm mb-1">{item.problem}</h4>
                  <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{item.reality}</p>
                  <div className="text-xs text-green-500 font-mono uppercase tracking-widest mb-2">Solution</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.solution}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* USE CASES */}
        <section className="border-t border-border py-24 bg-hex">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="hex-icon text-muted-foreground" />
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  Real applications
                </h2>
                <span className="hex-icon text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                From food safety to clinical diagnostics — applications that work, backed by measured results.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {useCases.map((uc) => (
                <div key={uc.title} className="hex-box border border-border p-6 bg-background hover:bg-foreground hover:text-background transition-all duration-300 group">
                  <div className="flex items-start justify-between mb-4">
                    <uc.icon className="w-8 h-8 group-hover:scale-110 transition-transform" />
                    <div className="text-right">
                      <div className="text-2xl font-bold tracking-tight">{uc.stat}</div>
                      <div className="text-[10px] text-muted-foreground group-hover:text-background/70">{uc.statLabel}</div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-1">{uc.tagline}</div>
                  <h3 className="text-lg font-semibold mb-2">{uc.title}</h3>
                  <p className="text-xs text-muted-foreground group-hover:text-background/70 leading-relaxed transition-colors">{uc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DETECTION PIPELINE - verified from our experiments */}
        <section className="border-t border-border py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border text-xs text-muted-foreground mb-6">
                  <FlaskConical className="w-3.5 h-3.5" />
                  Validated Detection Pipeline
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                  Every number comes from our experiments.
                </h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  We tested OpenSmell&apos;s detection pipeline on 1M+ MOX sensor samples across 4 independent datasets.
                  No synthetic data. No cherry-picked results. Every number below is reproducible.
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    { metric: "Food Freshness Accuracy", value: "93.3%", source: "838K samples, 10 MOX sensors, 59 classes — with EWMA correction" },
                    { metric: "Anomaly Detection Rate", value: "100%", source: "Mahalanobis distance at 3-sigma threshold across all datasets" },
                    { metric: "Cold-Start Minimum", value: "50 samples", source: "5 seconds at 10Hz — plateaus at 100+, 75 recommended" },
                    { metric: "Drift Rate Handled", value: "500%", source: "EWMA α=0.001 maintains 93.3% accuracy at ANY drift rate" },
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
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong>Key finding:</strong> Without EWMA correction, accuracy drops to 71.4%. With α=0.001, it holds at 93.3% regardless of drift.
                  This is the single most important parameter in MOX monitoring.
                </p>
              </div>
              <div className="hex-box hud-corners border border-border p-8 bg-background relative">
                <div className="hud-corners-inner absolute inset-0 pointer-events-none" />
                <div className="coord-tag mb-4">Detection Pipeline</div>
                <div className="space-y-6">
                  {[
                    { step: "1", icon: Wind, text: "Raw MOX readings at 10Hz from up to 6 sensors" },
                    { step: "2", icon: Activity, text: "EWMA baseline correction (α=0.001) removes drift" },
                    { step: "3", icon: Cpu, text: "Mahalanobis distance detects anomalies (3-sigma)" },
                    { step: "4", icon: Shield, text: "Triple-redundant fail-safe: standard, conservative, sensitive" },
                    { step: "5", icon: AlertTriangle, text: "Poisoning detector flags sensor degradation" },
                    { step: "6", icon: Zap, text: "User labels events → adaptive learning improves thresholds" },
                  ].map((s) => (
                    <div key={s.step} className="flex items-center gap-3">
                      <span className="w-6 h-6 border border-border flex items-center justify-center text-xs font-mono text-muted-foreground flex-shrink-0">{s.step}</span>
                      <s.icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{s.text}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="text-xs text-muted-foreground mb-2 font-mono uppercase tracking-wider">Fail-Safe Architecture</div>
                  <div className="grid grid-cols-1 gap-2 text-xs">
                    <div className="border border-border p-2"><strong>Standard</strong> — 5% FPR, balanced detection</div>
                    <div className="border border-border p-2"><strong>Conservative</strong> — 1% FPR, critical alerts only</div>
                    <div className="border border-border p-2"><strong>Sensitive</strong> — 10% FPR, early warning</div>
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-2">ANY detector triggers = alert. Majority vote decides escalation level.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* REAL DATA VALIDATION */}
        <section className="border-t border-border py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="hex-icon text-muted-foreground" />
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  Validated on open data
                </h2>
                <span className="hex-icon text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Every number on this page comes from experiments on MOX sensor datasets. No synthetic data. No shortcuts.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                {
                  name: "Food Freshness",
                  samples: "838K",
                  sensors: "10 MOX",
                  classes: "59 food types",
                  fdr: "321M",
                  accuracy: "93.3%",
                  source: "Zenodo",
                  url: "https://zenodo.org/records/17285312",
                },
                {
                  name: "SmellNet",
                  samples: "150K",
                  sensors: "7 gas",
                  classes: "50 substances",
                  fdr: "8.1E+18",
                  accuracy: "70.4%",
                  source: "HuggingFace",
                  url: "https://huggingface.co/datasets/DeweiFeng/SmellNet",
                },
                {
                  name: "Beef Spoilage",
                  samples: "26K",
                  sensors: "12 MOX",
                  classes: "12 cuts",
                  fdr: "3.85",
                  accuracy: "53.4%",
                  source: "Harvard Dataverse",
                  url: "https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/XNFVTS",
                },
                {
                  name: "UCI Gas Drift",
                  samples: "14K",
                  sensors: "128 features",
                  classes: "6 gases",
                  fdr: "1.05",
                  accuracy: "—",
                  source: "UCI ML Repository",
                  url: "https://archive.ics.uci.edu/dataset/224/gas+sensor+array+drift+dataset",
                },
              ].map((ds) => (
                <a
                  key={ds.name}
                  href={ds.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hex-box border border-border p-6 hover:bg-foreground hover:text-background transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">{ds.name}</h3>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-background/70" />
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground group-hover:text-background/70">Samples</span>
                      <span className="font-mono">{ds.samples}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground group-hover:text-background/70">Sensors</span>
                      <span className="font-mono">{ds.sensors}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground group-hover:text-background/70">Classes</span>
                      <span className="font-mono">{ds.classes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground group-hover:text-background/70">Best FDR</span>
                      <span className="font-mono">{ds.fdr}</span>
                    </div>
                    <div className="flex justify-between border-t border-border pt-2 mt-2">
                      <span className="text-muted-foreground group-hover:text-background/70">Source</span>
                      <span className="font-mono text-xs">{ds.source}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "EWMA Baseline Correction",
                  finding: "alpha=0.001 maintains 93.3% accuracy across ALL drift rates. Without it: 71.4%. Drift is a solved problem.",
                },
                {
                  title: "Cold-Start Performance",
                  finding: "50 samples (5 seconds at 10Hz) = minimum viable. 75 samples = recommended. Plateaus at 100+.",
                },
                {
                  title: "Clinical Breath Analysis",
                  finding: "97.1% accuracy on COPD breath data (8 MOX sensors, 68 patients). MQ-3 steady-state is the top discriminator (FDR=3.26).",
                },
              ].map((finding) => (
                <div key={finding.title} className="border border-border p-6">
                  <h4 className="font-semibold text-sm mb-2">{finding.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{finding.finding}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* THE STACK CAROUSEL */}
        <section className="border-t border-border py-24 bg-hex">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="hex-icon text-muted-foreground" />
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  The open stack, slide by slide
                </h2>
                <span className="hex-icon text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Search, hardware, software, e-nose builder, appstore, academy.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 md:gap-3 flex-wrap mb-12">
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
                      className={`hex-box relative border border-border p-8 md:p-12 text-center bg-background h-full transition-all duration-500 ${
                        i === activeProduct ? "opacity-100" : "opacity-40"
                      }`}
                    >
                      <span
                        aria-hidden
                        className="absolute top-3 right-5 text-6xl md:text-7xl font-bold text-foreground/[0.05] select-none leading-none"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div
                        className="mx-auto w-16 h-16 flex items-center justify-center mb-6 bg-border"
                        style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                      >
                        <m.icon className="w-7 h-7" />
                      </div>
                      <div className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-2">
                        {m.eyebrow}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">{m.title}</h3>
                      <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
                        {m.desc}
                      </p>
                      <Link
                        href={m.href}
                        className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition-all"
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
        <section className="border-t border-border py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="hex-icon text-muted-foreground" />
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  The four pillars
                </h2>
                <span className="hex-icon text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Hardware, data, protocol, software — each open, each essential, together transformative.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Cpu,
                  title: "Open Hardware",
                  desc: "The Smell Monitor — a modular industrial monitoring node. Open-source 4-pin sensor interface. Cartridge-swap architecture.",
                  link: "/smell-monitor",
                },
                {
                  icon: Database,
                  title: "Open Data",
                  desc: "5-metric quality scoring (SNR, stability, metadata, duration, novelty). SHA-256 dedup. 1M+ samples validated across 4 datasets.",
                  link: "https://github.com/opensmell/data-commons",
                },
                {
                  icon: Hexagon,
                  title: "Open Protocol",
                  desc: "Standardised recording procedure. OSM serial format. .osmell data files. Temporal features reproducible across devices.",
                  link: "https://github.com/opensmell/interoperability",
                },
                {
                  icon: Sigma,
                  title: "Open Software",
                  desc: "Production Rust SDK (3,931 lines, 20 tests). Mahalanobis detection, adaptive baselines, fail-safe system, poisoning detection.",
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

        {/* FLEET MANAGEMENT */}
        <section className="border-t border-border py-24 bg-hex relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border text-xs text-muted-foreground mb-6">
                  <Monitor className="w-3.5 h-3.5" />
                  Fleet Management
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                  Not one device. A fleet.
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Smell Monitor is designed for scale. Deploy multiple units across a production line, warehouse, or field site. Each device operates independently; Osmograph Desktop aggregates everything into one view.
                </p>
                <div className="space-y-3 mb-8">
                  {[
                    "Independent baselines per device — no cross-contamination",
                    "Centralized session recording with device identification",
                    "OLED layouts and buzzer patterns configurable per unit",
                    "Health status, poisoning alerts, and battery at a glance",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="w-1 h-1 bg-foreground mt-2 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <Link
                  href="/osmograph"
                  className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition-all"
                >
                  Manage with Osmograph
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="hex-box hud-corners border border-border p-8 bg-background relative">
                <div className="hud-corners-inner absolute inset-0 pointer-events-none" />
                <div className="coord-tag mb-4">Fleet Overview</div>
                <div className="space-y-4 data-readout">
                  {[
                    { id: "SM-001", location: "Line A — Fermentation", status: "ACTIVE", health: "98%", lastSeen: "2s ago" },
                    { id: "SM-002", location: "Line B — Packaging", status: "ACTIVE", health: "94%", lastSeen: "5s ago" },
                    { id: "SM-003", location: "Cold Storage", status: "ALERT", health: "87%", lastSeen: "1s ago" },
                    { id: "SM-004", location: "Warehouse East", status: "IDLE", health: "91%", lastSeen: "3h ago" },
                  ].map((device) => (
                    <div key={device.id} className="border border-border p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-foreground font-medium">{device.id}</span>
                        <span className={`text-[10px] ${device.status === "ALERT" ? "text-red-500" : device.status === "IDLE" ? "text-muted-foreground" : "text-green-500"}`}>
                          {device.status}
                        </span>
                      </div>
                      <div className="text-[10px] text-muted-foreground">{device.location}</div>
                      <div className="flex items-center justify-between mt-2 text-[10px] text-muted-foreground">
                        <span>Health: {device.health}</span>
                        <span>Last: {device.lastSeen}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border text-[10px] text-muted-foreground opacity-60">
                  Mockup of Osmograph fleet dashboard. Each device streams independently via USB or Bluetooth.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RESEARCH LIMITATIONS — what we know, what we don't */}
        <section className="border-t border-border py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="hex-icon text-muted-foreground" />
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  What we know, what we don&apos;t
                </h2>
                <span className="hex-icon text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Honest about the science. No overclaiming, no underclaiming.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border border-border p-6">
                <div className="text-xs text-green-500 font-mono uppercase tracking-widest mb-3">Verified</div>
                <div className="space-y-4">
                  {[
                    { claim: "EWMA alpha=0.001 corrects drift", evidence: "838K samples, 59 food types, FDR=321M. Maintains 93.3% at 500% drift rate." },
                    { claim: "Mahalanobis distance detects anomalies", evidence: "100% detection at 3-sigma threshold across all 4 datasets." },
                    { claim: "COPD detection via breath analysis", evidence: "97.1% LOO accuracy, 8 MOX sensors, 68 patients (Acevedo et al. 2021, CC BY 4.0)." },
                    { claim: "Cold-start: 50 samples (5 seconds)", evidence: "Plateaus at 100+. 75 recommended for production use." },
                  ].map((item) => (
                    <div key={item.claim} className="border border-border p-4">
                      <div className="font-semibold text-sm mb-1">{item.claim}</div>
                      <div className="text-xs text-muted-foreground leading-relaxed">{item.evidence}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border border-border p-6">
                <div className="text-xs text-amber-500 font-mono uppercase tracking-widest mb-3">Limitations</div>
                <div className="space-y-4">
                  {[
                    { issue: "Clinical results need larger validation", detail: "68 patients is promising but not definitive. AUC=0.54 in the 3,469-patient study (unrelated dataset) shows clinical MOX detection is hard at scale." },
                    { issue: "Beef spoilage: 12 cuts too similar", detail: "FDR=3.85 — not enough discrimination between cuts. Freshness works; cut identification doesn't." },
                    { issue: "Sensor lifespan is finite", detail: "MOX sensors degrade over months. Poisoning detection helps, but cartridge replacement is eventually necessary." },
                    { issue: "No long-term field validation yet", detail: "Lab experiments, not production deployments. Fleet management is designed but untested at scale." },
                  ].map((item) => (
                    <div key={item.issue} className="border border-border p-4">
                      <div className="font-semibold text-sm mb-1">{item.issue}</div>
                      <div className="text-xs text-muted-foreground leading-relaxed">{item.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SCENT SEARCH */}
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

        {/* MULTI-PATH CTA */}
        <section className="border-t border-border py-24 bg-hex">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="hex-icon text-muted-foreground" />
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  Start here
                </h2>
                <span className="hex-icon text-muted-foreground" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  eyebrow: "I want to monitor",
                  title: "Deploy Smell Monitor",
                  desc: "Industrial monitoring, food safety, leak detection. Plug in a cartridge, connect via USB or Bluetooth, start getting readings.",
                  cta: "See the hardware",
                  href: "/smell-monitor",
                },
                {
                  eyebrow: "I want to build",
                  title: "Use the OpenSmell SDK",
                  desc: "Rust SDK with anomaly detection, adaptive baselines, poisoning detection. Open protocol, reproducible results.",
                  cta: "Read the docs",
                  href: "https://github.com/opensmell/Osmograph",
                },
                {
                  eyebrow: "I want to research",
                  title: "Explore the data",
                  desc: "4,800+ chemical-odor relationships, 1M+ validated samples, open datasets. Search by molecule or by smell.",
                  cta: "Try Scent Search",
                  href: "/search",
                },
              ].map((path) => (
                <Link
                  key={path.title}
                  href={path.href}
                  className="hex-box border border-border p-6 hover:bg-foreground hover:text-background transition-all duration-300 group"
                >
                  <div className="coord-tag mb-3">{path.eyebrow}</div>
                  <h3 className="text-lg font-semibold mb-2">{path.title}</h3>
                  <p className="text-sm text-muted-foreground group-hover:text-background/70 leading-relaxed mb-6">{path.desc}</p>
                  <div className="inline-flex items-center gap-2 text-sm font-medium">
                    {path.cta}
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <a
                href="https://discord.gg/CGER3tHxbH"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 text-sm font-medium hover:bg-foreground hover:text-background transition-all"
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
        </section>

        {/* DONATE */}
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
                Donations go directly to cloud compute, sensor prototyping, and community building. 100% transparent.
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
                title: "Products",
                links: [
                  { label: "Smell Monitor", href: "/smell-monitor" },
                  { label: "Osmograph Desktop", href: "/osmograph" },
                  { label: "Osmograph Web", href: "https://mox.opensmell.xyz" },
                  { label: "Electronic Nose", href: "/enose" },
                ],
              },
              {
                title: "Developers",
                links: [
                  { label: "Rust SDK", href: "https://github.com/opensmell/Osmograph" },
                  { label: "Data Commons", href: "https://github.com/opensmell/data-commons" },
                  { label: "Protocol Spec", href: "https://github.com/opensmell/interoperability" },
                  { label: "Academy", href: "/academy" },
                ],
              },
              {
                title: "Community",
                links: [
                  { label: "Discord", href: "https://discord.gg/CGER3tHxbH" },
                  { label: "GitHub", href: "https://github.com/opensmell" },
                  { label: "Scent Search", href: "/search" },
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
            <p>&copy; {new Date().getFullYear()} OpenSmell. Open source research to digitise olfaction.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

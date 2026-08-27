"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Search, Github, MessageSquare, ChevronRight, ExternalLink, BookOpen,
  Cpu, Monitor, BarChart3, Wind, Wine, UtensilsCrossed,
  FlaskConical, Store, Factory, Snowflake, Leaf
} from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from "@/components/ui/carousel"
import AnimatedHero from "@/components/animated-hero"

const products = [
  {
    eyebrow: "HARDWARE",
    icon: Monitor,
    title: "Smell Monitor",
    desc: "A plug-and-play box that watches the air in your process and tells you the moment it changes.",
    cta: "See the hardware",
    href: "/smell-monitor",
  },
  {
    eyebrow: "SOFTWARE",
    icon: BarChart3,
    title: "Osmograph",
    desc: "Record live sensor traces and train detectors with button clicks — no code, no electronics degree.",
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
    eyebrow: "SEARCH",
    icon: Search,
    title: "Scent Search",
    desc: "Look up 4,800+ chemical-odour relationships. Find the molecule behind a smell, or the smell behind a molecule.",
    cta: "Start searching",
    href: "/search",
  },
  {
    eyebrow: "LEARNING",
    icon: BookOpen,
    title: "Academy",
    desc: "Essays on the science and engineering behind digitising smell — written for humans, not hype.",
    cta: "Read the essays",
    href: "/academy",
  },
  {
    eyebrow: "ECOSYSTEM",
    icon: Store,
    title: "Appstore",
    desc: "A community home for e-nose apps, datasets, and rigs.",
    cta: "Preview",
    href: "/appstore",
  },
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
                A box that watches the air and tells you when your process changes —
                before it costs you a batch.
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

        {/* VALUE STRIP — plain-language, what it buys you */}
        <section className="border-t border-b border-border bg-grid">
          <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "838K+", label: "real sensor samples used in validation" },
                { value: "59", label: "food types classified on one dataset" },
                { value: "24/7", label: "continuous — no more spot-checks" },
                { value: "100%", label: "open: hardware, firmware, software, data" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold tracking-tight mb-1 font-mono">{stat.value}</div>
                  <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-[0.15em]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHAT IT DETECTS — the whole point, in plain terms */}
        <section className="border-t border-border py-20 relative">
          <span className="section-marginalia">What it detects</span>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="coord-tag mb-3">001 // Smell Monitor</div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
                  It notices when the air changes.
                </h2>
                <p className="text-muted-foreground mb-5 leading-relaxed">
                  Down at the machine, fermentation tanks give off ethanol; sealed storage gives off the
                  first traces of spoilage; a leaking valve changes the room. Each has a chemical
                  signature. The Smell Monitor samples that air continuously and flags
                  when the signature leaves its normal range.
                </p>
                <div className="mt-6">
                  <Link href="/smell-monitor" className="hex-btn hex-btn-primary">
                    See the Smell Monitor
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
              <div className="hud-corners border border-border p-6 bg-background relative">
                <div className="hud-corners-inner absolute inset-0 pointer-events-none" />
                <div className="coord-tag mb-3">What it currently senses</div>
                <div className="space-y-3 data-readout">
                  {[
                    { v: "ETH", t: "Ethanol off-gassing — a fermentation running healthy or drifting" },
                    { v: "VOC", t: "Spoilage VOCs — sealed food turning before it looks bad" },
                    { v: "PET", t: "Solvent and process VOCs — a leak in the room" },
                    { v: "BRE", t: "Exhaled-VOC profiles — breath research" },
                    { v: "CHN", t: "Cold-chain chemistry — humidity and temp related changes" },
                  ].map((d) => (
                    <div key={d.v} className="flex items-start gap-3">
                      <span className="text-muted-foreground opacity-50 font-mono text-xs w-10 mt-0.5">{d.v}</span>
                      <span className="text-sm text-muted-foreground leading-relaxed">{d.t}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    These are sensing capabilities, not finished products. Each process needs its own
                    sensor array and baseline before it is trustworthy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY NOT A RAW GAS SENSOR — where the software work shows */}
        <section className="border-t border-border py-20 bg-hex relative">
          <span className="section-marginalia">Why this</span>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="hex-icon text-muted-foreground" />
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Why not just buy a cheap gas sensor?</h2>
                <span className="hex-icon text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm max-w-2xl mx-auto leading-relaxed">
                Commodity sensors are cheap and sensitive, but their signals drift and vary unit to unit
                and day to day. A raw reading is not a measurement. This is the part we built.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="hud-corners border border-border p-6 bg-background relative">
                <div className="hud-corners-inner absolute inset-0 pointer-events-none" />
                <div className="coord-tag mb-3">The problem — raw drift</div>
                <ul className="space-y-3">
                  {[
                    "Baselines wander with temperature, humidity, and age",
                    "Two identical sensors give different voltage curves",
                    "A false drift alarm is worse than no alarm — nobody trusts it",
                  ].map((item) => (
                    <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 bg-foreground flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="hud-corners border border-border p-6 bg-background relative">
                <div className="hud-corners-inner absolute inset-0 pointer-events-none" />
                <div className="coord-tag mb-3">What OpenSmell adds</div>
                <ul className="space-y-3">
                  {[
                    "Automatic baseline correction so changes are real, not drift",
                    "Mahalanobis-distance detection tuned for each process",
                    "Temperature and humidity compensation from an on-board DHT11",
                    "Repeated labelling of your samples makes the detector smarter over time",
                  ].map((item) => (
                    <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 bg-foreground flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="max-w-2xl mx-auto mt-8 text-center">
              <div className="hud-corners border border-border p-4 bg-background/80 relative">
                <div className="hud-corners-inner absolute inset-0 pointer-events-none" />
                <p className="text-sm text-muted-foreground">
                  On 838K real food-sensor samples, baseline correction took classification accuracy
                  from <span className="text-foreground font-mono">71.4%</span> to{" "}
                  <span className="text-foreground font-mono">93.3%</span> — same sensors, same data,
                  different software.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* APPLICATIONS — what a person can now do */}
        <section className="border-t border-border py-20 relative">
          <span className="section-marginalia">Use it for</span>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="hex-icon text-muted-foreground" />
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">What you can do with it</h2>
                <span className="hex-icon text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm max-w-xl mx-auto">
                Each of these needs its own sensor array and baseline. Right now they are working
                applications — not guarantees.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  icon: Wine,
                  title: "Watch a fermentation",
                  desc: "Detect a stalled or infected batch hours before manual testing catches it.",
                },
                {
                  icon: UtensilsCrossed,
                  title: "Catch food spoilage early",
                  desc: "838K samples, 59 food types, 10 sensors — validated separation between fresh and turning.",
                },
                {
                  icon: Leaf,
                  title: "Smart agriculture",
                  desc: "Soil health, crop decay — fleet-manage a grid of field sensors the way a production line is watched.",
                },
                {
                  icon: Factory,
                  title: "Monitor VOCs continuously",
                  desc: "Replace expensive handheld spot-checks with a box that never needs a lunch break.",
                },
                {
                  icon: Snowflake,
                  title: "Guard a cold chain",
                  desc: "Chemical changes in sealed storage appear before temperature loggers register.",
                },
                {
                  icon: Wind,
                  title: "Profile breath for research",
                  desc: "8 MOX sensors on exhaled VOCs; 97.1% COPD classification on one dataset — more validation needed.",
                },
                {
                  icon: FlaskConical,
                  title: "Build your own sensing",
                  desc: "Plug in your sensors, program the protocol, keep the data. The SDK and protocol are open.",
                },
              ].map((uc) => (
                <div key={uc.title} className="hud-corners border border-border p-5 bg-background hover:bg-foreground hover:text-background transition-all duration-300 group relative">
                  <div className="hud-corners-inner absolute inset-0 pointer-events-none" />
                  <uc.icon className="w-6 h-6 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="text-sm font-semibold mb-1">{uc.title}</h3>
                  <p className="text-xs text-muted-foreground group-hover:text-background/70 leading-relaxed transition-colors">{uc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHO IT IS FOR — each audience, one line of value */}
        <section className="border-t border-border py-20 bg-hex relative">
          <span className="section-marginalia">Who it is for</span>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
              {[
                {
                  icon: Factory,
                  title: "For production lines",
                  desc: "A monitoring node that runs 24/7 and flags the batch before it is ruined. Fleet view in Osmograph for several units.",
                },
                {
                  icon: FlaskConical,
                  title: "For researchers",
                  desc: "An open, reproducible pipeline. Real validated data, a public protocol, and honest documentation of what MOX cannot do.",
                },
                {
                  icon: Cpu,
                  title: "For developers",
                  desc: "Open SDK, Bluetooth API, plug-in sensors, and programmatic access to sessions. Build your own profiles and contribution paths.",
                },
              ].map((w) => (
                <div key={w.title} className="bg-background p-8 hex-box">
                  <w.icon className="w-8 h-8 mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">{w.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EVIDENCE — compact, linked, not the headline */}
        <section className="border-t border-border py-20 relative">
          <span className="section-marginalia">Evidence</span>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="hex-icon text-muted-foreground" />
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">The receipts</h2>
                <span className="hex-icon text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm max-w-xl mx-auto">
                Every claim on this site comes from experiments we ran on public datasets. Here is the
                strongest of it.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: "Food Freshness", samples: "838K", result: "93.3% acc", source: "Zenodo", url: "https://zenodo.org/records/17285312" },
                { name: "Breath VOCs", samples: "—", result: "97.1% COPD", source: "Acevedo et al. 2021", url: "/academy" },
                { name: "Beef Spoilage", samples: "26K", result: "separable", source: "Harvard Dataverse", url: "https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/XNFVTS" },
                { name: "SmellNet", samples: "150K", result: "separable", source: "HuggingFace", url: "https://huggingface.co/datasets/DeweiFeng/SmellNet" },
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
                      <span className="text-muted-foreground group-hover:text-background/70">Result</span>
                      <span className="font-mono">{ds.result}</span>
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

        {/* THE STACK */}
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
                Hardware, software, reference builds, data, and learning — all open.
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

        {/* SCENT SEARCH */}
        <section ref={searchRef} className="border-t border-border py-20 relative">
          <span className="section-marginalia">Search</span>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="hex-icon text-muted-foreground" />
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Scent Search</h2>
                <span className="hex-icon text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm mt-1">
                4,800+ chemical-odour relationships from Pyrfume. Find the molecule behind a smell.
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

        {/* NEXT ACTION */}
        <section className="border-t border-border py-20 bg-hex relative">
          <span className="section-marginalia">Start</span>
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="hex-icon text-muted-foreground" />
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Pick your next step</h2>
                <span className="hex-icon text-muted-foreground" />
              </div>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Same hardware, three ways in.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/smell-monitor" className="hex-btn hex-btn-primary">
                  <Monitor className="w-4 h-4" />
                  Deploy
                </Link>
                <Link href="/osmograph" className="hex-btn hex-btn-outline">
                  <BarChart3 className="w-4 h-4" />
                  Build with it
                </Link>
                <Link href="/academy" className="hex-btn hex-btn-outline">
                  <BookOpen className="w-4 h-4" />
                  Research with it
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SUPPORT */}
        <section className="border-t border-border py-20 relative">
          <span className="section-marginalia">Support</span>
          <div className="max-w-xl mx-auto text-center px-6">
            <div className="flex items-center justify-center gap-3 mb-6">
              <a href="https://discord.gg/CGER3tHxbH" target="_blank" rel="noopener noreferrer" className="hex-btn hex-btn-outline">
                <MessageSquare className="w-4 h-4" />
                Join the community
              </a>
              <a href="https://github.com/opensmell" target="_blank" rel="noopener noreferrer" className="hex-btn hex-btn-outline">
                <Github className="w-4 h-4" />
                Follow on GitHub
              </a>
            </div>
            <div className="hud-corners border border-border p-4 bg-background/80 backdrop-blur-sm w-full relative">
              <div className="hud-corners-inner absolute inset-0 pointer-events-none" />
              <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest mb-2">
                Support the work — donate USDC on Polygon
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
              <p className="text-[10px] text-muted-foreground mt-2 font-mono uppercase tracking-wider">
                Funds go to sensors, compute, and shipping pilots
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
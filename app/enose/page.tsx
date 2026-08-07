"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Search,
  Monitor,
  BookOpen,
  ExternalLink,
  MessageSquare,
  Github,
  ChevronRight,
  Cpu,
  Gauge,
  FlaskConical,
  Microscope,
  FileDown,
  GitBranch,
  CheckCircle2,
  Wrench,
  AlertTriangle,
  Hexagon,
  Layers,
  Download,
  Radio,
  Loader2,
  Eye,
  X,
  ShieldAlert,
} from "lucide-react"
import ThemeToggle from "@/components/theme-toggle"
import MobileNav from "@/components/mobile-nav"
import { EnoseArt } from "@/components/e-nose-art"
import { EnoseRig } from "@/components/enose-rig"
import {
  SENSORS,
  sensorById,
  USE_CASES,
  STANDARD_CONFIGS,
  CAPABILITY_TIERS,
  SUPPORT_BADGES,
  WIRING_CHECKLIST,
  FIRMWARE_NOTES,
  BUILD_FLOW,
  ENCLOSURE_SPECS,
  MQ_ADC1_PINS,
  I2C_PINS,
  buildBom,
  REPO_LINKS,
  CONTROLLERS,
  SAFETY_NOTES,
  COMMON_MISTAKES,
  TIPS,
  BREADBOARD_GUIDE,
} from "@/lib/e-nose/data"
import type { SupportLevel } from "@/lib/e-nose/data"
import { buildPlanBlob } from "@/lib/e-nose/pdf"

const KIND_META = {
  "mox-analog": { icon: Gauge, label: "Metal-oxide · analog" },
  "mox-digital": { icon: Cpu, label: "Metal-oxide · digital (I²C)" },
  electrochemical: { icon: FlaskConical, label: "Electrochemical" },
  research: { icon: Microscope, label: "Research-grade" },
} as const

const SUPPORT_ICON = {
  full: CheckCircle2,
  partial: Wrench,
  conditioned: AlertTriangle,
  research: Microscope,
} as const

const KIT_MQ = ["mq-135", "mq-3", "mq-7", "mq-6", "mq-4", "mq-8"]
const EXTRA_MQ = ["mq-2", "mq-5"]
const DIGITAL_ADDONS = ["bme688", "sgp40", "sgp41", "ens160"]

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

function SupportChip({ level, small }: { level: SupportLevel; small?: boolean }) {
  const badge = SUPPORT_BADGES[level]
  const Icon = SUPPORT_ICON[level]
  const styles: Record<SupportLevel, string> = {
    full: "bg-foreground text-background border-foreground",
    partial: "border-foreground text-foreground",
    conditioned: "border-border text-muted-foreground",
    research: "border-border text-muted-foreground",
  }
  return (
    <span
      className={`inline-flex items-center gap-1.5 border px-2 py-0.5 ${small ? "text-[10px]" : "text-xs"} ${styles[level]}`}
      title={badge.detail}
    >
      <Icon className={small ? "w-3 h-3" : "w-3.5 h-3.5"} />
      {small ? badge.short : badge.label}
    </span>
  )
}

export default function EnosePage() {
  const [hydrated, setHydrated] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const [goalId, setGoalId] = useState("food")
  const [mq, setMq] = useState<string[]>(USE_CASES[1].sensors)
  const [digital, setDigital] = useState<string | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [generating, setGenerating] = useState(false)

  const [filter, setFilter] = useState<"all" | SupportLevel>("all")
  const [query, setQuery] = useState("")
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    setHydrated(true)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const goal = USE_CASES.find((u) => u.id === goalId) ?? USE_CASES[1]

  const selectGoal = (id: string) => {
    const u = USE_CASES.find((x) => x.id === id)
    if (!u) return
    setGoalId(id)
    setMq(u.sensors)
    setDigital(null)
  }

  const toggleMq = (id: string) => {
    setActiveId(id)
    setMq((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= 6) return prev
      return [...prev, id]
    })
  }

  const toggleDigital = (id: string) => {
    setActiveId(id)
    setDigital((prev) => (prev === id ? null : id))
  }

  const rigSensors = [
    ...mq.map((id) => {
      const s = sensorById(id)!
      return { id, name: s.name, kind: s.kind as "mox-analog" }
    }),
    ...(digital
      ? [(() => { const s = sensorById(digital)!; return { id: digital, name: s.name, kind: s.kind as "mox-digital" } })()]
      : []),
  ]

  const planSensors = [...mq, ...(digital ? [digital] : [])].map(sensorById).filter(Boolean) as NonNullable<ReturnType<typeof sensorById>>[]
  const bom = useMemo(() => buildBom({ goal: goal.label, sensors: planSensors.map((s) => s.id) }), [goal.label, mq, digital])
  const mqCount = planSensors.filter((s) => s.kind === "mox-analog").length
  const digitalCount = planSensors.filter((s) => s.kind === "mox-digital").length

  const catalog = useMemo(() => {
    return SENSORS.filter((s) => {
      if (filter !== "all" && s.support !== filter) return false
      if (!query.trim()) return true
      const q = query.toLowerCase()
      return [s.name, s.target, s.use, s.note].join(" ").toLowerCase().includes(q)
    })
  }, [filter, query])

  const handlePdf = async () => {
    if (planSensors.length === 0) return
    setGenerating(true)
    try {
      const blob = await buildPlanBlob({
        goal: goal.label,
        sensors: planSensors.map((s) => s.id),
      })
      if (previewUrl) URL.revokeObjectURL(previewUrl)
      setPreviewUrl(URL.createObjectURL(blob))
    } finally {
      setGenerating(false)
    }
  }

  const closePreview = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(null)
  }

  if (!hydrated) return null

  const activeLink = "text-foreground font-medium inline-flex items-center gap-1"
  const idleLink = "text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
          <Link href="/" className="flex items-center gap-3 no-underline group">
            <div className="relative w-8 h-8">
              <Image src="/opensmell_logo.png" alt="OpenSmell" fill className="object-contain" priority sizes="32px" />
            </div>
            <span className="text-lg font-semibold tracking-tight">OpenSmell</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <Link href="/search" className={idleLink}>
              <Search className="w-3.5 h-3.5" />
              Search
            </Link>
            <Link href="/osmograph" className={idleLink}>
              <Monitor className="w-3.5 h-3.5" />
              Osmograph
            </Link>
            <Link href="/enose" className={activeLink}>
              <Cpu className="w-3.5 h-3.5" />
              E-Nose
            </Link>
            <Link href="/academy" className={idleLink}>
              <BookOpen className="w-3.5 h-3.5" />
              Academy
            </Link>
            <a href={REPO_LINKS.discord} target="_blank" rel="noopener noreferrer" className={idleLink}>
              <ExternalLink className="w-3.5 h-3.5" />
              Community
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <MobileNav />
            <ThemeToggle />
            <a
              href={REPO_LINKS.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Github className="w-4 h-4" />
              Hardware
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="pt-32 pb-20 border-b border-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border text-xs text-muted-foreground mb-6">
                  <Cpu className="w-3.5 h-3.5" />
                  Open Hardware
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-[0.95]">
                  Build an e-nose
                  <br />
                  that speaks <span className="text-muted-foreground">OpenSmell</span>.
                </h1>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  An electronic nose from off-the-shelf parts — no PCB milling, no
                  electronics degree. Wire sensors, flash with a click, and record into the open
                  CSV stream the whole stack shares.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <button
                    onClick={() => scrollTo("builder")}
                    className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition-all"
                  >
                    <Wrench className="w-4 h-4" />
                    Build yours
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => scrollTo("sensors")}
                    className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 text-sm font-medium hover:bg-foreground hover:text-background transition-all"
                  >
                    <Gauge className="w-4 h-4" />
                    Browse the sensor catalog
                  </button>
                  <a
                    href={REPO_LINKS.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 text-sm font-medium hover:bg-foreground hover:text-background transition-all"
                  >
                    <GitBranch className="w-4 h-4" />
                    Build guide
                  </a>
                </div>
                <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
                  Honest support model: the fully automated path today is the MQ sensor family (1–6 sensors).
                  Digital sensors wire in and stream the same way but need DIY firmware. Everything else is on
                  the catalog so you know it exists and what it needs — the builder never promises a plan it
                  can't back up.
                </p>
              </div>
              <div className="border border-border bg-background hex-box p-4 lg:p-8">
                <EnoseArt className="w-full h-auto text-foreground" />
              </div>
            </div>
          </div>
        </section>

        {/* SUPPORT MODEL */}
        <section className="border-t border-border py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
              {(Object.keys(SUPPORT_BADGES) as SupportLevel[]).map((level) => {
                const b = SUPPORT_BADGES[level]
                const Icon = SUPPORT_ICON[level]
                return (
                  <div key={level} className="bg-background p-6 hex-box">
                    <Icon className="w-6 h-6 mb-3 text-muted-foreground" />
                    <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-2">
                      {b.label}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{b.detail}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* SENSOR FAMILIES */}
        <section className="border-t border-border py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="hex-icon text-muted-foreground" />
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Every sensor family, on one stack</h2>
                <span className="hex-icon text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                The OpenSmell pipeline doesn't care how the numbers arrived — only that they respond to the
                chemicals you want to detect. Different families trade accuracy, cost, and complexity.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Gauge,
                  title: "Metal-oxide · analog",
                  body: "The MQ family: heated elements whose resistance changes with gas contact. Broad, cheap, proven — and the only family with full one-click software support today.",
                  badge: SUPPORT_BADGES.full,
                },
                {
                  icon: Cpu,
                  title: "Metal-oxide · digital",
                  body: "MEMS sensors like BME688, SGP40/41, and ENS160 that handle the heater and conditioning on-chip and talk over I²C. Relative indices, not calibrated ppb.",
                  badge: SUPPORT_BADGES.partial,
                },
                {
                  icon: FlaskConical,
                  title: "Electrochemical",
                  body: "Real gas concentration for specific toxic gases (CO, NO₂, SO₂…). Needs conditioning or an on-board-conditioned module like the Winsen ZE03. No software support yet.",
                  badge: SUPPORT_BADGES.conditioned,
                },
                {
                  icon: Microscope,
                  title: "Research-grade",
                  body: "Photoionisation detectors reach ppb levels — orders of magnitude beyond MOX, and correspondingly more expensive and calibration-sensitive. Outside the current kit.",
                  badge: SUPPORT_BADGES.research,
                },
              ].map((f) => (
                <div key={f.title} className="border border-border p-6 bg-background hex-box flex flex-col">
                  <f.icon className="w-7 h-7 mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">{f.body}</p>
                  <div className="mt-5">
                    <SupportChip level={f.badge.level} small />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SENSOR CATALOG */}
        <section id="sensors" className="border-t border-border py-24 bg-grid">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="hex-icon text-muted-foreground" />
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Sensor catalog</h2>
                <span className="hex-icon text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">
                What's on the market, what each one detects, how it connects, and exactly how much OpenSmell
                supports it today. Support level is the first thing to read.
              </p>
            </div>

            <div className="max-w-3xl mx-auto mb-10 flex flex-col gap-4">
              <div className="flex border border-border">
                <div className="px-3 flex items-center text-muted-foreground">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search sensors, gases, uses…"
                  className="flex-1 bg-transparent px-3 py-3 text-sm focus:outline-none"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {(["all", "full", "partial", "conditioned", "research"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`text-xs border px-3 py-1.5 transition-all ${
                      filter === f ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground"
                    }`}
                  >
                    {f === "all" ? "All" : SUPPORT_BADGES[f].short}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {catalog.map((s) => {
                const km = KIND_META[s.kind]
                return (
                  <div key={s.id} className="border border-border bg-background p-6 hex-box flex flex-col">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="text-lg font-semibold font-mono">{s.name}</h3>
                      <km.icon className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                    </div>
                    <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-1">
                      Detects
                    </div>
                    <div className="text-sm font-medium mb-3">{s.target}</div>
                    <div className="text-sm text-muted-foreground mb-3 leading-relaxed">{s.use}</div>
                    <div className="text-xs text-muted-foreground mb-4">
                      {s.io} · {s.supply}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1">{s.note}</p>
                    <div className="mb-4">
                      <SupportChip level={s.support} small />
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {s.links.map((l) => (
                        <a
                          key={l.href + l.label}
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] border border-border px-2 py-1 text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                        >
                          {l.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
            {catalog.length === 0 && (
              <div className="text-center text-muted-foreground text-sm py-12">No sensors match.</div>
            )}
          </div>
        </section>

        {/* CAPABILITY TIERS */}
        <section className="border-t border-border py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="hex-icon text-muted-foreground" />
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">What N sensors give you</h2>
                <span className="hex-icon text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                More sensors, more independent chemical dimensions — and finer discrimination between similar
                smells. There is no universal best count; it depends on what you want to detect.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {CAPABILITY_TIERS.map((t, i) => (
                <div key={t.range} className="border border-border p-6 bg-background hex-box">
                  <div className="text-3xl font-bold tracking-tight mb-1">{t.range}</div>
                  <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-4">
                    {i < 3 ? "sensors" : "sensors"}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t.apps}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground text-center mt-10">
              The 6-sensor configuration matches the reference SmellNet dataset. Start with three if unsure —
              you can add sensors later and the firmware handles any count automatically.
            </p>
          </div>
        </section>

        {/* BUILDER */}
        <section id="builder" className="border-t border-border py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="hex-icon text-muted-foreground" />
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Build yours, live</h2>
                <span className="hex-icon text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Pick what you want to do, adjust the sensors, and watch the rig update. Only technically valid
                configurations produce a build plan — then download it as a PDF.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
              <div className="lg:col-span-3 space-y-12">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-7 h-7 border border-border flex items-center justify-center text-sm font-mono text-muted-foreground">1</span>
                    <h3 className="text-xl font-bold tracking-tight">What do you want to do?</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {USE_CASES.map((u) => (
                      <button
                        key={u.id}
                        onClick={() => selectGoal(u.id)}
                        className={`text-left border p-4 transition-all ${
                          goalId === u.id
                            ? "border-foreground bg-foreground/5"
                            : "border-border hover:border-foreground"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-sm">{u.label}</span>
                          <span className="text-[10px] text-muted-foreground font-mono uppercase">{u.tier}</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">{u.desc}</div>
                        <div className="text-xs text-muted-foreground mt-2">{u.note}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-7 h-7 border border-border flex items-center justify-center text-sm font-mono text-muted-foreground">2</span>
                    <h3 className="text-xl font-bold tracking-tight">Pick your sensors</h3>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {mq.length}/6 MQ · {digital ? "1" : "0"}/1 digital
                    </span>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Gauge className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Gas-sensing array — MQ family (fully supported)</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                      {[...KIT_MQ, ...EXTRA_MQ].map((id) => {
                        const s = sensorById(id)!
                        const on = mq.includes(id)
                        return (
                          <button
                            key={id}
                            onClick={() => toggleMq(id)}
                            onMouseEnter={() => setActiveId(id)}
                            onMouseLeave={() => setActiveId(null)}
                            disabled={!on && mq.length >= 6}
                            className={`text-left border px-3 py-2.5 transition-all ${
                              on ? "border-foreground bg-foreground/5" : "border-border hover:border-foreground disabled:opacity-35"
                            }`}
                          >
                            <div className="font-mono text-sm">{s.name}</div>
                            <div className="text-[10px] text-muted-foreground leading-tight mt-0.5">{s.target}</div>
                            <div className="text-[10px] text-muted-foreground mt-1">
                              {KIT_MQ.includes(id) ? "kit" : "swappable"} · {on ? "in array" : "add"}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Cpu className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Add a digital sensor — DIY firmware</span>
                      <SupportChip level="partial" small />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {DIGITAL_ADDONS.map((id) => {
                        const s = sensorById(id)!
                        const on = digital === id
                        return (
                          <button
                            key={id}
                            onClick={() => toggleDigital(id)}
                            onMouseEnter={() => setActiveId(id)}
                            onMouseLeave={() => setActiveId(null)}
                            disabled={!on && digital !== null}
                            className={`text-left border px-3 py-2.5 transition-all ${
                              on ? "border-foreground bg-foreground/5" : "border-border hover:border-foreground disabled:opacity-35"
                            }`}
                          >
                            <div className="font-mono text-sm">{s.name}</div>
                            <div className="text-[10px] text-muted-foreground leading-tight mt-0.5">{s.target}</div>
                            <div className="text-[10px] text-muted-foreground mt-1">I²C · {on ? "selected" : "add"}</div>
                          </button>
                        )
                      })}
                    </div>
                    {digital && (
                      <div className="mt-3 border border-border p-3 text-xs text-muted-foreground flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <span>
                          The rig stays wireable and the data format stays compatible, but Osmograph's
                          one-click flash currently covers MQ-only configurations. Your build plan switches
                          the firmware step to the PlatformIO pattern.
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="lg:sticky lg:top-24 border border-border bg-background hex-box p-6">
                  <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-4">
                    Your rig
                  </div>
                  <EnoseRig sensors={rigSensors} activeId={activeId ?? undefined} className="w-full h-auto text-foreground" />
                  <div className="mt-4 border-t border-border pt-4 space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Goal</span>
                      <span className="font-medium text-right">{goal.label}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Array</span>
                      <span className="font-mono text-xs">{mq.map((id) => sensorById(id)?.name).join(" · ") || "—"}</span>
                    </div>
                    {digital && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Digital</span>
                        <span className="font-mono text-xs">{sensorById(digital)?.name}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Support</span>
                      <span className="text-xs">
                        {digital ? "MQ + DIY digital" : "Full (MQ)"}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handlePdf}
                    disabled={planSensors.length === 0 || generating}
                    className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-foreground text-background px-5 py-3 text-sm font-medium hover:opacity-90 transition-all disabled:opacity-40"
                  >
                    {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Eye className="w-4 h-4" />}
                    {planSensors.length === 0 ? "Pick at least one sensor" : "Preview build plan (PDF)"}
                  </button>
                  <a
                    href={REPO_LINKS.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 w-full inline-flex items-center justify-center gap-2 border border-border px-5 py-3 text-sm font-medium hover:bg-foreground hover:text-background transition-all"
                  >
                    <GitBranch className="w-4 h-4" />
                    Open the build guide
                  </a>
                </div>
              </div>
            </div>

            {planSensors.length > 0 && (
              <div className="mt-16 border border-border bg-background hex-box">
                <div className="px-6 py-5 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-1">
                      Your build plan
                    </div>
                    <h3 className="text-xl font-bold tracking-tight">
                      {mqCount} MQ sensor{mqCount !== 1 ? "s" : ""}
                      {digitalCount ? ` + ${digitalCount} digital` : ""} · {goal.label}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    {planSensors.map((s) => (
                      <SupportChip key={s.id} level={s.support} small />
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border">
                  <div className="p-6 bg-background">
                    <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-4">Bill of materials</div>
                    <div className="space-y-2 text-sm">
                      {bom.map((b) => (
                        <div key={b.item} className="flex items-start justify-between gap-4">
                          <span className={b.optional ? "text-muted-foreground" : ""}>
                            {b.item}
                            {b.optional && <span className="text-xs text-muted-foreground/70"> (optional)</span>}
                          </span>
                          <span className="font-mono text-xs flex-shrink-0 pt-0.5">× {b.qty}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                      Prices aren't listed here — they vary by region. Two 10 kΩ resistors per MQ sensor go into
                      the voltage divider; the USB cable must be data-capable, not charge-only.
                    </p>
                  </div>
                  <div className="p-6 bg-background">
                    <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-4">Wiring</div>
                    <div className="space-y-1.5 text-sm">
                      {planSensors.filter((s) => s.kind === "mox-analog").map((s, i) => (
                        <div key={s.id} className="flex items-center justify-between gap-4">
                          <span className="font-mono text-xs">{s.name}</span>
                          <span className="font-mono text-xs text-muted-foreground">{MQ_ADC1_PINS[i]} (ADC1)</span>
                        </div>
                      ))}
                      {digitalCount > 0 && (
                        <div className="flex items-center justify-between gap-4">
                          <span className="font-mono text-xs">{sensorById(digital!)?.name}</span>
                          <span className="font-mono text-xs text-muted-foreground">
                            {I2C_PINS.sda} · {I2C_PINS.scl}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center justify-between gap-4 text-muted-foreground">
                        <span>Power</span>
                        <span className="font-mono text-xs">5 V rail · common GND</span>
                      </div>
                    </div>
                    <div className="mt-5">
                      <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-3">
                        Firmware
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {digital ? FIRMWARE_NOTES.withDigital : FIRMWARE_NOTES.mqOnly}
                      </p>
                      <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{FIRMWARE_NOTES.stream}</p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-border p-6">
                  <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-3">
                    Before you record
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                    {[
                      "Burn in: ~24 cumulative hours powered on (one-time).",
                      "Warm up 5 minutes before every session.",
                      "First test: crush a garlic clove near the array.",
                      "Record 30+ seconds per substance, then train in Osmograph.",
                      "Calibration wizard: under active development.",
                      "Upload labelled data to the Data Commons when ready.",
                    ].map((t) => (
                      <div key={t} className="flex items-start gap-2 text-muted-foreground">
                        <span className="mt-1.5 w-1 h-1 bg-muted-foreground flex-shrink-0" />
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CONTROLLERS */}
        <section className="border-t border-border py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="hex-icon text-muted-foreground" />
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Pick a controller</h2>
                <span className="hex-icon text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                ESP32 is the recommended board. If you already own one of these, it works too.
              </p>
            </div>
            <div className="border border-border bg-background hex-box overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="px-4 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">Board</th>
                      <th className="px-4 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">ADC inputs</th>
                      <th className="px-4 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">Logic</th>
                      <th className="px-4 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">Wireless</th>
                      <th className="px-4 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">Fit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CONTROLLERS.map((c) => (
                      <tr key={c.id} className="border-b border-border last:border-0 align-top">
                        <td className="px-4 py-3">
                          <div className="font-semibold">{c.name}</div>
                          <div className="text-xs text-muted-foreground mt-1 max-w-md">{c.note}</div>
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{c.adc}</td>
                        <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{c.logic}</td>
                        <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{c.wireless}</td>
                        <td className="px-4 py-3 text-xs">{c.fit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4 max-w-3xl mx-auto text-center">
              One-click Osmograph flashing is ESP32-only today. The other boards share the same CSV stream contract, so they work with the platform — but you bring the Arduino or PlatformIO toolchain.
            </p>
          </div>
        </section>

        {/* BUILD FLOW */}
        <section id="build-flow" className="border-t border-border py-24 bg-grid">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="hex-icon text-muted-foreground" />
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">From parts to instrument</h2>
                <span className="hex-icon text-muted-foreground" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
              {BUILD_FLOW.map((s) => (
                <div key={s.step} className="bg-background p-6 hex-box">
                  <div className="w-7 h-7 border border-border flex items-center justify-center text-sm font-mono text-muted-foreground mb-3">
                    {s.step}
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{s.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WIRING REFERENCE */}
        <section id="wiring" className="border-t border-border py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border text-xs text-muted-foreground mb-6">
                  <Layers className="w-3.5 h-3.5" />
                  Wiring reference
                </div>
                <h2 className="text-3xl font-bold tracking-tight mb-6">Four pins. One ADC1 GPIO each.</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Every MQ module exposes VCC, GND, DO (ignore it), and AO. The AO line needs a voltage
                  divider of two equal 10 kΩ resistors to sit safely in the ESP32's 0–3.3 V range. All ADC1
                  pins work while WiFi is active — avoid ADC2 pins like GPIO25/26 when recording over WiFi.
                </p>
                <div className="border border-border bg-background hex-box overflow-hidden mb-8">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left px-4 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">Sensor slot</th>
                        <th className="text-left px-4 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">GPIO</th>
                        <th className="text-left px-4 py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground">ADC channel</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MQ_ADC1_PINS.map((p, i) => (
                        <tr key={p} className="border-b border-border last:border-0">
                          <td className="px-4 py-2.5 font-mono text-xs">Sensor {i + 1}</td>
                          <td className="px-4 py-2.5 font-mono text-xs">{p}</td>
                          <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">ADC1_CH{i === 3 ? 4 : i === 4 ? 5 : i === 5 ? 6 : i}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="border border-border bg-background hex-box p-4 mb-8">
                  <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-3">Voltage divider</div>
                  <pre className="text-sm font-mono text-muted-foreground leading-relaxed overflow-x-auto">
{`Sensor AO ─── R ───┬─── ESP32 ADC pin
                     │
                     R
                     │
                    GND`}
                  </pre>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-3">Wiring checklist</div>
                  <ul className="space-y-2">
                    {WIRING_CHECKLIST.map((c) => (
                      <li key={c} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 w-1 h-1 bg-muted-foreground flex-shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="lg:sticky lg:top-24">
                <div className="border border-border bg-background hex-box p-6">
                  <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-4">Data contract</div>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      Osmograph firmware streams <code className="font-mono text-xs bg-foreground/5 border border-border px-1.5 py-0.5">OSM,&lt;adc0&gt;,&lt;adc1&gt;,…</code> over
                      serial (115200 baud) every 500 ms — and over the WiFi AP on TCP :8080.
                    </p>
                    <p>
                      The reference firmware prints plain comma-separated values at 10 Hz. Anything that emits
                      comma-separated numbers on that contract is compatible downstream.
                    </p>
                    <p>
                      Fewer than six channels? Map them into the encoder with{" "}
                      <code className="font-mono text-xs bg-foreground/5 border border-border px-1.5 py-0.5">expand_channels</code> — Osmograph does this
                      automatically during training and prediction.
                    </p>
                  </div>
                  <div className="mt-6 border-t border-border pt-4">
                    <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-3">Calibration & interoperability</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      The calibration pipeline translates a new device's voltages into the shared representation
                      behind SmellNet's substance prototypes. The Osmograph Calibration Wizard is under
                      active development; within-session experiments work today. The full protocol — a 2-substance
                      quick test or a 5-substance validation — is in the repo's EXPERIMENT.md.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SAFETY & MISTAKES */}
        <section className="border-t border-border py-24 bg-grid">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="hex-icon text-muted-foreground" />
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Safety & common mistakes</h2>
                <span className="hex-icon text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Cross-check your wiring before applying power. These are the failure modes people actually hit.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border">
              <div className="bg-background p-8 hex-box">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldAlert className="w-5 h-5 text-muted-foreground" />
                  <h3 className="font-bold">Before you power up</h3>
                </div>
                <ul className="space-y-3">
                  {SAFETY_NOTES.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 w-1 h-1 bg-muted-foreground flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-background p-8 hex-box">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-muted-foreground" />
                  <h3 className="font-bold">Mistakes people make</h3>
                </div>
                <ul className="space-y-3">
                  {COMMON_MISTAKES.map(([m, f]) => (
                    <li key={m} className="text-sm">
                      <span className="font-semibold">{m}.</span> <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="border border-border bg-background hex-box mt-px">
              <div className="px-8 py-6">
                <h3 className="font-bold mb-4">After flashing — tips</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                  {TIPS.map((t) => (
                    <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 w-1 h-1 bg-muted-foreground flex-shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ENCLOSURE */}
        <section id="enclosure" className="border-t border-border py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border text-xs text-muted-foreground mb-6">
                  <Hexagon className="w-3.5 h-3.5" />
                  Enclosure & 3D
                </div>
                <h2 className="text-3xl font-bold tracking-tight mb-6">Keep the sensors in air, not in a box.</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  A basic enclosure is 3D-printed or laser-cut from 3 mm acrylic. The critical part is airflow —
                  MQ sensors need ambient air, and the heater runs hot, so never seal the chamber.
                </p>
                <ul className="space-y-3">
                  {[
                    ENCLOSURE_SPECS.base,
                    ENCLOSURE_SPECS.spacing,
                    ENCLOSURE_SPECS.lid,
                    ENCLOSURE_SPECS.fan,
                    ENCLOSURE_SPECS.clearance,
                    ENCLOSURE_SPECS.access,
                  ].map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 w-1 h-1 bg-muted-foreground flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-muted-foreground mt-6 border border-border p-4 leading-relaxed">
                  Printable model files (STL) are being finalised — a Fusion 360 template is pending. When they
                  land they'll be published under an open license.{" "}
                  <a href={REPO_LINKS.discord} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-foreground transition-colors">
                    Join the Discord
                  </a>{" "}
                  to follow along.
                </p>
              </div>
              <div className="border border-border bg-background hex-box p-8">
                <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-6">Spec sheet</div>
                <div className="space-y-4">
                  {[
                    { k: "Material", v: "3 mm acrylic or 3D print" },
                    { k: "Base", v: "120 × 80 mm, mounting holes" },
                    { k: "Sensor spacing", v: "≥ 20 mm apart" },
                    { k: "Lid", v: "Vented — 5 mm hole grid" },
                    { k: "Optional fan", v: "30 mm, 5 V" },
                    { k: "Clearance", v: "≥ 10 mm above sensors (heater ~80 °C)" },
                    { k: "Sample access", v: "Small door or slot for food testing" },
                  ].map((r) => (
                    <div key={r.k} className="flex items-start justify-between gap-6 text-sm">
                      <span className="text-muted-foreground">{r.k}</span>
                      <span className="font-mono text-xs text-right pt-0.5">{r.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MIRIS */}
        <section className="border-t border-border py-24 bg-grid">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="hex-icon text-muted-foreground" />
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">MIRIS</h2>
                <span className="hex-icon text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                A custom sensor we're building in the lab. When it ships, it slots straight into this stack —
                same data contract, same apps. No details to share yet.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={REPO_LINKS.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  Watch it happen on Discord
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Build, measure, contribute.</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Your recordings — labelled and uploaded to the Data Commons — train the next encoder and raise
                the standard for everyone. Calibration makes every rig count as a data source.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={REPO_LINKS.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition-all"
                >
                  <GitBranch className="w-4 h-4" />
                  Reference hardware on GitHub
                </a>
                <a
                  href={REPO_LINKS.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 text-sm font-medium hover:bg-foreground hover:text-background transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  Get help on Discord
                </a>
                <a
                  href={REPO_LINKS.osmograph}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 text-sm font-medium hover:bg-foreground hover:text-background transition-all"
                >
                  <Radio className="w-4 h-4" />
                  Osmograph — the GUI
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
            Electronic Nose — OpenSmell
          </div>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Back to Home
          </Link>
        </div>
      </footer>

      {previewUrl && (
        <div className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center p-4 md:p-8">
          <div className="bg-background border border-border w-full max-w-4xl h-[85vh] flex flex-col">
            <div className="flex items-center justify-between px-5 py-3 border-b border-border gap-3">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Build plan preview
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={previewUrl}
                  download={`opensmell-enose-build-plan-${new Date().toISOString().slice(0, 10)}.pdf`}
                  className="inline-flex items-center gap-2 bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90 transition-all"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </a>
                <button
                  onClick={closePreview}
                  aria-label="Close preview"
                  className="w-9 h-9 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <iframe src={previewUrl} title="Build plan preview" className="w-full flex-1 bg-white" />
          </div>
        </div>
      )}
    </div>
  )
}

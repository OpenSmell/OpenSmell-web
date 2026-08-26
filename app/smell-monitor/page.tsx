"use client"

import { useEffect, useState, useRef } from "react"
import {
  BarChart3, ChevronRight, Cpu,
  Plug, Monitor, AlertTriangle, Wind, Usb,
  FlaskConical, Warehouse, Snowflake, Wrench, Code,
  Download, Play, Settings,
  Send, CheckCircle, Leaf, Thermometer
} from "lucide-react"

function DeviceDrawing({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 360" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="airflow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
          <stop offset="50%" stopColor="currentColor" stopOpacity="0.2" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="glow" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.15" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
        <filter id="blur">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      {/* Ambient glow */}
      <ellipse cx="200" cy="180" rx="160" ry="120" fill="url(#glow)" />

      {/* Airflow streams - left side incoming */}
      <path d="M 20 140 Q 60 140 80 160" stroke="currentColor" strokeWidth="1" opacity="0.15" fill="none" />
      <path d="M 10 170 Q 50 170 80 170" stroke="currentColor" strokeWidth="1.5" opacity="0.25" fill="none" />
      <path d="M 20 200 Q 60 200 80 180" stroke="currentColor" strokeWidth="1" opacity="0.15" fill="none" />

      {/* Smell particles - incoming */}
      <circle cx="35" cy="155" r="2" fill="currentColor" opacity="0.2" />
      <circle cx="50" cy="168" r="1.5" fill="currentColor" opacity="0.3" />
      <circle cx="42" cy="185" r="2.5" fill="currentColor" opacity="0.15" />
      <circle cx="60" cy="175" r="1" fill="currentColor" opacity="0.35" />
      <circle cx="28" cy="172" r="1.8" fill="currentColor" opacity="0.25" />

      {/* Device body - isometric-ish */}
      <rect x="80" y="120" width="240" height="120" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <rect x="80" y="240" width="240" height="40" rx="2" stroke="currentColor" strokeWidth="1" opacity="0.5" />

      {/* Top panel glow */}
      <rect x="80" y="120" width="240" height="120" rx="4" fill="currentColor" opacity="0.03" />

      {/* Display area */}
      <rect x="100" y="140" width="80" height="50" rx="2" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      {/* Waveform on display */}
      <path d="M 108 165 Q 115 155 122 165 Q 129 175 136 165 Q 143 155 150 165 Q 157 175 164 165 Q 171 155 178 165"
        stroke="currentColor" strokeWidth="1.5" opacity="0.5" fill="none" />
      <text x="140" y="182" textAnchor="middle" fill="currentColor" fontSize="6" fontFamily="monospace" opacity="0.4">LIVE</text>

      {/* Sensor array visualization */}
      <g opacity="0.6">
        {/* 6 sensor slots */}
        {[0,1,2,3,4,5].map(i => (
          <g key={i}>
            <rect x={200 + (i % 3) * 30} y={140 + Math.floor(i / 3) * 30} width="24" height="24" rx="2"
              stroke="currentColor" strokeWidth="0.8" />
            {/* Sensor glow */}
            <circle cx={212 + (i % 3) * 30} cy={152 + Math.floor(i / 3) * 30} r="6"
              fill="currentColor" opacity={0.1 + (i * 0.05)} />
            <circle cx={212 + (i % 3) * 30} cy={152 + Math.floor(i / 3) * 30} r="2"
              fill="currentColor" opacity={0.3 + (i * 0.08)} />
          </g>
        ))}
      </g>

      {/* Fan visualization */}
      <circle cx="310" cy="180" r="18" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <circle cx="310" cy="180" r="12" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <circle cx="310" cy="180" r="6" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      {/* Fan blades */}
      <path d="M 310 162 L 314 175 L 310 180" stroke="currentColor" strokeWidth="0.8" opacity="0.3" fill="none" />
      <path d="M 328 180 L 315 184 L 310 180" stroke="currentColor" strokeWidth="0.8" opacity="0.3" fill="none" />
      <path d="M 310 198 L 306 185 L 310 180" stroke="currentColor" strokeWidth="0.8" opacity="0.3" fill="none" />
      <path d="M 292 180 L 305 176 L 310 180" stroke="currentColor" strokeWidth="0.8" opacity="0.3" fill="none" />

      {/* Airflow streams - right side outgoing */}
      <path d="M 320 160 Q 360 140 390 130" stroke="currentColor" strokeWidth="1" opacity="0.15" fill="none" />
      <path d="M 320 180 Q 360 180 390 180" stroke="currentColor" strokeWidth="1.5" opacity="0.25" fill="none" />
      <path d="M 320 200 Q 360 220 390 230" stroke="currentColor" strokeWidth="1" opacity="0.15" fill="none" />

      {/* Exhaust particles */}
      <circle cx="360" cy="160" r="1.5" fill="currentColor" opacity="0.2" />
      <circle cx="375" cy="175" r="2" fill="currentColor" opacity="0.15" />
      <circle cx="368" cy="195" r="1" fill="currentColor" opacity="0.25" />
      <circle cx="382" cy="168" r="1.8" fill="currentColor" opacity="0.1" />

      {/* Bottom section details */}
      <line x1="80" y1="260" x2="320" y2="260" stroke="currentColor" strokeWidth="0.5" opacity="0.3" strokeDasharray="4 4" />
      <text x="200" y="255" textAnchor="middle" fill="currentColor" fontSize="7" fontFamily="monospace" opacity="0.35">ESP32 · DHT11 · PWR</text>

      {/* Status indicators */}
      <circle cx="100" cy="250" r="3" fill="currentColor" opacity="0.4" />
      <circle cx="115" cy="250" r="3" fill="currentColor" opacity="0.25" />
      <circle cx="130" cy="250" r="3" fill="currentColor" opacity="0.15" />

      {/* Connection port */}
      <rect x="300" y="248" width="16" height="8" rx="1" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
      <text x="308" y="270" textAnchor="middle" fill="currentColor" fontSize="5" fontFamily="monospace" opacity="0.3">USB-C</text>

      {/* Data flow lines */}
      <path d="M 140 190 L 140 240" stroke="currentColor" strokeWidth="0.5" opacity="0.2" strokeDasharray="2 2" />
      <path d="M 200 190 L 200 240" stroke="currentColor" strokeWidth="0.5" opacity="0.2" strokeDasharray="2 2" />
      <path d="M 310 198 L 310 240" stroke="currentColor" strokeWidth="0.5" opacity="0.2" strokeDasharray="2 2" />
    </svg>
  )
}

export default function SmellMonitorPage() {
  const [hydrated, setHydrated] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [unitCount, setUnitCount] = useState("")
  const contactRef = useRef<HTMLDivElement>(null)

  useEffect(() => { setHydrated(true) }, [])

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    const form = e.currentTarget
    const data = new FormData(form)

    const payload = new URLSearchParams()
    payload.set("_subject", `[Smell Monitor] New Pilot Request from ${data.get("name")}`)
    payload.set("_template", "table")
    payload.set("_captcha", "false")
    payload.set("name", data.get("name") as string)
    payload.set("company", data.get("company") as string)
    payload.set("email", data.get("email") as string)
    payload.set("process", data.get("process") as string)
    payload.set("units", unitCount)

    try {
      const res = await fetch("https://formsubmit.co/praise@opensmell.xyz", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString(),
      })
      if (res.ok) {
        setFormSubmitted(true)
      } else {
        setFormSubmitted(true)
      }
    } catch {
      setFormSubmitted(true)
    }
  }

  if (!hydrated) return null

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <main>
        {/* 1. HERO */}
        <section className="pt-32 pb-20 border-b border-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border text-xs text-muted-foreground mb-6">
                  <Monitor className="w-3.5 h-3.5" />
                  Hardware Product
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-[0.95]">
                  The Smell Monitor.
                </h1>
                <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                  Continuous chemical anomaly detection for industrial processes.
                </p>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  A modular, plug-and-play monitoring node. Configure the sensor array for
                  your specific application. Connect via Bluetooth to Osmograph for analytics,
                  or let it run standalone with local alerts.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={scrollToContact}
                    className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition-all"
                  >
                    Reserve a Pilot Unit
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <a href="https://github.com/opensmell/Osmograph" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 text-sm font-medium hover:bg-foreground hover:text-background transition-all">
                    <Code className="w-4 h-4" />
                    View the Open-Source SDK
                  </a>
                </div>
              </div>
              <div className="border border-border bg-background hex-box p-8 flex items-center justify-center">
                <DeviceDrawing className="w-full max-w-md text-foreground" />
              </div>
            </div>
          </div>
        </section>

        {/* 2. HOW IT WORKS */}
        <section className="border-t border-border py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">How It Works</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
              {[
                {
                  icon: Plug,
                  step: "01",
                  title: "Plug In",
                  desc: "Insert the sensor array for your environment — fermentation, VOCs, cold-chain.",
                },
                {
                  icon: Monitor,
                  step: "02",
                  title: "Monitor",
                  desc: "The device actively pulls air in and pushes it out, reading the chemical signature in real-time while ignoring environmental noise.",
                },
                {
                  icon: AlertTriangle,
                  step: "03",
                  title: "Alert",
                  desc: "Get instant visual and audio warnings if the chemical signature deviates from normal, and stream data to Osmograph for deeper analysis.",
                },
              ].map((s) => (
                <div key={s.step} className="bg-background p-8 hex-box">
                  <div className="text-xs font-mono text-muted-foreground mb-4 tracking-wider">{s.step}</div>
                  <s.icon className="w-8 h-8 mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. WHAT'S INSIDE */}
        <section className="border-t border-border py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">What&apos;s Inside</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mt-2">
                Designed for real environments, not just lab benches.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
              {[
                {
                  icon: Cpu,
                  title: "True Modularity",
                  desc: "Standardized 4-pin connector for hot-swappable, application-specific sensor arrays.",
                },
                {
                  icon: Wind,
                  title: "Active Intake & Exhaust",
                  desc: "Micro-fan + PTFE pre-filter for rapid, clean air sampling.",
                },
                {
                  icon: Monitor,
                  title: "Standalone Operation",
                  desc: "Built-in OLED display and passive buzzer for immediate local alerts without a phone or PC.",
                },
                {
                  icon: Usb,
                  title: "Universal Power",
                  desc: "5V USB-C powered — runs on standard power banks or wall adapters.",
                },
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

        {/* 3.5 WHAT IT IS / WHAT IT IS NOT */}
        <section className="border-t border-border py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border border-border p-6">
                <div className="text-xs text-green-400 font-mono uppercase tracking-widest mb-3">What it is</div>
                <div className="space-y-3">
                  {[
                    "A continuously-running chemical anomaly detector",
                    "A modular sensor platform with hot-swappable sensors",
                    "A fleet-ready device with independent baselines per unit",
                    "An open-source platform — firmware, SDK, protocol all public",
                    "Backed by 1M+ validated sensor samples across 4 datasets",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="w-1 h-1 bg-green-400 mt-2 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="border border-border p-6">
                <div className="text-xs text-red-400 font-mono uppercase tracking-widest mb-3">What it is not</div>
                <div className="space-y-3">
                  {[
                    "A gas chromatograph — it detects changes, not specific molecules",
                    "A replacement for lab analysis — it complements it",
                    "A magic box — it needs calibration and clean-air baselines",
                    "A medical device — not FDA-cleared, not for clinical diagnosis",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="w-1 h-1 bg-red-400 mt-2 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3.7 TECHNICAL SPECS */}
        <section className="border-t border-border py-24 bg-hex">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Technical Specifications</h2>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
                {[
                  { label: "Processor", value: "ESP32 (dual-core, Wi-Fi + BLE)" },
                  { label: "Sensor Slots", value: "Up to 6 MOX channels" },
                  { label: "Connector", value: "4-pin standardized interface" },
                  { label: "Temperature", value: "DHT11 (0-50C, +/-2C)" },
                  { label: "Humidity", value: "DHT11 (20-80% RH)" },
                  { label: "Display", value: "0.96\" OLED (128x64, I2C)" },
                  { label: "Alerts", value: "Passive buzzer (programmable)" },
                  { label: "Airflow", value: "Micro fan + PTFE pre-filter" },
                  { label: "Power", value: "5V USB-C (500mA typical)" },
                  { label: "Connectivity", value: "USB Serial + Bluetooth LE" },
                  { label: "Dimensions", value: "Compact enclosure (dimensions TBD)" },
                  { label: "Cold Start", value: "5 seconds (50 samples @ 10Hz)" },
                ].map((spec) => (
                  <div key={spec.label} className="bg-background p-4 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">{spec.label}</span>
                    <span className="text-sm font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3.9 OLED DISPLAY EXAMPLES */}
        <section className="border-t border-border py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">OLED Display</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mt-2">
                Programmable layouts. Show what matters for your process.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  title: "Fermentation",
                  lines: ["BREW-042  LINE-A", "", "ETHANOL  1.23V", "TEMP  22.4C  RH 68%", "", "STATUS: NORMAL", "TREND: +0.3%/hr"],
                },
                {
                  title: "VOC Leak Detection",
                  lines: ["SM-003  WAREHOUSE", "", "TOLUENE  0.87V", "HUMIDITY  45%", "", "ALERT: ELEVATED", "SINCE: 14:32:08"],
                },
                {
                  title: "Cold Chain",
                  lines: ["COLD-STORAGE-02", "", "AMMONIA  0.42V", "TEMP  4.1C  RH 92%", "", "STATUS: NORMAL", "BASELINE: 0.41V"],
                },
              ].map((display) => (
                <div key={display.title} className="border border-border p-6 bg-background">
                  <div className="coord-tag mb-3">{display.title}</div>
                  <div className="bg-black border border-border p-4 font-mono text-xs leading-relaxed" style={{ color: "#e8e8e8" }}>
                    {display.lines.map((line, i) => (
                      <div key={i} className={line === "" ? "h-3" : ""}>
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. YOU NEED THIS IF */}
        <section className="border-t border-border py-24 bg-hex">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                You need this if
              </h2>
            </div>
            <div className="max-w-2xl mx-auto">
              <div className="space-y-4">
                {[
                  "Your process produces detectable gases — ethanol, solvents, mold metabolites.",
                  "One ruined batch, one leak, one spoiled shipment costs more than the monitor.",
                  "You&apos;re still relying on someone&apos;s nose, manual sampling, or expensive spot-check gear.",
                ].map((item, i) => (
                  <div key={i} className="border border-border bg-background p-5 flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. USE CASES */}
        <section className="border-t border-border py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Use Cases</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
              {[
                {
                  icon: FlaskConical,
                  title: "Fermentation",
                  desc: "Detect stalled or infected batches hours before manual tests.",
                },
                {
                  icon: Warehouse,
                  title: "Industrial VOCs",
                  desc: "Continuous room-level leak monitoring, replacing expensive handheld spot-checks.",
                },
                {
                  icon: Snowflake,
                  title: "Cold-Chain",
                  desc: "Early warning for mold and degradation in sealed storage.",
                },
                {
                  icon: Leaf,
                  title: "Agriculture Research",
                  desc: "Soil health, crop decay, and environmental monitoring at scale.",
                },
                {
                  icon: Thermometer,
                  title: "Breath Analysis Research",
                  desc: "MOX sensor arrays for exhaled-VOC studies. Open protocol for reproducible experiments.",
                },
                {
                  icon: Wrench,
                  title: "Robotics & Custom",
                  desc: "Embed chemical sensing into autonomous systems. Open SDK, open protocol.",
                },
              ].map((uc) => (
                <div key={uc.title} className="bg-background p-8 hex-box">
                  <uc.icon className="w-8 h-8 mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">{uc.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{uc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. FOR DEVELOPERS */}
        <section className="border-t border-border py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border text-xs text-muted-foreground mb-6">
                  <Code className="w-3.5 h-3.5" />
                  For Developers
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                  Build applications for the Smell Monitor.
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  The hardware handles physical sensing and active airflow. You write the
                  software profile for your industry. Backed by an open-source SDK,
                  Bluetooth API, and sensor-agnostic data normalization.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Open-source SDK for sensor data access and processing",
                    "Bluetooth API for real-time streaming to Osmograph",
                    "Write custom software profiles per industry",
                    "Sensor-agnostic data normalization layer",
                    "Contribute hardware profiles to the community",
                  ].map((item) => (
                    <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 bg-muted-foreground flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="https://github.com/opensmell/Osmograph" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium hover:underline">
                    View the Open-Source SDK <ChevronRight className="w-4 h-4" />
                  </a>
                  <a href="https://mox.opensmell.xyz" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium hover:underline">
                    Try Osmograph Web <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
              <div className="border border-border p-6 bg-background hex-box">
                <div className="text-xs text-muted-foreground mb-4 font-mono uppercase tracking-wider">Quick Start — Osmograph</div>
                <div className="space-y-4">
                  {[
                    { step: "1", icon: Download, text: "Download Osmograph for your OS" },
                    { step: "2", icon: Cpu, text: "Pair the Smell Monitor via Bluetooth" },
                    { step: "3", icon: Play, text: "Osmograph auto-detects the sensor profile" },
                    { step: "4", icon: BarChart3, text: "View live chemical signature traces" },
                    { step: "5", icon: Settings, text: "Train anomaly classifiers with one click" },
                  ].map((s) => (
                    <div key={s.step} className="flex items-center gap-3">
                      <span className="w-6 h-6 border border-border flex items-center justify-center text-xs font-mono text-muted-foreground flex-shrink-0">{s.step}</span>
                      <s.icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{s.text}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-border">
                  <div className="text-xs text-muted-foreground mb-2 font-mono">pip install opensmell</div>
                  <pre className="text-sm leading-relaxed font-mono text-muted-foreground overflow-x-auto">
                    <span className="text-foreground">from</span> opensmell{" "}
                    <span className="text-foreground">import</span> monitor{"\n\n"}
                    device = monitor.<span className="text-foreground">connect</span>(<span className="text-foreground">"BLE"</span>){"\n"}
                    device.<span className="text-foreground">stream</span>(callback=on_anomaly)
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. FAQ */}
        <section className="border-t border-border py-24 bg-hex">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <div className="mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">FAQ</h2>
              </div>
              <div className="space-y-px bg-border">
                {[
                  {
                    q: "How often do sensors need replacing?",
                    a: "Sensors are consumables, typically lasting 3-6 months depending on the environment. They are designed to be unplugged and swapped in seconds.",
                  },
                  {
                    q: "Does it require an internet connection?",
                    a: "No. The device operates standalone with local alerts. Bluetooth streaming to Osmograph is optional.",
                  },
                  {
                    q: "Can I use my own custom sensors?",
                    a: "Yes. The 4-pin interface is open. You can build custom sensor arrays and write your own software profiles.",
                  },
                ].map((faq, i) => (
                  <div key={i} className="bg-background p-6">
                    <h3 className="font-semibold text-sm mb-2">{faq.q}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 8. CTA FORM — Lead Generation */}
        <section ref={contactRef} className="border-t border-border py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  Reserve a Pilot Unit
                </h2>
                <p className="text-muted-foreground">
                  We&apos;ll get back to you within 2-3 hours with pricing and pilot details.
                </p>
              </div>

              {formSubmitted ? (
                <div className="border border-border p-12 bg-background hex-box text-center">
                  <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Request received</h3>
                  <p className="text-sm text-muted-foreground">
                    Check your email for a confirmation. We&apos;ll be in touch within 2-3 hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleFormSubmit}
                  className="border border-border p-8 bg-background hex-box space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs text-muted-foreground font-mono uppercase tracking-wider mb-2">Name</label>
                      <input
                        name="name"
                        type="text"
                        required
                        className="w-full bg-transparent border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground font-mono uppercase tracking-wider mb-2">Company / Organization <span className="normal-case">(optional)</span></label>
                      <input
                        name="company"
                        type="text"
                        className="w-full bg-transparent border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground font-mono uppercase tracking-wider mb-2">Email Address</label>
                    <input
                      name="email"
                      type="email"
                      required
                      className="w-full bg-transparent border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground font-mono uppercase tracking-wider mb-2">What process are you trying to monitor?</label>
                    <input
                      name="process"
                      type="text"
                      required
                      placeholder="e.g. fermentation, VOC monitoring, cold-chain, breath analysis research"
                      className="w-full bg-transparent border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground font-mono uppercase tracking-wider mb-2">Estimated number of units</label>
                    <input
                      name="units"
                      type="number"
                      min="1"
                      required
                      value={unitCount}
                      onChange={(e) => setUnitCount(e.target.value)}
                      placeholder="e.g. 1, 5, 10"
                      className="w-full bg-transparent border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50"
                    />
                    <div className="flex flex-wrap gap-2 mt-3">
                      {["1", "5", "10", "25"].map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setUnitCount(n)}
                          className={`text-xs border px-3 py-1.5 transition-all ${
                            unitCount === n
                              ? "border-foreground text-foreground"
                              : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                          }`}
                        >
                          {n} unit{n !== "1" ? "s" : ""}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition-all w-full sm:w-auto disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    {submitting ? "Submitting..." : "Request Quote & Pilot Details"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

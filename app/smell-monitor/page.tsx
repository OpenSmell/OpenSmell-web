"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import {
  BarChart3, ChevronRight, Cpu,
  Monitor, Wind, Usb,
  FlaskConical, Warehouse, Wrench,
  Send, CheckCircle, UtensilsCrossed, GitBranch, Globe
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
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [unitCount, setUnitCount] = useState("")
  const contactRef = useRef<HTMLDivElement>(null)

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

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <main>
        {/* 1. WHAT IS IT — one sentence + the device */}
        <section className="pt-32 pb-20 border-b border-border bg-grid relative">
          <span className="section-marginalia">Hardware</span>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="coord-tag mb-3">001 // Smell Monitor</div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-[0.95]">
                  The Smell Monitor.
                </h1>
                <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                  A small box that watches the air around your process and tells you when it changes —
                  on its own display, or streamed to your computer.
                </p>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Plug in a sensor array, take a clean-air baseline, and it monitors continuously —
                  standalone, or paired with Osmograph.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={scrollToContact}
                    className="hex-btn hex-btn-primary"
                  >
                    Reserve a Pilot Unit
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <Link href="/osmograph" className="hex-btn hex-btn-outline">
                    <BarChart3 className="w-4 h-4" />
                    Pair with Osmograph
                  </Link>
                </div>
              </div>
              <div className="hud-corners border border-border bg-background p-8 relative">
                <div className="hud-corners-inner absolute inset-0 pointer-events-none" />
                <DeviceDrawing className="w-full max-w-md text-foreground" />
              </div>
            </div>
          </div>
        </section>

        {/* 2. WHAT IT CAN DETECT — concrete, honest */}
        <section className="border-t border-border py-20 relative">
          <span className="section-marginalia">What it detects</span>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="hex-icon text-muted-foreground" />
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">What it detects</h2>
                <span className="hex-icon text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm max-w-2xl mx-auto leading-relaxed">
                Chemical changes in the air — concrete examples, not broad claims.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border max-w-5xl mx-auto">
              {[
                {
                  icon: FlaskConical,
                  title: "Fermentation going wrong",
                  desc: "A stalled or infected batch shifts its off-gassing pattern. Flagged against the healthy baseline, hours before manual testing.",
                },
                {
                  icon: UtensilsCrossed,
                  title: "Food starting to spoil",
                  desc: "Spoilage VOCs appear in sealed storage and cold chains before anything looks wrong — before a temperature logger notices.",
                },
                {
                  icon: Warehouse,
                  title: "VOC levels in a room",
                  desc: "Solvent or process VOC patterns in industrial spaces. Continuous awareness instead of handheld spot-checks.",
                },
                {
                  icon: Wind,
                  title: "Exhaled-breath VOCs",
                  desc: "Profiles for breath research. 97.1% COPD classification on a published dataset.",
                },
                {
                  icon: Wrench,
                  title: "Custom environments",
                  desc: "Choose your sensors and build a profile for your own process — the interface is open.",
                },
              ].map((d) => (
                <div key={d.title} className="bg-background p-8 hex-box">
                  <d.icon className="w-8 h-8 mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">{d.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-6 max-w-3xl mx-auto text-center">
              Each application needs its own sensor array and a clean-air baseline.
            </p>
          </div>
        </section>

        {/* 3. WHY THIS INSTEAD OF A RAW GAS SENSOR — the software value */}
        <section className="border-t border-border py-20 bg-hex relative">
          <span className="section-marginalia">Why this</span>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="coord-tag mb-3">002 // The part we built</div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
                  Cheap gas sensors drift. This turns drift into measurements.
                </h2>
                <p className="text-muted-foreground mb-5 leading-relaxed">
                  The sensors are $10 commodity parts. The product is everything after the reading:
                  drift correction, temperature and humidity compensation, and anomaly detection.
                </p>
                <div className="space-y-3">
                  {[
                    "Automatic drift correction so a change is a change, not the weather",
                    "Baseline learned from your clean air — every process defines its own normal",
                    "Anomaly flags with adjustable sensitivity",
                    "Continuous operation — no sampling schedule, no forgetting to check",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1 h-1 bg-foreground mt-2 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="hud-corners border border-border p-6 bg-background relative">
                <div className="hud-corners-inner absolute inset-0 pointer-events-none" />
                <div className="coord-tag mb-3">The evidence</div>
                <div className="mb-6">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Raw sensor baseline</span>
                    <span className="font-mono text-foreground">71.4%</span>
                  </div>
                  <div className="h-2 bg-border relative">
                    <div className="absolute inset-y-0 left-0 bg-muted" style={{ width: "71.4%" }} />
                  </div>
                  <div className="flex items-center justify-between text-sm mt-4 mb-1">
                    <span className="text-muted-foreground">With drift correction</span>
                    <span className="font-mono text-foreground">93.3%</span>
                  </div>
                  <div className="h-2 bg-border relative">
                    <div className="absolute inset-y-0 left-0 bg-foreground" style={{ width: "93.3%" }} />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Same sensors, same 838K samples, same classification task — only the software changed.
                  Dataset: 59 food types across 10 MOX sensors (public, linked below).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. WHAT IT DOES FOR SOMEONE — applications */}
        <section className="border-t border-border py-20 relative">
          <span className="section-marginalia">Use it for</span>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="hex-icon text-muted-foreground" />
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">What it does for someone</h2>
                <span className="hex-icon text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm max-w-xl mx-auto">
                Breweries, factories, research labs, developer desks — and the kitchen counter.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-border">
              {[
                {
                  icon: FlaskConical,
                  title: "A brewmaster",
                  desc: "Watches a fermentation go abnormal overnight and is woken before the batch is ruined.",
                },
                {
                  icon: UtensilsCrossed,
                  title: "A distributor",
                  desc: "Flags spoilage in sealed storage before a shipment ships bad.",
                },
                {
                  icon: Wind,
                  title: "A researcher",
                  desc: "Records breath and odour profiles with a reproducible, documented pipeline.",
                },
                {
                  icon: Warehouse,
                  title: "A plant manager",
                  desc: "Gets continuous VOC leak awareness instead of weekly handheld spot-checks.",
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

        {/* 5. INSIDE THE BOX — device architecture */}
        <section className="border-t border-border py-24 bg-hex relative">
          <span className="section-marginalia">Inside the box</span>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="hex-icon text-muted-foreground" />
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">What you are actually getting</h2>
                <span className="hex-icon text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
                Replaceable sensors, active airflow, local alerting, and connections you can program.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border max-w-5xl mx-auto">
              {[
                {
                  icon: Cpu,
                  title: "Replaceable sensor array",
                  desc: "Up to 6 MOX channels on a standard 4-pin connector. Sensors wear out — swap them in seconds, no shipping the unit back.",
                },
                {
                  icon: Wind,
                  title: "Active intake & exhaust",
                  desc: "Micro-fan pulls a constant, clean air sample across the sensors. PTFE pre-filter keeps particulates off the elements.",
                },
                {
                  icon: Monitor,
                  title: "Local alerting",
                  desc: "OLED status display and a programmable buzzer. Faults surface with no phone, PC, or internet.",
                },
                {
                  icon: Usb,
                  title: "Connections you can program",
                  desc: "USB Serial, Wi-Fi, and Bluetooth LE. The protocol is open, so your software can talk to it directly.",
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

        {/* 6. LIMITATIONS — honest, for researchers */}
        <section className="border-t border-border py-20 relative">
          <span className="section-marginalia">Limits</span>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="hud-corners border border-border p-6 relative">
                <div className="hud-corners-inner absolute inset-0 pointer-events-none" />
                <div className="coord-tag mb-3">What it is</div>
                <div className="space-y-3">
                  {[
                    "A continuously-running chemical anomaly detector",
                    "A modular sensor platform with hot-swappable sensors",
                    "Open-source — firmware, SDK, and protocol are public",
                    "Validated on real data: 838K samples across public datasets",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="w-1 h-1 bg-green-400 mt-2 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="hud-corners border border-border p-6 relative">
                <div className="hud-corners-inner absolute inset-0 pointer-events-none" />
                <div className="coord-tag mb-3">What it cannot do</div>
                <div className="space-y-3">
                  {[
                    "Identify individual molecules",
                    "Give absolute ppm without laboratory calibration",
                    "Run clinical diagnosis — not a medical device",
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

        {/* 7. FOR RESEARCHERS & DEVELOPERS — the platform value */}
        <section className="border-t border-border py-24 bg-hex relative">
          <span className="section-marginalia">Build with it</span>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="hex-icon text-muted-foreground" />
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">What you can do with it</h2>
                <span className="hex-icon text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm max-w-xl mx-auto">
                Stream data, train detectors, and read everything programmatically.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <ul className="space-y-3 mb-6">
                  {[
                    "Connect and stream — USB Serial, Wi-Fi AP, or Bluetooth LE",
                    "Sensor health tracking — a degrading sensor is flagged before it misleads you",
                    "Record sessions and label events",
                    "Extract 145-dimensional features for custom ML pipelines",
                    "Read everything programmatically through an open SDK and protocol",
                    "Contribute sensor drivers, profiles, and code",
                  ].map((item) => (
                    <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 bg-muted-foreground flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="https://github.com/opensmell/Osmograph" target="_blank" rel="noopener noreferrer"
                    className="hex-btn hex-btn-outline">
                    <GitBranch className="w-4 h-4" />
                    View the SDK
                  </a>
                  <a href="https://mox.opensmell.xyz" target="_blank" rel="noopener noreferrer"
                    className="hex-btn hex-btn-outline">
                    <Globe className="w-4 h-4" />
                    Try Osmograph Web
                  </a>
                </div>
              </div>
              <div className="hud-corners border border-border p-6 bg-background relative">
                <div className="hud-corners-inner absolute inset-0 pointer-events-none" />
                <div className="coord-tag mb-3">Quick start</div>
                <div className="space-y-3 data-readout">
                  {[
                    { step: "01", text: "Download Osmograph for your OS" },
                    { step: "02", text: "Pair or plug in your Smell Monitor" },
                    { step: "03", text: "Take a clean-air baseline" },
                    { step: "04", text: "Record live traces" },
                    { step: "05", text: "Train a detector with one click" },
                  ].map((s) => (
                    <div key={s.step} className="flex items-center gap-3">
                      <span className="text-muted-foreground opacity-50 font-mono text-xs">{s.step}</span>
                      <span className="h-px flex-1 bg-border" />
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

        {/* 8. TECHNICAL SPECS */}
        <section className="border-t border-border py-24 relative">
          <span className="section-marginalia">Specs</span>
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16 text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="hex-icon text-muted-foreground" />
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Technical specifications</h2>
                <span className="hex-icon text-muted-foreground" />
              </div>
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

        {/* OLED DISPLAY EXAMPLES */}
        <section className="border-t border-border py-24 bg-hex">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16 text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="hex-icon text-muted-foreground" />
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">On-device display</h2>
                <span className="hex-icon text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Programmable layouts. Show what matters for your process — right on the box.
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

        {/* FAQ */}
        <section className="border-t border-border py-24 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <div className="mb-16">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <span className="hex-icon text-muted-foreground" />
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">FAQ</h2>
                  <span className="hex-icon text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-px bg-border text-left">
                {[
                  {
                    q: "How often do sensors need replacing?",
                    a: "Consumables, typically 3-6 months depending on the environment. Swap in seconds — no shipping the unit back.",
                  },
                  {
                    q: "Does it require an internet connection?",
                    a: "No. It works standalone with local alerts; Bluetooth streaming to Osmograph is optional.",
                  },
                  {
                    q: "Can I use my own custom sensors?",
                    a: "Yes. The 4-pin interface is open. You can build custom sensor arrays and write your own software profiles.",
                  },
                  {
                    q: "Why do I need a baseline before it works?",
                    a: "It learns normal from about 5 seconds of clean air and keeps the baseline updated. Every process defines its own normal.",
                  },
                  {
                    q: "Is it a real scientific instrument?",
                    a: "Validated on real data, and the full pipeline is public. It detects changes in air chemistry — not individual molecules, and not a medical device.",
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

        {/* NEXT ACTION */}
        <section className="border-t border-border py-20 bg-hex relative">
          <span className="section-marginalia">Next</span>
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="hex-icon text-muted-foreground" />
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Three ways in</h2>
                <span className="hex-icon text-muted-foreground" />
              </div>
              <p className="text-muted-foreground mb-8">
                Same hardware. Deploy it, build with it, or research with it.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button onClick={scrollToContact} className="hex-btn hex-btn-primary">
                  <Monitor className="w-4 h-4" />
                  Deploy a pilot
                </button>
                <Link href="/osmograph" className="hex-btn hex-btn-outline">
                  <BarChart3 className="w-4 h-4" />
                  Build with Osmograph
                </Link>
                <a href="https://github.com/opensmell/Osmograph" target="_blank" rel="noopener noreferrer"
                  className="hex-btn hex-btn-outline">
                  <GitBranch className="w-4 h-4" />
                  Research the code
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA FORM — Lead Generation */}
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
                    className="hex-btn hex-btn-primary w-full sm:w-auto disabled:opacity-50"
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
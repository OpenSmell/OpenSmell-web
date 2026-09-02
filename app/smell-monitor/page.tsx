"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import {
  BarChart3, ChevronRight, Cpu,
  Monitor, Wind, Usb,
  FlaskConical, Warehouse, Wrench,
  Send, CheckCircle, UtensilsCrossed, GitBranch, Globe
} from "lucide-react"

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

    try {
      await fetch("/api/smell-monitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          company: data.get("company"),
          email: data.get("email"),
          process: data.get("process"),
          units: unitCount,
        }),
      })
    } catch {
      // no-op — still confirm the request
    } finally {
      setSubmitting(false)
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
                  Plug in a sensor array, take a clean-air baseline, and it monitors continuously.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={scrollToContact}
                    className="hex-btn hex-btn-primary"
                  >
                    Join the Waitlist
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
                <img src="/smell-monitor.jpg" alt="Smell Monitor device" className="w-full max-w-md h-auto" />
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
                  Cheap gas sensors drift. This corrects for it.
                </h2>
                <p className="text-muted-foreground mb-5 leading-relaxed">
                  The sensors are $10 commodity parts. The product is everything after the reading:
                  drift correction, temperature and humidity compensation, and anomaly detection.
                </p>
                <div className="space-y-3">
                  {[
                    "Automatic drift correction — a flagged change is a real change, not temperature or humidity",
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
                <div className="coord-tag mb-4">The evidence</div>
                <div className="font-mono text-5xl font-bold tracking-tight leading-none">93.3%</div>
                <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                  Accuracy with automatic drift correction — 71.4% on the same 838K samples without it.
                  Only the software changed.
                </p>
                <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                  Public dataset: 59 food types across 10 MOX sensors.
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
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Who it's for</h2>
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
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">What's inside</h2>
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
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Build with it</h2>
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
                    "Extract 187-dimensional features for custom ML pipelines",
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
                  <a href="https://github.com/OpenSmell/opensmell" target="_blank" rel="noopener noreferrer"
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

        {/* CTA FORM — Lead Generation */}
        <section ref={contactRef} className="border-t border-border py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  Join the Waitlist
                </h2>
                <p className="text-muted-foreground">
                  Smell Monitor is in active development. Join the waitlist and
                  we&apos;ll reach out when pilot units are ready.
                </p>
              </div>

              {formSubmitted ? (
                <div className="border border-border p-12 bg-background hex-box text-center">
                  <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">You&apos;re on the list</h3>
                  <p className="text-sm text-muted-foreground">
                    Thanks — we&apos;ll email you when pilot units are ready to ship.
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
                    <label className="block text-xs text-muted-foreground font-mono uppercase tracking-wider mb-2">How many units are you considering?</label>
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
                    {submitting ? "Submitting..." : "Join the Waitlist"}
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
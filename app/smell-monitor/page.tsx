"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import {
  Monitor, AlertTriangle, Wind, Thermometer, Usb, Shield,
  FlaskConical, Code, ChevronRight, Send, CheckCircle, Cpu,
  Activity
} from "lucide-react"

function AnnotatedDevice() {
  return (
    <svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
      {/* Device body */}
      <rect x="120" y="80" width="360" height="200" stroke="currentColor" strokeWidth="1.5" />
      <rect x="120" y="80" width="360" height="200" fill="currentColor" opacity="0.02" />

      {/* Top panel */}
      <rect x="120" y="80" width="360" height="200" stroke="currentColor" strokeWidth="1.5" />

      {/* Sensor array area */}
      <rect x="280" y="110" width="180" height="100" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 4" />
      <text x="370" y="105" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="monospace" opacity="0.5">SENSOR ARRAY</text>

      {/* 6 sensor slots */}
      {[0,1,2,3,4,5].map(i => (
        <g key={i}>
          <rect x={290 + (i % 3) * 55} y={120 + Math.floor(i / 3) * 45} width="45" height="35" stroke="currentColor" strokeWidth="0.8" />
          <circle cx={312 + (i % 3) * 55} cy={137 + Math.floor(i / 3) * 45} r="4" fill="currentColor" opacity={0.15 + i * 0.05} />
          <text x={312 + (i % 3) * 55} y={155 + Math.floor(i / 3) * 45} textAnchor="middle" fill="currentColor" fontSize="6" fontFamily="monospace" opacity="0.4">S{i+1}</text>
        </g>
      ))}

      {/* OLED display */}
      <rect x="140" y="110" width="110" height="60" stroke="currentColor" strokeWidth="1" />
      <text x="195" y="130" textAnchor="middle" fill="currentColor" fontSize="7" fontFamily="monospace" opacity="0.6">SMELL MONITOR</text>
      <text x="195" y="142" textAnchor="middle" fill="currentColor" fontSize="6" fontFamily="monospace" opacity="0.4">STATUS    NORMAL</text>
      <text x="195" y="152" textAnchor="middle" fill="currentColor" fontSize="6" fontFamily="monospace" opacity="0.4">ARRAY     6 / 8</text>
      <text x="195" y="162" textAnchor="middle" fill="currentColor" fontSize="6" fontFamily="monospace" opacity="0.4">TEMP      28.4C</text>

      {/* Fan */}
      <circle cx="460" cy="160" r="20" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      <circle cx="460" cy="160" r="12" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <circle cx="460" cy="160" r="4" fill="currentColor" opacity="0.2" />

      {/* USB-C port */}
      <rect x="270" y="280" width="24" height="8" rx="1" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />

      {/* DHT11 */}
      <rect x="150" y="190" width="20" height="15" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      <text x="160" y="215" textAnchor="middle" fill="currentColor" fontSize="5" fontFamily="monospace" opacity="0.4">DHT11</text>

      {/* Buzzer */}
      <circle cx="200" cy="197" r="6" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />

      {/* IMU */}
      <rect x="230" y="190" width="15" height="10" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      <text x="237" y="215" textAnchor="middle" fill="currentColor" fontSize="5" fontFamily="monospace" opacity="0.4">IMU</text>

      {/* Bottom labels */}
      <line x1="120" y1="290" x2="480" y2="290" stroke="currentColor" strokeWidth="0.5" opacity="0.2" strokeDasharray="4 4" />
      <text x="300" y="305" textAnchor="middle" fill="currentColor" fontSize="7" fontFamily="monospace" opacity="0.3">ESP32  |  DHT11  |  USB-C  |  BT</text>

      {/* Annotation lines */}
      {/* 01 - Sensor Array */}
      <line x1="370" y1="210" x2="370" y2="330" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <text x="370" y="345" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="monospace" opacity="0.6">01  MODULAR SENSOR ARRAY</text>
      <text x="370" y="358" textAnchor="middle" fill="currentColor" fontSize="6" fontFamily="monospace" opacity="0.4">Up to 8 channels</text>

      {/* 02 - Airflow */}
      <line x1="460" y1="140" x2="530" y2="100" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <text x="540" y="95" fill="currentColor" fontSize="8" fontFamily="monospace" opacity="0.6">02  CONTROLLED AIRFLOW</text>
      <text x="540" y="108" fill="currentColor" fontSize="6" fontFamily="monospace" opacity="0.4">Micro fan + PTFE filter</text>

      {/* 03 - OLED */}
      <line x1="140" y1="110" x2="60" y2="80" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <text x="10" y="75" fill="currentColor" fontSize="8" fontFamily="monospace" opacity="0.6">05  OLED STATUS</text>
      <text x="10" y="88" fill="currentColor" fontSize="6" fontFamily="monospace" opacity="0.4">Local instrument display</text>

      {/* 04 - Buzzer */}
      <line x1="200" y1="191" x2="80" y2="160" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <text x="10" y="155" fill="currentColor" fontSize="8" fontFamily="monospace" opacity="0.6">04  LOCAL ALERT</text>
      <text x="10" y="168" fill="currentColor" fontSize="6" fontFamily="monospace" opacity="0.4">Programmable buzzer</text>

      {/* 06 - DHT11 */}
      <line x1="150" y1="197" x2="60" y2="230" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <text x="10" y="225" fill="currentColor" fontSize="8" fontFamily="monospace" opacity="0.6">03  TEMP / HUMIDITY</text>
      <text x="10" y="238" fill="currentColor" fontSize="6" fontFamily="monospace" opacity="0.4">Environmental context</text>

      {/* 07 - USB-C */}
      <line x1="282" y1="288" x2="282" y2="380" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <text x="282" y="395" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="monospace" opacity="0.6">07  USB-C POWER</text>

      {/* 08 - IMU */}
      <line x1="237" y1="200" x2="160" y2="280" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <text x="10" y="285" fill="currentColor" fontSize="8" fontFamily="monospace" opacity="0.6">08  IMPACT DETECTION</text>
      <text x="10" y="298" fill="currentColor" fontSize="6" fontFamily="monospace" opacity="0.4">IMU / motion sensing</text>

      {/* 09 - Wireless */}
      <line x1="340" y1="280" x2="440" y2="350" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <text x="440" y="365" fill="currentColor" fontSize="8" fontFamily="monospace" opacity="0.6">09  WIRELESS</text>
      <text x="440" y="378" fill="currentColor" fontSize="6" fontFamily="monospace" opacity="0.4">Bluetooth / USB</text>

      {/* Title */}
      <text x="300" y="55" textAnchor="middle" fill="currentColor" fontSize="12" fontFamily="monospace" opacity="0.7" fontWeight="bold">SMELL MONITOR</text>
      <text x="300" y="70" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="monospace" opacity="0.4">v0.x DEVELOPMENT PLATFORM</text>
    </svg>
  )
}

function OLEDDisplay({ lines }: { lines: { label: string; value: string; color?: string }[] }) {
  return (
    <div className="border border-border p-4 bg-background font-mono text-xs">
      {lines.map((line, i) => (
        <div key={i} className="flex justify-between">
          <span className="text-muted-foreground">{line.label}</span>
          <span className={line.color || "text-foreground"}>{line.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function SmellMonitorPage() {
  const [hydrated, setHydrated] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [unitCount, setUnitCount] = useState("")
  const contactRef = useRef<HTMLDivElement>(null)

  useEffect(() => { setHydrated(true) }, [])

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
      if (res.ok) setFormSubmitted(true)
      else setFormSubmitted(true)
    } catch {
      setFormSubmitted(true)
    }
  }

  if (!hydrated) return null

  return (
    <div className="overflow-x-clip">

      {/* HERO */}
      <section className="pt-32 pb-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border text-xs font-mono text-muted-foreground mb-6">
                <Monitor className="w-3.5 h-3.5" />
                SMELL MONITOR
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-[0.95]">
                Continuous chemical anomaly detection for industrial processes.
              </h1>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Smell Monitor turns inexpensive gas-sensor arrays into continuously monitored chemical signals — so you can detect changes before they become failures.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => contactRef.current?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition-all"
                >
                  Run a Pilot
                  <ChevronRight className="w-4 h-4" />
                </button>
                <Link
                  href="/enose"
                  className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 text-sm font-medium hover:bg-foreground hover:text-background transition-all"
                >
                  <Code className="w-4 h-4" />
                  Developer Docs
                </Link>
              </div>
            </div>
            <div className="border border-border bg-background p-8 flex items-center justify-center">
              <AnnotatedDevice />
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IT IS / WHAT IT IS NOT */}
      <section className="border-t border-border py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="border border-border p-6">
              <div className="text-xs font-mono text-green-500 uppercase tracking-widest mb-4">It is</div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2"><span className="w-1 h-1 bg-green-500 mt-2 flex-shrink-0" />Continuous chemical monitoring</div>
                <div className="flex items-start gap-2"><span className="w-1 h-1 bg-green-500 mt-2 flex-shrink-0" />A modular sensor platform</div>
                <div className="flex items-start gap-2"><span className="w-1 h-1 bg-green-500 mt-2 flex-shrink-0" />An anomaly-detection system</div>
                <div className="flex items-start gap-2"><span className="w-1 h-1 bg-green-500 mt-2 flex-shrink-0" />A research / development platform</div>
                <div className="flex items-start gap-2"><span className="w-1 h-1 bg-green-500 mt-2 flex-shrink-0" />Programmable and extensible</div>
              </div>
            </div>
            <div className="border border-border p-6">
              <div className="text-xs font-mono text-red-500 uppercase tracking-widest mb-4">It is not</div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2"><span className="w-1 h-1 bg-red-500 mt-2 flex-shrink-0" />A mass spectrometer</div>
                <div className="flex items-start gap-2"><span className="w-1 h-1 bg-red-500 mt-2 flex-shrink-0" />Universal molecular identification</div>
                <div className="flex items-start gap-2"><span className="w-1 h-1 bg-red-500 mt-2 flex-shrink-0" />A replacement for laboratory analysis</div>
                <div className="flex items-start gap-2"><span className="w-1 h-1 bg-red-500 mt-2 flex-shrink-0" />A single sensor that identifies every gas</div>
                <div className="flex items-start gap-2"><span className="w-1 h-1 bg-red-500 mt-2 flex-shrink-0" />A finished MIRIS spectrometer</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — SENSOR ARRAY */}
      <section className="border-t border-border py-24 bg-hex">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="border border-border p-8 bg-background font-mono text-xs">
              <div className="text-muted-foreground mb-4 uppercase tracking-widest">Array Response Architecture</div>
              <div className="space-y-3">
                <div className="text-muted-foreground">Chemical environment</div>
                <div className="ml-4 text-muted-foreground">&darr;</div>
                <div className="border border-border p-4">
                  <div className="text-muted-foreground mb-2">// MOX sensors are broadly cross-sensitive</div>
                  <div className="text-muted-foreground mb-2">// the array produces a response PATTERN, not a 1:1 gas reading</div>
                  <div className="space-y-1 mt-3">
                    <div>sensor 1 <span className="text-green-500">&uarr;</span>  +34%</div>
                    <div>sensor 2 <span className="text-muted-foreground">&rarr;</span>  +2%</div>
                    <div>sensor 3 <span className="text-red-500">&darr;</span>  -12%</div>
                    <div>sensor 4 <span className="text-green-500">&uarr;</span>  +8%</div>
                    <div>sensor 5 <span className="text-muted-foreground">&rarr;</span>  +1%</div>
                  </div>
                </div>
                <div className="ml-4 text-muted-foreground">&darr;</div>
                <div className="text-muted-foreground">multidimensional response vector</div>
                <div className="ml-4 text-muted-foreground">&darr;</div>
                <div className="text-muted-foreground">baseline / anomaly / classifier</div>
                <div className="ml-4 text-muted-foreground">&darr;</div>
                <div className="text-foreground font-medium">actionable alert</div>
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border text-xs font-mono text-muted-foreground mb-6">
                <FlaskConical className="w-3.5 h-3.5" />
                WHY THE ARRAY
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Cross-sensitive sensors, not one-to-one gas identification.
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                MOX sensors are broadly cross-sensitive. OpenSmell uses the collective response of an array rather than relying on one sensor to uniquely identify one molecule.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Different chemical environments require different response profiles. The array is configured per application — not every slot needs to be populated.
              </p>
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">Example configurations</div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { use: "Fermentation", channels: "5-8 channels" },
                  { use: "Food / Spoilage", channels: "4-8 channels" },
                  { use: "VOC Monitoring", channels: "3-6 channels" },
                  { use: "Research", channels: "custom" },
                ].map((c) => (
                  <div key={c.use} className="border border-border p-3">
                    <div className="text-sm text-foreground">{c.use}</div>
                    <div className="text-xs text-muted-foreground">{c.channels}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNICAL SPECIFICATIONS */}
      <section className="border-t border-border py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Technical Specifications</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-px bg-border">
              {[
                ["Sensor architecture", "Modular multi-sensor array"],
                ["Maximum sensing channels", "Up to 8"],
                ["Sensor type", "Compatible gas-sensor modules (MOX)"],
                ["Environmental sensing", "Temperature + Relative Humidity (DHT11)"],
                ["Local display", "0.96\" OLED status display"],
                ["Local alerts", "Programmable buzzer"],
                ["Motion sensing", "IMU / impact detection"],
                ["Connectivity", "Bluetooth / USB"],
                ["Software", "Osmograph + OpenSmell SDK"],
                ["Data format", "OpenSmell protocol (.osmell)"],
                ["Power", "USB-C; battery backup under development"],
              ].map(([label, value]) => (
                <div key={label} className="bg-background flex items-center justify-between p-4">
                  <span className="text-sm text-muted-foreground">{label}</span>
                  <span className="text-sm font-mono text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SENSOR HEALTH + LOCAL INTERFACE */}
      <section className="border-t border-border py-24 bg-hex">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border text-xs font-mono text-muted-foreground mb-6">
                <Shield className="w-3.5 h-3.5" />
                SENSOR HEALTH
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                Not just reading sensors. Monitoring the quality of measurements.
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                OpenSmell continuously monitors sensor health to ensure measurement validity.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["Drift", "Response stability", "Saturation", "Missing channel", "Abnormal response", "Environmental conditions", "Sensor replacement status", "Baseline integrity"].map((m) => (
                  <div key={m} className="border border-border p-3 text-xs text-muted-foreground">{m}</div>
                ))}
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border text-xs font-mono text-muted-foreground mb-6">
                <Monitor className="w-3.5 h-3.5" />
                LOCAL INTERFACE
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                Status at a glance.
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-widest">Normal operation</div>
                  <OLEDDisplay lines={[
                    { label: "STATUS", value: "NORMAL" },
                    { label: "ARRAY", value: "6 / 8" },
                    { label: "TEMP", value: "28.4C" },
                    { label: "RH", value: "61%" },
                    { label: "QUALITY", value: "94" },
                  ]} />
                </div>
                <div>
                  <div className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-widest">During anomaly</div>
                  <OLEDDisplay lines={[
                    { label: "CHEMICAL DEVIATION", value: "" },
                    { label: "SEVERITY", value: "HIGH", color: "text-red-500" },
                    { label: "CHANNELS", value: "2 4 5" },
                    { label: "QUALITY", value: "91" },
                    { label: "ACTION", value: "CHECK PROCESS", color: "text-yellow-500" },
                  ]} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APPLICATIONS */}
      <section className="border-t border-border py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Applications</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Organized by evidence and maturity.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-xs font-mono text-green-500 uppercase tracking-widest mb-4">Active / Immediate wedge</div>
              <div className="space-y-3">
                {["Industrial process monitoring", "Fermentation", "Brewing", "Food processing", "Chemical / VOC environments"].map((a) => (
                  <div key={a} className="border border-border p-3 text-sm text-muted-foreground">{a}</div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-mono text-yellow-500 uppercase tracking-widest mb-4">Investigational</div>
              <div className="space-y-3">
                {["Food spoilage", "Cold-chain storage", "Agriculture", "Environmental monitoring", "Research applications"].map((a) => (
                  <div key={a} className="border border-border p-3 text-sm text-muted-foreground">{a}</div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">Future</div>
              <div className="space-y-3">
                {["Robotics", "Breathomics", "Volatilomics", "Healthcare", "Consumer devices"].map((a) => (
                  <div key={a} className="border border-border p-3 text-sm text-muted-foreground">{a}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION */}
      <section className="border-t border-border py-24 bg-hex">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              When &ldquo;something smells wrong&rdquo; is already too late.
            </h2>
            <p className="text-muted-foreground text-lg mb-12 leading-relaxed">
              Industrial operators already have human inspection, periodic sampling, and laboratory analysis. OpenSmell adds continuous, low-cost chemical signal monitoring between expensive or infrequent measurements.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="border border-border p-3 text-center">Continuous monitoring</div>
              <span className="hidden sm:block">&rarr;</span>
              <div className="border border-border p-3 text-center">earlier deviation detection</div>
              <span className="hidden sm:block">&rarr;</span>
              <div className="border border-border p-3 text-center">faster investigation</div>
              <span className="hidden sm:block">&rarr;</span>
              <div className="border border-border p-3 text-center">potentially smaller losses</div>
            </div>
          </div>
        </div>
      </section>

      {/* PILOT CTA */}
      <section ref={contactRef} className="border-t border-border py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Run a Smell Monitor pilot</h2>
              <p className="text-muted-foreground">
                Tell us what you monitor, where the device would be installed, what failures you are trying to catch, and what measurements you currently use.
              </p>
            </div>

            {formSubmitted ? (
              <div className="border border-border p-12 bg-background text-center">
                <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Request received</h3>
                <p className="text-sm text-muted-foreground">
                  Check your email for a confirmation. We will be in touch within 2-3 business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="border border-border p-8 bg-background space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs text-muted-foreground font-mono uppercase tracking-wider mb-2">Name</label>
                    <input name="name" type="text" required className="w-full bg-transparent border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground font-mono uppercase tracking-wider mb-2">Company / Organization</label>
                    <input name="company" type="text" required className="w-full bg-transparent border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground font-mono uppercase tracking-wider mb-2">Email Address</label>
                  <input name="email" type="email" required className="w-full bg-transparent border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors" />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground font-mono uppercase tracking-wider mb-2">What process are you trying to monitor?</label>
                  <input name="process" type="text" required placeholder="e.g. fermentation, VOC monitoring, cold-chain storage" className="w-full bg-transparent border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50" />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground font-mono uppercase tracking-wider mb-2">Estimated number of units</label>
                  <input name="units" type="number" min="1" required value={unitCount} onChange={(e) => setUnitCount(e.target.value)} placeholder="e.g. 5" className="w-full bg-transparent border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50" />
                  <div className="flex flex-wrap gap-2 mt-3">
                    {["1", "5", "10", "25", "50+"].map((n) => (
                      <button key={n} type="button" onClick={() => setUnitCount(n)} className={`text-xs border px-3 py-1.5 transition-all ${unitCount === n ? "border-foreground text-foreground" : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"}`}>
                        {n} unit{n !== "1" && n !== "50+" ? "s" : ""}
                      </button>
                    ))}
                  </div>
                </div>
                <button type="submit" disabled={submitting} className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition-all w-full sm:w-auto disabled:opacity-50">
                  <Send className="w-4 h-4" />
                  {submitting ? "Submitting..." : "Request Pilot Details"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

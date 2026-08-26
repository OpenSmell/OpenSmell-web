"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Search, ChevronRight, ExternalLink, BookOpen, Monitor, BarChart3,
  Wind, AlertTriangle, FlaskConical, Shield, Zap, Activity,
  Thermometer, Cpu, Database, Hexagon, Sigma, Code
} from "lucide-react"

export default function Home() {
  const [hydrated, setHydrated] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => { setHydrated(true) }, [])

  const handleSearchSubmit = (query: string, type: "odor" | "chemical") => {
    if (!query.trim()) return
    router.push(`/search?type=${type}&q=${encodeURIComponent(query.trim())}`)
  }

  if (!hydrated) return null

  return (
    <div className="overflow-x-clip">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-24 pb-32">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border text-xs font-mono text-muted-foreground mb-8">
              <span className="w-1.5 h-1.5 bg-green-500 animate-pulse" />
              INFRASTRUCTURE FOR MACHINES TO SMELL
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tighter mb-6 leading-[0.95]">
              Machines can see.
              <br />
              Machines can hear.
              <br />
              <span className="text-muted-foreground">We are building the</span>
              <br />
              <span className="text-muted-foreground">infrastructure for machines to smell.</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
              OpenSmell builds continuous chemical monitoring using modular gas-sensor arrays.
              Inexpensive, imperfect sensors made useful through software, data, and open infrastructure.
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

      {/* SMELL MONITOR — Primary Product */}
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
                  "Up to 8 sensing channels — configure the array for the chemistry you are monitoring",
                  "Temperature and humidity compensation",
                  "Local OLED status display and programmable buzzer",
                  "Fleet management for multiple devices across facilities",
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
            <div className="border border-border p-8 bg-background">
              <div className="text-xs font-mono text-muted-foreground mb-6 uppercase tracking-widest">How it works</div>
              <div className="space-y-4">
                {[
                  { step: "01", label: "PLUG IN", desc: "Insert sensor modules into the array" },
                  { step: "02", label: "SAMPLE", desc: "Micro fan draws air across sensors" },
                  { step: "03", label: "MEASURE", desc: "MOX sensors respond to chemical environment" },
                  { step: "04", label: "LEARN BASELINE", desc: "System establishes normal operating range" },
                  { step: "05", label: "DETECT DEVIATION", desc: "Mahalanobis distance flags anomalies" },
                  { step: "06", label: "ALERT", desc: "Local buzzer, OLED, or fleet notification" },
                ].map((s) => (
                  <div key={s.step} className="flex items-start gap-4">
                    <span className="text-xs font-mono text-muted-foreground mt-0.5 w-6 flex-shrink-0">{s.step}</span>
                    <div>
                      <div className="text-xs font-mono uppercase tracking-widest text-foreground">{s.label}</div>
                      <div className="text-sm text-muted-foreground">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY THE ARRAY */}
      <section className="border-t border-border py-24 bg-hex">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 border border-border p-8 bg-background">
              <div className="text-xs font-mono text-muted-foreground mb-6 uppercase tracking-widest">Array Response Architecture</div>
              <div className="space-y-4 font-mono text-xs">
                <div className="text-muted-foreground">Chemical environment</div>
                <div className="ml-4 text-muted-foreground">&darr;</div>
                <div className="border border-border p-4">
                  <div className="text-muted-foreground mb-2">// sensor array response</div>
                  <div className="space-y-1">
                    <div>sensor 1 <span className="text-green-500">&uarr;</span>  <span className="text-muted-foreground">+34%</span></div>
                    <div>sensor 2 <span className="text-muted-foreground">&rarr;</span>  <span className="text-muted-foreground">+2%</span></div>
                    <div>sensor 3 <span className="text-red-500">&darr;</span>  <span className="text-muted-foreground">-12%</span></div>
                    <div>sensor 4 <span className="text-green-500">&uarr;</span>  <span className="text-muted-foreground">+8%</span></div>
                    <div>sensor 5 <span className="text-muted-foreground">&rarr;</span>  <span className="text-muted-foreground">+1%</span></div>
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
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border text-xs font-mono text-muted-foreground mb-6">
                <FlaskConical className="w-3.5 h-3.5" />
                WHY THE ARRAY
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Cross-sensitive sensors, not one-to-one gas identification.
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                MOX sensors are broadly cross-sensitive. OpenSmell uses the collective response of an array rather than relying on one sensor to uniquely identify one molecule.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Different chemical environments require different response profiles. The array is configured per application — not every slot needs to be populated.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THREE LEVELS OF INTELLIGENCE */}
      <section className="border-t border-border py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border text-xs font-mono text-muted-foreground mb-6">
              <Cpu className="w-3.5 h-3.5" />
              THREE LEVELS OF INTELLIGENCE
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              From raw signal to actionable decision.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                level: "01",
                title: "Signal",
                desc: "Raw sensor responses. Temperature and humidity. Timestamps. The physical measurement.",
                icon: Activity,
              },
              {
                level: "02",
                title: "Health",
                desc: "Drift, response stability, saturation, missing channels, abnormal behavior, environmental conditions.",
                icon: Shield,
              },
              {
                level: "03",
                title: "Intelligence",
                desc: "Baseline deviation, anomaly detection, event detection, classification, application-specific models.",
                icon: Zap,
              },
            ].map((item) => (
              <div key={item.level} className="border border-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-muted-foreground">{item.level}</span>
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVIDENCE */}
      <section className="border-t border-border py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border text-xs font-mono text-muted-foreground mb-6">
              <Sigma className="w-3.5 h-3.5" />
              EVIDENCE
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Every number comes from our experiments.
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              No synthetic data. No cherry-picked results. 1M+ samples across 5 independent datasets.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: "COPD Breath Screening",
                metric: "97.1%",
                metricLabel: "accuracy",
                detail: "8 MOX sensors, 68 patients, leave-one-out cross-validation",
                source: "Acevedo et al. 2021",
              },
              {
                title: "Food Identification",
                metric: "87.5%",
                metricLabel: "accuracy",
                detail: "99 food categories, 838K samples, 10 MOX sensors",
                source: "Food Freshness Dataset",
              },
              {
                title: "Anomaly Detection",
                metric: "100%",
                metricLabel: "detection rate",
                detail: "Adaptive Mahalanobis distance at 3-sigma threshold",
                source: "All datasets validated",
              },
              {
                title: "Sensor Drift Handling",
                metric: "93.3%",
                metricLabel: "accuracy maintained",
                detail: "EWMA α=0.001 holds across 0–500% simulated annual drift",
                source: "Drift validation experiment",
              },
              {
                title: "Cold Start",
                metric: "5 sec",
                metricLabel: "to first useful data",
                detail: "50 samples at 10Hz minimum viable, 75 recommended",
                source: "Cold-start experiment",
              },
              {
                title: "Dataset Coverage",
                metric: "1M+",
                metricLabel: "samples validated",
                detail: "5 independent datasets, open-source, reproducible",
                source: "Data commons",
              },
            ].map((item) => (
              <div key={item.title} className="border border-border p-6">
                <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">{item.title}</div>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-3xl font-bold tracking-tight">{item.metric}</span>
                  <span className="text-sm text-muted-foreground">{item.metricLabel}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-2">{item.detail}</p>
                <p className="text-[10px] font-mono text-muted-foreground">{item.source}</p>
              </div>
            ))}
          </div>
          <div className="border border-border p-6">
            <div className="text-xs font-mono text-muted-foreground mb-3 uppercase tracking-widest">Research Limitations</div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Smell Monitor is not a mass spectrometer. MOX arrays do not provide universal molecular identification.</p>
              <p>Absolute concentration measurements are not guaranteed across arbitrary sensors. Application-specific calibration and validation remain important.</p>
            </div>
          </div>
        </div>
      </section>

      {/* OSMOGRAPH */}
      <section className="border-t border-border py-24 bg-hex">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border text-xs font-mono text-muted-foreground mb-6">
                <BarChart3 className="w-3.5 h-3.5" />
                OSMOGRAPH
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                The control room for Smell Monitor.
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Connect devices, configure sensor arrays, view live traces, record sessions, inspect sensor health, configure alerts, and manage multiple devices across facilities.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  "Live sensor traces",
                  "Session recording",
                  "Fleet management",
                  "Alert configuration",
                  "Sensor health monitoring",
                  "Data export",
                ].map((f) => (
                  <div key={f} className="border border-border p-3 text-xs text-muted-foreground">{f}</div>
                ))}
              </div>
              <Link
                href="/osmograph"
                className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition-all"
              >
                Open Osmograph
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="border border-border p-8 bg-background">
              <div className="text-xs font-mono text-muted-foreground mb-6 uppercase tracking-widest">Fleet Overview</div>
              <div className="space-y-3 font-mono text-xs">
                <div className="text-muted-foreground">FACILITY</div>
                <div className="ml-4">
                  <div className="text-muted-foreground">Fermentation Room A</div>
                  <div className="ml-4 text-green-500">SM-001 &nbsp; NORMAL</div>
                </div>
                <div className="ml-4">
                  <div className="text-muted-foreground">Tank Area B</div>
                  <div className="ml-4 text-green-500">SM-002 &nbsp; NORMAL</div>
                  <div className="ml-4 text-red-500">SM-003 &nbsp; ANOMALY</div>
                </div>
                <div className="ml-4">
                  <div className="text-muted-foreground">Cold Storage</div>
                  <div className="ml-4 text-green-500">SM-004 &nbsp; NORMAL</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEVELOPERS */}
      <section className="border-t border-border py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border text-xs font-mono text-muted-foreground mb-6">
                <Code className="w-3.5 h-3.5" />
                DEVELOPERS
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Build on the smell data — not the plumbing.
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                OpenSmell abstracts sensor-specific acquisition and preprocessing so developers can work with standardized measurements and events.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  "Rust SDK with 22 passing tests",
                  "OSM serial protocol specification",
                  ".osmell structured data format",
                  "Open-source hardware reference designs",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="w-1 h-1 bg-foreground mt-2 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                <Link
                  href="/enose"
                  className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-medium hover:bg-foreground hover:text-background transition-all"
                >
                  Read the developer docs
                </Link>
                <a
                  href="https://github.com/opensmell"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-medium hover:bg-foreground hover:text-background transition-all"
                >
                  GitHub
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
            <div className="border border-border p-6 bg-background">
              <div className="text-xs font-mono text-muted-foreground mb-4 uppercase tracking-widest">.osmell format</div>
              <pre className="text-xs font-mono text-muted-foreground leading-relaxed overflow-x-auto">
{`.osmell
├── device metadata
├── sensor metadata
├── environmental context
├── timestamps
├── raw measurements
├── processed features
└── quality metadata`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* RESEARCHERS */}
      <section className="border-t border-border py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border text-xs font-mono text-muted-foreground mb-6">
              <FlaskConical className="w-3.5 h-3.5" />
              RESEARCHERS
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              A shared data layer for machine olfaction.
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Standardized datasets, reproducible experiments, open protocol. Build on validated infrastructure.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Datasets", desc: "1M+ samples across 5 open-source datasets. Quality-scored, deduplicated, provenance-tracked.", icon: Database },
              { title: "Protocol", desc: "Standardized recording procedure. OSM serial format. Temporal features reproducible across devices.", icon: Hexagon },
              { title: "Experiments", desc: "Every claim backed by reproducible experiments. View the full methodology and raw results.", icon: BookOpen },
            ].map((item) => (
              <div key={item.title} className="border border-border p-6">
                <item.icon className="w-8 h-8 mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATIONS */}
      <section className="border-t border-border py-24 bg-hex">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Applications</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Organized by evidence and maturity.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-xs font-mono text-green-500 uppercase tracking-widest mb-4">Active / Immediate</div>
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

      {/* MIRIS */}
      <section className="border-t border-border py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border text-xs font-mono text-muted-foreground mb-6">
              BEYOND COMMODITY SENSORS
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Where OpenSmell goes next.
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Today&apos;s Smell Monitor uses inexpensive, broadly cross-sensitive sensors. OpenSmell is also researching MIRIS — a miniaturized infrared spectroscopy platform intended to provide substantially richer molecular information in a compact form factor.
            </p>
            <div className="border border-border p-6 bg-background">
              <div className="text-xs font-mono text-muted-foreground mb-4 uppercase tracking-widest">The strategic path</div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm">
                <div className="border border-border p-3 text-center">
                  <div className="text-xs text-muted-foreground">Smell Monitor</div>
                  <div className="text-[10px] text-muted-foreground">cheap sensors</div>
                </div>
                <span className="text-muted-foreground hidden sm:block">&rarr;</span>
                <div className="border border-border p-3 text-center">
                  <div className="text-xs text-muted-foreground">Data Infrastructure</div>
                  <div className="text-[10px] text-muted-foreground">models</div>
                </div>
                <span className="text-muted-foreground hidden sm:block">&rarr;</span>
                <div className="border border-border p-3 text-center">
                  <div className="text-xs text-muted-foreground">Applications</div>
                </div>
                <span className="text-muted-foreground hidden sm:block">&rarr;</span>
                <div className="border border-border p-3 text-center">
                  <div className="text-xs text-muted-foreground">MIRIS</div>
                  <div className="text-[10px] text-muted-foreground">richer molecular information</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTAs */}
      <section className="border-t border-border py-24 bg-hex">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Build with us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { label: "Need to monitor a process?", cta: "Run a pilot", href: "/smell-monitor" },
              { label: "Building smell-based software?", cta: "Read the developer docs", href: "/enose" },
              { label: "Doing research?", cta: "Explore OpenSmell", href: "/academy" },
              { label: "Want to work with us?", cta: "Contact the founder", href: "/smell-monitor" },
            ].map((item) => (
              <Link
                key={item.cta}
                href={item.href}
                className="border border-border p-6 hover:bg-foreground hover:text-background transition-all duration-300 group"
              >
                <div className="text-xs text-muted-foreground group-hover:text-background/70 mb-3">{item.label}</div>
                <div className="text-sm font-medium flex items-center gap-2">
                  {item.cta}
                  <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

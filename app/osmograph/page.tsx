"use client"

import Link from "next/link"
import { Monitor, Download, GitBranch, Play, BarChart3, Settings, Upload, ChevronRight, Cpu, Globe, Usb, Wifi, Bluetooth, AlertTriangle } from "lucide-react"

export default function OsmographPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <main>
        {/* HERO */}
        <section className="pt-32 pb-20 border-b border-border bg-grid relative">
          <span className="section-marginalia">Software</span>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="coord-tag mb-3">001 // Osmograph</div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-[0.95]">
                  Osmograph
                </h1>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Zero-code GUI for electronic noses. Flash firmware, record sensor traces,
                  train classifiers — all with button clicks.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="https://mox.opensmell.xyz" target="_blank" rel="noopener noreferrer"
                    className="hex-btn hex-btn-primary">
                    <Globe className="w-4 h-4" />
                    Try It
                    <ChevronRight className="w-4 h-4" />
                  </a>
                  <a href="https://github.com/opensmell/Osmograph/releases" target="_blank" rel="noopener noreferrer"
                    className="hex-btn hex-btn-outline">
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                  <a href="https://github.com/opensmell/Osmograph" target="_blank" rel="noopener noreferrer"
                    className="hex-btn hex-btn-outline">
                    <GitBranch className="w-4 h-4" />
                    Source
                  </a>
                </div>
              </div>
              <div className="hud-corners border border-border p-6 bg-background relative">
                <div className="hud-corners-inner absolute inset-0 pointer-events-none" />
                <div className="coord-tag mb-3">Quick Start</div>
                <div className="space-y-3 data-readout">
                  {[
                    { step: "01", text: "Download Osmograph for your OS" },
                    { step: "02", text: "Plug in your e-nose via USB" },
                    { step: "03", text: "Osmograph flashes the matching firmware" },
                    { step: "04", text: "Record live sensor traces" },
                    { step: "05", text: "Train a classifier with one click" },
                  ].map((s) => (
                    <div key={s.step} className="flex items-center gap-3">
                      <span className="text-muted-foreground opacity-50 font-mono text-xs">{s.step}</span>
                      <span className="h-px flex-1 bg-border" />
                      <span className="text-sm text-muted-foreground">{s.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WORKS WITH SMELL MONITOR */}
        <section className="border-t border-border py-20 relative">
          <span className="section-marginalia">Ecosystem</span>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="coord-tag mb-3">002 // Smell Monitor + Osmograph</div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
                  Built for the Smell Monitor.
                </h2>
                <p className="text-muted-foreground mb-5 leading-relaxed">
                  Osmograph is the companion app for the Smell Monitor. Flash firmware over Bluetooth,
                  stream live sensor data, and train anomaly classifiers — all from one interface.
                </p>
                <div className="space-y-2 mb-6">
                  {[
                    "Auto-detects Smell Monitor sensor configuration",
                    "Bluetooth or USB connection — choose your workflow",
                    "Live chemical signature traces on your desktop",
                    "One-click classifier training on recorded sessions",
                    "Fleet management for multiple Smell Monitors",
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
                <div className="coord-tag mb-3">Signal Flow</div>
                <div className="space-y-3 data-readout">
                  {[
                    { step: "SM", text: "Smell Monitor reads MOX sensors at 10 Hz" },
                    { step: "BLE", text: "Streams CSV over Bluetooth Low Energy" },
                    { step: "OSG", text: "Osmograph receives and validates samples" },
                    { step: "VIS", text: "Live trace visualization in real time" },
                    { step: "ML", text: "Train classifier on recorded sessions" },
                    { step: "ALT", text: "Anomaly thresholds adapt to your process" },
                  ].map((s) => (
                    <div key={s.step} className="flex items-center gap-3">
                      <span className="text-muted-foreground opacity-50 font-mono text-xs w-8">{s.step}</span>
                      <span className="h-px flex-1 bg-border" />
                      <span className="text-sm text-muted-foreground">{s.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DEMO */}
        <section className="border-t border-border py-20 bg-hex relative">
          <span className="section-marginalia">Demo</span>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="coord-tag mb-3">003 // Live Demo</div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">See it in action</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Live sensor recording, classification, and trace visualisation — no code required.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Real-time sensor traces as smells pass the array",
                    "One-click classifier training on recorded samples",
                    "Automatic signal quality validation before export",
                  ].map((item) => (
                    <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 bg-muted-foreground flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="https://mox.opensmell.xyz" target="_blank" rel="noopener noreferrer"
                  className="hex-btn hex-btn-primary">
                  Try it yourself
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
              <div className="border border-border overflow-hidden bg-background hex-box">
                <video
                  src="/osmograph.webm"
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full max-h-72 h-auto object-contain bg-background"
                  poster="/opensmell_logo.png"
                >
                  Your browser does not support the video tag.
                </video>
                <div className="border-t border-border px-4 py-2 flex items-center justify-between text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
                  <span>osmograph_demo.webm</span>
                  <span>~20s · 1.3 MB</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="border-t border-border py-24 bg-grid relative">
          <span className="section-marginalia">Features</span>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="hex-icon text-muted-foreground" />
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Features</h2>
                <span className="hex-icon text-muted-foreground" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
              {[
                { icon: Upload, title: "One-click firmware", desc: "Flashes a pre-compiled ESP32 binary with a click after board detection. No PlatformIO or manual setup." },
                { icon: BarChart3, title: "Live sensor traces", desc: "Displays real-time sensor readings with automatic signal quality validation." },
                { icon: Settings, title: "Button-click training", desc: "Train substance classifiers without writing a single line of code." },
                { icon: Monitor, title: "Zero-code GUI", desc: "Built for builders. No electronics background or programming required." },
                { icon: GitBranch, title: "Signal validation", desc: "Validates incoming samples and filters bootloader chatter automatically." },
                { icon: Download, title: "Cross-platform", desc: "Works on Windows, macOS, and Linux. One download, everything included." },
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

        {/* STREAMING MODES */}
        <section className="border-t border-border py-24 relative">
          <span className="section-marginalia">Connectivity</span>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="hex-icon text-muted-foreground" />
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Streaming modes</h2>
                <span className="hex-icon text-muted-foreground" />
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Same sensor, three ways to get the data off the board. The one-click firmware runs USB Serial and WiFi at once — no modes to select.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
              {[
                {
                  icon: Usb,
                  title: "USB Serial",
                  tag: "On the one-click firmware",
                  desc: "Data over the USB cable, always on.",
                  pts: [
                    "OSM-prefixed CSV at 115200 baud, every 500 ms",
                    "Default path for recording sessions",
                    "The OSM prefix keeps bootloader chatter out of your traces",
                  ],
                },
                {
                  icon: Wifi,
                  title: "WiFi AP",
                  tag: "On the one-click firmware",
                  desc: "Stream over the air once it is flashed.",
                  pts: [
                    "ESP32 broadcasts its own network — no router needed",
                    "TCP server on port 8080, mDNS advertises _osmograph._tcp",
                    "Power from a battery bank and unplug the laptop",
                  ],
                },
                {
                  icon: Bluetooth,
                  title: "BLE",
                  tag: "Separate firmware variant",
                  desc: "Untethered, lower power, 10 Hz streaming.",
                  pts: [
                    "Flashing the BLE variant + Osmograph's BLE reader",
                    "Same CSV payload pushed over BLE notify",
                    "Best for long, battery-powered sessions",
                  ],
                },
              ].map((s) => (
                <div key={s.title} className="bg-background p-8 hex-box flex flex-col">
                  <span className="inline-flex self-start items-center gap-2 px-3 py-1 border border-border text-[11px] text-muted-foreground mb-4">{s.tag}</span>
                  <s.icon className="w-8 h-8 mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{s.desc}</p>
                  <ul className="space-y-2 mt-auto">
                    {s.pts.map((p) => (
                      <li key={p} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 bg-muted-foreground flex-shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-8 max-w-3xl mx-auto text-center">
              The one-click binary is compiled for the classic ESP32. ESP32-S3, C3, Uno, and Pico share the same
              CSV stream contract but need their own toolchain —{" "}
              <Link href="/enose" className="text-foreground font-medium hover:underline">
                compare boards in the e-nose builder
              </Link>
              .
            </p>
          </div>
        </section>

        {/* FOR DEVELOPERS */}
        <section className="border-t border-border py-24 bg-hex relative">
          <span className="section-marginalia">SDK</span>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="coord-tag mb-3">004 // For Developers</div>
                <h3 className="text-2xl font-bold tracking-tight mb-4">Build on the SDK</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Osmograph is built on a modular Python backend. You can extract the
                  145-dimensional framework features and build custom pipelines with
                  <code className="text-foreground font-mono text-sm mx-1">pip install opensmell</code>.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Extract framework features for custom ML pipelines",
                    "Extend with your own sensor drivers and classifiers",
                    "Contribute to the open-source codebase on GitHub",
                    "Integrate with the OpenSmell Data Commons",
                  ].map((item) => (
                    <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 bg-muted-foreground flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="https://github.com/opensmell/opensmell" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium hover:underline">
                  View the Python SDK <ChevronRight className="w-4 h-4" />
                </a>
              </div>
              <div className="hud-corners border border-border p-6 bg-background relative">
                <div className="hud-corners-inner absolute inset-0 pointer-events-none" />
                <div className="text-xs text-muted-foreground mb-4 font-mono">pip install opensmell</div>
                <pre className="text-sm leading-relaxed font-mono text-muted-foreground overflow-x-auto">
                  <span className="text-foreground">from</span> opensmell{" "}
                  <span className="text-foreground">import</span> extract_features{"\n\n"}
                  features = extract_features(<span className="text-foreground">"recordings/"</span>){"\n"}
                  <span className="text-foreground">print</span>(features.shape){"  "}# (n_samples, 145)
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border py-20 relative">
          <span className="section-marginalia">Start</span>
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Ready to build?</h2>
              <p className="text-muted-foreground mb-8">
                Order the parts, assemble your e-nose, and Osmograph handles the rest.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/enose" className="hex-btn hex-btn-primary">
                  <Cpu className="w-4 h-4" />
                  Build an e-nose
                </Link>
                <Link href="/smell-monitor" className="hex-btn hex-btn-outline">
                  <Monitor className="w-4 h-4" />
                  Smell Monitor
                </Link>
                <a href="https://github.com/opensmell/Osmograph" target="_blank" rel="noopener noreferrer"
                  className="hex-btn hex-btn-outline">
                  <GitBranch className="w-4 h-4" />
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

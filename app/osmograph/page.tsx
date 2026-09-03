"use client"

import Link from "next/link"
import { useState, useCallback } from "react"
import type { ReactNode } from "react"
import {
  Monitor, GitBranch, ChevronRight,
  Globe, Usb, Wifi, Bluetooth, Timer, Puzzle,
  Database, Gauge, Ruler, Layers, FlaskConical, Radio, Crosshair,
  ShieldAlert, GitCompareArrows, SlidersHorizontal, X, ZoomIn,
} from "lucide-react"
import { track } from "@/lib/analytics"
import DownloadOsmograph from "@/components/download-osmograph"

const SCREENSHOT = "/osmograph"

function Shot({
  src, caption, tag, className = "", onOpen = undefined,
}: { src: string; caption: string; tag: string; className?: string; onOpen?: () => void }) {
  return (
    <figure className={`hex-box border border-border bg-background overflow-hidden ${className}`}>
      <button
        type="button"
        onClick={onOpen}
        className="group relative block w-full cursor-zoom-in text-left border-b border-border"
        aria-label={`Enlarge screenshot: ${caption}`}
      >
        <img src={src} alt={caption} className="w-full h-auto block bg-background" loading="lazy" />
        <span className="absolute top-2 left-2 border border-border bg-background/80 backdrop-blur px-2 py-0.5 text-[9px] font-mono text-muted-foreground uppercase tracking-wider">
          {tag}
        </span>
        <span className="absolute bottom-2 right-2 inline-flex items-center gap-1.5 border border-border bg-background/80 backdrop-blur px-2 py-1 text-[9px] font-mono text-muted-foreground uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
          <ZoomIn className="w-3 h-3" /> enlarge
        </span>
      </button>
      <figcaption className="px-4 py-2 text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
        {caption}
      </figcaption>
    </figure>
  )
}

function Li({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-2 text-sm text-muted-foreground">
      <span className="w-1 h-1 bg-foreground mt-2 flex-shrink-0" />
      {children}
    </div>
  )
}

export default function OsmographPage() {
  const [zoom, setZoom] = useState<{ src: string; caption: string } | null>(null)
  const openShot = useCallback((src: string, caption: string) => setZoom({ src, caption }), [])
  const closeShot = useCallback(() => setZoom(null), [])

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      {zoom && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 cursor-zoom-out"
          onClick={closeShot}
          role="dialog"
          aria-modal="true"
          aria-label={zoom.caption}
        >
          <button
            type="button"
            onClick={closeShot}
            aria-label="Close"
            className="absolute top-4 right-4 border border-border bg-background/20 text-foreground p-2"
          >
            <X className="w-5 h-5" />
          </button>
          <figure className="max-w-5xl w-full">
            <img src={zoom.src} alt={zoom.caption} className="w-full h-auto bg-background border border-border" />
            <figcaption className="mt-3 text-center text-xs font-mono text-muted-foreground uppercase tracking-wider">
              {zoom.caption}
            </figcaption>
          </figure>
        </div>
      )}
      <main>
        {/* ===== HERO ===== */}
        <section className="pt-28 pb-20 border-b border-border bg-grid relative">
          <span className="section-marginalia">Software</span>
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-14">
              <div className="coord-tag mb-4">001 // Osmograph — the e-nose workbench</div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5 leading-[1.05]">
                Zero-code software
                <br />
                <span className="text-muted-foreground">for your electronic nose.</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl">
                Flash firmware, record labeled sensor traces, compare sessions across days, and
                train a classifier — all with button clicks, and all scored honestly. Osmograph is
                the desktop app that turns a metal-oxide array into an instrument you can trust.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <DownloadOsmograph />
                <a href="https://github.com/OpenSmell/osmograph-desktop" target="_blank" rel="noopener noreferrer"
                  className="hex-btn hex-btn-outline">
                  <GitBranch className="w-4 h-4" />
                  Source code
                </a>
                <a href="https://mox.opensmell.xyz" target="_blank" rel="noopener noreferrer"
                  className="hex-btn hex-btn-outline">
                  <Globe className="w-4 h-4" />
                  Try it live
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Shot
                  src={`${SCREENSHOT}/osmograph_dashboard.png`}
                  tag="Dashboard"
                  caption="live sensor traces · rig auto-detect · measured response-type strip"
                  onOpen={() => openShot(`${SCREENSHOT}/osmograph_dashboard.png`, "Dashboard — live sensor traces, auto-detected channels, measured response-type strip")}
                />
              </div>
              <div className="hud-corners border border-border p-6 bg-background relative">
                <div className="hud-corners-inner absolute inset-0 pointer-events-none" />
                <div className="coord-tag mb-3">Quick Start</div>
                <div className="space-y-3 data-readout">
                  {[
                    { step: "01", text: "Download Osmograph for your OS" },
                    { step: "02", text: "Plug in your e-nose via USB" },
                    { step: "03", text: "One-click firmware flash — channels auto-detect" },
                    { step: "04", text: "Record labeled baseline / exposure / recovery" },
                    { step: "05", text: "Train a classifier — accuracy is scored honestly" },
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

        {/* ===== LIGHTWEIGHT ===== */}
        <section className="border-t border-border py-20 bg-hex relative">
          <span className="section-marginalia">Lightweight</span>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.05]">
                Small download. <br className="hidden sm:block" />
                Native install. <span className="text-muted-foreground">Nothing to spare.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mt-4 leading-relaxed">
                Osmograph is a Tauri app on a Rust core. No bundled browser, no Electron runtime
                to drag along — just a small native installer that&apos;s on your machine and
                running in seconds.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border">
              {[
                { v: "≈7 MB", t: "installer download", d: "a tiny download for what it is — most desktop apps ship several times that size." },
                { v: "no browser", t: "no Electron runtime", d: "native Tauri + Rust core. Nothing heavy bundled, nothing extra to install." },
                { v: "seconds", t: "to install & launch", d: "download it and it's running — no bloat layers, no waiting." },
              ].map((s) => (
                <div key={s.t} className="bg-background p-7">
                  <div className="text-2xl font-bold tracking-tight mb-1">{s.v}</div>
                  <div className="text-[11px] text-muted-foreground uppercase tracking-wider mb-3">{s.t}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center mt-6 font-mono uppercase tracking-wider leading-relaxed max-w-3xl mx-auto">
              download sizes — <span className="text-foreground">Windows&nbsp;.exe</span>&nbsp;≈4&nbsp;MB&nbsp;·
              <span className="text-foreground">&nbsp;macOS&nbsp;.dmg</span>&nbsp;≈6&nbsp;MB&nbsp;·
              <span className="text-foreground">&nbsp;Linux&nbsp;.deb&nbsp;/.rpm</span>&nbsp;≈7&nbsp;MB.&nbsp;
              That&apos;s the size of the download, not the space the app uses once installed.
            </p>
          </div>
        </section>

        {/* ===== WORKFLOW ===== */}
        <section className="border-t border-border py-24 relative">
          <span className="section-marginalia">Workflow</span>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-14">
              <div className="hex-icon text-muted-foreground mx-auto mb-4" />
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">One loop, from sensor to classifier</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mt-3">
                Osmograph follows the honest e-nose workflow: record reliably, compare fairly,
                then train a model whose accuracy you can actually trust.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-px bg-border">
              {[
                { icon: Radio, t: "Capture", d: "Phase-guided recordings — baseline, exposure, recovery — with per-channel quality as samples arrive." },
                { icon: Layers, t: "Library", d: "Every session auto-saves to a searchable library with a response fingerprint you can replay offline." },
                { icon: GitCompareArrows, t: "Compare", d: "Normalize to per-channel R₀ and align sessions on relative time, so days and devices line up." },
                { icon: SlidersHorizontal, t: "Train", d: "Pick recordings, set labels and quality filters, train — scored with leave-one-recording-out CV." },
                { icon: Crosshair, t: "Deploy", d: "Load the model and classify the live stream, with sustained-confidence lock and honest 'no match'." },
              ].map((s) => (
                <div key={s.t} className="bg-background p-6">
                  <s.icon className="w-6 h-6 mb-3 text-muted-foreground" />
                  <div className="font-mono text-[10px] text-muted-foreground mb-1">{s.t.toUpperCase()}</div>
                  <div className="text-sm leading-relaxed text-muted-foreground">{s.d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== BUILT FOR THE SMELL MONITOR ===== */}
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
                  <Li>Auto-detects boards over USB and mDNS — no manual pairing</Li>
                  <Li>Bluetooth or USB connection — choose your workflow</Li>
                  <Li>Live chemical signature traces on your desktop</Li>
                  <Li>One-click classifier training on recorded sessions</Li>
                  <Li>Fleet management for multiple Smell Monitors</Li>
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

        {/* ===== CAPTURE / LIBRARY ===== */}
        <section className="border-t border-border py-24 relative">
          <span className="section-marginalia">Record</span>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <div className="coord-tag mb-3">003 // Capture &amp; Library</div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                  Record it once. <br className="hidden sm:block" />Reuse it forever.
                </h2>
                <p className="text-muted-foreground mb-5 leading-relaxed">
                  Guided phase recordings label each sample as it&apos;s captured — baseline, exposure,
                  recovery — and quality is validated live against per-channel R₀. Sessions land in a
                  searchable library with a fingerprint you can rename, analyze, export, or replay offline.
                </p>
                <ul className="space-y-2 mb-6">
                  <Li>CSV and <span className="font-mono">.osmell</span> formats, drag-and-drop import</Li>
                  <Li>Per-session quality score shown right in the list</Li>
                  <Li>Offline replay with a scrubber and 0.5×–8× speed — inspection only, does not feed the live detector</Li>
                  <Li>Export a session, a fingerprint, or submit labeled data to vetting</Li>
                </ul>
                <div className="flex flex-wrap gap-3">
                  <a href="https://github.com/OpenSmell/osmograph-desktop/releases" target="_blank" rel="noopener noreferrer"
                    onClick={() => track("download", { target: "osmograph-desktop", source: "overview" })}
                    className="hex-btn hex-btn-outline">
                    Get Osmograph <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
              <div className="space-y-4">
                <Shot src={`${SCREENSHOT}/osmograph_library_quality.png`} tag="Library"
                  caption="session list · per-session quality · inspector fingerprint"
                  onOpen={() => openShot(`${SCREENSHOT}/osmograph_library_quality.png`, "Library — session list with per-session quality and inspector fingerprint")} />
                <Shot src={`${SCREENSHOT}/osmograph_library_replay.png`} tag="Library · Replay"
                  caption="offline session replay — scrubber + speed controls"
                  onOpen={() => openShot(`${SCREENSHOT}/osmograph_library_replay.png`, "Library — offline session replay with scrubber and speed controls")} />
              </div>
            </div>
          </div>
        </section>

        {/* ===== COMPARE ===== */}
        <section className="border-t border-border py-24 bg-hex relative">
          <span className="section-marginalia">Compare</span>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-14">
              <div className="coord-tag mb-3">004 // Fair comparison</div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Same smell, different day. <br className="hidden sm:block" />
                Still the same shape.
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mt-3">
                Sessions are normalized to their own per-channel R₀ (baseline when present, else the
                first samples) and aligned on relative time — so responses stay comparable across
                devices and days. Pick any channel subset, by name, not position.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Shot src={`${SCREENSHOT}/osmograph_compare_overlay.png`} tag="Compare · Overlay"
                caption="one lane per channel, sessions overlaid"
                onOpen={() => openShot(`${SCREENSHOT}/osmograph_compare_overlay.png`, "Compare — overlay: one lane per channel, sessions overlaid")} />
              <Shot src={`${SCREENSHOT}/osmograph_compare_ref.png`} tag="Compare · Δ vs ref"
                caption="each session minus a chosen reference"
                onOpen={() => openShot(`${SCREENSHOT}/osmograph_compare_ref.png`, "Compare — delta vs reference: each session minus a chosen reference")} />
              <Shot src={`${SCREENSHOT}/osmograph_compare_similarity.png`} tag="Compare · Similarity"
                caption="Pearson correlation over the shared overlap"
                onOpen={() => openShot(`${SCREENSHOT}/osmograph_compare_similarity.png`, "Compare — similarity: Pearson correlation over the shared overlap")} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border max-w-3xl mx-auto">
              {[
                { t: "Overlay", d: "Compare responses lane-by-lane across any number of sessions." },
                { t: "Δ vs ref", d: "See how each recording deviates from a reference session." },
                { t: "Similarity", d: "A correlation tear-sheet over the selected channels." },
              ].map((m) => (
                <div key={m.t} className="bg-background p-5">
                  <div className="font-mono text-[10px] text-muted-foreground mb-1">{m.t.toUpperCase()}</div>
                  <div className="text-sm text-muted-foreground">{m.d}</div>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground text-center mt-6 max-w-2xl mx-auto">
              Channel selection is label-based — you pick channels by name, so a 3-sensor rig and a
              16-sensor rig compare without reconfiguring anything.
            </p>
          </div>
        </section>

        {/* ===== TRAIN ===== */}
        <section className="border-t border-border py-24 relative">
          <span className="section-marginalia">Train</span>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Shot src={`${SCREENSHOT}/osmograph_train.png`} tag="Train"
                  caption="recording selection · window &amp; quality filters · model card"
                  onOpen={() => openShot(`${SCREENSHOT}/osmograph_train.png`, "Train — recording selection, window and quality filters, model card")} />
              </div>
              <div className="order-1 lg:order-2">
                <div className="coord-tag mb-3">005 // Train a smell model</div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                  The accuracy you see is the accuracy you get.
                </h2>
                <p className="text-muted-foreground mb-5 leading-relaxed">
                  Teach the e-nose to tell one smell from another. Record each substance several times,
                  assign a label, set a window and quality filter, then train. Every model is scored
                  <span className="text-foreground font-medium"> out-of-sample</span> with
                  leave-one-recording-out cross-validation — so the number Osmograph reports isn&apos;t
                  inflated by testing on the data it learned from.
                </p>
                <div className="space-y-2 mb-6">
                  <Li>Tick ≥&nbsp;2 recordings per smell — enough to be meaningful, not just memorized</Li>
                  <Li>Override labels per recording; set classification window and a minimum quality cut</Li>
                  <Li>Model card summarizes what was trained; then load it on the Dashboard for live classification</Li>
                  <Li>Confidence thresholds adapt to your process — and a low-confidence sample is flagged instead of forced into a class</Li>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FLEET ===== */}
        <section className="border-t border-border py-24 bg-hex relative">
          <span className="section-marginalia">Fleet</span>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="coord-tag mb-3">006 // Fleet management</div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                  More than one nose? <br className="hidden sm:block" />Manage them all.
                </h2>
                <p className="text-muted-foreground mb-5 leading-relaxed">
                  Scan the network, add devices, and watch the whole fleet from one window.
                  Each device streams with its own channel count and identity.
                </p>
                <ul className="space-y-2 mb-6">
                  <Li>Auto-discovers boards over USB and mDNS — no manual pairing</Li>
                  <Li>Fleet grid shows every device&apos;s live state at a glance</Li>
                  <Li>One-click firmware flash stays per-device, matching each rig</Li>
                </ul>
                <Link href="/smell-monitor" className="inline-flex items-center gap-2 text-sm font-medium hover:underline">
                  Pair with the Smell Monitor <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-4">
                <Shot src={`${SCREENSHOT}/osmograph_fleet.png`} tag="Fleet"
                  caption="scan network · add device · fleet grid"
                  onOpen={() => openShot(`${SCREENSHOT}/osmograph_fleet.png`, "Fleet — scan network, add device, fleet grid")} />
              </div>
            </div>
          </div>
        </section>

        {/* ===== SYSTEM ===== */}
        <section className="border-t border-border py-24 relative">
          <span className="section-marginalia">System</span>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-14">
              <div className="coord-tag mb-3">007 // The boring parts, automated</div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Sensors drift. Sessions pile up. <br className="hidden sm:block" />Osmograph handles it.
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Shot src={`${SCREENSHOT}/osmograph_calibration.png`} tag="System · Calibration"
                caption="per-channel R₀ / a / b constants → ppm estimate · sensor library"
                onOpen={() => openShot(`${SCREENSHOT}/osmograph_calibration.png`, "System — calibration and sensor library: per-channel R₀/a/b constants to ppm estimate")} />
              <Shot src={`${SCREENSHOT}/osmograph_buzzer.png`} tag="System · Buzzer"
                caption="warning / critical / emergency patterns · volume · preview"
                onOpen={() => openShot(`${SCREENSHOT}/osmograph_buzzer.png`, "System — buzzer alerts: warning/critical/emergency patterns with volume control and preview")} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: FlaskConical, t: "Calibration", tag: "System · Calibration", d: "Enter each sensor's R₀ and power-law constants (a, b) so raw resistance becomes a defensible ppm estimate and a fair quality score. Values apply live to the trace, features, and analysis. Stored locally." },
                { icon: Gauge, t: "Hardware profile", d: "Describe your rig — ADC bits, load resistor, supply, divider wiring. Export a sensor_profile.json so the device travels between OpenSmell tools." },
                { icon: ShieldAlert, t: "Buzzer alerts", d: "Set distinct warning, critical, and emergency patterns (including SOS), with volume and frequency control and a live pattern preview." },
                { icon: Timer, t: "Burn-in tracker", d: "New MOX sensors need 24 hours to stabilise. The countdown runs in real time and survives app restarts — no lost progress." },
                { icon: Puzzle, t: "Plugins", d: "Drop .py scripts or .head models into the plugins folder — they run on the live sensor stream." },
                { icon: Database, t: "Data & commons", d: "Export labeled CSV, run automated quality checks into a Data Hub review queue, and pull or push anonymised sessions via the OpenSmell Hugging Face dataset." },
              ].map((f) => (
                <div key={f.t} className="bg-background p-6 hex-box">
                  <f.icon className="w-6 h-6 mb-3 text-muted-foreground" />
                  <div className="font-mono text-[10px] text-muted-foreground mb-1">{f.tag ?? "SYSTEM"}</div>
                  <div className="font-semibold mb-1">{f.t}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.d}</p>
                </div>
              ))}
            </div>

            {/* hardware profile card continuation */}
            <div className="bg-background p-6 hex-box mt-6">
              <div className="flex flex-wrap items-center gap-3">
                <Ruler className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Channel-agnostic by design</span>
                <span className="text-[11px] text-muted-foreground">
                  Presets from 3 to 8 sensors — or your own rig. Channel count and names are auto-detected
                  from the stream; nothing is hardcoded to six.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ===== STREAMING MODES ===== */}
        <section className="border-t border-border py-24 bg-grid relative">
          <span className="section-marginalia">Connectivity</span>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-14">
              <div className="hex-icon text-muted-foreground mx-auto mb-4" />
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Streaming modes</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mt-3">
                Same sensor, three ways off the board. The one-click firmware runs USB Serial and
                WiFi at once — no modes to select.
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
              The one-click binary is compiled for the classic ESP32. ESP32-S3, C3, Uno, and Pico share the
              same CSV stream contract but need their own toolchain —{" "}
              <Link href="/enose" className="text-foreground font-medium hover:underline">
                compare boards in the e-nose builder
              </Link>
              .
            </p>
          </div>
        </section>

        {/* ===== FOR DEVELOPERS ===== */}
        <section className="border-t border-border py-24 bg-hex relative">
          <span className="section-marginalia">SDK</span>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="coord-tag mb-3">008 // For Developers</div>
                <h3 className="text-2xl font-bold tracking-tight mb-4">Build on the SDK</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Osmograph is built on a modular Python backend. Extract the framework features
                  (28 per channel, plus cross-channel selectivity and global features) for your own
                  pipelines with
                  <code className="text-foreground font-mono text-sm mx-1">pip install opensmell</code>.
                  The 6-channel reference rig yields
                  <span className="text-foreground font-mono text-sm mx-1">187</span>
                  features; the count scales with your channel count.
                </p>
                <ul className="space-y-3 mb-8">
                  <Li>Extract framework features for custom ML pipelines</Li>
                  <Li>Rs/R₀ normalization cancels Vcc and load-resistor effects — your data travels</Li>
                  <Li>Pin-mapping dialog exports a custom firmware sketch for non-standard wiring</Li>
                  <Li>Contribute to the open-source codebase, or integrate with the OpenSmell Data Commons</Li>
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
                  features, names = extract_features(<span className="text-foreground">"recording.csv"</span>){"\n"}
                  <span className="text-foreground">print</span>(features.shape){"  "}# (N_windows, 187) on 6 channels
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SMELLABILITY ===== */}
        <section className="border-t border-border py-24 relative">
          <span className="section-marginalia">Feasibility</span>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-10">
              <div>
                <div className="coord-tag mb-3">009 // Smellability Lookup</div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                  Before you build — can a MOX sensor even smell it?
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Osmograph sits on the OpenSmell SDK. Before you spend on a rig, the SDK&apos;s MOX
                  feasibility chain takes a compound <em>(SMILES in, verdict out)</em> and walks it
                  through the physics from molecule to signal. The chain ends in one verdict: pass or fail.
                </p>
                <div className="space-y-3">
                  {[
                    { step: "01 identity", note: "fit against a curated library and a resolvable response profile" },
                    { step: "02 volatility", note: "vapour pressure high enough at room temperature" },
                    { step: "03 signal", note: "expected response lands inside the measurable ADC range" },
                    { step: "04 reactivity", note: "a MOX layer actually reacts with the molecule" },
                  ].map((s) => (
                    <div key={s.step} className="flex items-center gap-3">
                      <span className="font-mono text-xs text-muted-foreground w-24 flex-shrink-0">{s.step}</span>
                      <span className="h-px flex-1 bg-border" />
                      <span className="text-sm text-muted-foreground">{s.note}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hud-corners border border-border p-6 bg-background relative">
                <div className="hud-corners-inner absolute inset-0 pointer-events-none" />
                <div className="coord-tag mb-4">Smellability Check // SDK</div>
                <div className="flex items-center justify-between border border-border p-3 mb-4">
                  <span className="text-xs text-muted-foreground">Compound</span>
                  <span className="font-mono text-sm">ethanol</span>
                </div>
                <div className="space-y-2 mb-4">
                  {[
                    { step: "identity", state: "pass", detail: "in library" },
                    { step: "volatility", state: "pass", detail: "vapour rich at 25 °C" },
                    { step: "signal", state: "pass", detail: "on-scale response" },
                    { step: "reactivity", state: "pass", detail: "TGS/MQ sensitive" },
                  ].map((row) => (
                    <div key={row.step} className="flex items-center justify-between border border-border px-3 py-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-1 h-1 ${row.state === "pass" ? "bg-foreground" : "bg-red-500"}`} />
                        <span className="text-xs">{row.step}</span>
                      </div>
                      <span className="font-mono text-[10px] text-muted-foreground">{row.detail}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between bg-foreground text-background px-3 py-2">
                  <span className="text-xs font-semibold">VERDICT</span>
                  <span className="font-mono text-xs">build-ready</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center max-w-2xl mx-auto">
              A smellability verdict is a feasibility range, not a calibrated concentration — it tells you
              whether to buy the parts, not how strong the smell is.
            </p>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="border-t border-border py-20 bg-hex relative">
          <span className="section-marginalia">Start</span>
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold tracking-tight mb-4">
                Get the e-nose software that doesn&apos;t pretend.
              </h2>
              <p className="text-muted-foreground mb-8">
                Download it, connect a board, and record your first labeled session in minutes —
                or start with the science and the build guide first.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
                <DownloadOsmograph />
                <Link href="/smell-monitor" className="hex-btn hex-btn-outline">
                  <Monitor className="w-4 h-4" />
                  See the Smell Monitor
                </Link>
                <a href="https://github.com/OpenSmell/osmograph-desktop" target="_blank" rel="noopener noreferrer"
                  className="hex-btn hex-btn-outline">
                  <GitBranch className="w-4 h-4" />
                  Source code
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border text-left">
                {[
                  { t: "New to e-noses?", d: "Start with the Academy primer and the $30 build guide.", href: "/academy/digitising-smell", cta: "Open the Academy" },
                  { t: "Have hardware?", d: "Flash firmware and record your first session tonight.", href: "/enose", cta: "E-nose builder" },
                  { t: "Buying systems?", d: "See how Osmograph runs a fleet of Smell Monitors.", href: "/smell-monitor", cta: "Smell Monitor" },
                ].map((c) => (
                  <Link key={c.t} href={c.href} className="bg-background p-6 hex-box group no-underline">
                    <div className="text-sm font-semibold mb-1 group-hover:text-foreground">{c.t}</div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">{c.d}</p>
                    <span className="text-xs font-medium inline-flex items-center gap-1.5 text-foreground">
                      {c.cta} <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

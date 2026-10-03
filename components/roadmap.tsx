"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Cpu, CircuitBoard, BookOpen, Users, ChevronRight, Github, Check,
  Circle, Loader, Lock, Radar, GitBranch, X,
} from "lucide-react"

/**
 * Roadmap. Built from the project's own framing rather than an audit: the
 * problem is that starting in digital olfaction means starting from scratch
 * every time, and the work compounds if it doesn't have to.
 *
 * Each track is a sequence of legs with an explicit exit condition, so "done"
 * is checkable rather than a matter of opinion. Collapsible because the full
 * sequence is long and the current leg is the only part anyone needs.
 */

type Mark = "done" | "active" | "next" | "later" | "blocked"

const markMeta: Record<Mark, { icon: typeof Check; label: string; cls: string }> = {
  done: { icon: Check, label: "Shipped", cls: "bg-foreground text-background border-foreground" },
  active: { icon: Loader, label: "In flight", cls: "border-foreground text-foreground" },
  next: { icon: Circle, label: "Next up", cls: "border-foreground/50 text-foreground/80" },
  later: { icon: Radar, label: "Planned", cls: "border-dashed border-border text-muted-foreground" },
  blocked: { icon: Lock, label: "Blocked", cls: "border-dashed border-muted-foreground/60 text-muted-foreground" },
}

type Leg = {
  mark: Mark
  name: string
  exit: string
  detail?: string
}

type Track = {
  id: string
  icon: typeof Cpu
  tag: string
  title: string
  problem: string
  legs: Leg[]
  cta: { label: string; href: string; external?: boolean }
}

const tracks: Track[] = [
  {
    id: "osmograph",
    icon: Cpu,
    tag: "I",
    title: "Osmograph",
    problem: "Nobody should have to write an e-nose from scratch to find out what their smell is.",
    legs: [
      {
        mark: "done",
        name: "Desktop app on three platforms",
        exit: "Downloads work, firmware flashes, a trace records.",
      },
      {
        mark: "done",
        name: "SDKs in Python, Rust, JavaScript",
        exit: "pip / cargo / npm install. Same feature set in all three.",
      },
      {
        mark: "done",
        name: "Cadence is declared, not assumed",
        exit: "Device states its own rate. Temporal features are correct at any rate.",
      },
      {
        mark: "active",
        name: "One feature framework across all three SDKs",
        exit: "Same input gives the same number in Python, Rust and JS. Right now the health modules disagree on what features even exist.",
        detail:
          "Python and JS export drift_rate, sensitivity_decay, noise_floor, hysteresis. Rust exports drift_rate, sensitivity_decay, hf_rms — no hysteresis, and its noise floor is a different quantity under the same name. Until this closes, 'works in all three SDKs' is not true.",
      },
      {
        mark: "active",
        name: "Anomaly detector you can trust in the field",
        exit: "Says what is drifting and what is an event, at a false-alarm rate someone can live with. Unsolved, and the highest-value thing on this list.",
        detail:
          "Threshold confidence, baseline fitting, regime detection and poisoning all exist as implementations. The policy that makes them trustworthy does not. This is the gate for single-unit utility.",
      },
      {
        mark: "next",
        name: "Kill the alpha bugs",
        exit: "Whatever people actually hit. Needs users.",
      },
    ],
    cta: { label: "Download", href: "/osmograph" },
  },
  {
    id: "protocols",
    icon: BookOpen,
    tag: "II",
    title: "Open protocols",
    problem: "Everyone hits the same failure modes and nobody writes them down.",
    legs: [
      {
        mark: "done",
        name: ".osmell data format",
        exit: "Documented, with a submission validator that rejects malformed data.",
      },
      {
        mark: "done",
        name: "Phase events in the format",
        exit: "Baseline / exposure / recovery can be marked inside the data.",
      },
      {
        mark: "done",
        name: "Device-to-host wire protocol",
        exit: "Versioned spec, implemented in firmware.",
      },
      {
        mark: "done",
        name: "Every published number traceable to source",
        exit: "Snapshot committed; tests fail if the prose and the data disagree.",
      },
      {
        mark: "active",
        name: "Phase events reach the live stream",
        exit: "A host can inject a phase boundary into a running recording. Currently no wire message carries one, so the protocol below cannot be run on hardware yet.",
        detail: "This is the single missing link between the written protocol and the experiment.",
      },
      {
        mark: "next",
        name: "A→B transition protocol",
        exit: "Written and preregistered. Not yet collected, because it needs the leg above.",
        detail:
          "Is there a real transition effect when gas A is replaced by gas B, or is it just A still washing out? The obvious published experiment cannot answer it: its gaps were ~2 time constants long and never actually clean. We did the arithmetic on why, and designed a sweep that fixes it.",
      },
      {
        mark: "later",
        name: "Failure-mode library",
        exit: "The accumulated 'do not do this' knowledge, as referenceable content rather than folklore.",
      },
    ],
    cta: { label: "Read the docs", href: "/docs" },
  },
  {
    id: "hardware",
    icon: CircuitBoard,
    tag: "III",
    title: "Smell Monitor",
    problem: "Everyone hand-wires sensors that then drift or get poisoned, and the project dies.",
    legs: [
      {
        mark: "done",
        name: "Architecture decided",
        exit: "Fan, filtered nostril, PCB, two rows of headers. Sensors swappable, not soldered.",
      },
      {
        mark: "active",
        name: "Settle the electronics",
        exit: "One MCU chosen, one ADC path for all analog channels, header pitch confirmed against real breakout boards.",
        detail:
          "Currently contradictory: one document says ESP32, the BOM says STM32. The STM32 has enough ADC channels for eight analog sensors natively, so the blocking decision is the MCU, not the ADC. We have not asked anyone to argue with the slot count yet.",
      },
      {
        mark: "active",
        name: "Fund rigs",
        exit: "Enough hardware to run first-party experiments with real phase labels.",
        detail:
          "Every public dataset has the same defect: no timestamps, no phase markers. That is not fixable in software. It is a money problem, and it is the honest answer.",
      },
      {
        mark: "next",
        name: "Schematic and board",
        exit: "Manufacturable, open files.",
      },
      {
        mark: "next",
        name: "Collect the data nobody else has",
        exit: "Phase-labelled, timestamped, from a rig we control.",
      },
      {
        mark: "later",
        name: "Publish for manufacture",
        exit: "Anyone can build one, or build their own from the same spec.",
      },
    ],
    cta: { label: "See the hardware", href: "/smell-monitor" },
  },
  {
    id: "community",
    icon: Users,
    tag: "IV",
    title: "Research & community",
    problem: "The interesting problems need more hands than there are.",
    legs: [
      {
        mark: "done",
        name: "Datasets with provenance",
        exit: "Checksums, licences, and per-corpus verification for everything we evaluate on.",
      },
      {
        mark: "done",
        name: "Honest accounting of what we cannot do",
        exit: "Kinetics features flagged unvalidatable on public data. A reproducibility claim withdrawn because the analysis code was lost.",
      },
      {
        mark: "active",
        name: "Finish the health feature specification",
        exit: "Decide what each feature means, in one place, so three SDKs and a paper agree.",
      },
      {
        mark: "active",
        name: "Catch up on the literature we are missing",
        exit: "Poisoning and drift recovery, cross-device transfer, drift compensation. Not yet started.",
        detail:
          "The single largest untouched item. Knowing this literature cold is what turns 'we are comparable' into knowing which problems are actually open.",
      },
      {
        mark: "next",
        name: "Open research questions, teardowns",
        exit: "Foundations that are shakier than they look, examined in public.",
      },
      {
        mark: "next",
        name: "Hands on the core stacks",
        exit: "SDKs, anomaly detector, hardware review. Needs people.",
      },
    ],
    cta: { label: "Join the Discord", href: "https://discord.gg/CGER3tHxbH", external: true },
  },
]

function TrackCard({ track }: { track: Track }) {
  const [open, setOpen] = useState(false)
  const shipped = track.legs.filter((l) => l.mark === "done").length
  const total = track.legs.length
  const done = shipped === total

  return (
    <div className="hud-corners border border-border relative bg-background">
      <div className="hud-corners-inner absolute inset-0 pointer-events-none" />

      {/* header — always visible */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full text-left p-5 md:p-6 focus:outline-none"
      >
        <div className="flex items-start gap-4">
          <div
            className="w-11 h-11 flex items-center justify-center bg-border flex-shrink-0 mt-0.5"
            style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
          >
            <track.icon className="w-5 h-5" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="coord-tag">{track.tag}</span>
              <h3 className="text-lg font-bold tracking-tight">{track.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{track.problem}</p>
          </div>

          {/* progress */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="text-right hidden sm:block">
              <div className="text-[10px] font-mono text-muted-foreground tracking-widest">
                {shipped}/{total}
              </div>
              <div className="w-16 h-1 bg-border mt-1.5">
                <div
                  className="h-full bg-foreground transition-all duration-500"
                  style={{ width: `${(shipped / total) * 100}%` }}
                />
              </div>
            </div>
            <ChevronRight
              className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${open ? "rotate-90" : ""}`}
            />
          </div>
        </div>
      </button>

      {/* legs — collapsible */}
      {open && (
        <div className="px-5 md:px-6 pb-5 md:pb-6 border-t border-border pt-4">
          <ul className="space-y-0">
            {track.legs.map((leg, i) => {
              const m = markMeta[leg.mark]
              const Icon = m.icon
              const isLast = i === track.legs.length - 1
              return (
                <li key={leg.name} className="relative pl-7 pb-4 last:pb-0">
                  {/* connector */}
                  {!isLast && (
                    <span className="absolute left-[7px] top-4 bottom-0 w-px bg-border" aria-hidden />
                  )}
                  <span
                    className={`absolute left-0 top-[3px] w-[15px] h-[15px] flex items-center justify-center border ${m.cls}`}
                    style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                  >
                    <Icon className="w-2.5 h-2.5" />
                  </span>

                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-sm font-semibold">{leg.name}</span>
                    <span className="text-[10px] font-mono tracking-widest text-muted-foreground">
                      {m.label}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{leg.exit}</p>
                  {leg.detail && (
                    <p className="text-xs text-muted-foreground/80 mt-1.5 leading-relaxed border-l border-border pl-3">
                      {leg.detail}
                    </p>
                  )}
                </li>
              )
            })}
          </ul>

          <div className="mt-5 pt-4 border-t border-border">
            {track.cta.external ? (
              <a href={track.cta.href} target="_blank" rel="noopener noreferrer" className="hex-btn hex-btn-outline">
                {track.cta.label}
                <ChevronRight className="w-4 h-4" />
              </a>
            ) : (
              <Link href={track.cta.href} className="hex-btn hex-btn-outline">
                {track.cta.label}
                <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Roadmap() {
  const totalShipped = tracks.reduce((a, t) => a + t.legs.filter((l) => l.mark === "done").length, 0)
  const totalLegs = tracks.reduce((a, t) => a + t.legs.length, 0)

  return (
    <section className="border-t border-border py-20 relative">
      <span className="section-marginalia">Roadmap</span>
      <div className="max-w-5xl mx-auto px-6">

        {/* VISION */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="hex-icon text-muted-foreground" />
            <span className="coord-tag">The compounding problem</span>
            <span className="hex-icon text-muted-foreground" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight max-w-2xl mx-auto mb-4">
            Starting from scratch every time is the bottleneck.
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            So we are building the layer that does not have to be rebuilt: hardware you can
            re-sensor, protocols that record what actually happened, software that works
            out of the box, and the research on the failure modes nobody writes down.
          </p>
          <div className="mt-6 inline-flex items-center gap-3 border border-border px-4 py-2">
            <GitBranch className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-[11px] font-mono tracking-widest text-muted-foreground">
              {totalShipped} OF {totalLegs} LEGS SHIPPED
            </span>
          </div>
        </div>

        {/* TRACKS */}
        <div className="space-y-3">
          {tracks.map((t) => (
            <TrackCard key={t.id} track={t} />
          ))}
        </div>

        {/* WHAT IS ACTUALLY UNSOLVED */}
        <div className="hud-corners border border-border relative bg-background mt-8">
          <div className="hud-corners-inner absolute inset-0 pointer-events-none" />
          <div className="p-5 md:p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="hex-icon text-muted-foreground" />
              <h3 className="text-sm font-bold tracking-tight uppercase tracking-widest">
                Not solved
              </h3>
            </div>
            <ul className="space-y-2.5">
              {[
                "The anomaly detector. Deciding, sample by sample, what is drift and what is an event — without crying wolf.",
                "Cross-device transfer. Two different rigs, the same smell, near chance. This is the interoperability claim and it is not yet earned.",
                "Whether a transition effect exists at all, or whether it is memory we have not waited out.",
                "Every public dataset lacks timestamps and phase markers, so no kinetics feature can be validated on any of them.",
              ].map((t) => (
                <li key={t} className="flex gap-2.5 text-xs text-muted-foreground leading-relaxed">
                  <X className="w-3.5 h-3.5 flex-shrink-0 mt-px opacity-60" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CONTRIBUTE */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <Link href="/docs" className="hex-btn hex-btn-primary">
            Install an SDK
          </Link>
          <a href="https://github.com/opensmell" target="_blank" rel="noopener noreferrer" className="hex-btn hex-btn-outline">
            <Github className="w-4 h-4" />
            Browse the source
          </a>
          <a href="https://discord.gg/CGER3tHxbH" target="_blank" rel="noopener noreferrer" className="hex-btn hex-btn-outline">
            Join Discord
          </a>
        </div>
      </div>
    </section>
  )
}
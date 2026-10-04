"use client"

import { useState } from "react"
import {
  Cpu,
  CircuitBoard,
  BookOpen,
  Users,
  ChevronDown,
  ChevronRight,
} from "lucide-react"

type State = "shipped" | "in flight" | "next" | "open"

const stateLabel: Record<State, string> = {
  shipped: "shipped",
  "in flight": "in flight",
  next: "next",
  open: "open",
}

const stateTone: Record<State, string> = {
  shipped: "text-foreground",
  "in flight": "text-foreground",
  next: "text-foreground/80",
  open: "text-muted-foreground",
}

const hexClip = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"

type Node = {
  id: string
  pillar: "Osmograph" | "Smell Monitor" | "Community" | "Research" | "Open protocols"
  name: string
  state: State
  details?: string
  current?: boolean
}

const nodes: Node[] = [
  {
    id: "osmograph-alpha",
    pillar: "Osmograph",
    name: "Osmograph desktop app + Python/Rust/JS SDKs",
    state: "shipped",
    details: "Available for Windows, Linux, and macOS. SDKs install via pip install opensmell, npm install opensmell, cargo install opensmell.",
    current: false,
  },
  {
    id: "osmograph-alpha-bugs",
    pillar: "Osmograph",
    name: "Alpha bugs wanted; more feature coverage needed",
    state: "in flight",
    details: "Testing and feedback from real use drives fixes and feature definition.",
  },
  {
    id: "osmograph-anomaly",
    pillar: "Osmograph",
    name: "Anomaly detector — unsolved; gate for single-unit utility",
    state: "open",
    details: "Needs to be trustworthy in the field (thresholds, baselines, regime detection) before claiming single-unit utility.",
    current: true,
  },
  {
    id: "protocols-core",
    pillar: "Open protocols",
    name: "Open protocols: .osmell data format + wire protocol",
    state: "shipped",
    details: "Foundation for reproducible work and avoiding repeated failure modes. Academy is an education priority — think critically, ask questions, flag inconsistencies.",
  },
  {
    id: "monitor-arch",
    pillar: "Smell Monitor",
    name: "Modular, sensor-agnostic architecture",
    state: "shipped",
    details: "Fan pulls air through; filtered nostril; PCB with two rows of headers (~8 slots each). Digital/MEMS row in front, analog/MOX row behind. Sensors swappable when they drift or poison; designed to stay relevant ~10 years.",
  },
  {
    id: "monitor-hw",
    pillar: "Smell Monitor",
    name: "Hardware iteration to finalise manufacturable spec",
    state: "next",
    details: "Iterating schematics/board design so anyone can build from the same open specs.",
  },
  {
    id: "interop",
    pillar: "Community",
    name: "Cross-device interoperability",
    state: "open",
    details: "Unsolved / near-chance — 11–19% against 50 classes measured. Honesty over optimism.",
  },
  {
    id: "community-growth",
    pillar: "Community",
    name: "More people using and contributing to core stacks",
    state: "next",
    details: "Smell apps, research, DIY, business and personal applications.",
  },
  {
    id: "research",
    pillar: "Research",
    name: "Open questions, teardowns, getting the research right",
    state: "open",
    details: "Improvements on existing work, foundations that need scrutiny, and building on solid ground.",
  },
]

const pillarColor = (pillar: Node["pillar"]) => {
  switch (pillar) {
    case "Osmograph":
      return "border-foreground/60"
    case "Open protocols":
      return "border-foreground/50"
    case "Smell Monitor":
      return "border-foreground/70"
    case "Community":
      return "border-foreground/60"
    case "Research":
      return "border-foreground/60"
    default:
      return "border-foreground/40"
  }
}

function FlowNode({ node }: { node: Node }) {
  const [expanded, setExpanded] = useState(false)
  const isCurrent = node.current
  return (
    <div className="group relative flex flex-col items-start md:items-center">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-label={`${node.name} — ${stateLabel[node.state]}`}
        className="flex flex-col items-start md:items-center gap-3 focus:outline-none"
      >
        <div
          className={`relative flex items-center justify-center border transition-colors ${
            isCurrent ? "border-foreground" : pillarColor(node.pillar)
          } bg-background`}
          style={{
            clipPath: hexClip,
            width: "2.25rem",
            height: "2.25rem",
          }}
        >
          <span
            className={`absolute inset-0 border ${
              isCurrent ? "border-foreground/40" : "border-transparent"
            }`}
            style={{ clipPath: hexClip, transform: "scale(0.85)" }}
            aria-hidden
          />
          <span className={`h-1.5 w-1.5 ${isCurrent ? "bg-foreground" : "bg-foreground/60"}`} style={{ clipPath: hexClip }} />
        </div>
        <div className="flex flex-col items-start md:items-center md:text-center max-w-xs">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium leading-snug">{node.name}</span>
            {node.details && (
              <span className="text-muted-foreground">
                {expanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </span>
            )}
          </div>
          <span className={`text-[10px] font-mono uppercase tracking-widest ${stateTone[node.state]}`}>
            {stateLabel[node.state]}
          </span>
        </div>
      </button>
      {expanded && node.details && (
        <div className="mt-2 rounded-none border border-border bg-background p-3 text-xs text-muted-foreground leading-relaxed md:max-w-xs md:text-center">
          {node.details}
        </div>
      )}
    </div>
  )
}

export default function Roadmap() {
  return (
    <section className="relative border-t border-border py-16 md:py-24">
      <span className="section-marginalia">Roadmap</span>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="hud-corners relative border border-border bg-background">
          <div className="hud-corners-inner pointer-events-none absolute inset-0" />
          <div className="p-5 md:p-8">
            <div className="mb-6 md:mb-10">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                A roadmap built for compounding work
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                The core bottleneck: starting in digital olfaction means starting from scratch every time. The solution is
                software, hardware, protocols, community, and research that compound — built so work doesn't need to be
                redone.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="border border-border px-2 py-1 font-mono uppercase tracking-widest">
                  pip install opensmell
                </span>
                <span className="border border-border px-2 py-1 font-mono uppercase tracking-widest">
                  npm install opensmell
                </span>
                <span className="border border-border px-2 py-1 font-mono uppercase tracking-widest">
                  cargo install opensmell
                </span>
              </div>
            </div>

            {/* Desktop horizontal flow */}
            <div className="relative hidden md:block">
              <div className="absolute left-4 right-4 top-5 h-px bg-border" aria-hidden />
              <div className="relative grid grid-cols-9 gap-4">
                {nodes.map((node) => (
                  <FlowNode key={node.id} node={node} />
                ))}
              </div>
            </div>

            {/* Mobile vertical flow */}
            <div className="relative md:hidden">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-border" aria-hidden />
              <div className="flex flex-col gap-8 pl-10">
                {nodes.map((node) => (
                  <FlowNode key={node.id} node={node} />
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-border pt-4 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              <span>States: shipped / in flight / next / open</span>
              <span>Compact by default · Expandable on click · Greyscale</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

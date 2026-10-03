"use client"

import Link from "next/link"
import {
  Cpu, CircuitBoard, BookOpen, Users, ChevronRight, Github, Download,
} from "lucide-react"

/**
 * Roadmap. Monochrome by design — the rest of the site is greyscale, so status
 * is carried by fill weight and border style rather than hue.
 *
 * Status vocabulary matches docs/README.md: shipped / active / spec / open.
 */

type Status = "shipped" | "active" | "spec" | "open"

const statusStyle: Record<Status, string> = {
  shipped: "bg-foreground text-background border-foreground",
  active: "border-foreground text-foreground",
  spec: "border-dashed border-foreground text-foreground",
  open: "border-border text-muted-foreground",
}

const statusLabel: Record<Status, string> = {
  shipped: "SHIPPED",
  active: "ACTIVE",
  spec: "SPEC",
  open: "OPEN",
}

type Pillar = {
  icon: typeof Cpu
  tag: string
  title: string
  status: Status
  lede: string
  done: string[]
  next: string
  cta: { label: string; href: string; external?: boolean }
}

const pillars: Pillar[] = [
  {
    icon: Cpu,
    tag: "01",
    title: "Osmograph",
    status: "active",
    lede: "Zero-code e-nose workflow. Flash firmware, record live traces, train classifiers. Downloads for Linux, macOS and Windows.",
    done: [
      "Cross-platform desktop builds shipping",
      "SDKs in Python, Rust and JavaScript",
      "Wire protocol declares its own cadence",
    ],
    next: "Alpha bugs, then features. The anomaly detector is the unsolved core of it.",
    cta: { label: "Download", href: "/osmograph" },
  },
  {
    icon: BookOpen,
    tag: "02",
    title: "Open protocols",
    status: "spec",
    lede: "The .osmell data format and the research on the failure modes everyone hits. So the same mistake is only made once.",
    done: [
      ".osmell format and submission validator",
      "Phase-event schema in the format spec",
      "A→B transition protocol, preregistered",
    ],
    next: "Wire the phase events into the live stream, then collect the data they describe.",
    cta: { label: "Read the docs", href: "/docs" },
  },
  {
    icon: CircuitBoard,
    tag: "03",
    title: "Smell Monitor",
    status: "open",
    lede: "A modular, sensor-agnostic box. Filtered nostril inlet, fan on one side, PCB inside, two rows of headers so the sensors are swappable.",
    done: [
      "Architecture and slot layout decided",
      "Analog row behind digital, on airflow grounds",
    ],
    next: "Finish the schematic. 8 analog + 8 digital slots is the current target; it should be argued with, not assumed.",
    cta: { label: "See the hardware", href: "/smell-monitor" },
  },
  {
    icon: Users,
    tag: "04",
    title: "Community & research",
    status: "active",
    lede: "Build things for yourself and share them. Smell apps, research, DIY rigs, whatever you were trying to do and gave up on.",
    done: [
      "Open datasets with provenance and checksums",
      "Every published number traceable to a source",
    ],
    next: "Hands on the core stacks, and on the open questions below.",
    cta: { label: "Join the Discord", href: "https://discord.gg/CGER3tHxbH", external: true },
  },
]

const openQuestions = [
  {
    q: "The anomaly detector",
    a: "Still unsolved. Deciding, sample by sample, whether a reading is an event or drift on a sensor that is ageing and poisoned — while not crying wolf. This is the single highest-value thing to be right about.",
  },
  {
    q: "An honest gap in our numbers",
    a: "Our memory and identifiability benchmarks reported results whose analysis code was lost. The numbers survived; the code that made them did not. We have withdrawn the reproducibility claim rather than let it stand.",
  },
  {
    q: "Timebases nobody recorded",
    a: "Public e-nose datasets usually ship no timestamps and no phase markers, so kinetics features cannot be validated on them. First-party rigs are the only fix.",
  },
]

export default function Roadmap() {
  return (
    <section className="border-t border-border py-20 relative">
      <span className="section-marginalia">Roadmap</span>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="hex-icon text-muted-foreground" />
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Where this actually stands</h2>
            <span className="hex-icon text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto leading-relaxed">
            Four things, honestly labelled. Finished, in progress, specified but unbuilt, and not started.
            If you are looking for somewhere to help, the unsolved items are the interesting ones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {pillars.map((p) => (
            <div key={p.tag} className="hud-corners border border-border p-6 relative bg-background">
              <div className="hud-corners-inner absolute inset-0 pointer-events-none" />
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-3">
                  <div
                    className="w-11 h-11 flex items-center justify-center bg-border flex-shrink-0"
                    style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                  >
                    <p.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="coord-tag">{p.tag}</span>
                    <h3 className="text-lg font-bold tracking-tight leading-tight">{p.title}</h3>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-mono tracking-widest border px-2 py-1 flex-shrink-0 ${statusStyle[p.status]}`}
                >
                  {statusLabel[p.status]}
                </span>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.lede}</p>

              <div className="mb-4">
                <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest mb-2">
                  Done
                </div>
                <ul className="space-y-1.5">
                  {p.done.map((d) => (
                    <li key={d} className="text-xs flex gap-2 leading-relaxed">
                      <span className="text-muted-foreground flex-shrink-0">—</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-5">
                <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest mb-2">
                  Next
                </div>
                <p className="text-xs leading-relaxed">{p.next}</p>
              </div>

              {p.cta.external ? (
                <a href={p.cta.href} target="_blank" rel="noopener noreferrer" className="hex-btn hex-btn-outline">
                  {p.cta.label}
                  <ChevronRight className="w-4 h-4" />
                </a>
              ) : (
                <Link href={p.cta.href} className="hex-btn hex-btn-outline">
                  {p.cta.label}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* OPEN QUESTIONS */}
        <div className="hud-corners border border-border p-6 md:p-8 relative bg-background mb-4">
          <div className="hud-corners-inner absolute inset-0 pointer-events-none" />
          <div className="flex items-center gap-3 mb-5">
            <span className="hex-icon text-muted-foreground" />
            <h3 className="text-lg font-bold tracking-tight">What is genuinely unsolved</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {openQuestions.map((item) => (
              <div key={item.q}>
                <div className="text-sm font-semibold mb-1.5">{item.q}</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CONTRIBUTE */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/docs" className="hex-btn hex-btn-primary">
            <Download className="w-4 h-4" />
            Install an SDK
          </Link>
          <a href="https://github.com/opensmell" target="_blank" rel="noopener noreferrer" className="hex-btn hex-btn-outline">
            <Github className="w-4 h-4" />
            Browse the source
          </a>
          <a href="https://discord.gg/CGER3tHxbH" target="_blank" rel="noopener noreferrer" className="hex-btn hex-btn-outline">
            <Users className="w-4 h-4" />
            Say hello
          </a>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-4 max-w-lg mx-auto">
          Everything here is open source. Bug reports, failed features and "this is wrong" are all
          more useful than a compliment.
        </p>
      </div>
    </section>
  )
}
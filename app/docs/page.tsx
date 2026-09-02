import Link from "next/link"
import { ArrowRight, FileCode2, FileText, Boxes, Monitor } from "lucide-react"
import { H2, P } from "@/components/docs/DocBlocks"

const products = [
  {
    icon: FileCode2,
    title: "Python SDK",
    href: "/docs/python",
    tag: "opensmell",
    desc: "Feature extraction, .osmell I/O, ingest, quality scoring, calibration, the hardware-insufficiency gate, and the MOX thermodynamic feasibility chain.",
  },
  {
    icon: Boxes,
    title: "Rust SDK",
    href: "/docs/rust",
    tag: "opensmell-rs",
    desc: "MOX feature extraction, anomaly detection, calibration, health/fleet monitoring, the OSM serial protocol, classifier training, and live classification.",
  },
  {
    icon: Monitor,
    title: "Osmograph Desktop",
    href: "/docs/desktop",
    tag: "Tauri app",
    desc: "Real-time MOX monitoring, the measured phenotype strip, phase-recording protocol, train/compare/fleet, burn-in, plugins, and the data commons.",
  },
]

const foundations = [
  {
    title: "Data model & the .osmell format",
    href: "/docs/data-model",
    desc: "The portable ZIP container every recording flows through: manifest, CSV member, events, and the limitations that govern derived claims.",
  },
]

export const metadata = {
  title: "OpenSmell Docs — Reference & guides",
  description:
    "Reference for the OpenSmell Python SDK, Rust SDK, and Osmograph Desktop app, plus the .osmell data contract and its limitations.",
}

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-20">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
          <span className="inline-flex items-center gap-1.5 border border-border px-2 py-1 uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            Docs
          </span>
        </div>

        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 leading-[0.95]">
            The OpenSmell
            <br />
            <span className="text-muted-foreground">manual.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-6 leading-relaxed">
            Grounded reference for every piece of the stack. If a capability is documented
            here, it is implemented and tested — nothing is speculative.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/docs/python" className="hex-btn hex-btn-primary no-underline">
              Python SDK
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/docs/desktop" className="hex-btn hex-btn-outline no-underline">
              Desktop app
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-px bg-border mb-16">
          {products.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="bg-background p-6 sm:p-8 group no-underline flex flex-col sm:flex-row sm:items-start gap-4"
            >
              <p.icon className="w-6 h-6 text-muted-foreground shrink-0 mt-0.5" />
              <div className="min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-lg font-semibold group-hover:text-muted-foreground transition-colors">
                    {p.title}
                  </h2>
                  <span className="text-[10px] text-muted-foreground border border-border px-2 py-0.5 uppercase tracking-wider font-mono">
                    {p.tag}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors ml-auto shrink-0 self-center sm:self-auto" />
            </Link>
          ))}
        </div>

        <div className="max-w-3xl">
          <H2>Foundations</H2>
          <div className="grid grid-cols-1 gap-px bg-border">
            {foundations.map((f) => (
              <Link
                key={f.href}
                href={f.href}
                className="bg-background p-6 group no-underline"
              >
                <h3 className="font-semibold mb-1 group-hover:text-muted-foreground transition-colors">
                  {f.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

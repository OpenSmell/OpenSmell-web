import Link from "next/link"
import { ChevronRight, Cpu, Database, Hexagon, Sigma, ExternalLink } from "lucide-react"

const PILLARS = [
  {
    icon: Cpu,
    title: "Open Hardware",
    desc: "Reference rig from off-the-shelf parts.",
    href: "/enose",
    internal: true,
  },
  {
    icon: Database,
    title: "Open Data",
    desc: "Shared training data from open rigs.",
    href: "https://github.com/opensmell/data-commons",
    internal: false,
  },
  {
    icon: Hexagon,
    title: "Open Protocol",
    desc: "Standardised recording, reproducible features.",
    href: "https://github.com/opensmell/interoperability",
    internal: false,
  },
  {
    icon: Sigma,
    title: "Open Software",
    desc: "Zero-code GUI plus a Python SDK.",
    href: "/osmograph",
    internal: true,
  },
]

export default function OpenStack() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
      {PILLARS.map((p) => {
        const inner = (
          <>
            <div className="flex items-center justify-between mb-5">
              <p.icon className="w-7 h-7" />
              {!p.internal && <ExternalLink className="w-4 h-4 opacity-50" />}
            </div>
            <h3 className="text-lg font-bold tracking-tight mb-2">{p.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1 group-hover:text-background/70 transition-colors">
              {p.desc}
            </p>
            <span className="mt-5 text-sm font-medium inline-flex items-center gap-1.5">
              Open <ChevronRight className="w-4 h-4" />
            </span>
          </>
        )
        const cls =
          "hex-box group flex flex-col h-full border border-border bg-background p-6 hover:bg-foreground hover:text-background transition-colors duration-300"
        return p.internal ? (
          <Link key={p.title} href={p.href} className={cls}>
            {inner}
          </Link>
        ) : (
          <a
            key={p.title}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cls}
          >
            {inner}
          </a>
        )
      })}
    </div>
  )
}

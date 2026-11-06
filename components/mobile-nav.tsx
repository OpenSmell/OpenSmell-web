"use client"

import { useState } from "react"
import Link from "next/link"
import {
  BookOpen,
  Cpu,
  Download,
  FileText,
  FlaskConical,
  Menu,
  MessageSquare,
  Monitor,
  BarChart3,
  Search,
  Github,
  X,
} from "lucide-react"

const links = [
  { label: "Osmograph", href: "/osmograph", icon: BarChart3 },
  { label: "Smell Monitor", href: "/smell-monitor", icon: Monitor },
  { label: "Aromatory", href: "/appstore", icon: FlaskConical },
  { label: "E-Nose", href: "/enose", icon: Cpu },
  { label: "Scent Search", href: "/search", icon: Search },
  { label: "Academy", href: "/academy", icon: BookOpen },
  { label: "Docs", href: "/docs", icon: FileText },
]

export default function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative lg:hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        aria-expanded={open}
        className="inline-flex h-9 w-9 items-center justify-center border border-border text-foreground transition-colors hover:bg-foreground hover:text-background"
      >
        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 border border-border bg-background">
          <Link
            href="/osmograph"
            onClick={() => setOpen(false)}
            data-umami-event="mobile_download_click"
            className="flex items-center gap-2 border-b border-border bg-foreground px-4 py-3 text-sm font-medium text-background"
          >
            <Download className="h-4 w-4" />
            Download Osmograph
          </Link>
          <div className="py-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <l.icon className="h-4 w-4" />
                {l.label}
              </Link>
            ))}
            <a
              href="https://discord.gg/CGER3tHxbH"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <MessageSquare className="h-4 w-4" />
              Community
            </a>
          </div>
          <div className="border-t border-border px-4 py-3">
            <a
              href="https://github.com/OpenSmell"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="inline-flex w-full items-center justify-center gap-2 border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:border-foreground"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

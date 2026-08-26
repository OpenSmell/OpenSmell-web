"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Github } from "lucide-react"

const links = [
  { label: "Smell Monitor", href: "/smell-monitor" },
  { label: "Platform", href: "/osmograph" },
  { label: "Research", href: "/academy" },
  { label: "Developers", href: "/enose" },
  { label: "Data", href: "/search" },
]

export default function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative md:hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        aria-expanded={open}
        className="inline-flex items-center justify-center w-9 h-9 border border-border text-foreground hover:bg-foreground hover:text-background transition-colors"
      >
        {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-60 bg-background border border-border shadow-xl">
          <div className="py-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-1 pt-3 border-t border-border px-4 pb-3">
              <Link
                href="/smell-monitor"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-4 py-2.5 text-sm font-medium w-full hover:opacity-90 transition-opacity"
              >
                Run a Pilot
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Search, Monitor, Cpu, BookOpen, MessageSquare, Github } from "lucide-react"

const links = [
  { label: "Search", href: "/search", icon: Search },
  { label: "Osmograph", href: "/osmograph", icon: Monitor },
  { label: "E-Nose", href: "/enose", icon: Cpu },
  { label: "Academy", href: "/academy", icon: BookOpen },
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
                <l.icon className="w-4 h-4" />
                {l.label}
              </Link>
            ))}
            <a
              href="https://discord.gg/CGER3tHxbH"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              Community
            </a>
            <div className="mt-1 pt-3 border-t border-border px-4 pb-3">
              <a
                href="https://github.com/opensmell"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-4 py-2.5 text-sm font-medium w-full hover:opacity-90 transition-opacity"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Github } from "lucide-react"
import ThemeToggle from "@/components/theme-toggle"
import MobileNav from "@/components/mobile-nav"

const navLinks = [
  { href: "/smell-monitor", label: "Smell Monitor", key: "smell-monitor" },
  { href: "/osmograph", label: "Platform", key: "platform" },
  { href: "/academy", label: "Research", key: "research" },
  { href: "/enose", label: "Developers", key: "developers" },
  { href: "/search", label: "Data", key: "data" },
]

export default function SiteHeader({ active }: { active?: string }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
        <Link href="/" className="flex items-center gap-3 no-underline group">
          <div className="relative w-8 h-8">
            <Image
              src="/opensmell_logo.png"
              alt="OpenSmell"
              fill
              className="object-contain"
              priority
              sizes="32px"
            />
          </div>
          <span className="text-lg font-semibold tracking-tight">OpenSmell</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          {navLinks.map((link) => {
            const isActive = active === link.key
            return (
              <Link
                key={link.key}
                href={link.href}
                className={`transition-colors ${
                  isActive ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          <a
            href="https://github.com/opensmell"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            GitHub
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <MobileNav />
          <ThemeToggle />
          <Link
            href="/smell-monitor"
            className="hidden md:inline-flex items-center gap-2 bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Run a Pilot
          </Link>
        </div>
      </div>
    </header>
  )
}

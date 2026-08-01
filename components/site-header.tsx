"use client"

import { useEffect, useState, type ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Monitor, Store, BookOpen, ExternalLink } from "lucide-react"
import ThemeToggle from "@/components/theme-toggle"
import MobileNav from "@/components/mobile-nav"

export default function SiteHeader({ active }: { active?: string }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const link = (href: string, icon: ReactNode, label: string, key: string) => {
    const isActive = active === key
    const cls = `inline-flex items-center gap-1 transition-colors ${
      isActive ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
    }`
    return (
      <Link key={key} href={href} className={cls}>
        {icon}
        {label}
      </Link>
    )
  }

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
          {link("/search", <Search className="w-3.5 h-3.5" />, "Search", "search")}
          {link("/osmograph", <Monitor className="w-3.5 h-3.5" />, "Osmograph", "osmograph")}
          {link("/appstore", <Store className="w-3.5 h-3.5" />, "Appstore", "appstore")}
          {link("/academy", <BookOpen className="w-3.5 h-3.5" />, "Academy", "academy")}
          <a
            href="https://discord.gg/CGER3tHxbH"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Community
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <MobileNav />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

"use client"

import Link from "next/link"
import Image from "next/image"
import { Download, Github } from "lucide-react"
import MobileNav from "@/components/mobile-nav"

const links = [
  { href: "/osmograph", label: "Osmograph", key: "osmograph" },
  { href: "/smell-monitor", label: "Smell Monitor", key: "smell-monitor" },
  { href: "/appstore", label: "Aromatory", key: "appstore" },
  { href: "/academy", label: "Academy", key: "academy" },
  { href: "/docs", label: "Docs", key: "docs" },
]

export default function SiteHeader({ active }: { active?: string }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6">
        <Link href="/" className="flex flex-shrink-0 items-center gap-3 no-underline">
          <div className="relative h-8 w-8">
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

        <nav className="hidden items-center gap-7 text-sm lg:flex">
          {links.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={`transition-colors ${
                active === link.key
                  ? "font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/OpenSmell"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="OpenSmell on GitHub"
            className="hidden text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            <Github className="h-4 w-4" />
          </a>
          <Link
            href="/osmograph"
            data-umami-event="header_download_click"
            className="inline-flex items-center gap-1.5 border border-foreground bg-foreground px-3 py-2 font-mono text-[10px] uppercase tracking-[0.08em] text-background transition-colors hover:bg-[#201f1c] max-[359px]:hidden"
          >
            <Download className="h-3.5 w-3.5" />
            Download
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

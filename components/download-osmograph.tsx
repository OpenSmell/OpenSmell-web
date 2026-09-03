"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import type { ReactNode } from "react"
import { ChevronDown, ArrowRight } from "lucide-react"
import { track } from "@/lib/analytics"

type PlatformId = "windows" | "macos" | "linux-deb" | "linux-rpm"

interface PlatformOption {
  id: PlatformId
  name: string
  spec: string
  href: string
  icon: ReactNode
}

const RELEASE_TAG = "v0.1.0"
const BASE = `https://github.com/OpenSmell/osmograph-desktop/releases/download/${RELEASE_TAG}`

const WINDOWS_ICON = (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
    <path d="M3 5.2l7.3-1v6.9H3V5.2zm0 11.6l7.3 1v-6.6H3v5.6zm8.1 1.3l9.9 1.5V12.8h-9.9v5.3zm0-9.2v5.2h9.9V4.4L11.1 6v3z" />
  </svg>
)

const APPLE_ICON = (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
    <path d="M16.7 12.9c0-2.5 2-3.7 2.1-3.8-1.2-1.7-3-1.9-3.6-1.9-1.5-.2-3 .9-3.7.9-.8 0-1.9-.9-3.2-.9-1.6 0-3.1 1-4 2.4-1.7 2.9-.4 7.2 1.2 9.6.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.1-.8 1.4 0 1.8.8 3.2.8 1.3 0 2.2-1.2 3-2.3.9-1.4 1.3-2.7 1.3-2.8 0 0-2.5-1-2.5-3.7zM14 5.3c.7-.8 1.1-1.9 1-3-.9 0-2 .6-2.7 1.4-.6.7-1.2 1.8-1 2.9 1 .1 2-.5 2.7-1.3z" />
  </svg>
)

const LINUX_ICON = (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
    <path d="M12 2a5 5 0 0 0-5 5c0 1.6.8 3 2 3.9v.6c0 1.5 3 2.5 3 2.5s3-1 3-2.5v-.6c1.2-.9 2-2.3 2-3.9a5 5 0 0 0-5-5zM9 5.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm6 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-2.2 8.1v.6a.3.3 0 0 1-.6 0v-.6c0-.2.1-.3.3-.3.2 0 .3.1.3.3zM8 15c-.3 0-.6.2-.7.5-.1.3-.3.5-.6.5-.3 0-.6-.3-.5-.6a1 1 0 0 1 1.9-.2c.3.1.5.4.5.6-.1.1-.2.1-.4.1zm8.8.4c-.1.3-.3.5-.6.5-.2 0-.5-.2-.6-.5-.1-.3-.3-.5-.5-.6-.4.1-.4.5-.4.6a1 1 0 0 0 1.9.2c.2-.1.2-.2.2-.4z" />
  </svg>
)

const OPTIONS: PlatformOption[] = [
  {
    id: "windows",
    name: "Windows",
    spec: "64-bit · .exe",
    href: `${BASE}/Osmograph_0.1.0_x64-setup.exe`,
    icon: WINDOWS_ICON,
  },
  {
    id: "macos",
    name: "macOS",
    spec: "Apple silicon · .dmg",
    href: `${BASE}/Osmograph_0.1.0_aarch64.dmg`,
    icon: APPLE_ICON,
  },
  {
    id: "linux-deb",
    name: "Linux",
    spec: "Ubuntu · Debian · .deb",
    href: `${BASE}/Osmograph_0.1.0_amd64.deb`,
    icon: LINUX_ICON,
  },
  {
    id: "linux-rpm",
    name: "Linux",
    spec: "Fedora · openSUSE · .rpm",
    href: `${BASE}/Osmograph-0.1.0-1.x86_64.rpm`,
    icon: LINUX_ICON,
  },
]

function detectPlatform(): PlatformId {
  const ua = navigator.userAgent
  if (/Mac|iPhone|iPad/.test(ua)) return "macos"
  if (/Win/.test(ua)) return "windows"
  return "linux-deb"
}

const SHORT_NAME: Record<PlatformId, string> = {
  windows: "Windows",
  macos: "macOS",
  "linux-deb": "Linux",
  "linux-rpm": "Linux",
}

export default function DownloadOsmograph() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<PlatformId>("windows")
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof navigator !== "undefined") setSelected(detectPlatform())
  }, [])

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", onDoc)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onDoc)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  const current = OPTIONS.find((o) => o.id === selected) ?? OPTIONS[0]

  const fire = useCallback((platform: string, source: string) => {
    track("download", { target: "osmograph-desktop", platform, source })
  }, [])

  return (
    <div ref={rootRef} className="relative inline-flex">
      <a
        href={current.href}
        onClick={() => fire(current.spec, "hero")}
        className="hex-btn hex-btn-primary"
      >
        <DownloadGlyph />
        Download for {SHORT_NAME[selected]}
      </a>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="hex-btn hex-btn-primary px-3 border-l border-background/20"
      >
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul
          role="menu"
          aria-label="Download for your operating system"
          className="absolute top-full left-0 mt-2 z-50 w-72 border border-border bg-background shadow-lg"
        >
          {OPTIONS.map((o) => (
            <li key={o.id}>
              <a
                href={o.href}
                onClick={() => {
                  fire(o.spec, "dropdown")
                  setOpen(false)
                }}
                className="flex items-center gap-3 px-4 py-3 border-b border-border last:border-b-0 text-foreground hover:bg-hex transition-colors"
              >
                <span className="w-5 text-foreground flex-shrink-0">{o.icon}</span>
                <span className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-sm font-semibold leading-none">{o.name}</span>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                    {o.spec}
                  </span>
                </span>
                <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground flex-shrink-0" />
              </a>
            </li>
          ))}
          <li>
            <a
              href="https://github.com/OpenSmell/osmograph-desktop/releases"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => fire("all-platforms", "dropdown")}
              className="flex items-center gap-2 px-4 py-2.5 text-[11px] font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground"
            >
              All downloads on GitHub <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </li>
        </ul>
      )}
    </div>
  )
}

function DownloadGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

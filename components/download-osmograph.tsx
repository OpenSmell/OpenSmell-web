"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { ChevronDown, Download } from "lucide-react"
import { track } from "@/lib/analytics"

type PlatformId = "windows" | "macos" | "linux-deb" | "linux-rpm"

interface PlatformOption {
  id: PlatformId
  label: string
  detail: string
  href: string
  disabled?: boolean
}

const RELEASE_TAG = "v0.1.0"
const BASE = `https://github.com/OpenSmell/osmograph-desktop/releases/download/${RELEASE_TAG}`

const OPTIONS: PlatformOption[] = [
  {
    id: "windows",
    label: "Windows",
    detail: "64-bit · .exe installer",
    href: `${BASE}/Osmograph_0.1.0_x64-setup.exe`,
  },
  {
    id: "macos",
    label: "macOS",
    detail: "Apple silicon · .dmg",
    href: `${BASE}/Osmograph_0.1.0_aarch64.dmg`,
  },
  {
    id: "linux-deb",
    label: "Linux · Ubuntu / Debian",
    detail: ".deb package (amd64)",
    href: `${BASE}/Osmograph_0.1.0_amd64.deb`,
  },
  {
    id: "linux-rpm",
    label: "Linux · Fedora / openSUSE",
    detail: ".rpm package (x86_64)",
    href: `${BASE}/Osmograph-0.1.0-1.x86_64.rpm`,
  },
]

function detectPlatform(): PlatformId {
  const ua = navigator.userAgent
  const isMac = /Mac|iPhone|iPad/.test(ua)
  const isWindows = /Win/.test(ua)
  if (isMac) return "macos"
  if (isWindows) return "windows"
  // linux / everything else — default to the .deb variant, easiest for most
  return "linux-deb"
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
        onClick={() => fire(current.detail, "hero")}
        className="hex-btn hex-btn-primary"
        aria-label={`Download Osmograph for ${current.detail}`}
      >
        <Download className="w-4 h-4" />
        Download for {current.label}
      </a>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Choose your operating system"
        className="hex-btn hex-btn-primary px-2 border-l border-background/20"
      >
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Operating system"
          className="absolute top-full left-0 mt-2 z-50 w-64 border border-border bg-background shadow-lg"
        >
          {OPTIONS.map((o) => {
            const active = o.id === selected
            return (
              <li key={o.id}>
                <a
                  role="option"
                  aria-selected={active}
                  href={o.href}
                  onClick={() => {
                    fire(o.detail, "dropdown")
                    setSelected(o.id)
                    setOpen(false)
                  }}
                  className={`group flex flex-col gap-0.5 px-4 py-3 text-left border-b border-border last:border-b-0 transition-colors ${
                    active
                      ? "bg-foreground text-background"
                      : "bg-background text-foreground hover:bg-hex"
                  }`}
                >
                  <span className="text-sm font-semibold leading-none">{o.label}</span>
                  <span className={`text-[11px] font-mono uppercase tracking-wider ${active ? "text-background/70" : "text-muted-foreground"}`}>
                    {o.detail}
                  </span>
                </a>
              </li>
            )
          })}
          <li>
            <a
              href="https://github.com/OpenSmell/osmograph-desktop/releases"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => fire("all-platforms", "dropdown")}
              className="block px-4 py-2.5 text-[11px] font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground"
            >
              All downloads on GitHub →
            </a>
          </li>
        </ul>
      )}
    </div>
  )
}

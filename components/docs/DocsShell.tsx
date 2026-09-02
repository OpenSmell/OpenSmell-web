"use client"

import type { ReactNode } from "react"
import Link from "next/link"

export interface DocNavItem {
  href: string
  label: string
}

export interface DocNavGroup {
  title: string
  items: DocNavItem[]
}

const NAV: DocNavGroup[] = [
  {
    title: "Overview",
    items: [{ href: "/docs", label: "Docs home" }],
  },
  {
    title: "Products",
    items: [
      { href: "/docs/python", label: "Python SDK" },
      { href: "/docs/rust", label: "Rust SDK" },
      { href: "/docs/desktop", label: "Osmograph Desktop" },
    ],
  },
  {
    title: "Foundations",
    items: [{ href: "/docs/data-model", label: "Data model & .osmell" }],
  },
]

export default function DocsShell({
  title,
  subtitle,
  active,
  children,
  tabs,
}: {
  title: string
  subtitle?: string
  active: string
  children: ReactNode
  tabs?: { href: string; label: string }[]
}) {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-20">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
          <span className="inline-flex items-center gap-1.5 border border-border px-2 py-1 uppercase tracking-wider">
            Docs
          </span>
          <span>/</span>
          <span className="text-foreground">{title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10">
          <aside className="hidden lg:block">
            <nav className="sticky top-28 flex flex-col gap-6">
              {NAV.map((group) => (
                <div key={group.title}>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                    {group.title}
                  </div>
                  <ul className="flex flex-col gap-1">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`block px-3 py-1.5 text-sm transition-colors no-underline ${
                            active === item.href
                              ? "bg-foreground text-background font-medium"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          <div className="min-w-0">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2 leading-[1.05]">
              {title}
            </h1>
            {subtitle && (
              <p className="text-muted-foreground max-w-2xl mb-6 leading-relaxed">{subtitle}</p>
            )}

            {tabs && tabs.length > 0 && (
              <div className="flex flex-wrap gap-px bg-border border border-border mb-8 w-fit">
                {tabs.map((t) => {
                  const isActive = active === t.href
                  return (
                    <Link
                      key={t.href}
                      href={t.href}
                      className={`px-4 py-2 text-sm transition-colors no-underline ${
                        isActive
                          ? "bg-foreground text-background"
                          : "bg-background text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {t.label}
                    </Link>
                  )
                })}
              </div>
            )}

            <article className="max-w-3xl space-y-6">{children}</article>
          </div>
        </div>
      </div>
    </div>
  )
}

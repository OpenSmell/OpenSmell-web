import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Vials — Osmograph workspaces for digital olfaction",
  description:
    "Inspectable, declarative Vials for Osmograph: protocols, logs, stop rules, field notes, and the claims they refuse to make. Install a manifest from a raw URL, or publish your own in your personal repository.",
}

export default function VialsLayout({ children }: { children: React.ReactNode }) {
  return children
}

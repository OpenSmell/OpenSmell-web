import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "The Aromatory — Vials for Osmograph",
  description:
    "Installable Vials for Osmograph: a detection profile, a domain UI, and the evidence behind it. Every Vial is author-hosted; Osmograph verifies the manifest hash before it runs.",
}

export default function AromatoryLayout({ children }: { children: React.ReactNode }) {
  return children
}

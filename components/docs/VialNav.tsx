import Link from "next/link"

const links = [
  { href: "/docs/vials", label: "Overview" },
  { href: "/docs/vials/quickstart", label: "Quickstart" },
  { href: "/docs/vials/profile", label: "Profile" },
  { href: "/docs/vials/ui", label: "UI" },
  { href: "/docs/vials/evidence", label: "Evidence" },
  { href: "/docs/vials/operate", label: "Operate" },
  { href: "/docs/vials/reference", label: "Reference" },
]

export function VialNav() {
  return (
    <nav className="flex flex-wrap gap-2 border-y border-border py-3 my-8">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="border border-border px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground hover:border-foreground transition-colors no-underline"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

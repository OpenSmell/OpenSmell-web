import Link from "next/link"
import Image from "next/image"

export default function SiteFooter() {
  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="relative w-7 h-7">
                <Image src="/opensmell_logo.png" alt="OpenSmell" fill className="object-contain" sizes="28px" />
              </div>
              <span className="font-semibold text-sm">OpenSmell</span>
            </div>
            <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
              Building the digital infrastructure for olfaction. Open source, community-driven.
            </p>
          </div>
          {[
            {
              title: "Products",
              links: [
                { label: "Smell Monitor", href: "/smell-monitor" },
                { label: "Osmograph", href: "/osmograph" },
                { label: "E-Nose Builder", href: "/enose" },
                { label: "Scent Search", href: "/search" },
              ],
            },
            {
              title: "Developers",
              links: [
                { label: "Docs", href: "/docs" },
                { label: "SDK", href: "https://github.com/OpenSmell/opensmell" },
                { label: "Data Commons", href: "https://github.com/opensmell/data-commons" },
                { label: "Academy", href: "/academy" },
              ],
            },
            {
              title: "Community",
              links: [
                { label: "Discord", href: "https://discord.gg/CGER3tHxbH" },
                { label: "GitHub", href: "https://github.com/opensmell" },
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-3">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-border pt-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} OpenSmell. Open source research to digitise olfaction.
          <span className="mx-2">·</span>
          <a href="mailto:praise@opensmell.xyz" className="hover:text-foreground transition-colors">praise@opensmell.xyz</a>
        </div>
      </div>
    </footer>
  )
}

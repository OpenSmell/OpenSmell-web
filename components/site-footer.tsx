import Link from "next/link"
import Image from "next/image"

export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 no-underline mb-4">
              <div className="relative w-7 h-7">
                <Image src="/opensmell_logo.png" alt="OpenSmell" fill className="object-contain" sizes="28px" />
              </div>
              <span className="text-base font-semibold tracking-tight">OpenSmell</span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Infrastructure for machines to smell.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link href="/smell-monitor" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Smell Monitor</Link></li>
              <li><Link href="/osmograph" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Osmograph</Link></li>
              <li><Link href="/enose" className="text-sm text-muted-foreground hover:text-foreground transition-colors">E-Nose Builder</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">Research</h4>
            <ul className="space-y-2">
              <li><Link href="/academy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Academy</Link></li>
              <li><Link href="/search" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Data Commons</Link></li>
              <li><a href="https://github.com/opensmell" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">GitHub</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">Developers</h4>
            <ul className="space-y-2">
              <li><Link href="/enose" className="text-sm text-muted-foreground hover:text-foreground transition-colors">SDK</Link></li>
              <li><Link href="/academy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Protocol Docs</Link></li>
              <li><a href="https://discord.gg/CGER3tHxbH" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Discord</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/academy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
              <li><Link href="/smell-monitor" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} OpenSmell. Open-source digital olfaction.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <a href="https://github.com/opensmell" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
            <a href="https://discord.gg/CGER3tHxbH" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Discord</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

"use client"

import { useParams } from "next/navigation"
import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ExternalLink, Copy, Check, Database, BookOpen, Monitor, Cpu, Activity, BarChart3 } from "lucide-react"
import MoleculeViewer from "@/components/molecule-viewer"
import { getChemicalByCID, Chemical } from "@/lib/odor-index"
import ThemeToggle from "@/components/theme-toggle"

function ChemicalDetailPage() {
  const params = useParams()
  const [chemical, setChemical] = useState<Chemical | null>(null)
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(true)

  const cid = parseInt(params.cid as string)

  useEffect(() => {
    const found = getChemicalByCID(cid)
    if (found) {
      setChemical(found)
    } else {
      setChemical(null)
    }
    setLoading(false)
  }, [cid])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const openPubChem = () => {
    window.open(`https://pubchem.ncbi.nlm.nih.gov/compound/${cid}`, "_blank")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-foreground mb-4"></div>
          <p className="text-sm text-muted-foreground">Loading chemical data...</p>
        </div>
      </div>
    )
  }

  if (!chemical) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <header className="border-b border-border px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-7 h-7">
              <Image
                src="/opensmell_logo.png"
                alt="OpenSmell"
                fill
                className="object-contain"
                sizes="28px"
              />
            </div>
            <span className="font-semibold text-sm">OpenSmell</span>
          </Link>
        </header>
        <main className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Chemical not found</h1>
            <p className="text-muted-foreground mb-6 font-mono text-sm">CID_{cid} doesn't exist in our database.</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground border border-border px-4 py-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to search
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Search</span>
          </Link>
          <Link href="/" className="flex items-center gap-2 no-underline">
            <div className="relative w-7 h-7">
              <Image
                src="/opensmell_logo.png"
                alt="OpenSmell"
                fill
                className="object-contain"
                sizes="28px"
              />
            </div>
            <span className="font-semibold text-sm">OpenSmell</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/smell-monitor"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              title="Smell Monitor"
            >
              <Monitor className="w-4 h-4" />
            </Link>
            <Link
              href="/osmograph"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              title="Osmograph"
            >
              <BarChart3 className="w-4 h-4" />
            </Link>
            <Link
              href="/enose"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              title="E-Nose"
            >
              <Cpu className="w-4 h-4" />
            </Link>
            <Link
              href="/academy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              title="Academy"
            >
              <BookOpen className="w-4 h-4" />
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="border border-border p-6 mb-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-sm text-muted-foreground border border-border px-3 py-1">
                      CID_{chemical.cid}
                    </span>
                    <button
                      onClick={openPubChem}
                      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      PubChem
                    </button>
                  </div>
                  <h1 className="text-3xl font-bold tracking-tight">{chemical.name}</h1>
                </div>
                <button
                  onClick={() => copyToClipboard(chemical.smiles)}
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground border border-border px-3 py-1.5 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy SMILES
                    </>
                  )}
                </button>
              </div>

              <div className="mb-6">
                <MoleculeViewer
                  cid={chemical.cid}
                  smiles={chemical.smiles}
                  width={600}
                  height={300}
                />
              </div>

              <div className="border border-border p-4">
                <div className="text-xs text-muted-foreground mb-2 font-mono">SMILES</div>
                <code className="text-sm font-mono">{chemical.smiles}</code>
              </div>
            </div>

            <div className="border border-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-lg font-semibold">Odor Profile</h2>
                <span className="text-xs text-muted-foreground font-mono">
                  ({chemical.descriptors.length} descriptors)
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {chemical.descriptors.map((desc, idx) => (
                  <span
                    key={idx}
                    className="text-sm border border-border px-3 py-1.5 text-muted-foreground hover:bg-foreground hover:text-background transition-all"
                  >
                    {desc}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="border border-border p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Database className="w-4 h-4 text-muted-foreground" />
                <h3 className="text-sm font-semibold">Data Sources</h3>
              </div>
              <div className="space-y-2">
                {chemical.sources.map((source, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{source}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <div className="text-xs text-muted-foreground">
                  Compiled from {chemical.sources.length} scientific sources
                </div>
              </div>
            </div>

            <div className="border border-border p-6">
              <h3 className="text-sm font-semibold mb-4">Actions</h3>
              <div className="space-y-3">
                <a
                  href={`https://mox.opensmell.xyz/?q=${encodeURIComponent(chemical.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 border border-foreground/40 bg-foreground text-background px-4 py-3 text-sm hover:bg-foreground/90 transition-all"
                >
                  <Activity className="w-4 h-4" />
                  Will a MOX e-nose detect it?
                </a>
                <button
                  onClick={openPubChem}
                  className="w-full flex items-center justify-center gap-2 border border-border px-4 py-3 text-sm hover:bg-foreground hover:text-background transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  View on PubChem
                </button>
                <button
                  onClick={() => copyToClipboard(chemical.smiles)}
                  className="w-full flex items-center justify-center gap-2 border border-border px-4 py-3 text-sm hover:bg-foreground hover:text-background transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      SMILES Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy SMILES
                    </>
                  )}
                </button>
                <Link
                  href="/"
                  className="block w-full text-center border border-border px-4 py-3 text-sm text-muted-foreground hover:bg-foreground hover:text-background transition-all"
                >
                  Search Another Chemical
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function ChemicalPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-foreground mb-4"></div>
          <p className="text-sm text-muted-foreground">Loading chemical...</p>
        </div>
      </div>
    }>
      <ChemicalDetailPage />
    </Suspense>
  )
}

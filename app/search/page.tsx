"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Loader2, ExternalLink, Copy, Check, Search, BookOpen, Monitor, Store } from "lucide-react"
import { searchByOdor, searchByChemical } from "@/lib/odor-index"
import BatchedChemicalViewer from "@/components/batched-molecule-viewer"
import ThemeToggle from "@/components/theme-toggle"

interface Chemical {
  cid: number
  name: string
  smiles: string
  descriptors: string[]
  sources: string[]
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [results, setResults] = useState<Chemical[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copiedCID, setCopiedCID] = useState<number | null>(null)
  const [tableOpen, setTableOpen] = useState(true)

  const q = searchParams.get("q") || ""
  const type = (searchParams.get("type") || "chemical") as "odor" | "chemical"

  useEffect(() => {
    setLoading(true)
    setError(null)
    try {
      let searchResults: Chemical[] = []

      if (type === "odor") {
        const terms = q
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
        if (terms.length === 0) {
          searchResults = []
        } else {
          searchResults = searchByOdor(terms)
        }
      } else {
        searchResults = searchByChemical(q)
      }

      if (searchResults.length > 500) {
        searchResults = searchResults.slice(0, 500)
        setError(`Showing first 500 of ${searchResults.length} results. Use specific search terms for better results.`)
      }

      setResults(searchResults)
    } catch (error) {
      console.error("Search error:", error)
      setError("An error occurred during search. Please try again.")
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [q, type])

  const copyToClipboard = (text: string, cid: number) => {
    navigator.clipboard.writeText(text)
    setCopiedCID(cid)
    setTimeout(() => setCopiedCID(null), 2000)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Home</span>
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
              href="/osmograph"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              title="Osmograph"
            >
              <Monitor className="w-4 h-4" />
            </Link>
            <Link
              href="/appstore"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              title="Appstore"
            >
              <Store className="w-4 h-4" />
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

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="border border-border p-4 mb-8">
          <div className="flex gap-3">
            <div className="flex-1">
              <div className="text-xs text-muted-foreground mb-2 font-mono">
                {type === "odor" ? "SEARCH BY ODOR" : "SEARCH BY CHEMICAL"}
              </div>
              <div className="flex items-center border border-border">
                <div className="px-3 text-muted-foreground">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  defaultValue={q}
                  placeholder={type === "odor" ? "citrus, floral, woody..." : "vanillin, limonene..."}
                  className="flex-1 bg-transparent px-3 py-2.5 text-sm focus:outline-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const val = e.currentTarget.value.trim()
                      if (val) {
                        window.location.href = `/search?type=${type}&q=${encodeURIComponent(val)}`
                      }
                    }
                  }}
                />
                <div className="flex border-l border-border">
                  <Link
                    href={`/search?type=odor&q=${encodeURIComponent(q)}`}
                    className={`px-3 py-2.5 text-xs transition-colors ${type === "odor" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    Odor
                  </Link>
                  <Link
                    href={`/search?type=chemical&q=${encodeURIComponent(q)}`}
                    className={`px-3 py-2.5 text-xs transition-colors ${type === "chemical" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    Chemical
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight mb-1">
            {type === "odor" ? "Chemicals with odor" : "Chemicals matching"}
            {q && (
              <>
                : <span className="text-muted-foreground font-mono text-lg">&ldquo;{q}&rdquo;</span>
              </>
            )}
          </h1>
          <p className="text-sm text-muted-foreground font-mono">
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Searching database...
              </span>
            ) : (
              <span>
                {results.length} result{results.length !== 1 ? "s" : ""} found
              </span>
            )}
          </p>
        </div>

        {error && (
          <div className="mb-6 border border-border p-4">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2" />
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground mx-auto mb-4" />
            <p className="text-sm text-muted-foreground font-mono">Searching chemical database...</p>
          </div>
        ) : results.length === 0 ? (
          <div className="border border-border p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="text-4xl mb-4 text-muted-foreground">⌕</div>
              <h3 className="text-lg font-semibold mb-2">No results found</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Try different search terms or browse by odor descriptors.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {["sweet", "fruity", "floral", "woody"].map((term) => (
                  <Link
                    key={term}
                    href={`/search?type=odor&q=${term}`}
                    className="text-xs border border-border px-3 py-1.5 hover:bg-foreground hover:text-background transition-all"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8 border border-border">
              <button
                onClick={() => setTableOpen(!tableOpen)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-foreground/5 transition-colors"
              >
                <span className="text-sm font-semibold">Table view</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-mono">
                    {results.length} rows
                  </span>
                  <span className={`transition-transform ${tableOpen ? "rotate-180" : ""}`}>
                    ▼
                  </span>
                </div>
              </button>
              {tableOpen && (
                <div className="overflow-x-auto max-h-[500px] overflow-y-auto border-t border-border">
                  <table className="min-w-full divide-y divide-border">
                    <thead className="bg-foreground/5 sticky top-0">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          CID
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          SMILES
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Descriptors
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Sources
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {results.map((chem) => (
                        <tr key={chem.cid} className="hover:bg-foreground/5 transition-colors">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <a
                                href={`https://pubchem.ncbi.nlm.nih.gov/compound/${chem.cid}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-mono text-muted-foreground hover:text-foreground flex items-center gap-1"
                              >
                                {chem.cid}
                                <ExternalLink className="w-3 h-3" />
                              </a>
                              <button
                                onClick={() => copyToClipboard(chem.smiles, chem.cid)}
                                className="text-muted-foreground hover:text-foreground"
                                title="Copy SMILES"
                              >
                                {copiedCID === chem.cid ? (
                                  <Check className="w-3 h-3" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap font-medium text-sm">
                            <Link
                              href={`/chemical/${chem.cid}`}
                              className="hover:text-muted-foreground transition-colors"
                            >
                              {chem.name}
                            </Link>
                          </td>
                          <td className="px-4 py-3">
                            <code className="text-xs font-mono text-muted-foreground px-2 py-1 border border-border truncate block max-w-xs">
                              {chem.smiles}
                            </code>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap gap-1 max-w-xs">
                              {chem.descriptors.slice(0, 3).map((desc) => (
                                <span
                                  key={desc}
                                  className="text-xs border border-border px-2 py-0.5 text-muted-foreground"
                                >
                                  {desc}
                                </span>
                              ))}
                              {chem.descriptors.length > 3 && (
                                <span className="text-xs text-muted-foreground">
                                  +{chem.descriptors.length - 3}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap gap-1">
                              {chem.sources.slice(0, 2).map((source) => (
                                <span
                                  key={source}
                                  className="text-xs border border-border px-2 py-0.5 text-muted-foreground"
                                >
                                  {source}
                                </span>
                              ))}
                              {chem.sources.length > 2 && (
                                <span className="text-xs text-muted-foreground">
                                  +{chem.sources.length - 2}
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="border border-border p-6">
              <h3 className="text-sm font-semibold mb-6">Molecular View</h3>
              <BatchedChemicalViewer
                chemicals={results}
                itemsPerPage={24}
                gridColumns={{
                  base: 1,
                  sm: 2,
                  md: 2,
                  lg: 3,
                  xl: 3,
                }}
              />
            </div>
          </>
        )}
      </div>

      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="relative w-5 h-5">
              <Image
                src="/opensmell_logo.png"
                alt="OpenSmell"
                fill
                className="object-contain"
                sizes="20px"
              />
            </div>
            OpenSmell
          </div>
          <div className="text-sm text-muted-foreground">
            Open source odor chemistry database
          </div>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
        </div>
      </footer>
    </div>
  )
}

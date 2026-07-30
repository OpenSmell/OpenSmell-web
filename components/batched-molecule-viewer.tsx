"use client"

import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { ExternalLink, Copy, Check, BarChart3 } from 'lucide-react'
import Link from 'next/link'

const loadRDKit = (): Promise<any> => {
  if ((window as any).RDKit) return Promise.resolve((window as any).RDKit)

  return new Promise(async (resolve, reject) => {
    try {
      const script = document.createElement('script')
      script.src = '/rdkit/RDKit_minimal.js'
      script.async = true
      script.id = 'rdkit-script'

      script.onload = async () => {
        try {
          const RDKitModule = await (window as any).initRDKitModule({
            locateFile: (file: string) => `/rdkit/${file}`
          })
          ;(window as any).RDKit = RDKitModule
          resolve(RDKitModule)
        } catch (err) {
          reject(err)
        }
      }

      script.onerror = reject
      document.head.appendChild(script)
    } catch (err) {
      reject(err)
    }
  })
}

interface Chemical {
  cid: number
  name: string
  smiles: string
  descriptors: string[]
  sources: string[]
}

interface ChemicalCardProps {
  chemical: Chemical
  priority?: boolean
  showDetails?: boolean
}

export function ChemicalCard({ chemical, priority = false, showDetails = true }: ChemicalCardProps) {
  const svgContainerRef = useRef<HTMLDivElement>(null)
  const [rendered, setRendered] = useState(false)
  const [loading, setLoading] = useState(false)
  const [svgContent, setSvgContent] = useState<string>('')
  const [copied, setCopied] = useState(false)

  const cleanupSVG = useCallback(() => {
    if (svgContainerRef.current) {
      svgContainerRef.current.textContent = ''
    }
  }, [])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const renderMolecule = useCallback(async () => {
    if (rendered || loading) return

    setLoading(true)
    try {
      const RDKit = await loadRDKit()
      const mol = RDKit.get_mol(chemical.smiles)

      if (!mol) {
        throw new Error('Failed to parse molecule')
      }

      const svg = mol.get_svg()

      cleanupSVG()
      setSvgContent(svg)

      setTimeout(() => {
        if (svgContainerRef.current) {
          const svgEl = svgContainerRef.current.querySelector('svg')
          if (svgEl) {
            svgEl.setAttribute('width', '100%')
            svgEl.setAttribute('height', '100%')
            svgEl.style.maxWidth = '100%'
            svgEl.style.maxHeight = '100%'
          }
        }
      }, 10)

      mol.delete()
      setRendered(true)
    } catch (err) {
      console.error('Failed to render molecule', err)
      cleanupSVG()
    } finally {
      setLoading(false)
    }
  }, [rendered, loading, chemical.smiles, cleanupSVG])

  useEffect(() => {
    if (priority) {
      const timer = setTimeout(() => {
        renderMolecule()
      }, Math.random() * 300)
      return () => clearTimeout(timer)
    }
  }, [priority, renderMolecule])

  useEffect(() => {
    return () => {
      cleanupSVG()
    }
  }, [cleanupSVG])

  const openPubChem = () => {
    window.open(`https://pubchem.ncbi.nlm.nih.gov/compound/${chemical.cid}`, '_blank')
  }

  return (
    <div className="border border-border p-5 transition-all duration-300 hover:bg-foreground/5">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs text-muted-foreground border border-border px-2 py-1">
              CID_{chemical.cid}
            </span>
            <button
              onClick={openPubChem}
              className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
              title="Open in PubChem"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
          <h3 className="font-semibold text-foreground text-sm truncate" title={chemical.name}>
            {chemical.name}
          </h3>
        </div>

        <button
          onClick={() => copyToClipboard(chemical.smiles)}
          className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0 ml-2"
          title="Copy SMILES"
        >
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>

      <div className="mb-4">
        {!rendered ? (
          <div
            className="border border-dashed border-border bg-foreground/5 flex items-center justify-center cursor-pointer hover:bg-foreground/10 transition-colors"
            style={{ height: '180px' }}
            onClick={renderMolecule}
          >
            {loading ? (
              <div className="text-center">
                <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-border border-t-foreground mb-2" />
                <p className="text-xs text-muted-foreground">Rendering molecule...</p>
              </div>
            ) : (
              <div className="text-center p-4">
                <div className="text-muted-foreground text-xs mb-2">Click to render molecule</div>
                <div className="text-xs text-muted-foreground font-mono opacity-60">
                  {chemical.smiles.substring(0, 40)}...
                </div>
              </div>
            )}
          </div>
        ) : (
          <div
            ref={svgContainerRef}
            className="border border-border overflow-hidden bg-background"
            style={{ height: '180px' }}
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        )}
      </div>

      {showDetails && (
        <>
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">Odor Profile</span>
              <span className="text-xs text-muted-foreground">({chemical.descriptors.length})</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {chemical.descriptors.slice(0, 6).map((desc, idx) => (
                <span
                  key={`${chemical.cid}-${desc}-${idx}`}
                  className="text-xs border border-border text-muted-foreground px-2 py-1 hover:bg-foreground hover:text-background transition-colors"
                  title={desc}
                >
                  {desc}
                </span>
              ))}
              {chemical.descriptors.length > 6 && (
                <span className="text-xs text-muted-foreground px-2 py-1">
                  +{chemical.descriptors.length - 6} more
                </span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <div className="text-xs text-muted-foreground mb-1">Data Sources</div>
            <div className="flex flex-wrap gap-1">
              {chemical.sources.slice(0, 3).map(source => (
                <span
                  key={source}
                  className="text-xs border border-border text-muted-foreground px-2 py-0.5"
                >
                  {source}
                </span>
              ))}
              {chemical.sources.length > 3 && (
                <span className="text-xs text-muted-foreground">
                  +{chemical.sources.length - 3} more
                </span>
              )}
            </div>
          </div>

          <Link
            href={`/chemical/${chemical.cid}`}
            className="block w-full text-center border border-border text-muted-foreground hover:bg-foreground hover:text-background px-4 py-2 transition-colors text-sm"
          >
            View Details
          </Link>
        </>
      )}
    </div>
  )
}

interface BatchedChemicalViewerProps {
  chemicals: Chemical[]
  itemsPerPage?: number
  showDetails?: boolean
  gridColumns?: {
    base?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
}

export default function BatchedChemicalViewer({
  chemicals,
  itemsPerPage = 24,
  showDetails = true,
  gridColumns = {
    base: 1,
    sm: 2,
    md: 2,
    lg: 3,
    xl: 3
  }
}: BatchedChemicalViewerProps) {
  const [visibleCount, setVisibleCount] = useState(Math.min(itemsPerPage, chemicals.length))

  useEffect(() => {
    loadRDKit().catch(console.error)
  }, [])

  const visibleChemicals = useMemo(() => {
    return chemicals.slice(0, visibleCount)
  }, [chemicals, visibleCount])

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + itemsPerPage, chemicals.length))
  }

  const gridClass = `grid grid-cols-${gridColumns.base || 1} ${
    gridColumns.sm ? `sm:grid-cols-${gridColumns.sm}` : ''
  } ${gridColumns.md ? `md:grid-cols-${gridColumns.md}` : ''} ${
    gridColumns.lg ? `lg:grid-cols-${gridColumns.lg}` : ''
  } ${gridColumns.xl ? `xl:grid-cols-${gridColumns.xl}` : ''} gap-px bg-border`

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4 bg-foreground/5 p-4">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{visibleChemicals.length}</span> of{' '}
          <span className="font-semibold text-foreground">{chemicals.length}</span> chemicals
        </div>
        <div className="flex gap-2">
          <button
            onClick={loadMore}
            disabled={visibleCount >= chemicals.length}
            className="px-4 py-2 text-sm bg-foreground text-background hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            Load {Math.min(itemsPerPage, chemicals.length - visibleCount)} More
          </button>
          {visibleCount > itemsPerPage && (
            <button
              onClick={() => setVisibleCount(itemsPerPage)}
              className="px-4 py-2 text-sm border border-border text-muted-foreground hover:bg-foreground hover:text-background transition-all"
            >
              Show Less
            </button>
          )}
        </div>
      </div>

      <div className={gridClass}>
        {visibleChemicals.map((chemical, index) => (
          <ChemicalCard
            key={chemical.cid}
            chemical={chemical}
            priority={index < 6}
            showDetails={showDetails}
          />
        ))}
      </div>

      {visibleCount < chemicals.length && (
        <div className="text-center pt-6">
          <button
            onClick={loadMore}
            className="px-6 py-3 bg-foreground text-background hover:opacity-90 font-medium transition-all"
          >
            Load {Math.min(itemsPerPage, chemicals.length - visibleCount)} More Chemicals
            <div className="text-sm font-normal mt-1 opacity-75">
              Currently showing {visibleCount} of {chemicals.length}
            </div>
          </button>
        </div>
      )}
    </div>
  )
}

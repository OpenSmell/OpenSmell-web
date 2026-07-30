"use client"

import { useEffect, useRef, useState } from 'react'
import { ExternalLink, AlertCircle, Loader2 } from 'lucide-react'

declare global {
  interface Window {
    RDKit?: any
  }
}

interface MoleculeViewerProps {
  cid: number
  smiles: string
  width?: number
  height?: number
}

export default function MoleculeViewer({
  cid,
  smiles,
  width = 280,
  height = 180,
}: MoleculeViewerProps) {
  const svgContainerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (window.RDKit) {
      setLoading(false)
      return
    }

    const loadRDKit = async () => {
      try {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script')
          script.src = '/rdkit/RDKit_minimal.js'
          script.async = true

          script.onload = () => resolve()
          script.onerror = () => reject(new Error('Failed to load RDKit script'))
          document.head.appendChild(script)
        })

        if (!(window as any).initRDKitModule) {
          throw new Error('initRDKitModule not found after script load')
        }

        const RDKitModule = await (window as any).initRDKitModule({
          locateFile: (file: string) => `/rdkit/${file}`
        })

        window.RDKit = RDKitModule
        setLoading(false)
      } catch (err: any) {
        console.error('RDKit initialization failed:', err)
        setError(`Failed to load molecule viewer: ${err.message}`)
        setLoading(false)
      }
    }

    loadRDKit()
  }, [])

  useEffect(() => {
    if (loading || error || !window.RDKit || !smiles || !svgContainerRef.current) return

    try {
      const mol = window.RDKit.get_mol(smiles)
      if (!mol) {
        throw new Error('Invalid SMILES string')
      }

      const svgString = mol.get_svg()

      if (!svgString || svgString.length < 100) {
        mol.delete()
        throw new Error('Generated SVG is invalid')
      }

      svgContainerRef.current.innerHTML = svgString

      const svg = svgContainerRef.current.querySelector('svg')
      if (svg) {
        svg.setAttribute('width', '100%')
        svg.setAttribute('height', '100%')
        svg.style.maxWidth = '100%'
        svg.style.maxHeight = '100%'
      }

      mol.delete()
      setError(null)
    } catch (err: any) {
      console.error('Molecule rendering failed:', err)
      setError(`Could not render molecule: ${err.message}`)
    }
  }, [loading, error, smiles])

  const openPubChem = () => {
    window.open(`https://pubchem.ncbi.nlm.nih.gov/compound/${cid}`, '_blank')
  }

  return (
    <div className="relative">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-xs text-muted-foreground font-mono">Molecule Structure</div>
        <button
          onClick={openPubChem}
          className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
        >
          <ExternalLink className="w-3 h-4" />
          PubChem
        </button>
      </div>

      <div
        className="border border-border overflow-hidden bg-background flex items-center justify-center relative"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <div
          ref={svgContainerRef}
          className="w-full h-full flex items-center justify-center p-2"
        />

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/90">
            <div className="text-center">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Initializing molecule viewer...</p>
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/90">
            <div className="text-center p-4">
              <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">{error}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Try refreshing the page
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-2">
        <div className="text-xs text-muted-foreground font-mono truncate" title={smiles}>
          SMILES: <span className="text-foreground">{smiles.substring(0, 50)}</span>
          {smiles.length > 50 && '...'}
        </div>
      </div>
    </div>
  )
}

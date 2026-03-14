"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Search, Zap, Brain, Github, MessageSquare, Wallet, ChevronRight, ExternalLink } from "lucide-react"

export default function Home() {
  const [recentSearches, setRecentSearches] = useState<
    Array<{ query: string; timestamp: Date; type: "odor" | "chemical" }>
  >([])
  const [hydrated, setHydrated] = useState(false)
  const searchSectionRef = useRef<HTMLDivElement>(null)
  const supportSectionRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    setHydrated(true)
  }, [])

  const handleSearch = useCallback((query: string, type: "odor" | "chemical") => {
    if (query.trim()) {
      setRecentSearches((prev) => [{ query, timestamp: new Date(), type }, ...prev.slice(0, 9)])
    }
  }, [])

  const handleSearchSubmit = (query: string, type: "odor" | "chemical") => {
    if (!query.trim()) return
    handleSearch(query, type)
    router.push(`/search?type=${type}&q=${encodeURIComponent(query.trim())}`)
  }

  const scrollToSearch = () => {
    searchSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToSupport = () => {
    supportSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const copyWalletAddress = () => {
    navigator.clipboard.writeText("0x699d0178f16484509f57d4d77f310b6b617621ce")
    alert("USDC wallet address copied to clipboard!")
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation with blur effect */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100/50 px-4 py-3 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 no-underline">
            <div className="relative w-10 h-10 flex-shrink-0">
              <Image
                src="/logo.jpg"
                alt="OpenSmell"
                fill
                className="object-contain rounded-lg"
                priority
                sizes="40px"
              />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">OpenSmell</h1>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6 text-sm">
            <button 
              onClick={scrollToSearch}
              className="text-gray-700 hover:text-black transition-colors"
            >
              Search
            </button>
            <a 
              href="https://github.com/opensmell/chemoprint" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-black transition-colors inline-flex items-center"
            >
              Chemoprint
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
            <a 
              href="https://discord.gg/CGER3tHxbH" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-black transition-colors inline-flex items-center"
            >
              <MessageSquare className="w-4 h-4 mr-1" />
              Community
            </a>
            <button
              onClick={scrollToSupport}
              className="inline-flex items-center space-x-1 bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              <Wallet className="w-4 h-4" />
              <span>Support</span>
            </button>
          </nav>
        </div>
      </header>

      <main className="px-4 py-8 sm:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section with subtle animation */}
          <div className="text-center mb-20">
            <div className="relative mb-8">
              {/* Enhanced molecular animation */}
              <div className="absolute inset-0 overflow-hidden opacity-20">
                <div className="relative h-full w-full">
                  <div className="absolute top-1/4 left-1/4 w-12 h-12 border-2 border-blue-300 rounded-full animate-pulse"></div>
                  <div className="absolute top-1/3 right-1/4 w-8 h-8 border-2 border-purple-300 rounded-full animate-pulse delay-300"></div>
                  <div className="absolute bottom-1/4 left-1/3 w-16 h-16 border-2 border-green-300 rounded-full animate-pulse delay-700"></div>
                  <div className="absolute top-2/3 right-1/3 w-10 h-10 border-2 border-amber-300 rounded-full animate-pulse delay-1000"></div>
                </div>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 relative z-10">
                Open infrastructure for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">digital smell</span>
              </h1>
              
              <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8 relative z-10">
                We're building the tools, standards, and community to make smell as programmable as light and sound.  
                Our first release: the <span className="font-semibold">chemoprint</span> – an open, hardware‑agnostic representation for molecular odor properties.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <a 
                  href="https://github.com/opensmell/chemoprint" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all hover:scale-105"
                >
                  <span>Explore the chemoprint</span>
                  <ChevronRight className="w-5 h-5 ml-2" />
                </a>
                <button 
                  onClick={scrollToSearch}
                  className="inline-flex items-center justify-center border-2 border-gray-300 px-6 py-3 rounded-lg hover:border-black transition-colors"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Try scent search
                </button>
                <a 
                  href="https://discord.gg/CGER3tHxbH" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-black transition-colors"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Join Discord
                </a>
              </div>
            </div>
          </div>

          {/* Problem & Solution Section */}
          <div className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Why does smell need an open infrastructure?</h2>
                <p className="text-gray-700 mb-4">
                  Unlike sight and sound, smell has no common digital language. Every research lab builds its own sensor arrays, uses proprietary data formats, and trains incompatible models. This fragmentation stalls progress.
                </p>
                <p className="text-gray-700 mb-4">
                  OpenSmell aims to change that by creating open tools and representations that anyone can use, adapt, and build upon.
                </p>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <p className="text-sm text-gray-700">
                    <span className="font-bold">The chemoprint</span> is our first step: a 29‑dimensional vector of physicochemical properties that can be both <span className="font-semibold">calculated from a molecule's structure</span> (for training) and <span className="font-semibold">measured by calibrated sensors</span> (for hardware). It's open, interpretable, and validated on real data.
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-3">Chemoprint in a nutshell</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between border-b border-gray-100 pb-1">
                    <span className="text-gray-600">Dimensions:</span>
                    <span className="font-mono font-medium">29</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-1">
                    <span className="text-gray-600">Validation R² (ODT):</span>
                    <span className="font-mono font-medium">0.88</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-1">
                    <span className="text-gray-600">Molecules validated:</span>
                    <span className="font-mono font-medium">717</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-1">
                    <span className="text-gray-600">License:</span>
                    <span className="font-mono font-medium">MIT</span>
                  </div>
                </div>
                <a 
                  href="https://github.com/opensmell/chemoprint" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 text-sm font-medium mt-4 hover:underline"
                >
                  Read the full spec <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          </div>

          {/* Vision Roadmap (3 steps) */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Our vision</h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              From open standards to real‑world applications
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 1: Chemoprint */}
              <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-lg font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Chemoprint standard</h3>
                <p className="text-gray-600 mb-4">
                  A 29‑dimensional open representation for odor‑relevant molecular properties. Validated and ready to use.
                </p>
                <span className="inline-flex items-center text-blue-600 text-sm font-medium">
                  ✅ Released v0.2
                </span>
              </div>
              
              {/* Step 2: E‑nose prototypes */}
              <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-100">
                <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-lg font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">E‑nose hardware</h3>
                <p className="text-gray-600 mb-4">
                  Open‑source electronic noses that output chemoprints. Calibration and sensor research.
                </p>
                <span className="inline-flex items-center text-purple-600 text-sm font-medium">
                  🚧 In development
                </span>
              </div>
              
              {/* Step 3: Community applications */}
              <div className="bg-gradient-to-br from-amber-50 to-white p-6 rounded-xl border border-amber-100">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-lg font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Community applications</h3>
                <p className="text-gray-600 mb-4">
                  Toxicity prediction, food spoilage detection, medical diagnostics – being built by contributors like you.
                </p>
                <span className="inline-flex items-center text-amber-600 text-sm font-medium">
                  🌱 Community‑driven
                </span>
              </div>
            </div>
          </div>

          {/* Search Interface */}
          <div ref={searchSectionRef} className="mb-20">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Scent search</h2>
              <p className="text-gray-600">
                Explore thousands of chemical‑odor relationships from{" "}
                <a 
                  href="https://pyrfume.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Pyrfume
                </a>
                .
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Search by Odor */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-900 mb-2">Find chemicals by smell</h3>
                <p className="text-sm text-gray-600 mb-4">e.g., citrus, floral, woody, aldehydic</p>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="citrus, floral, woody..."
                    className="flex-1 border border-gray-300 rounded-l-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit(e.currentTarget.value, 'odor')}
                  />
                  <button
                    onClick={() => {
                      const input = document.querySelector('input[placeholder*="citrus"]') as HTMLInputElement
                      handleSearchSubmit(input?.value || 'citrus', 'odor')
                    }}
                    className="bg-blue-600 text-white px-4 py-3 rounded-r-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {['citrus', 'floral', 'woody', 'aldehydic'].map((term) => (
                    <button 
                      key={term}
                      onClick={() => handleSearchSubmit(term, 'odor')}
                      className="text-sm bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Search by Chemical */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-900 mb-2">Find smells by chemical</h3>
                <p className="text-sm text-gray-600 mb-4">e.g., vanillin, limonene, benzaldehyde</p>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="vanillin, limonene..."
                    className="flex-1 border border-gray-300 rounded-l-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit(e.currentTarget.value, 'chemical')}
                  />
                  <button
                    onClick={() => {
                      const input = document.querySelector('input[placeholder*="vanillin"]') as HTMLInputElement
                      handleSearchSubmit(input?.value || 'vanillin', 'chemical')
                    }}
                    className="bg-green-600 text-white px-4 py-3 rounded-r-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {['vanillin', 'limonene', 'benzaldehyde', 'eugenol'].map((term) => (
                    <button 
                      key={term}
                      onClick={() => handleSearchSubmit(term, 'chemical')}
                      className="text-sm bg-green-50 text-green-700 px-3 py-1.5 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mb-20">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 sm:p-12 text-center border border-blue-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Join the mission
              </h2>
              <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
                Whether you're a researcher, developer, or hardware enthusiast, there's a place for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://discord.gg/CGER3tHxbH" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all hover:scale-105"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Join Discord
                </a>
                <a 
                  href="https://github.com/opensmell" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-black transition-colors"
                >
                  <Github className="w-5 h-5 mr-2" />
                  GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Support Section */}
          <div ref={supportSectionRef} className="mb-8">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-100">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Support open research</h3>
                  <p className="text-gray-700">
                    Donations fund cloud compute, sensor prototyping, and community building. 100% transparent – usage documented in Discord.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <button
                    onClick={copyWalletAddress}
                    className="flex items-center space-x-2 bg-white border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:border-black transition-colors"
                  >
                    <Wallet className="w-5 h-5" />
                    <span>Copy USDC address</span>
                  </button>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Polygon network
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="border-t border-gray-100 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="relative w-8 h-8">
                    <Image
                      src="/logo.jpg"
                      alt="OpenSmell"
                      fill
                      className="object-contain rounded"
                      sizes="32px"
                    />
                  </div>
                  <div className="font-bold text-gray-900">OpenSmell</div>
                </div>
                <p className="text-gray-600 text-sm max-w-xs">
                  Building the digital infrastructure for olfaction. Open source, community-driven.
                </p>
              </div>
              <div className="flex space-x-6">
                <a 
                  href="https://github.com/opensmell" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-900"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href="https://discord.gg/CGER3tHxbH" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-900"
                >
                  <MessageSquare className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div className="mt-8 text-center text-gray-500 text-sm">
              <p>© {new Date().getFullYear()} OpenSmell. Open source research to digitize the final sense.</p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  )
}
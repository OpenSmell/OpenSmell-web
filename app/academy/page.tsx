"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { BookOpen, ArrowRight, ExternalLink, GraduationCap, FlaskConical, ChartBarIcon, Cpu, ChevronRight, Search, Monitor, Store } from "lucide-react"
import ThemeToggle from "@/components/theme-toggle"

const articles = [
  {
    title: "Introduction to the Chemoprint",
    desc: "A deep dive into the 29-dimensional physicochemical vector that powers OpenSmell's representation of molecular odor properties.",
    category: "Research",
    icon: FlaskConical,
    readTime: "12 min",
    href: "#",
    comingSoon: true,
  },
  {
    title: "Building Your First E-Nose",
    desc: "Step-by-step guide to assembling an electronic nose using off-the-shelf components. No PCB milling or electronics mastery required.",
    category: "Hardware",
    icon: Cpu,
    readTime: "20 min",
    href: "https://github.com/opensmell/electronic-nose",
  },
  {
    title: "Understanding MOX Sensors",
    desc: "How metal-oxide semiconductor sensors work, their response dynamics, and how to interpret raw conductance readings.",
    category: "Hardware",
    icon: Cpu,
    readTime: "15 min",
    href: "#",
    comingSoon: true,
  },
  {
    title: "Digital Olfaction: A Primer",
    desc: "The history, challenges, and future of digitising the chemical sense. From the first e-nose to modern deep learning approaches.",
    category: "Foundations",
    icon: GraduationCap,
    readTime: "10 min",
    href: "#",
    comingSoon: true,
  },
  {
    title: "Data Collection Best Practices",
    desc: "Standardised recording protocols that make temporal features reproducible across different users and devices.",
    category: "Tutorial",
    icon: ChartBarIcon,
    readTime: "8 min",
    href: "#",
    comingSoon: true,
  },
  {
    title: "Sensor Fusion for Olfaction",
    desc: "Combining MOX, electrochemical, and optical sensors for richer chemical characterisation.",
    category: "Research",
    icon: FlaskConical,
    readTime: "18 min",
    href: "#",
    comingSoon: true,
  },
  {
    title: "Osmograph Walkthrough",
    desc: "Zero-code GUI for e-nose builders. Flash firmware, record sensor traces, and train classifiers with button clicks.",
    category: "Tutorial",
    icon: ChartBarIcon,
    readTime: "7 min",
    href: "https://github.com/opensmell/Osmograph",
  },
  {
    title: "The OpenSmell Python SDK",
    desc: "Extract 145-dimensional framework features and build custom pipelines with pip install opensmell.",
    category: "Tutorial",
    icon: GraduationCap,
    readTime: "10 min",
    href: "#",
    comingSoon: true,
  },
]

export default function AcademyPage() {
  const [hydrated, setHydrated] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (!hydrated) return null

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
          <Link href="/" className="flex items-center gap-3 no-underline group">
            <div className="relative w-8 h-8">
              <Image
                src="/opensmell_logo.png"
                alt="OpenSmell"
                fill
                className="object-contain"
                priority
                sizes="32px"
              />
            </div>
            <span className="text-lg font-semibold tracking-tight">OpenSmell</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm">
            <Link
              href="/search"
              className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              <Search className="w-3.5 h-3.5" />
              Search
            </Link>
            <Link
              href="/osmograph"
              className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              <Monitor className="w-3.5 h-3.5" />
              Osmograph
            </Link>
            <Link
              href="/appstore"
              className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              <Store className="w-3.5 h-3.5" />
              Appstore
            </Link>
            <Link
              href="/academy"
              className="text-foreground font-medium inline-flex items-center gap-1"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Academy
            </Link>
            <a
              href="https://discord.gg/CGER3tHxbH"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Community
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main>
        <section className="pt-32 pb-20 border-b border-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border text-xs text-muted-foreground mb-6">
                <GraduationCap className="w-3.5 h-3.5" />
                Digital Olfaction Academy
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-[0.95]">
                Learn the science
                <br />
                <span className="text-muted-foreground">of digital smell.</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mb-8">
                Tutorials, research deep-dives, and hardware guides for building
                the olfactory internet. From chemoprint fundamentals to e-nose assembly.
              </p>
              <div className="flex flex-wrap gap-3">
                {["All", "Research", "Hardware", "Tutorials", "Foundations"].map((cat) => (
                  <button
                    key={cat}
                    className={`text-sm border px-4 py-2 transition-all ${
                      cat === "All"
                        ? "bg-foreground text-background border-foreground"
                        : "border-border text-muted-foreground hover:bg-foreground hover:text-background"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
              {articles.map((article) => (
                <div key={article.title} className="bg-background p-6 group relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="border border-border p-2">
                      <article.icon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground border border-border px-2 py-0.5 uppercase tracking-wider">
                        {article.category}
                      </span>
                      {article.comingSoon && (
                        <span className="text-[10px] text-muted-foreground px-2 py-0.5 uppercase tracking-wider">
                          Soon
                        </span>
                      )}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-muted-foreground transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {article.desc}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{article.readTime}</span>
                    {article.comingSoon ? (
                      <span className="text-xs text-muted-foreground">—</span>
                    ) : (
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border py-20 bg-grid">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold tracking-tight mb-4">
                Contribute to the Academy
              </h2>
              <p className="text-muted-foreground mb-8">
                Have expertise in olfaction, sensor hardware, or cheminformatics?
                We welcome guest articles, tutorials, and research summaries.
              </p>
              <a
                href="https://discord.gg/CGER3tHxbH"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition-all"
              >
                Get in touch on Discord
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="relative w-6 h-6">
              <Image
                src="/opensmell_logo.png"
                alt="OpenSmell"
                fill
                className="object-contain"
                sizes="24px"
              />
            </div>
            <span>OpenSmell Academy</span>
          </div>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Back to Home
          </Link>
        </div>
      </footer>
    </div>
  )
}

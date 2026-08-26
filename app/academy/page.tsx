"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, GraduationCap, ChevronRight } from "lucide-react"
import { articles } from "@/lib/articles"

const filters = ["All", "Foundations", "Hardware", "Tutorial", "Research"]

export default function AcademyPage() {
  const [hydrated, setHydrated] = useState(false)
  const [activeFilter, setActiveFilter] = useState("All")

  useEffect(() => {
    setHydrated(true)
  }, [])

  const visible = useMemo(
    () => (activeFilter === "All" ? articles : articles.filter((a) => a.category === activeFilter)),
    [activeFilter]
  )

  if (!hydrated) return null

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <main>
        <section className="pt-32 pb-20 border-b border-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center">
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
                  the olfactory internet. From sensor fundamentals to machine-learning pipelines.
                </p>
                <div className="flex flex-wrap gap-3">
                {filters.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`text-sm border px-4 py-2 transition-all ${
                      cat === activeFilter
                        ? "bg-foreground text-background border-foreground"
                        : "border-border text-muted-foreground hover:bg-foreground hover:text-background"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
                </div>
              </div>
              <div className="hidden lg:flex items-center justify-center">
                <Image
                  src="/professor.png"
                  alt="Digital olfaction professor"
                  width={259}
                  height={288}
                  priority
                  className="w-72 h-auto lg:w-80 lg:h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
              {visible.map((article) => (
                <Link
                  key={article.slug}
                  href={`/academy/${article.slug}`}
                  className="bg-background p-6 group no-underline"
                >
                  <div className="border border-border mb-4 bg-white overflow-hidden">
                    <div className="relative aspect-[1200/630]">
                      <Image
                        src={article.thumbnail}
                        alt={article.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-[10px] text-muted-foreground border border-border px-2 py-0.5 uppercase tracking-wider">
                      {article.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{article.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-muted-foreground transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {new Date(article.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                </Link>
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
                className="hex-btn hex-btn-primary"
              >
                Get in touch on Discord
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

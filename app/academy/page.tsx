"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, GraduationCap, ChevronRight } from "lucide-react"
import { getArticle, articles } from "@/lib/articles"

const filters = ["All", "Foundations", "Hardware", "Tutorial", "Research"]

const curriculum: {
  module: string
  step: string
  goal: string
  essays: { slug: string; why: string }[]
}[] = [
  {
    module: "Start here",
    step: "01",
    goal: "Understand why digital smell has no engineering stack yet — and the one OpenSmell is building.",
    essays: [
      { slug: "digitising-smell", why: "The primer: why openness is a methodological necessity." },
      { slug: "the-opensmell-stack", why: "Map of the whole project: every repo, how they connect, and where to contribute." },
    ],
  },
  {
    module: "Sensor physics",
    step: "02",
    goal: "Learn how a metal-oxide sensor turns a smell into a number, and what it can and cannot measure.",
    essays: [
      { slug: "how-mox-sensors-work", why: "The full physics chain from a SnO₂ film to a sample." },
      { slug: "band-bending-and-power-law", why: "The chemistry behind a single MOX reading." },
      { slug: "sensor-count-and-dimensionality", why: "How many sensors actually make a nose." },
    ],
  },
  {
    module: "Data & features",
    step: "03",
    goal: "See the container every recording flows through, then the auditable feature framework the SDK extracts.",
    essays: [
      { slug: "the-osmell-format", why: "The portable smell-recording container." },
      { slug: "the-187-dimension-framework", why: "187 explained dimensions, one by one." },
    ],
  },
  {
    module: "Discipline",
    step: "04",
    goal: "Learn the walls: what a normalized reading does and does not mean, and how to evaluate a model honestly.",
    essays: [
      { slug: "interoperability-normalization-theorem", why: "What normalization can and cannot prove." },
      { slug: "evaluating-e-nose-models", why: "Score a model the way it will actually be used." },
    ],
  },
  {
    module: "Evidence",
    step: "05",
    goal: "See what the stack actually does on real data, through one shared evaluation protocol.",
    essays: [
      { slug: "the-u-suite-use-cases", why: "Six evaluations, one shared protocol." },
    ],
  },
]

export default function AcademyPage() {
  const [activeFilter, setActiveFilter] = useState("All")

  const visible = useMemo(
    () => (activeFilter === "All" ? articles : articles.filter((a) => a.category === activeFilter)),
    [activeFilter]
  )

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

        <section className="border-t border-border py-16 bg-grid">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="hex-icon text-muted-foreground" />
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Read the Academy in order</h2>
              <span className="hex-icon text-muted-foreground" />
            </div>
            <p className="text-center text-sm text-muted-foreground mb-10 max-w-2xl mx-auto">
              A modular path that builds from first principles. Each module lists its
              essays in reading order — follow a module, or jump to any essay below.
            </p>
            <div className="grid grid-cols-1 gap-px bg-border">
              {curriculum.map((m) => (
                <div key={m.module} className="bg-background p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8">
                    <div className="shrink-0">
                      <span className="text-muted-foreground opacity-50 font-mono text-xs">{m.step}</span>
                      <h3 className="text-lg font-semibold mt-1">{m.module}</h3>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground leading-relaxed mb-4">{m.goal}</p>
                      <ol className="flex flex-col gap-1">
                        {m.essays.map((e, i) => {
                          const art = getArticle(e.slug)
                          if (!art) return null
                          return (
                            <li key={e.slug}>
                              <Link
                                href={`/academy/${e.slug}`}
                                className="group flex items-baseline gap-3 px-3 py-2 hover:bg-foreground hover:text-background transition-colors no-underline"
                              >
                                <span className="font-mono text-[10px] text-muted-foreground group-hover:text-background/60 shrink-0">
                                  {m.step}.{i + 1}
                                </span>
                                <span className="min-w-0">
                                  <span className="block text-sm font-medium truncate">
                                    {art.title}
                                    <span className="ml-2 text-[10px] uppercase tracking-wider text-muted-foreground group-hover:text-background/60">
                                      {art.readTime}
                                    </span>
                                  </span>
                                  <span className="block text-xs text-muted-foreground group-hover:text-background/70 leading-relaxed">
                                    {e.why}
                                  </span>
                                </span>
                              </Link>
                            </li>
                          )
                        })}
                      </ol>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-muted-foreground mt-6 max-w-xl mx-auto">
              This sequence mirrors the project's own onboarding order. All 21 essays are
              written for newcomers; nothing assumes prior knowledge.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">All essays</span>
              <span className="h-px flex-1 bg-border" />
            </div>
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

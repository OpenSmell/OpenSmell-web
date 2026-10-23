"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Cpu,
  Database,
  ExternalLink,
  FileText,
  Search,
  ShieldCheck,
} from "lucide-react"

import atlasData from "../public/atlas/atlas.json"

type Evidence = "A" | "B" | "C" | "D"
type RecordType = "dataset" | "paper" | "hardware"

interface AtlasRecord {
  id: string
  type: RecordType
  title: string
  summary: string
  year: number
  evidence: Evidence
  access: string
  license: string
  url: string
  doi: string | null
  modality: string[]
  sensors: string[]
  channels: number | null
  classes: number | null
  records: number | null
  units: number | null
  sessions: number | null
  sampling: string
  claims: string[]
  limits: string[]
  useFor: string[]
  tags: string[]
  lastVerified: string
}

interface Atlas {
  updated: string
  evidenceGrades: Record<Evidence, string>
  coverage: { started: string; scope: string; knownGaps: string[] }
  records: AtlasRecord[]
}

const atlas = atlasData as Atlas

const TYPE_META: Record<RecordType, { label: string; icon: typeof Database }> = {
  dataset: { label: "Dataset", icon: Database },
  paper: { label: "Paper", icon: FileText },
  hardware: { label: "Hardware", icon: Cpu },
}

const EVIDENCE_STYLE: Record<Evidence, string> = {
  A: "border-foreground bg-foreground text-background",
  B: "border-foreground/40 text-foreground",
  C: "border-border text-muted-foreground",
  D: "border-border text-muted-foreground",
}

function Stat({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="bg-background p-5">
      <div className="text-[10px] uppercase tracking-wider font-mono text-muted-foreground mb-2">{label}</div>
      <div className="text-3xl font-bold tracking-tight">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{note}</div>
    </div>
  )
}

function EvidenceBadge({ grade }: { grade: Evidence }) {
  return (
    <span
      title={atlas.evidenceGrades[grade]}
      className={`inline-flex items-center justify-center min-w-6 h-6 px-1.5 border text-[10px] font-mono font-bold ${EVIDENCE_STYLE[grade]}`}
    >
      {grade}
    </span>
  )
}

function AtlasCard({ record }: { record: AtlasRecord }) {
  const Icon = TYPE_META[record.type].icon
  const facts = [
    record.channels ? `${record.channels} ch` : null,
    record.classes ? `${record.classes} classes` : null,
    record.records ? `${record.records.toLocaleString()} records` : null,
    record.units ? `${record.units} unit${record.units === 1 ? "" : "s"}` : null,
    record.sessions ? `${record.sessions} sessions` : null,
  ].filter(Boolean)

  return (
    <article id={record.id} className="bg-background border border-border p-5 flex flex-col gap-4 scroll-mt-28">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 border border-border px-2 py-1 text-[10px] uppercase tracking-wider font-mono text-muted-foreground">
            <Icon className="w-3 h-3" />
            {TYPE_META[record.type].label}
          </span>
          <span className="text-[10px] uppercase tracking-wider font-mono text-muted-foreground">{record.year}</span>
          <span className="text-[10px] uppercase tracking-wider font-mono text-muted-foreground">{record.access}</span>
        </div>
        <EvidenceBadge grade={record.evidence} />
      </div>

      <div>
        <h3 className="text-lg font-semibold leading-tight">{record.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mt-2">{record.summary}</p>
      </div>

      <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-mono text-muted-foreground">
        <span>{record.modality.join(" + ")}</span>
        {facts.map((fact) => (
          <span key={fact}>{fact}</span>
        ))}
      </div>

      <details className="group border-t border-border pt-3">
        <summary className="cursor-pointer list-none text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
          What it supports, and what it does not
        </summary>
        <div className="mt-3 grid gap-3 text-xs leading-relaxed">
          <div>
            <div className="font-mono uppercase tracking-wider text-[10px] text-muted-foreground mb-1">Supports</div>
            <ul className="space-y-1 text-muted-foreground">
              {record.claims.map((claim) => (
                <li key={claim}>+ {claim}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-mono uppercase tracking-wider text-[10px] text-muted-foreground mb-1">Limits</div>
            <ul className="space-y-1 text-muted-foreground">
              {record.limits.map((limit) => (
                <li key={limit}>− {limit}</li>
              ))}
            </ul>
          </div>
        </div>
      </details>

      <div className="mt-auto pt-3 border-t border-border flex flex-wrap items-center gap-2">
        <a
          href={record.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium border border-foreground px-3 py-2 hover:bg-foreground hover:text-background transition-colors"
        >
          Open source <ExternalLink className="w-3 h-3" />
        </a>
        <span className="text-[10px] font-mono text-muted-foreground">{record.license}</span>
      </div>
    </article>
  )
}

export default function AtlasExplorer() {
  const [query, setQuery] = useState("")
  const [type, setType] = useState<"all" | RecordType>("all")
  const [evidence, setEvidence] = useState<"all" | Evidence>("all")

  const counts = useMemo(() => {
    return atlas.records.reduce(
      (acc, record) => {
        acc[record.type] += 1
        return acc
      },
      { dataset: 0, paper: 0, hardware: 0 } as Record<RecordType, number>,
    )
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return atlas.records
      .filter((record) => type === "all" || record.type === type)
      .filter((record) => evidence === "all" || record.evidence === evidence)
      .filter((record) => {
        if (!q) return true
        return [
          record.title,
          record.summary,
          record.modality.join(" "),
          record.sensors.join(" "),
          record.tags.join(" "),
          record.claims.join(" "),
        ]
          .join(" ")
          .toLowerCase()
          .includes(q)
      })
      .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title))
  }, [query, type, evidence])

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-20">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-6">
          <span className="inline-flex items-center gap-1.5 border border-border px-2 py-1 uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            Evidence map
          </span>
          <span className="font-mono">opensmell.olfaction-atlas/1</span>
          <span className="font-mono">updated {atlas.updated}</span>
        </div>

        <div className="max-w-3xl mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 leading-[0.95]">
            The Olfaction
            <br />
            <span className="text-muted-foreground">Atlas.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-4 leading-relaxed">
            The builders, datasets, papers, hardware, and claims behind real e-nose work. Each record names
            its evidence grade, what it can support, and what it refuses to claim.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This is a curated evidence graph, not a scraped directory or a leaderboard. A grade is a description
            of the record, not an endorsement of the product built on it.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-10">
          <Link href="/vials" className="hex-btn hex-btn-primary no-underline">
            Vials built on this evidence
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/docs/vials" className="hex-btn hex-btn-outline no-underline">
            How a Vial cites evidence
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border mb-10">
          <Stat label="Records" value={String(atlas.records.length)} note="curated, not bulk-scraped" />
          <Stat label="Datasets" value={String(counts.dataset)} note="raw, processed, and mixed" />
          <Stat label="Papers" value={String(counts.paper)} note="claims checked against the source" />
          <Stat label="Hardware" value={String(counts.hardware)} note="what the signal comes from" />
        </div>

        <div className="border border-border p-4 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {(["all", "dataset", "paper", "hardware"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setType(value)}
                  className={`px-3 py-2 text-xs font-medium border transition-colors ${
                    type === value
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {value === "all" ? "All records" : TYPE_META[value].label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <label className="text-[10px] uppercase tracking-wider font-mono text-muted-foreground" htmlFor="evidence">
                Evidence
              </label>
              <select
                id="evidence"
                value={evidence}
                onChange={(event) => setEvidence(event.target.value as "all" | Evidence)}
                className="bg-background border border-border px-2 py-2 text-xs"
              >
                <option value="all">All grades</option>
                <option value="A">A · replicated</option>
                <option value="B">B · held-out, one lab</option>
                <option value="C">C · processed / no code</option>
                <option value="D">D · paper or demo</option>
              </select>
            </div>
          </div>

          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search sensors, modalities, claims, tags…"
              className="w-full bg-background border border-border pl-10 pr-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-foreground"
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 mb-4">
          <p className="text-sm text-muted-foreground">
            <span className="text-foreground font-medium">{filtered.length}</span> record
            {filtered.length === 1 ? "" : "s"} shown
          </p>
          <p className="text-[10px] uppercase tracking-wider font-mono text-muted-foreground">
            {atlas.coverage.scope}
          </p>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((record) => (
              <AtlasCard key={record.id} record={record} />
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-border p-10 text-center">
            <p className="text-sm font-medium">No record matches that filter.</p>
            <p className="text-xs text-muted-foreground mt-2">
              The atlas is deliberately small. Try a broader search, or propose a record with a reproducible source.
            </p>
          </div>
        )}

        <section className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-px bg-border">
          <div className="bg-background p-6">
            <h2 className="text-lg font-semibold mb-3">Evidence grades</h2>
            <div className="space-y-3">
              {(Object.keys(atlas.evidenceGrades) as Evidence[]).map((grade) => (
                <div key={grade} className="flex gap-3 text-sm">
                  <EvidenceBadge grade={grade} />
                  <p className="text-muted-foreground leading-relaxed">{atlas.evidenceGrades[grade]}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-background p-6">
            <h2 className="text-lg font-semibold mb-3">Known gaps</h2>
            <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
              {atlas.coverage.knownGaps.map((gap) => (
                <li key={gap}>· {gap}</li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground mt-4">
              Records are checked against the source before they are added. A missing record is a gap, not a
              claim that nothing exists.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

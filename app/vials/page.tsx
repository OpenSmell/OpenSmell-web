"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  FileJson,
  FlaskConical,
  Github,
  ShieldAlert,
  Terminal,
} from "lucide-react"

import registry from "../../public/vials/registry.json"

interface RegistryVial {
  id: string
  name: string
  version: string
  author: string
  license: string
  domain: string
  tagline: string
  summary: string
  hasUi?: boolean
  evidence?: "A" | "B" | "C" | "D"
  atlasRefs?: string[]
  /** sha256 hex of the manifest file at manifestUrl — the app refuses a mismatch. */
  hash?: string
  manifestUrl: string | null
  sourceUrl: string | null
  install: string
}

function CopyUrl({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 border border-foreground px-3 py-2 text-xs font-medium hover:bg-foreground hover:text-background transition-colors"
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? "Copied" : "Copy manifest URL"}
    </button>
  )
}

function VialCard({ vial }: { vial: RegistryVial }) {
  return (
    <article className="bg-background border border-border p-5 sm:p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-[10px] uppercase tracking-wider font-mono text-muted-foreground border border-border px-2 py-0.5">
              {vial.hasUi ? "sandboxed UI" : "manifest"}
            </span>
            <span className="text-[10px] uppercase tracking-wider font-mono text-muted-foreground">
              v{vial.version}
            </span>
            {vial.evidence ? (
              <span
                className="text-[10px] uppercase tracking-wider font-mono border border-foreground px-2 py-0.5"
                title={`Underlying evidence grade ${vial.evidence}`}
              >
                evidence {vial.evidence}
              </span>
            ) : null}
          </div>
          <h3 className="text-lg font-semibold leading-tight">{vial.name}</h3>
          <p className="text-xs text-muted-foreground mt-1 font-mono">
            {vial.author} · {vial.domain} · {vial.license}
          </p>
        </div>
        <FlaskConical className="w-5 h-5 text-muted-foreground shrink-0 mt-1" />
      </div>

      <p className="text-sm font-medium">{vial.tagline}</p>
      <p className="text-sm text-muted-foreground leading-relaxed">{vial.summary}</p>

      <div className="mt-auto pt-3 border-t border-border flex flex-wrap items-center gap-2">
        {vial.manifestUrl ? (
          <>
            <CopyUrl url={vial.manifestUrl} />
            <span className="text-xs text-muted-foreground">{vial.install}</span>
          </>
        ) : (
          <span className="text-xs text-muted-foreground">{vial.install}</span>
        )}
        {vial.hash ? (
          <span
            className="text-xs font-mono text-muted-foreground"
            title="sha256 of the manifest — the desktop app refuses an install whose manifest does not match this hash"
          >
            sha256 {vial.hash.slice(0, 12)}…
          </span>
        ) : null}
        {vial.atlasRefs?.length ? (
          <Link
            href={`/atlas#${vial.atlasRefs[0]}`}
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Evidence <ArrowRight className="w-3 h-3" />
          </Link>
        ) : null}
        {vial.sourceUrl ? (
          <a
            href={vial.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors ml-auto"
          >
            Source <ExternalLink className="w-3 h-3" />
          </a>
        ) : null}
      </div>
    </article>
  )
}

export default function VialsPage() {
  const vials = registry.vials as RegistryVial[]
  const withUi = useMemo(() => vials.filter((v) => v.hasUi), [vials])

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-20">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
          <span className="inline-flex items-center gap-1.5 border border-border px-2 py-1 uppercase tracking-wider">
            <FlaskConical className="w-3.5 h-3.5" />
            The Aromatory
          </span>
          <span className="font-mono">osmograph.vial-registry/1</span>
        </div>

        <div className="max-w-3xl mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 leading-[0.95]">
            Vials for
            <br />
            <span className="text-muted-foreground">Osmograph.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-6 leading-relaxed">
            A Vial is a small, inspectable workspace: a protocol, a log, stop rules, field notes, a
            Home contribution, and the claim it refuses to make. Every Vial is an author-hosted
            project. It may stay declarative, or ship a sandboxed UI with no network, storage, or
            Tauri access.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#install" className="hex-btn hex-btn-primary no-underline">
              Install from a URL
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link href="/docs/vials" className="hex-btn hex-btn-outline no-underline">
              Authoring guide
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/atlas" className="hex-btn hex-btn-outline no-underline">
              Browse the evidence
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border mb-14">
          {[
            { label: "Listed", value: String(vials.length), note: "author-hosted projects" },
            { label: "Sandboxed UI", value: String(withUi.length), note: "runs in an iframe" },
            { label: "Registry", value: "index", note: "it does not host the Vial" },
          ].map((stat) => (
            <div key={stat.label} className="bg-background p-5">
              <div className="text-[10px] uppercase tracking-wider font-mono text-muted-foreground mb-2">
                {stat.label}
              </div>
              <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.note}</div>
            </div>
          ))}
        </div>

        <div className="flex items-start gap-3 border border-border p-4 mb-10">
          <ShieldAlert className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="text-foreground font-medium">The registry is a discovery page, not a trust seal.</span>{" "}
            Every manifest still runs through Osmograph&apos;s local policy gate on import. A pass is necessary,
            not sufficient: it is not a security audit, a domain review, or a safety certification.
          </p>
        </div>

        <section className="mb-14" id="install">
          <div className="flex items-end justify-between gap-4 mb-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Listed Vials</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Every entry points at the author&apos;s own repository. Install from the raw manifest URL.
              </p>
            </div>
            <span className="text-[10px] uppercase tracking-wider font-mono text-muted-foreground">
              {vials.length} listed
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
            {vials.map((vial) => (
              <VialCard key={vial.id} vial={vial} />
            ))}
            <article className="bg-background border border-dashed border-border p-5 sm:p-6 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <FileJson className="w-5 h-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold">Your Vial here</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Put a <code className="font-mono text-xs">vial.json</code> and, if you need them, a{" "}
                <code className="font-mono text-xs">ui.html</code> and{" "}
                <code className="font-mono text-xs">home.html</code> in your personal GitHub repo. You do
                not need a new registry repo, an npm package, or a build step.
              </p>
              <a
                href="/docs/vials"
                className="inline-flex items-center gap-2 text-xs font-medium border border-foreground px-3 py-2 hover:bg-foreground hover:text-background transition-colors mt-auto w-fit"
              >
                Start from the scaffold <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </article>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-px bg-border">
            <div className="bg-background p-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                Install a manifest
              </h3>
              <ol className="space-y-3 text-sm text-muted-foreground leading-relaxed list-decimal pl-5">
                <li>
                  Get the raw URL of a <code className="font-mono text-xs">.vial.json</code> file. On GitHub, use
                  the <span className="text-foreground">Raw</span> link, not the page URL.
                </li>
                <li>
                  In Osmograph, open <span className="font-mono text-xs text-foreground">Vials → Aromatory</span> and
                  choose <span className="font-mono text-xs text-foreground">Install from URL</span>.
                </li>
                <li>
                  Paste the HTTPS URL. The app fetches the manifest, runs the local gate, fetches the
                  sandboxed <code className="font-mono text-xs">ui.html</code> and{" "}
                  <code className="font-mono text-xs">home.html</code> beside it when declared, and
                  shows the policy result before opening the workspace.
                </li>
              </ol>
              <div className="mt-4 border border-border bg-muted/30 p-3 font-mono text-xs break-all">
                https://raw.githubusercontent.com/&lt;you&gt;/&lt;repo&gt;/main/&lt;vial&gt;.vial.json
              </div>
            </div>
            <div className="bg-background p-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Github className="w-4 h-4" />
                Publish and list it
              </h3>
              <ol className="space-y-3 text-sm text-muted-foreground leading-relaxed list-decimal pl-5">
                <li>
                  Write <code className="font-mono text-xs">vial.json</code> and, if used,{" "}
                  <code className="font-mono text-xs">ui.html</code> and{" "}
                  <code className="font-mono text-xs">home.html</code> in your own repo. Keep the author,
                  licence, citations, and <code className="font-mono text-xs">whatItIsNot</code> honest.
                </li>
                <li>
                  Validate it locally with{" "}
                  <code className="font-mono text-xs text-foreground">npm run validate:vial -- my.vial.json</code>.
                </li>
                <li>
                  To appear on this page, open a PR that adds one entry to{" "}
                  <a
                    href="https://github.com/OpenSmell/opensmell-web/blob/main/public/vials/registry.json"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground underline underline-offset-4"
                  >
                    public/vials/registry.json
                  </a>
                  . Include the source URL and the manifest hash. The registry only indexes the
                  project; it does not host the files.
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section className="max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight mb-4">What this does not mean</h2>
          <div className="grid grid-cols-1 gap-px bg-border">
            {[
              ["Not a marketplace", "There is no hosted upload, account, payment, or automatic update. A listing points at a file you control."],
              ["Not a safety review", "The gate checks manifest shape and known overclaim language. It does not validate your domain, your rig, or your evidence."],
              ["Not a trust seal", "A listing points at a file you control. The local gate checks manifest shape and known overclaim language; it does not review your domain, your rig, your evidence, or your UI code."],
            ].map(([title, body]) => (
              <div key={title} className="bg-background p-5">
                <h3 className="font-semibold mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <div className="border border-foreground p-5 mt-4 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="min-w-0">
              <h3 className="font-semibold">Request a listing</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                Host the manifest yourself, then open a submission with the raw URL, source repo, licence,
                claim, refusal, and evidence. The registry is reviewed by hand. A listing is discovery,
                not endorsement.
              </p>
            </div>
            <a
              href="https://github.com/OpenSmell/opensmell-web/issues/new?template=vial-submission.yml"
              target="_blank"
              rel="noopener noreferrer"
              className="hex-btn hex-btn-primary no-underline sm:ml-auto shrink-0"
            >
              Submit a Vial <Github className="w-4 h-4" />
            </a>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            The manifest schema, widget vocabulary, policy gate, and URL-install limits are documented in{" "}
            <a
              href="https://github.com/OpenSmell/osmograph-desktop/blob/master/AUTHORING.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4"
            >
              AUTHORING.md
            </a>
            . Read it before you ship a pack that makes a claim.
          </p>
        </section>
      </div>
    </div>
  )
}

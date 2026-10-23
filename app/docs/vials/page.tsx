import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, FlaskConical, Globe2, Terminal } from "lucide-react"

import { Callout, Code, CodeBlock, H2, H3, P, Table, Ul } from "@/components/docs/DocBlocks"

export const metadata: Metadata = {
  title: "Author a Vial — OpenSmell",
  description:
    "Scaffold, validate, install, and publish an Osmograph Vial: the manifest contract, the host snapshot, the Home contribution, the policy gate, and the evidence rules.",
  alternates: { canonical: "/docs/vials" },
}

export default function VialDocsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-20">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-6">
          <span className="inline-flex items-center gap-1.5 border border-border px-2 py-1 uppercase tracking-wider">
            <FlaskConical className="w-3.5 h-3.5" />
            Vials
          </span>
          <span className="font-mono">osmograph.domain-pack/1</span>
          <span className="font-mono">osmograph.vial-host/1</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 leading-[0.95]">
          Author a
          <br />
          <span className="text-muted-foreground">Vial.</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-6 leading-relaxed">
          A Vial is a small, inspectable workspace: one process, one protocol, a local log, stop
          rules, a Home contribution, and the claim it refuses to make. Stage 1 is host-rendered
          data. No third-party JavaScript runs in Osmograph.
        </p>

        <div className="flex flex-wrap gap-3 mb-10">
          <Link href="/atlas" className="hex-btn hex-btn-outline no-underline">
            Browse the evidence <Globe2 className="w-4 h-4" />
          </Link>
          <Link href="/vials" className="hex-btn hex-btn-primary no-underline">
            See the Aromatory <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <Callout kind="note">
          The policy gate is a local, heuristic check. A pass is necessary, not sufficient. It is
          not a security audit, a domain review, or a safety certification.
        </Callout>

        <H2 id="quickstart">Quick start</H2>
        <P>
          Scaffold a project from the desktop repository. The generator writes a complete manifest,
          an empty host-snapshot fixture, and a README that states the claim and the refusal.
        </P>
        <CodeBlock title="terminal">{`cd osmograph-desktop
npm run scaffold:vial -- ./my-vial "Coffee Roast Log" "@your-handle"
npm run validate:vial -- ./my-vial`}</CodeBlock>
        <P>
          Edit <Code>vial.json</Code>, run the validator again, then import the file in{" "}
          <strong className="text-foreground">Vials → Aromatory → Import .vial.json</strong>. The
          same manifest can be hosted from your own GitHub and installed by raw HTTPS URL.
        </P>

        <H2 id="contract">What the host gives a Vial</H2>
        <P>
          The host owns sampling, baseline health, the anomaly detector, the classifier, and every
          safety gate. A Vial receives a small typed snapshot and returns a bounded Home card. It
          never receives raw buffers, never owns the detector, and cannot override a host refusal.
        </P>
        <Table
          head={["Field", "What it means", "What a Vial may do with it"]}
          rows={[
            [
              <Code key="source">source</Code>,
              "live, replay, dataset, or none",
              "Choose the right copy and empty state. Do not pretend a replay is live.",
            ],
            [
              <Code key="baseline">baseline</Code>,
              "none, warming, ready, or stale, plus progress",
              "Explain warm-up. Never alarm before the host says the baseline is ready.",
            ],
            [
              <Code key="anomaly">anomaly</Code>,
              "unknown, normal, warning, or critical, with score and triggered channels",
              "Render the host state and the next human action. Do not re-identify the gas.",
            ],
            [
              <Code key="health">channels[].health</Code>,
              "ok, stuck, saturated, noisy, or unknown",
              "Refuse a comparison or prompt service only when the host agrees.",
            ],
            [
              <Code key="classifier">classifier</Code>,
              "none or loaded, with a closed-set label and confidence",
              "Show the closed-set result. Do not turn it into an open-set identity.",
            ],
            [
              <Code key="environment">environment</Code>,
              "temperature and humidity, or null",
              "Use it as context. Do not silently attribute a change to the smell.",
            ],
          ]}
        />
        <P>
          The current snapshot contract lives in{" "}
          <Code>osmograph-desktop/src/vialHost.ts</Code>. It is deliberately smaller than the raw
          feature vector. A Vial must not depend on a column index or on all 187 SDK features being
          present.
        </P>

        <H2 id="home">The Home contribution</H2>
        <P>
          A Vial can add one compact card to Home. The author declares the headline, the detail,
          at most four metrics, one to three actions, at least one limit, and at least one source.
          The host merges that with live state.
        </P>
        <CodeBlock title="vial.json — home">{`"home": {
  "headline": "Arm one clean baseline. Watch for one sustained change.",
  "detail": "The host anomaly engine runs here, on this array. This Vial adds the protocol and the refusal.",
  "metrics": [
    { "label": "Scope", "value": "same device" },
    { "label": "Evidence", "value": "TADI-2019" }
  ],
  "actions": [
    { "id": "workspace", "label": "Open change watch", "kind": "open-workspace" },
    { "id": "datasets", "label": "Get a real corpus", "kind": "open-datasets" }
  ],
  "limits": [
    "A change signal is not an identity, a concentration, or a safety verdict."
  ],
  "sources": [
    "TADI-2019, doi:10.5281/zenodo.8399829"
  ]
}`}</CodeBlock>
        <Ul
          items={[
            <>
              Actions are host verbs: <Code>open-workspace</Code>, <Code>open-check</Code>,{" "}
              <Code>open-datasets</Code>, <Code>open-gallery</Code>, or <Code>external</Code>.
            </>,
            "External actions require an https URL. The declarative Home card has no scripts; for a custom view, declare homeUi below.",
            "The host validates the Home shape at import and refuses a malformed contribution instead of rendering half of it.",
            "If a Vial has no Home contribution, it remains workspace-only. That is valid.",
          ]}
        />

        <P>
          A Vial can replace the declarative card with a sandboxed Home view. The view gets the same
          typed payload as the workspace, with <Code>view: &quot;home&quot;</Code>, and the same small action
          allowlist. It is a status surface, not a second source of truth: protocol fields, logs,
          baselines, and decisions still belong to the host.
        </P>
        <CodeBlock title="vial.json — homeUi">{`"homeUi": {
  "runtime": "sandbox/1",
  "entry": "home.html",
  "height": 420
}`}</CodeBlock>
        <Ul
          items={[
            "The Home fragment uses the same CSP and sandbox as ui.html: no network, storage, forms, frames, workers, or Tauri.",
            "Home height is 320–620 px; the workspace height is 420–2000 px. The view can request a different height with resize.",
            "The open-workspace action leaves Home and opens this Vial's full workspace.",
            "The host caches the workspace and Home assets separately, by Vial id and version.",
          ]}
        />

        <H2 id="evidence">Evidence and claims</H2>
        <P>
          A Vial is not a paper and a citation is not a validation. Link the evidence you actually
          rely on, state its grade, and keep the refusal in the manifest.
        </P>
        <Table
          head={["Do", "Do not"]}
          rows={[
            ["Link a dataset, paper, protocol, or your own held-out result.", "Cite a press release as if it were a held-out validation."],
            ["Say “closed-set, same array” when that is the scope.", "Say “identifies” or “detects” without a scope and a refusal."],
            ["State the primary measurement that decides the real action.", "Let a change signal become a safety verdict."],
            ["Keep the Home limits short and visible.", "Hide the limits in a collapsed footnote."],
          ]}
        />
        <P>
          The <Link href="/atlas" className="underline hover:text-foreground">Olfaction Atlas</Link>{" "}
          records evidence grades, coverage, and known gaps. A Vial can point at an Atlas record,
          but the Atlas does not certify the Vial.
        </P>

        <H2 id="publish">Publish without a new registry</H2>
        <P>
          Put <Code>vial.json</Code> and, if you need them, <Code>ui.html</Code> and{" "}
          <Code>home.html</Code> in any repository you control and use the raw manifest URL.
          Osmograph fetches the manifest over HTTPS, runs the same local gate as a file import, and
          fetches the declared UI assets beside it.
        </P>
        <CodeBlock title="raw manifest URL">{`https://raw.githubusercontent.com/<you>/<repo>/main/vial.json`}</CodeBlock>
        <P>
          To request a public listing, open the{" "}
          <a
            href="https://github.com/OpenSmell/opensmell-web/issues/new?template=vial-submission.yml"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            Vial submission form
          </a>
          . It asks for the raw manifest URL, source repo, licence, claim, refusal, evidence, and test
          notes. A listing is discovery, not endorsement. The registry is an index: it does not host
          the project, and there is no official namespace or reserved author handle.
        </P>

        <H2 id="ui">Any Vial can ship a sandboxed UI</H2>
        <P>
          A Vial may stay declarative, or add a <Code>ui.html</Code> and an optional{" "}
          <Code>home.html</Code> beside the manifest. Each UI is a body fragment in an iframe with{" "}
          <Code>sandbox=&quot;allow-scripts&quot;</Code> and a fixed CSP. It gets a typed payload, not raw
          buffers, and can only request a small action allowlist. It cannot reach the network,
          storage, forms, frames, workers, or Tauri.
        </P>
        <CodeBlock title="manifest ui descriptor">{`"ui": {
  "runtime": "sandbox/1",
  "entry": "ui.html",
  "height": 900
}`}</CodeBlock>
        <P>
          The host caches the workspace UI by Vial id and the Home UI as <Code>&lt;id&gt;::home</Code>.
          If a UI fetch fails, it renders the declarative widgets or the <Code>home</Code> card. A
          manifest with a <Code>ui</Code> or <Code>homeUi</Code> block must be installed from its
          manifest URL; a local file import is refused because it cannot carry the assets. Signed
          bundles, revocation, and per-Vial permissions are the next trust layer; they are not
          implemented yet.
        </P>

        <H2 id="limits">What Stage 1 does not do</H2>
        <Ul
          items={[
            "The sandbox is the execution boundary, not a review. A sandboxed UI is not security-audited or endorsed.",
            "No signatures, revocation, automatic updates, or hosted account service yet.",
            "No local filesystem Vials directory; installed manifests and logs live in local storage.",
            "No automatic transfer of a baseline, calibration, or evidence across rigs.",
          ]}
        />
        <Callout kind="warn">
          Do not describe a sandboxed UI as a general-purpose plugin. It is a body fragment with no
          host access: no network, storage, forms, frames, workers, or Tauri, and only a small action
          allowlist. Signed bundles and per-Vial permissions are a separate, reviewed contract.
        </Callout>

        <div className="border border-border p-6 mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
          <Terminal className="w-5 h-5 text-muted-foreground shrink-0" />
          <div className="min-w-0">
            <h2 className="font-semibold">Start from an author-hosted project</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Fermentation Lab is the reference for a real domain protocol, a sandboxed Home
              view, and a documented evidence path. It lives in its author's repo, not this
              site. Use this guide to build yours, then publish it from your own repository.
            </p>
          </div>
          <Link href="/vials" className="hex-btn hex-btn-primary no-underline sm:ml-auto shrink-0">
            Open Aromatory <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

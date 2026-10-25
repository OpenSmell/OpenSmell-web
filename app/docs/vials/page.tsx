import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Boxes, Code2, FileCheck2, FlaskConical, Gauge, Play, ShieldCheck } from "lucide-react"

import { Callout, Code, CodeBlock, H2, H3, P, Table, Ul } from "@/components/docs/DocBlocks"
import { VialNav } from "@/components/docs/VialNav"

export const metadata: Metadata = {
  title: "Vials — programmable anomaly apps — OpenSmell",
  description:
    "A Vial is a programmable anomaly app: a declared profile program, a sandboxed domain UI, and held-out evidence. Learn the contract, build one, test it, and operate it.",
  alternates: { canonical: "/docs/vials" },
}

const tutorials = [
  {
    icon: Play,
    title: "Quickstart",
    href: "/docs/vials/quickstart",
    desc: "Scaffold, fill the profile, write a fixture, run the gate, publish, and install.",
  },
  {
    icon: Gauge,
    title: "The profile program",
    href: "/docs/vials/profile",
    desc: "Baseline, transforms, persistence, hysteresis, escalation, admissibility, and the false-alarm budget.",
  },
  {
    icon: Code2,
    title: "The domain UI",
    href: "/docs/vials/ui",
    desc: "The sandboxed iframe, the typed host snapshot, the action set, and the presentation laws.",
  },
  {
    icon: FileCheck2,
    title: "Evidence and fixtures",
    href: "/docs/vials/evidence",
    desc: "Held-out reports, fixture format, what `noses test` proves, and what review actually checks.",
  },
  {
    icon: ShieldCheck,
    title: "Install and operate",
    href: "/docs/vials/operate",
    desc: "Hash-verified install, updates, per-Vial bug reports, offline behavior, and rollback.",
  },
  {
    icon: Boxes,
    title: "Reference",
    href: "/docs/vials/reference",
    desc: "Every schema field, bridge method, snapshot field, status, and command in one place.",
  },
]

export default function VialDocsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-20">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-6">
          <span className="inline-flex items-center gap-1.5 border border-border px-2 py-1 uppercase tracking-wider">
            <FlaskConical className="w-3.5 h-3.5" />
            Vials
          </span>
          <span className="font-mono">osmograph.domain-pack/2</span>
          <span className="font-mono">osmograph.vial-host/1</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          A Vial is a programmable anomaly app.
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
          It has three parts that ship together: a <b className="text-foreground">profile program</b>{" "}
          that declares what counts as a relevant change on one array and one process, a{" "}
          <b className="text-foreground">domain UI</b> that turns that change into a decision surface,
          and <b className="text-foreground">evidence</b> that shows the program works on held-out
          data. The host runs the detector and owns every safety refusal. The Vial programs the
          interpretation, the presentation, and the limits.
        </p>

        <VialNav />

        <div className="border border-border p-5 my-8 bg-muted/20">
          <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
            The definition in one sentence
          </div>
          <p className="text-sm leading-relaxed">
            A Vial is a versioned, hash-pinned program for one repeated decision: its manifest
            declares the baseline, transforms, detection thresholds, persistence, hysteresis,
            escalation, admissibility, and evidence; its sandboxed UI renders the host snapshot; its
            fixtures and held-out report show the declared behaviour is real.
          </p>
        </div>

        <H2 id="why">Why this is programmable</H2>
        <P>
          The program is the part that changes what the instrument does. When a Vial is open, the host
          compiles its profile into a detector owned by that Vial. Two Vials can watch the same array
          at the same time with different warm-up windows, persistence, hysteresis, and escalation.
          Neither can change the other, and neither can raise the base app&apos;s alert level. A folder
          of text and a screen can describe a workflow; the profile is what makes the workflow run.
        </P>
        <Table
          head={["Layer", "Owned by", "What it decides"]}
          rows={[
            [
              "Profile program",
              "The Vial manifest",
              <>
                Baseline protocol and warm-up, response transform, per-channel limits, minimum
                channel corroboration, level budget, persistence, hysteresis, escalation, reset, and
                the false-alarm target.
              </>,
            ],
            [
              "Domain UI",
              "The Vial's sandboxed <Code>ui.html</Code>",
              <>
                What the user sees and can do: context fields, checks, logs, diagrams, stop rules,
                and a Home contribution. It receives typed host state and returns bounded actions.
              </>,
            ],
            [
              "Runtime",
              "Osmograph",
              <>
                Sampling, baseline health, Kalman detection, sensor faults, the sandbox, hashing,
                schema validation, and every safety refusal.
              </>,
            ],
            [
              "Evidence",
              "The author, checked at review",
              <>
                Held-out report, dataset provenance, measured FAR/latency/MDE, and fixture cases
                that <Code>noses test</Code> replays against the profile state machine.
              </>,
            ],
          ]}
        />

        <H2 id="lifecycle">The lifecycle, end to end</H2>
        <CodeBlock title="author → list → install → operate">{`author writes vial.json + ui.html + fixtures/
        │
        ├─ noses lint     schema, profile, evidence, sandbox, placeholders
        ├─ noses test     runs fixtures against the declared profile
        └─ noses publish  manifest sha256 + every UI asset sha256 + registry entry
        │
        ▼
POST /api/vials/submit  →  GitHub issue with pinned hashes
        │
        ▼
/admin review  →  re-fetch, re-validate, refuse changed bytes  →  commit registry.json
        │
        ▼
Aromatory open  →  fetch manifest + assets  →  verify hashes  →  run the same host gate
        │
        ▼
install  →  per-Vial detector  →  domain UI  →  report a problem with id/version/hash
        │
        ▼
new version  →  registry pins it  →  “Update to vX” in the Aromatory  →  hash-verified replace`}</CodeBlock>

        <H2 id="tutorials">Tutorials</H2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
          {tutorials.map((tutorial) => (
            <Link
              key={tutorial.href}
              href={tutorial.href}
              className="border border-border p-4 hover:border-foreground transition-colors no-underline group"
            >
              <div className="flex items-center gap-2 text-sm font-semibold mb-1">
                <tutorial.icon className="w-4 h-4" />
                {tutorial.title}
                <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{tutorial.desc}</p>
            </Link>
          ))}
        </div>

        <H2 id="status">What a status means</H2>
        <Table
          head={["Status", "Where it comes from", "What it claims"]}
          rows={[
            [
              "Draft",
              "Local edit",
              "Not installed. The author is still writing the profile, UI, or evidence.",
            ],
            [
              "Ungated",
              <>
                Local gate failed (<Code>open</Code> in the registry)
              </>,
              "Installable for development. At least one critical check failed; the host says so and does not present it as validated.",
            ],
            [
              "Gated",
              "Local gate passed",
              "The manifest, profile, UI sandbox, citations, and evidence block satisfy the local contract; external review is a separate step.",
            ],
            [
              "Reviewed / listed",
              "Registry review",
              "A person reviewed the claim and evidence, and the registry pins the manifest, UI, and fixture hashes. The host still re-runs the gate and verifies the manifest and UI bytes on install.",
            ],
            [
              "Signed",
              "External signature",
              "An external signature, recorded separately. Signing is outside the local gate.",
            ],
          ]}
        />
        <Callout kind="honest">
          A listing records a human review of a claim. The host never lets a Vial override a sensor
          fault, a baseline refusal, or the base alert level. Every install re-verifies the bytes;
          nothing is trusted because it appeared in a catalog.
        </Callout>

        <H2 id="invariants">The invariants that make the system antifragile</H2>
        <Ul
          items={[
            <>
              <b className="text-foreground">One gate, two implementations, one fixture corpus.</b>{" "}
              The desktop and <Code>noses</Code> both gate manifests. A disagreement becomes a
              conformance fixture.
            </>,
            <>
              <b className="text-foreground">Every failure becomes a fixture.</b> A bug report that
              names a Vial id, version, and hash can be replayed. The fix adds a fixture; the fixture
              runs in <Code>noses test</Code> and in the release check.
            </>,
            <>
              <b className="text-foreground">No fake numbers.</b> The registry and UI refuse to
              invent a measurement. A Vial without a held-out report is Ungated, and a profile
              without a false-alarm target says so.
            </>,
            <>
              <b className="text-foreground">The program is pinned.</b> The registry pins the
              manifest sha256 and every UI asset sha256. An upstream edit cannot silently replace a
              reviewed Vial; the install refuses and the update path reports the mismatch.
            </>,
            <>
              <b className="text-foreground">The host owns the brakes.</b> A Vial can tighten its own
              profile; it cannot loosen the host&apos;s refusal, hide a sensor fault, or turn a
              warming baseline into an alarm.
            </>,
          ]}
        />

        <H2 id="start">Start here</H2>
        <P>
          If you have never built one, read the{" "}
          <Link href="/docs/vials/quickstart" className="underline">
            quickstart
          </Link>
          . If you already have a protocol, read the{" "}
          <Link href="/docs/vials/profile" className="underline">
            profile
          </Link>{" "}
          and{" "}
          <Link href="/docs/vials/evidence" className="underline">
            evidence
          </Link>{" "}
          chapters before you write a UI. The profile is the product; the UI is how a person uses it.
        </P>
        <div className="flex flex-wrap gap-3 mt-8">
          <Link href="/docs/vials/quickstart" className="hex-btn hex-btn-primary no-underline">
            Build your first Vial
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/appstore" className="hex-btn hex-btn-outline no-underline">
            Browse the Aromatory
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

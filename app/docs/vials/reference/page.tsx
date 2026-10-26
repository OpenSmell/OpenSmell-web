import type { Metadata } from "next"
import Link from "next/link"
import { FlaskConical } from "lucide-react"

import { Callout, Code, CodeBlock, H2, H3, P, Table, Ul } from "@/components/docs/DocBlocks"
import { VialNav } from "@/components/docs/VialNav"

export const metadata: Metadata = {
  title: "Vial reference — OpenSmell",
  description:
    "The complete Vial reference: manifest fields, anomaly profile fields, evidence and fixture schema, widgets, bridge methods, host snapshot, registry entries, statuses, and commands.",
  alternates: { canonical: "/docs/vials/reference" },
}

export default function VialReferencePage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-20">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-6">
          <span className="inline-flex items-center gap-1.5 border border-border px-2 py-1 uppercase tracking-wider">
            <FlaskConical className="w-3.5 h-3.5" />
            Vials / Reference
          </span>
          <span className="font-mono">osmograph.domain-pack/2</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Reference</h1>
        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
          Every field below is part of the contract the host and <Code>noses</Code> check. If a field is
          not here, it is not part of the Vial program.
        </p>

        <VialNav />

        <H2 id="manifest">Manifest v2</H2>
        <Table
          head={["Field", "Type", "Required", "Meaning"]}
          rows={[
            [<Code key="s">schema</Code>, <Code key="v">"osmograph.domain-pack/2"</Code>, "yes", "The v2 contract. `/1` remains installable as Ungated; new listings require v2."],
            [<Code key="i">id</Code>, "string", "yes", "`publisher.slug`, lowercase, permanent."],
            [<Code key="n">name</Code>, "string", "yes", "Human name."],
            [<Code key="v">version</Code>, "semver", "yes", "Bump on every byte change that ships."],
            [<Code key="mh">minHost</Code>, "semver?", "no", "Oldest host that renders this manifest without silent degradation."],
            [<Code key="a">author</Code>, "string", "yes", "Author handle or organisation."],
            [<Code key="l">license</Code>, "string", "yes", "SPDX identifier or a named licence."],
            [<Code key="r">risk</Code>, <Code key="v">low | medium | high | critical</Code>, "yes", "The risk class of the decision the Vial supports."],
            [<Code key="d">domain</Code>, "string", "yes", "The domain, for search and grouping."],
            [<Code key="t">tagline</Code>, "string", "yes", "One honest line."],
            [<Code key="sm">summary</Code>, "string", "yes", "The decision, context, and evidence in a paragraph."],
            [<Code key="sc">scope</Code>, "string", "yes", "The one repeated decision this Vial supports."],
            [<Code key="li">limits</Code>, "string[]", "yes", "The operating envelope and refusal conditions."],
            [<Code key="an">anomaly</Code>, "object", "yes", "The programmable profile. See below."],
            [<Code key="ev">evidence</Code>, "object", "yes for listing", "Held-out report, metrics, and fixtures."],
            [<Code key="ci">citations</Code>, "string[]", "yes", "Real references for the protocol or mechanism."],
            [<Code key="ui">ui</Code>, <Code key="v">{`{ runtime, entry, height }`}</Code>, "no", "Workspace UI descriptor; `runtime` must be `sandbox/1`."],
            [<Code key="hui">homeUi</Code>, "same", "no", "Compact Home UI descriptor."],
            [<Code key="ho">home</Code>, "object", "no", "Declarative Home card: headline, detail, metrics, actions, limits, sources."],
            [<Code key="w">widgets</Code>, "array", "yes", "Declarative fallback surface. See the widget table."],
            [<Code key="do">docs</Code>, "array", "yes", "At least two field-note sections."],
          ]}
        />

        <H2 id="anomaly">Anomaly profile</H2>
        <Table
          head={["Field", "Range", "Default", "Meaning"]}
          rows={[
            [<Code key="p">baseline.protocol</Code>, <Code key="v">first-n | session-mean</Code>, "first-n", "R0 selection for the UI response."],
            [<Code key="w">baseline.warmupS</Code>, "0.5–86400", "6", "Clean baseline seconds before the detector trusts a baseline."],
            [<Code key="r">baseline.r0WindowS</Code>, "0.5–3600", "10", "Seconds of early data used as R0."],
            [<Code key="c">transforms.conditioning</Code>, <Code key="v">["median3"]</Code>, "[]", "Three-sample median filter."],
            [<Code key="re">transforms.response</Code>, <Code key="v">delta-over-r0 | relative | delta</Code>, "delta-over-r0", "Response units for per-channel limits."],
            [<Code key="en">detection.enabled</Code>, "boolean", "true", "Compile the profile; false keeps it disarmed."],
            [<Code key="se">detection.sensitivity</Code>, "0.1–10", "1.0", "Engine operating point."],
            [<Code key="mc">detection.minChannels</Code>, "1–32", "1", "Minimum corroborating channels."],
            [<Code key="lb">detection.levelBudget</Code>, "0–12", "0", "Absolute level threshold in sigma; 0 disables."],
            [<Code key="lr">detection.levelRefS</Code>, "0–86400", "0", "Rolling level reference seconds; 0 uses the fixed baseline."],
            [<Code key="at">detection.alertThreshold</Code>, "0–1", "0.5", "Confidence floor for the Vial watch."],
            [<Code key="pc">detection.perChannelLimits</Code>, "record", "{}", "Channel id → response limit, above 0."],
            [<Code key="hy">detection.hysteresis</Code>, "0–0.95", "0", "Clear band as a fraction of the peak."],
            [<Code key="ws">detection.escalation.warningS</Code>, "0–86400", "0.2", "Persistence before warning."],
            [<Code key="cs">detection.escalation.criticalS</Code>, "warningS–86400", "0.5", "Persistence before critical."],
            [<Code key="es">detection.escalation.emergencyS</Code>, "criticalS–86400", "1.0", "Persistence before emergency."],
            [<Code key="rs">detection.escalation.resetNormalS</Code>, "0–86400", "2.0", "Continuous normal seconds before clearing."],
            [<Code key="fa">detection.farTargetPerMonth</Code>, "0–1e6 | null", "null", "The design target; measured numbers live in the evidence block."],
            [<Code key="rb">admissibility.requireBaseline</Code>, <Code key="v">ready | any</Code>, "ready", "Refuse to arm before the baseline is ready."],
            [<Code key="mco">admissibility.minCoverage</Code>, "0–1", "0.8", "Fraction of declared channels that must be live and non-dead."],
          ]}
        />

        <H2 id="evidence">Evidence</H2>
        <Table
          head={["Field", "Type", "Meaning"]}
          rows={[
            [<Code key="g">grade</Code>, <Code key="v">A | B | C | D</Code>, "Evidence strength. A strong paid listing needs A or B."],
            [<Code key="r">reportUrl</Code>, "HTTPS URL", "The held-out report."],
            [<Code key="m">measuredAt</Code>, "ISO date", "When the measurement was taken."],
            [<Code key="d">dataset</Code>, "string", "Corpus, rig, units, sessions, preparation."],
            [<Code key="me">metrics</Code>, "record", <><Code>farPerMonth</Code>, <Code>latencyS</Code>, <Code>mde</Code>, <Code>nSamples</Code>, <Code>nAlarms</Code>; at least one number.</>],
            [<Code key="f">fixtures</Code>, "array", <>{`{ id, file, expect }[]`}; file must be {`fixtures/<name>.json`}.</>],
          ]}
        />

        <H2 id="fixture">Fixture</H2>
        <Table
          head={["Field", "Type", "Meaning"]}
          rows={[
            [<Code key="s">schema</Code>, <Code key="v">osmograph.vial-fixture/1</Code>, "Fixture contract."],
            [<Code key="d">description</Code>, "string", "What the case is; say whether it is synthetic."],
            [<Code key="dt">dtS</Code>, "number", "Seconds per sample when `t` is omitted. Default 1."],
            [<Code key="sm">samples</Code>, "array", <>{`{ t?, channels: Record<channelId, number> }[]`}.</>],
            [<Code key="f">expected.final</Code>, "state", "`normal | warning | critical | emergency`."],
            [<Code key="a">expected.alerts</Code>, "array", <>{`{ t, level }[]`}; level 1/2/3.</>],
            [<Code key="t">expected.toleranceS</Code>, "number", "Timing tolerance; default one sample."],
          ]}
        />

        <H2 id="widgets">Declarative widgets</H2>
        <P>
          Widgets are the fallback surface when a Vial has no sandboxed UI, and the supporting surface
          around one. The host escapes every string; no widget inserts raw HTML.
        </P>
        <Table
          head={["Type", "Fields"]}
          rows={[
            [<Code key="h">hero</Code>, <Code key="v">{`{ art, title, subtitle, note }`}</Code>],
            [<Code key="r">risk</Code>, <Code key="v">{`{ level, headline, body, always[], never[] }`}</Code>],
            [<Code key="m">metrics</Code>, <Code key="v">{`{ title, items[{label,value,hint}] }`}</Code>],
            [<Code key="d">diagram</Code>, <Code key="v">{`{ art, title, caption, hotspots[] }`}</Code>],
            [<Code key="t">timeline</Code>, <Code key="v">{`{ title, steps[] }`}</Code>],
            [<Code key="tr">tracking</Code>, <Code key="v">{`{ title, description, fields[], logFields[], logLabel }`}</Code>],
            [<Code key="c">chart</Code>, <Code key="v">{`{ title, yLabel, logField, demo[], note }`}</Code>],
            [<Code key="de">detector</Code>, <Code key="v">{`{ title, intro, baseline, levels[], limits[], evidence }`}</Code>],
            [<Code key="ru">rules</Code>, <Code key="v">{`{ title, rules[{when,then,severity}] }`}</Code>],
            [<Code key="ch">checklist</Code>, <Code key="v">{`{ title, items[{id,label,detail}] }`}</Code>],
            [<Code key="do">docs</Code>, <Code key="v">{`{ title }`}</Code>],
            [<Code key="ri">rig</Code>, <Code key="v">{`{ title, body, cta }`}</Code>],
          ]}
        />
        <Callout kind="note">
          `chart.demo` is a declarative illustration, not live data. A chart that presents demo points
          as a measurement is a gate failure in review; the live UI must use the host snapshot.
        </Callout>

        <H2 id="bridge">Bridge</H2>
        <Table
          head={["Method", "Purpose"]}
          rows={[
            [<Code key="v">osmograph.version</Code>, <Code key="v">"sandbox/1"</Code>],
            [<Code key="o">osmograph.onData(fn)</Code>, "Subscribe to the host snapshot; returns an unsubscribe function."],
            [<Code key="a">osmograph.action(action)</Code>, "Send one bounded action. See the UI chapter."],
            [<Code key="r">osmograph.ready()</Code>, "Announce that the bridge is live."],
            [<Code key="t">osmograph.toast(message)</Code>, "Show a host toast."],
            [<Code key="td">osmograph.setDetection(config)</Code>, "Legacy only; refused for a v2 profile."],
            [<Code key="tt">osmograph.setTransforms(t)</Code>, "Legacy only; refused for a v2 profile."],
            [<Code key="tj">osmograph.setTrajectory(spec)</Code>, "Track fields at an interval; clamped to 1–600 s."],
          ]}
        />

        <H2 id="status">Statuses and provenance</H2>
        <Table
          head={["Status", "Source", "Meaning"]}
          rows={[
            ["draft", "Local", "Not installed."],
            ["open", "Local gate failed", "Shown as **Ungated**; installable for development."],
            ["gated", "Local gate passed with at least one fixture", "Satisfies the local contract; external review is a separate step."],
            ["reviewed / listed", "Registry approval", "A person reviewed the claim and evidence; hashes pinned."],
            ["signed", "External signature", "Recorded separately; signing is outside the local gate."],
          ]}
        />
        <P>
          The host stores the fetched manifest sha256 and the verified asset hashes on the installed
          pack. They are runtime provenance, not manifest fields, and are excluded from an exported
          manifest.
        </P>

        <H2 id="registry">Registry entry</H2>
        <CodeBlock title="public/vials/registry.json — one entry">{`{
  "schema": "osmograph.domain-pack/2",
  "id": "publisher.slug",
  "name": "…",
  "version": "0.1.0",
  "author": "@publisher",
  "license": "MIT",
  "domain": "…",
  "tagline": "…",
  "summary": "…",
  "hasUi": true,
  "evidence": "B",
  "manifestUrl": "https://raw.githubusercontent.com/…/main/vial.json",
  "sourceUrl": "https://github.com/…",
  "hash": "<manifest sha256>",
  "assets": {
    "ui.html": "<ui sha256>",
    "home.html": "<home ui sha256>"
  },
  "fixtures": {
    "fixtures/step.json": "<fixture sha256>"
  },
  "reviewedAt": "2026-10-25",
  "reviewedBy": "OpenSmell review",
  "install": "Install from the Aromatory…"
}`}</CodeBlock>
        <P>
          The registry is written by the review route, not by hand. A version bump is required for a
          changed manifest or UI; the same version with a different hash is refused.
        </P>

        <H2 id="commands">Commands</H2>
        <Table
          head={["Command", "What it does"]}
          rows={[
            [<Code key="n">noses new "Name" --publisher handle --domain domain</Code>, "Scaffold a v2 manifest, UI, README, and empty evidence block."],
            [<Code key="l">noses lint [path]</Code>, "Schema, profile ranges, evidence, citations, sandbox, placeholders."],
            [<Code key="t">noses test [path]</Code>, "Lint + fixtures against the profile state machine + bridge surface."],
            [<Code key="p">noses publish [path] --repo URL [--branch main]</Code>, "Print the manifest/asset hashes and the registry entry shape."],
            [<Code key="h">noses help</Code>, "Usage."],
          ]}
        />

        <H2 id="limits">Hard limits</H2>
        <Ul
          items={[
            "UI fragment: 512 KB maximum.",
            "Manifest download: 1.5 MB maximum.",
            "UI assets: 512 KB maximum each.",
            "Sandbox: no network, storage, forms, frames, workers, external assets, or Tauri.",
            "Trajectory: 1–600 s interval, last 600 points in the snapshot.",
            "Profile timers: wall-clock seconds, not samples.",
            "The host's base detector and alert level are never writable by a Vial.",
          ]}
        />

        <div className="flex flex-wrap gap-3 mt-8">
          <Link href="/docs/vials" className="hex-btn hex-btn-outline no-underline">
            Back to the overview
          </Link>
          <Link href="/docs/vials/quickstart" className="hex-btn hex-btn-outline no-underline">
            Build a Vial
          </Link>
        </div>
      </div>
    </div>
  )
}

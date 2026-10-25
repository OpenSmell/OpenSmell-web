import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, FlaskConical } from "lucide-react"

import { Callout, Code, CodeBlock, H2, H3, Ol, P, Table, Ul } from "@/components/docs/DocBlocks"
import { VialNav } from "@/components/docs/VialNav"

export const metadata: Metadata = {
  title: "Build your first Vial — OpenSmell",
  description:
    "A complete quickstart for a programmable Osmograph Vial: scaffold, profile, sandboxed UI, fixture, lint, test, publish, submit, and install.",
  alternates: { canonical: "/docs/vials/quickstart" },
}

export default function VialQuickstartPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-20">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-6">
          <span className="inline-flex items-center gap-1.5 border border-border px-2 py-1 uppercase tracking-wider">
            <FlaskConical className="w-3.5 h-3.5" />
            Vials / Quickstart
          </span>
          <span className="font-mono">osmograph.domain-pack/2</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          Build your first Vial
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
          This tutorial builds a small, honest Vial for one repeated decision. It starts with the
          profile, not the screen: the profile is the program, the UI is how a person uses it, and
          the fixture is the proof that the program does what the author says.
        </p>

        <VialNav />

        <Callout kind="note">
          The example values below are <b>synthetic</b>. They show the shape of a fixture, not a
          measured result. A listed Vial needs a real held-out report and real metrics; the registry
          review refuses placeholders and unchanged demo bytes.
        </Callout>

        <H2 id="install">1. Install the authoring tool</H2>
        <CodeBlock title="shell">{`git clone https://github.com/OpenSmell/opensmell-rs
cd opensmell-rs
cargo install --path . --bin noses
noses version`}</CodeBlock>
        <P>
          <Code>noses</Code> is the local authoring gate. It is not the runtime and it does not sign
          or upload anything. The desktop host re-runs the same contract when a user installs the
          Vial.
        </P>

        <H2 id="scaffold">2. Scaffold</H2>
        <CodeBlock title="shell">{`noses new "Fermentation Lab" --publisher yourname --domain fermentation
cd fermentation-lab`}</CodeBlock>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          The scaffold contains:
        </p>
        <Table
          head={["File", "Role"]}
          rows={[
            [<Code key="m">vial.json</Code>, "The manifest: identity, scope, limits, anomaly profile, evidence, widgets, and UI declaration."],
            [<Code key="u">ui.html</Code>, "A sandboxed body fragment. No network, storage, Tauri, forms, or external assets."],
            [<Code key="f">fixtures/</Code>, "Deterministic sample sequences with expected states. Add at least one."],
            [<Code key="r">README.md</Code>, "The authoring loop and the deliberate gaps the gate refuses."],
          ]}
        />
        <P>
          The scaffold is deliberately incomplete: citations are empty, the text carries{" "}
          <Code>REPLACE ME</Code> markers, and the evidence block has no report. <Code>noses lint</Code>{" "}
          refuses until you fill them. That is the point: a scaffold must never be publishable by
          accident.
        </P>

        <H2 id="identity">3. Write the identity and the scope</H2>
        <P>
          The id is permanent and globally unique: <Code>publisher.slug</Code>. The scope is the one
          repeated decision this Vial supports. The limits are the conditions where it refuses or
          where the user must stop. Keep both concrete and operational.
        </P>
        <CodeBlock title="vial.json — identity">{`{
  "schema": "osmograph.domain-pack/2",
  "id": "yourname.fermentation-lab",
  "name": "Fermentation Lab",
  "version": "0.1.0",
  "author": "@yourname",
  "license": "MIT",
  "risk": "medium",
  "domain": "fermentation",
  "tagline": "See the batch change before the taste does.",
  "summary": "A batch-scoped workspace that pairs a fermentation log with a profile for the change the array can actually resolve.",
  "scope": "Support one repeated decision: whether this batch has moved outside its own established baseline during the logged window.",
  "limits": [
    "Refuses to arm before the baseline is ready or when fewer than two declared channels are live and non-dead.",
    "The array does not identify a compound; a person confirms the cause with the primary measurement."
  ],
  "citations": [
    "Author, year, title, venue. A real reference for the protocol or the sensing mechanism."
  ]`}</CodeBlock>

        <H2 id="profile">4. Declare the profile program</H2>
        <P>
          The profile is the part that changes what the instrument does. Start from the process, not
          from a default: how long does a clean baseline take, what change matters, how long must it
          persist, and how quickly must it clear?
        </P>
        <CodeBlock title="vial.json — anomaly profile">{`{
  "anomaly": {
    "baseline": {
      "protocol": "first-n",
      "warmupS": 60,
      "r0WindowS": 10
    },
    "transforms": {
      "conditioning": ["median3"],
      "response": "delta-over-r0"
    },
    "detection": {
      "enabled": true,
      "sensitivity": 1.0,
      "minChannels": 2,
      "levelBudget": 0.0,
      "levelRefS": 0.0,
      "alertThreshold": 0.5,
      "perChannelLimits": {
        "ch1": 0.12,
        "ch2": 0.12
      },
      "hysteresis": 0.2,
      "escalation": {
        "warningS": 30,
        "criticalS": 120,
        "emergencyS": 300,
        "resetNormalS": 300
      },
      "farTargetPerMonth": 1.0
    },
    "admissibility": {
      "requireBaseline": "ready",
      "minCoverage": 0.8
    }
  }
}`}</CodeBlock>
        <Ul
          items={[
            <>
              <Code>warmupS</Code> is the clean baseline window. A slow process needs a longer one;
              shortening it to make the demo feel fast is how false alarms are born.
            </>,
            <>
              <Code>minChannels: 2</Code> demands corroboration. It cuts single-channel noise at the
              cost of missing a change that only one channel can see.
            </>,
            <>
              <Code>escalation.warningS: 30</Code> is the persistence lever: a 20-second spike does
              not become a warning.
            </>,
            <>
              <Code>hysteresis: 0.2</Code> means the signal must fall to 80% of the peak that raised
              the alarm before it can clear. This stops threshold chatter.
            </>,
          ]}
        />
        <P>
          The full field table and the false-alarm trade-offs are in{" "}
          <Link href="/docs/vials/profile" className="underline">
            the profile chapter
          </Link>
          .
        </P>

        <H2 id="fixture">5. Write a fixture</H2>
        <P>
          A fixture is a deterministic sample sequence and the states it must reach. It is how the
          author proves the declared persistence, hysteresis, and escalation on a desk, without a
          rig. Add at least one and reference it from the evidence block.
        </P>
        <CodeBlock title="fixtures/step.json — synthetic shape">{`{
  "schema": "osmograph.vial-fixture/1",
  "description": "Synthetic step: baseline at 1.00, then 1.20 on both channels.",
  "dtS": 1.0,
  "samples": [
    { "t": 0, "channels": { "ch1": 1.00, "ch2": 1.00 } },
    { "t": 1, "channels": { "ch1": 1.00, "ch2": 1.00 } },
    { "t": 2, "channels": { "ch1": 1.00, "ch2": 1.00 } },
    { "t": 3, "channels": { "ch1": 1.20, "ch2": 1.20 } },
    { "t": 4, "channels": { "ch1": 1.20, "ch2": 1.20 } },
    { "t": 5, "channels": { "ch1": 1.20, "ch2": 1.20 } }
  ],
  "expected": {
    "final": "warning",
    "alerts": [{ "t": 3, "level": 1 }],
    "toleranceS": 1.0
  }
}`}</CodeBlock>
        <CodeBlock title="vial.json — evidence">{`{
  "evidence": {
    "grade": "B",
    "reportUrl": "https://raw.githubusercontent.com/yourname/fermentation-lab/main/EVIDENCE.md",
    "measuredAt": "2026-10-25",
    "dataset": "Held-out batch on the six-channel rig, one preparation, two sessions.",
    "metrics": {
      "farPerMonth": 0.5,
      "latencyS": 42,
      "mde": 0.12,
      "nSamples": 1800,
      "nAlarms": 6
    },
    "fixtures": [
      { "id": "step", "file": "fixtures/step.json", "expect": "warning" }
    ]
  }
}`}</CodeBlock>
        <Callout kind="warn">
          Those metrics are placeholders for the tutorial. Replace them with the numbers in your
          held-out report. The review checks the report, the exposure time, and the fixture; it does
          not infer a measurement from an empty block.
        </Callout>

        <H2 id="ui">6. Make the UI a decision surface</H2>
        <P>
          A Vial UI receives a typed payload and returns bounded actions. The payload carries the
          host snapshot, a downsampled series, the available sources, the host change log, and the
          Vial&apos;s local state. It does not read raw buffers and it cannot change the detector.
          Start with the host truth: baseline state, anomaly state, the channels that triggered, and
          the channel health.
        </P>
        <CodeBlock title="ui.html — minimal dashboard">{`<style>
  body { margin: 0; padding: 16px; color: #1a1a17; background: #fbf8f2; font: 13px/1.5 ui-monospace, monospace; }
  p { border-bottom: 1px solid #d8d4ca; padding: 8px 0; margin: 0; }
  button { font: inherit; border: 1px solid #1a1a17; border-radius: 0; background: transparent; padding: 4px 8px; }
</style>
<main>
  <p id="baseline">Baseline: waiting for the host…</p>
  <p id="state">State: unknown</p>
  <p id="channels">Channels: —</p>
  <button id="log">Log this reading</button>
</main>
<script>
      const baseline = document.getElementById("baseline");
      const state = document.getElementById("state");
      const channels = document.getElementById("channels");

      osmograph.onData((payload) => {
        const snapshot = payload.snapshot;
        baseline.textContent =
          snapshot.baseline.state === "ready"
            ? "Baseline: ready"
            : "Baseline: " + snapshot.baseline.state +
              " (" + Math.round(snapshot.baseline.progress * 100) + "%)";
        state.textContent =
          "State: " + snapshot.anomaly.state +
          " · level " + snapshot.anomaly.alertLevel;
        channels.textContent =
          "Triggered channels: " + snapshot.anomaly.triggeredChannels;
      });

      document.getElementById("log").addEventListener("click", () => {
        osmograph.action({
          type: "add-log",
          values: { note: "Reviewed the live reading" }
        });
      });

      osmograph.ready();
    </script>`}</CodeBlock>
        <P>
          The sandbox blocks network, storage, forms, external assets, and Tauri. The payload is the
          only data path; the snapshot is the only live host state you may depend on. Read{" "}
          <Link href="/docs/vials/ui" className="underline">
            the UI chapter
          </Link>{" "}
          for the full action set and the color laws.
        </P>

        <H2 id="gate">7. Run the gate</H2>
        <CodeBlock title="shell">{`noses lint
noses test`}</CodeBlock>
        <P>
          <Code>lint</Code> checks the manifest, the profile ranges, the evidence block, citations,
          the UI sandbox, and placeholders. <Code>test</Code> runs the fixture against the declared
          profile state machine and checks that the UI uses only host bridge calls. A fixture
          failure is an error.
        </P>
        <CodeBlock title="what a pass looks like">{`✓ schema                 osmograph.domain-pack/2: profile, UI, and evidence.
✓ scope                  State the decision this Vial supports.
✓ limits                 Name at least one condition where the Vial refuses or stops.
✓ anomaly                Baseline, transforms, detection, and escalation are declared.
✓ anomaly-values         Profile values are in range.
✓ evidence               A v2 Vial needs an https evidence report, the dataset it describes…
✓ citations              At least one real reference.

Profile fixtures (deterministic, no hardware)
  ✓ step                     fixtures/step.json → warning (1 alert(s))

Programmable surface (static, no hardware)
  ui → ui.html
    onData           declared
    setTransforms    —
    setDetection     —
    setTrajectory    —`}</CodeBlock>
        <P>
          A v2 Vial does not call <Code>setTransforms</Code> or <Code>setDetection</Code>. Those
          actions exist for legacy manifests; in v2 the profile is compiled from the manifest and the
          UI cannot loosen it.
        </P>

        <H2 id="publish">8. Publish and submit</H2>
        <P>
          Push the directory to a public repository. The manifest must be at the repo root so the raw
          URL resolves. Then ask <Code>noses publish</Code> for the hashes and the exact registry
          entry shape.
        </P>
        <CodeBlock title="shell">{`git init
git add vial.json ui.html fixtures EVIDENCE.md README.md
git commit -m "v0.1.0"
git remote add origin https://github.com/yourname/fermentation-lab
git push -u origin main

noses publish --repo https://github.com/yourname/fermentation-lab`}</CodeBlock>
        <P>
          Open <Link href="/appstore" className="underline">/appstore</Link>, choose{" "}
          <b>Submit a Vial</b>, and paste the raw manifest URL. The server fetches the manifest,
          validates the listing contract, computes the sha256 of the manifest and every UI asset, and
          opens a GitHub issue with those pins. A maintainer approves it in <Code>/admin</Code>.
          Approval re-fetches the bytes and refuses if anything changed.
        </P>
        <Callout kind="note">
          If the deployment has no registry token, the form falls back to the email submission path.
          The hashes and the review still apply; the queue is simply manual.
        </Callout>

        <H2 id="install">9. Install and update</H2>
        <Ol
          items={[
            "Open Osmograph → Vials → Aromatory.",
            "Find the Vial under From the registry and choose Install from source.",
            "The host fetches the manifest and assets, verifies the pinned hashes, and runs the same gate as a local import.",
            "Open the workspace. The profile is compiled into that Vial's detector; the base app is untouched.",
            "When a newer version is pinned, the Aromatory shows Update to vX. The update verifies the new hashes before replacing the local copy.",
          ]}
        />
        <p className="text-sm text-muted-foreground leading-relaxed mt-3">
          If the author publishes a changed file without bumping the version, the install refuses:
          the hash mismatch is a hard refusal.
        </p>

        <H2 id="next">Where to go next</H2>
        <div className="flex flex-wrap gap-3 mt-5">
          <Link href="/docs/vials/profile" className="hex-btn hex-btn-outline no-underline">
            Profile reference
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/docs/vials/evidence" className="hex-btn hex-btn-outline no-underline">
            Evidence and fixtures
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/docs/vials/operate" className="hex-btn hex-btn-outline no-underline">
            Install and operate
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

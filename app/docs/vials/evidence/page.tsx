import type { Metadata } from "next"
import Link from "next/link"
import { FlaskConical } from "lucide-react"

import { Callout, Code, CodeBlock, H2, H3, Ol, P, Table, Ul } from "@/components/docs/DocBlocks"
import { VialNav } from "@/components/docs/VialNav"

export const metadata: Metadata = {
  title: "Vial evidence and fixtures — OpenSmell",
  description:
    "How a Vial proves its profile: the held-out report, the measured metrics, the fixture format, what noses test simulates, and what review and hash pinning actually guarantee.",
  alternates: { canonical: "/docs/vials/evidence" },
}

export default function VialEvidencePage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-20">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-6">
          <span className="inline-flex items-center gap-1.5 border border-border px-2 py-1 uppercase tracking-wider">
            <FlaskConical className="w-3.5 h-3.5" />
            Vials / Evidence
          </span>
          <span className="font-mono">osmograph.vial-fixture/1</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          Evidence is part of the program
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
          A profile is a claim about how an array behaves on a process. The evidence block is where the
          author shows the claim was tested: a held-out report, the measured false-alarm rate, latency,
          minimum detectable effect, exposure, and at least one deterministic fixture. The registry
          review checks the claim; the host still verifies the bytes.
        </p>

        <VialNav />

        <H2 id="block">The evidence block</H2>
        <CodeBlock title="vial.json — evidence">{`{
  "evidence": {
    "grade": "B",
    "reportUrl": "https://…/EVIDENCE.md",
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
      { "id": "step", "file": "fixtures/step.json", "expect": "warning" },
      { "id": "return", "file": "fixtures/return.json", "expect": "normal" }
    ]
  }
}`}</CodeBlock>
        <Table
          head={["Field", "Required", "Meaning"]}
          rows={[
            [<Code key="g">grade</Code>, "yes", "A, B, C, or D. The review bar depends on the claim."],
            [<Code key="r">reportUrl</Code>, "yes", "An HTTPS URL to the held-out report. A real document at a stable URL."],
            [<Code key="d">measuredAt</Code>, "yes", "ISO date the measurement was taken."],
            [<Code key="ds">dataset</Code>, "yes", "The corpus and rig. Name the units, sessions, and preparation."],
            [
              <Code key="m">metrics</Code>,
              "at least one number",
              <>
                <Code>farPerMonth</Code>, <Code>latencyS</Code>, <Code>mde</Code>,{" "}
                <Code>nSamples</Code>, <Code>nAlarms</Code>. Use the numbers from the report.
              </>,
            ],
            [<Code key="f">fixtures</Code>, "at least one for a listing", "Deterministic cases that `noses test` replays against the declared profile."],
          ]}
        />

        <H2 id="grades">What the grades mean</H2>
        <Table
          head={["Grade", "Evidence", "Use"]}
          rows={[
            [
              "A",
              "Held-out unit + external replication; report, data, and code available.",
              "A strong paid or safety-adjacent listing.",
            ],
            [
              "B",
              "Held-out unit on one rig; report and data available.",
              "The normal bar for a paid or operational Vial.",
            ],
            [
              "C",
              "Held-out session on one unit; report available.",
              "A free or experimental Vial, clearly labeled.",
            ],
            [
              "D",
              "Author claim, bench demo, or static check only.",
              "Installable for development. A paid listing requires a held-out unit report.",
            ],
          ]}
        />
        <Callout kind="honest">
          A grade describes the evidence. The host never converts a grade into permission. A grade-D Vial can still be installed and still refuses to arm on a
          bad baseline; it simply does not get to claim it was validated.
        </Callout>

        <H2 id="fixtures">Fixtures: the deterministic proof</H2>
        <P>
          A fixture is a JSON file beside the manifest. It is a sequence of samples and the state
          transitions that must occur. <Code>noses test</Code> reads every fixture declared in{" "}
          <Code>evidence.fixtures</Code>, simulates the profile&apos;s state machine, and fails the
          command on the first mismatch.
        </P>
        <CodeBlock title="fixtures/step.json">{`{
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
        <Table
          head={["Field", "Meaning"]}
          rows={[
            [<Code key="s">schema</Code>, "Must be osmograph.vial-fixture/1 when present."],
            [<Code key="d">description</Code>, "What the sequence is. Say when it is synthetic."],
            [<Code key="dt">dtS</Code>, "Seconds between samples when a sample omits `t`. Default 1.0."],
            [<Code key="smp">samples</Code>, <>{`{ t?, channels: Record<channelId, number> }[]`}. Omitted channels are not zero; they are absent.</>],
            [<Code key="f">expected.final</Code>, "normal, warning, critical, or emergency."],
            [<Code key="a">expected.alerts</Code>, <>{`{ t, level }[]`}; level 1 warning, 2 critical, 3 emergency. Each must occur within the tolerance.</>],
            [<Code key="tol">expected.toleranceS</Code>, "Timing tolerance. Defaults to one sample."],
          ]}
        />

        <H2 id="simulator">What the simulator models</H2>
        <P>
          <Code>noses test</Code> is a profile state-machine test, not the live engine. It reads the
          declared fields and replays the fixture:
        </P>
        <Ul
          items={[
            <>
              <b className="text-foreground">Baseline.</b> It averages the samples inside{" "}
              <Code>anomaly.baseline.warmupS</Code>. The first sample after that window is the first
              scored sample.
            </>,
            <>
              <b className="text-foreground">Response.</b> It applies{" "}
              <Code>transforms.response</Code> (<Code>delta-over-r0</Code>, <Code>relative</Code>, or{" "}
              <Code>delta</Code>) to the declared baseline. A channel with no{" "}
              <Code>perChannelLimits</Code> entry cannot trigger.
            </>,
            <>
              <b className="text-foreground">Corroboration.</b> At least{" "}
              <Code>detection.minChannels</Code> channels must clear their limit on the same sample.
            </>,
            <>
              <b className="text-foreground">Escalation.</b> Continuous anomalous seconds drive{" "}
              <Code>warningS</Code> → <Code>criticalS</Code> → <Code>emergencyS</Code>. Continuous
              normal seconds plus the hysteresis band drive <Code>resetNormalS</Code>.
            </>,
            <>
              <b className="text-foreground">Hysteresis.</b> The strongest declared-channel response is
              latched. The level cannot clear until the response falls to{" "}
              <Code>(1 − hysteresis) × peak</Code>, even after the reset timer.
            </>,
          ]}
        />
        <Callout kind="warn">
          The simulator does not model the engine&apos;s Kalman/UKF calibration, sensor faults,
          environmental drift, cross-channel covariance, or the host&apos;s hardware-sufficiency
          refusal. It proves the declared timers and thresholds behave as written. The held-out report
          is the evidence for the statistical claims; the live app is the evidence for the installed
          profile.
        </Callout>

        <H2 id="test">Running the tests</H2>
        <CodeBlock title="shell">{`noses lint
noses test`}</CodeBlock>
        <CodeBlock title="noses test — fixture section">{`Profile fixtures (deterministic, no hardware)
  ✓ step                     fixtures/step.json → warning (1 alert(s))
  ✓ return                   fixtures/return.json → normal (0 alert(s))`}</CodeBlock>
        <P>
          A missing fixture is a warning: <Code>noses test</Code> says the static surface is all it can check. A failing fixture exits non-zero. A fixture that references a
          path outside <Code>fixtures/</Code> is refused.
        </P>

        <H2 id="review">What review checks</H2>
        <Ol
          items={[
            "The raw manifest URL is HTTPS and returns the exact bytes that were submitted.",
            "The manifest is osmograph.domain-pack/2. New listings require v2; existing legacy entries remain installable as Ungated until re-authored.",
            "The profile ranges, escalation ordering, and admissibility are valid.",
            "The scope, operating envelope, and citations are real and specific.",
            "The evidence report exists, the dataset names the rig, and the metrics are present.",
            "At least one fixture exists and its declared expect matches the simulated final state.",
            "Every UI asset is self-contained, and the manifest and asset sha256 values are recorded.",
            "The submitter has not changed the bytes since the issue was opened.",
          ]}
        />
        <P>
          Approval re-fetches the manifest, every UI asset, and every declared fixture, re-runs the same
          checks, and refuses if a hash differs from the submission. The registry commit is the only write. There is no
          hand-edited registry entry in the normal path.
        </P>

        <H2 id="hashes">Hashes are the durable evidence</H2>
        <Table
          head={["Moment", "What is verified"]}
          rows={[
            ["Publish", "The manifest sha256, every UI asset sha256, and every declared fixture sha256."],
            ["Submit", "The server recomputes all three and writes them into the submission issue."],
            ["Approve", "The server recomputes all three and refuses changed bytes; the registry pins them."],
            ["Install", "The desktop recomputes both before writing the pack; a mismatch is refused."],
            ["Update", "The same checks run for the new version before the local copy is replaced."],
            ["Report", "The report carries the Vial id, version, manifest hash, and asset hashes."],
          ]}
        />
        <P>
          This is what makes an upstream edit visible. An author who changes `ui.html` without bumping
          the version does not silently change what a user runs; the install refuses and the mismatch is
          a reportable event. Fixtures are pinned at review so a changed evidence claim is visible too;
          the host does not execute them at runtime.
        </P>

        <H2 id="antifragile">The antifragile loop</H2>
        <CodeBlock title="failure → fixture → release gate">{`a user reports a wrong state
        │
        ├─ the report carries id, version, manifest hash, asset hashes
        ├─ the author reproduces it as fixtures/<case>.json
        ├─ the fixture is added to evidence.fixtures
        ├─ noses test fails before the fix and passes after it
        └─ the next version is reviewed with the new fixture pinned`}</CodeBlock>
        <P>
          A Vial without a fixture cannot regress safely, because there is nothing to replay. A bug fix
          that does not add a fixture is a claim. The review checks for both.
        </P>

        <H2 id="red-flags">Red flags in an evidence block</H2>
        <Ul
          items={[
            "A false-alarm rate with no exposure time or sample count.",
            "An accuracy number measured on the training data, presented as held-out.",
            "A dataset named only by a commercial product, with no unit, session, or preparation.",
            "A latency that is shorter than the persistence timer.",
            "A fixture whose expected state is normal while its samples contain a sustained step.",
            "A UI screenshot with a number that does not appear in the report.",
            "A version bump that changes the profile but not the fixture.",
          ]}
        />

        <div className="flex flex-wrap gap-3 mt-8">
          <Link href="/docs/vials/operate" className="hex-btn hex-btn-outline no-underline">
            Next: install and operate
          </Link>
          <Link href="/docs/vials/reference" className="hex-btn hex-btn-outline no-underline">
            Reference
          </Link>
        </div>
      </div>
    </div>
  )
}

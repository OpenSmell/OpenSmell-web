import type { Metadata } from "next"
import Link from "next/link"
import { FlaskConical } from "lucide-react"

import { Callout, Code, CodeBlock, H2, H3, Ol, P, Table, Ul } from "@/components/docs/DocBlocks"
import { VialNav } from "@/components/docs/VialNav"

export const metadata: Metadata = {
  title: "The Vial profile program — OpenSmell",
  description:
    "The programmable anomaly profile: baseline, transforms, per-channel limits, min-channel corroboration, persistence, hysteresis, escalation, admissibility, and the false-alarm budget.",
  alternates: { canonical: "/docs/vials/profile" },
}

export default function VialProfilePage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-20">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-6">
          <span className="inline-flex items-center gap-1.5 border border-border px-2 py-1 uppercase tracking-wider">
            <FlaskConical className="w-3.5 h-3.5" />
            Vials / Profile
          </span>
          <span className="font-mono">osmograph.domain-pack/2 → anomaly</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          The profile is the program
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
          The <Code>anomaly</Code> block declares how this Vial turns a stream into a decision. The
          host compiles it into a detector owned by the Vial. The base app keeps its own detector; a
          Vial cannot loosen the host&apos;s refusal or raise the base alert level.
        </p>

        <VialNav />

        <H2 id="levers">The four levers that change false alarms</H2>
        <P>
          A profile cannot lower the per-sample noise floor of the array. It can change how often
          noise becomes an <i>episode</i> a person sees, at a stated latency and minimum detectable
          effect. There are four levers:
        </P>
        <Table
          head={["Lever", "Field", "What it buys", "What it costs"]}
          rows={[
            [
              "Persistence",
              <Code key="p">detection.escalation.warningS</Code>,
              "A transient shorter than the window never becomes a warning.",
              "A real change that resolves faster than the window is missed.",
            ],
            [
              "Hysteresis",
              <Code key="h">detection.hysteresis</Code>,
              "A signal hovering at the threshold cannot chatter.",
              "The alert stays latched until the signal falls well below the peak.",
            ],
            [
              "Context admissibility",
              <Code key="a">admissibility</Code>,
              "Refuses to arm without a ready baseline and enough live, non-dead channels.",
              "A degraded rig shows a refusal instead of a number.",
            ],
            [
              "Operating point",
              <>
                <Code key="s">sensitivity</Code>, <Code key="m">minChannels</Code>,{" "}
                <Code key="l">perChannelLimits</Code>
              </>,
              "Moves the trade-off between missed changes and false alarms.",
              "Every gain in sensitivity costs specificity; no setting gives both for free.",
            ],
          ]}
        />

        <H2 id="baseline">Baseline</H2>
        <Table
          head={["Field", "Range", "Effect"]}
          rows={[
            [
              <Code key="p">baseline.protocol</Code>,
              <Code key="v">first-n | session-mean</Code>,
              "How the UI chooses the R0 reference for the response series. The detector's calibration is separate.",
            ],
            [
              <Code key="w">baseline.warmupS</Code>,
              "0.5–86400",
              "Wall-clock seconds of clean readings before the detector trusts a baseline. The engine still refuses to score until calibration succeeds.",
            ],
            [
              <Code key="r">baseline.r0WindowS</Code>,
              "0.5–3600",
              "Seconds of the early series used as R0 by the UI transform. It must be shorter than the warm-up or the UI has fewer early samples than declared.",
            ],
          ]}
        />
        <P>
          The leak preset is not universal. A leak may establish a baseline in seconds; a
          fermentation batch, a soil column, or a slow spoilage process may need minutes to hours. The
          profile owns the window. Shortening the warm-up to make a demo feel responsive is how a
          detector learns the wrong normal.
        </P>

        <H2 id="transforms">Transforms</H2>
        <Table
          head={["Field", "Supported values", "Meaning"]}
          rows={[
            [
              <Code key="c">transforms.conditioning</Code>,
              <Code key="v">median3</Code>,
              "A three-sample median filter. It suppresses single-sample spikes before the response is computed.",
            ],
            [
              <Code key="r">transforms.response</Code>,
              <Code key="v">delta-over-r0 | relative | delta</Code>,
              <>
                <Code>delta-over-r0</Code> is <Code>(x − R0) / R0</Code>; <Code>relative</Code> is{" "}
                <Code>x / R0</Code>; <Code>delta</Code> is <Code>x − R0</Code>.
              </>,
            ],
          ]}
        />
        <P>
          The response mode determines the units of <Code>perChannelLimits</Code>. A limit of{" "}
          <Code>0.12</Code> means a 12% change for <Code>delta-over-r0</Code> and 0.12 sensor units
          for <Code>delta</Code>. Do not copy a limit between modes.
        </P>
        <P>
          In v2 the host compiles the profile into a detector owned by the Vial. The engine&apos;s
          multivariate verdict and the declared bands are combined: an alert requires the engine to
          see a sustained change and at least <Code>minChannels</Code> channels to clear their band.
          The bands are a corroboration gate, not a decorative display. A profile with no bands uses
          the engine verdict alone.
        </P>

        <H2 id="detection">Detection</H2>
        <Table
          head={["Field", "Range", "Effect"]}
          rows={[
            [
              <Code key="e">detection.enabled</Code>,
              "boolean",
              "Compiles the profile but keeps it disarmed. The UI can still show baseline state.",
            ],
            [
              <Code key="s">detection.sensitivity</Code>,
              "0.1–10",
              "The engine's operating point. Higher values flag smaller deviations and admit more noise.",
            ],
            [
              <Code key="m">detection.minChannels</Code>,
              "1–32",
              "Minimum channels that must clear their budget before the multivariate claim is trusted. 2+ demands corroboration. The same floor applies to the declared bands in v2.",
            ],
            [
              <Code key="b">detection.levelBudget</Code>,
              "0–12σ",
              "An absolute level-anchored threshold. 0 disables the level leg.",
            ],
            [
              <Code key="r">detection.levelRefS</Code>,
              "0–86400",
              "Rolling reference seconds for the level leg. 0 uses the fixed calibration baseline. A non-zero value requires a non-zero level budget.",
            ],
            [
              <Code key="t">detection.alertThreshold</Code>,
              "0–1",
              "Confidence floor for the per-channel band. The engine's level budget remains the statistical threshold. In v2 the host requires the engine verdict and the band gate to agree.",
            ],
            [
              <Code key="l">detection.perChannelLimits</Code>,
              "channel id → positive number",
              "Absolute response bands in transformed units. A channel with no limit does not contribute a band trigger. An empty map uses the engine verdict alone.",
            ],
            [
              <Code key="h">detection.hysteresis</Code>,
              "0–0.95",
              "How far below the peak the signal must fall before the level can clear. 0 clears on the reset timer alone.",
            ],
            [
              <Code key="f">detection.farTargetPerMonth</Code>,
              "≥ 0 or null",
              "The deployment false-alarm budget the author is designing to. The evidence block holds the measured numbers.",
            ],
          ]}
        />

        <H2 id="escalation">Persistence and escalation</H2>
        <P>
          The escalation ladder is a set of wall-clock timers, not sample counts. That makes the same
          profile behave the same on a 2 Hz rig and a 25 Hz logger.
        </P>
        <Table
          head={["Field", "Meaning"]}
          rows={[
            [
              <Code key="w">escalation.warningS</Code>,
              "Seconds of continuous anomaly before warning. This is the persistence lever.",
            ],
            [
              <Code key="c">escalation.criticalS</Code>,
              "Seconds before critical. Must be at least warningS.",
            ],
            [
              <Code key="e">escalation.emergencyS</Code>,
              "Seconds before emergency. Must be at least criticalS.",
            ],
            [
              <Code key="r">escalation.resetNormalS</Code>,
              "Seconds of continuous normal readings before a raised level can clear, subject to hysteresis.",
            ],
          ]}
        />
        <CodeBlock title="a slow process and a fast process are different programs">{`// Slow fermentation: a 30 s blip is noise.
"escalation": { "warningS": 30, "criticalS": 120, "emergencyS": 300, "resetNormalS": 300 }

// Fast bench assay: a 30 s alarm is already late.
"escalation": { "warningS": 0.5, "criticalS": 2, "emergencyS": 5, "resetNormalS": 10 }`}</CodeBlock>
        <P>
          These are durations, not claims about performance. The evidence block and the fixture must
          show that the chosen durations produce the states the author expects on a real or
          deterministic sequence.
        </P>

        <H2 id="admissibility">Admissibility</H2>
        <Table
          head={["Field", "Meaning"]}
          rows={[
            [
              <Code key="r">admissibility.requireBaseline</Code>,
              <>
                <Code>ready</Code> means the host refuses to arm before the baseline is ready.{" "}
                <Code>any</Code> allows the UI to open while warming, but the detector still does not
                score.
              </>,
            ],
            [
              <Code key="c">admissibility.minCoverage</Code>,
              "Minimum fraction of declared channels that must be live and non-dead. A dead channel is a refusal.",
            ],
          ]}
        />

        <H2 id="far">The false-alarm budget, honestly</H2>
        <P>
          Separate two numbers that are often conflated:
        </P>
        <Ul
          items={[
            <>
              <b className="text-foreground">Per-sample false-positive rate (FPR).</b> The chance that
              one normal sample is flagged. This is a property of the array, the noise, and the
              engine&apos;s operating point. A profile cannot make it arbitrarily small.
            </>,
            <>
              <b className="text-foreground">Episode false-alarm rate.</b> The chance that a person
              sees an alarm in a month. Persistence, hysteresis, admissibility, and escalation reduce
              this without changing the per-sample floor.
            </>,
          ]}
        />
        <P>
          A deployment budget of one false alarm per month is roughly{" "}
          <Code>3.9 × 10⁻⁷</Code> per sample at a 10 Hz duty cycle. Raw real-corpus rates are orders
          of magnitude above that, so a profile that claims a monthly budget must state the
          persistence, the latency, and the minimum detectable effect it paid. The measured
          foundations are in the engine design notes; this page does not restate them as marketing
          numbers.
        </P>
        <Callout kind="warn">
          A profile cannot retroactively relabel an alarm. If the detector fired, the episode
          happened. Persistence and hysteresis change which future samples fire; they do not erase
          the past.
        </Callout>

        <H2 id="compile">What the host does with the profile</H2>
        <Ol
          items={[
            "The manifest passes the local gate and the profile ranges are checked.",
            "When the workspace opens, the host asks the Rust runtime for a detector keyed by the Vial id.",
            "The profile fields are merged with the host's statistical defaults (state noise, parameter walk, UKF choice) and applied to that detector only.",
            "Every live reading is fed to the base detector and to each open Vial detector.",
            "The Vial's snapshot reads its own verdict. The base app's alert level is separate.",
            "When the workspace closes, the detector is dropped. The Vial's saved log and fields remain.",
          ]}
        />
        <P>
          A v2 UI cannot call <Code>setDetection</Code> or <Code>setTransforms</Code>. Those calls
          exist for legacy manifests. The profile is immutable at runtime; to change it, publish a
          new version and let the hash-verified update replace it.
        </P>

        <H2 id="choose">Choosing a profile</H2>
        <Ol
          items={[
            "Write the decision first: what change matters, and what would a false alarm cost?",
            "Choose the clean baseline window from the process, not from the demo.",
            "Choose the persistence from the fastest real change you must catch.",
            "Choose minChannels from the array's redundancy. If two channels are the same material, 2+ is not corroboration.",
            "Set hysteresis if the signal hovers at the threshold; otherwise leave it at 0.",
            "Write a fixture that steps the signal and prove the states. Add a fixture that returns to normal and prove the reset.",
            "Measure on held-out data. Put the real FAR, latency, MDE, and exposure in the evidence block.",
          ]}
        />

        <H2 id="legacy">Legacy manifests</H2>
        <P>
          A <Code>osmograph.domain-pack/1</Code> manifest has no anomaly block. It installs as
          <b> Ungated</b> and its UI may call <Code>setTransforms</Code> and <Code>setDetection</Code>{" "}
          at runtime. That path is kept for compatibility; it is not eligible for a new listing. New
          Vials use v2.
        </P>

        <div className="flex flex-wrap gap-3 mt-8">
          <Link href="/docs/vials/ui" className="hex-btn hex-btn-outline no-underline">
            Next: the domain UI
          </Link>
          <Link href="/docs/vials/evidence" className="hex-btn hex-btn-outline no-underline">
            Evidence and fixtures
          </Link>
          <Link href="/docs/vials/reference" className="hex-btn hex-btn-outline no-underline">
            Field reference
          </Link>
        </div>
      </div>
    </div>
  )
}

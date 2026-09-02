import DocsShell from "@/components/docs/DocsShell"
import {
  H2,
  P,
  Code,
  Callout,
  Table,
  Ul,
  CodeBlock,
} from "@/components/docs/DocBlocks"

export const metadata = {
  title: "Data model & .osmell — OpenSmell Docs",
  description:
    "The .osmell portable recording container, the OpenSmell data model, and the limitations governing what derived claims can assert.",
}

export default function DataModelDocsPage() {
  return (
    <DocsShell
      title="Data model & .osmell"
      active="/docs/data-model"
      subtitle="The contract every piece of the stack shares: the portable .osmell recording container, the typed data model, the 187-dimension feature framework, and the limitations that govern derived claims."
    >
      <H2>The .osmell container</H2>
      <P>
        <Code>.osmell</Code> is a portable, self-describing ZIP archive for a smell recording.
        Current format version <Code>1.0.0</Code>. A bundle is three members:
      </P>
      <Table
        head={["Member", "Required", "Contents"]}
        rows={[
          [<Code key="a">manifest.json</Code>, "Yes", "Device, sensor, and session metadata (see below)."],
          [<Code key="b">data.csv</Code>, "Yes", "Per-channel time series; header + rows."],
          [<Code key="c">events.json</Code>, "No", "Optional labelled events (e.g. phase transitions)."],
        ]}
      />
      <P>
        The MIME type is <Code>application/vnd.opensmell.osmell</Code>. The format is designed
        to preserve <em>raw</em> values and the baseline so any client can choose its own
        normalization rather than inheriting one choice baked into the file.
      </P>

      <H2>Manifest schema</H2>
      <CodeBlock title="manifest.json (shape)">
{`{
  "osmell": { "formatVersion": "1.0.0" },
  "sensor": {
    "sensorType": "mox",
    "channels": [{ "id": "VOC", "unit": "ohm" }, "..."],
    "adcMax": 4095,
    "samplingRateHz": 10,
    "timeColumn": "timestamp_ms",
    "calibration": { "ch0": { "a": ..., "b": ... } }
  },
  "session": {
    "role": "exposure",
    "label": "...",
    "groupId": "...",
    "recordedAt": "...",
    "durationMs": ...
  },
  "baseline": { "source": "explicit | auto | none", "r0Samples": 15 },
  "software": { "recorder": "..." }
}`}
      </CodeBlock>
      <P>
        Session roles are <Code>baseline</Code>, <Code>exposure</Code>, or <Code>single</Code>.
        The manifest is self-describing, so a reader can detect a mismatch (e.g. a{" "}
        <Code>data.csv</Code> whose columns do not match the declared channels) and{" "}
        <em>fail loudly</em> rather than silently disagree.
      </P>

      <H2>The feature framework</H2>
      <P>
        The canonical framework is defined sensor-count-agnostically: for any channel count{" "}
        <Code>c</Code> the vector has{" "}
        <Code>28·c + c(c−1)/2 + 4</Code> features — 28 per channel, one selectivity ratio per
        unordered channel pair, plus 4 global metrics. At the canonical <Code>c = 6</Code>{" "}
        MOX array that is{" "}
        <Code>28×6 + 15 + 4 = 187</Code>. The arithmetic and every feature name is auditable,
        and the SDK and web stack keep the same taxonomy — 1:1 — by test.{" "}
        <Code>implied_channels(187)</Code> (Python) and{" "}
        <Code>framework_feature_len(n_channels)</Code> (Rust) both express this formula over
        channel count directly.
      </P>
      <Table
        head={["Group", "Per-channel features", "Count/channel"]}
        rows={[
          ["Device-agnostic", "relative_amplitude, direction, rise_time, decay_time, auc, endpoint_delta", "6"],
          ["Absolute", "raw_resistance, baseline_resistance, voltage, calibrated_concentration", "4"],
          ["Temporal", "hf_transient, oscillation_freq, oscillation_amp, response_latency", "4"],
          ["Health", "drift_rate, sensitivity_decay, noise_floor, hysteresis", "4"],
          ["Hardware", "circuit_response, thermal_profile, adc_noise", "3"],
          ["Advanced", "saturation_index + 6 decay terms (tau1–3, a1–3)", "7"],
          ["Cross-channel", "selectivity ratio per unordered channel pair", "15 total"],
          ["Global", "max_delta_ratio, mean_delta_ratio, n_active_channels, total_auc", "4 total"],
        ]}
      />
      <P>
        The framework is <strong>device-agnostic by construction</strong>: it recomputes
        cleanly for any channel count, and the hardware-insufficiency gate ensures a model
        trained with six channels is never silently run on five by padding a dead channel with
        a mean.
      </P>
      <P>
        Every feature has a name, a category, a transfer class, and a failure mode — the
        vector is high-dimensional, but the model does not treat two same-family MOX channels
        as independent: effective dimensionality is well below the raw (187) channel count.
      </P>

      <H2>Known limitations</H2>
      <Ul
        items={[
          <span key="1">Affine calibration degrades cross-device (47% → 33%); the engine reports calibrated ppm only as a thermodynamic estimate.</span>,
          <span key="2">Session invariance comes from learning, not architecture: 81.78% on held-out sessions, for <em>trained</em> substances — not zero-shot generalization.</span>,
          <span key="3">Two same-family MOX channels are ≈1 effective dimension; humidity is common-mode across SnO₂.</span>,
          <span key="4">A verdict is a physical feasibility estimate, not a promise across unseen devices or a substitute for capture discipline.</span>,
        ]}
      />

      <H2>Representation stack</H2>
      <P>
        Two representations share the stack, deliberately:
      </P>
      <Ul
        items={[
          <span key="a"><strong>The feature framework (sensor half)</strong> — 187 temporal response features extracted from raw traces: what the instrument measured.</span>,
          <span key="b"><strong>The chemoprint (molecule half)</strong> — a fixed-length numeric fingerprint of the substance: what is in the air.</span>,
        ]}
      />
      <P>
        Together they cover both ends, with zero lock-in — the signatures interchange across
        the Python SDK, the Rust SDK, the web platform, and the desktop app.
      </P>
    </DocsShell>
  )
}

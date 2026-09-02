import DocsShell from "@/components/docs/DocsShell"
import {
  H2,
  H3,
  P,
  Code,
  Callout,
  Table,
  Ul,
  CodeBlock,
} from "@/components/docs/DocBlocks"

export const metadata = {
  title: "Rust SDK — OpenSmell Docs",
  description:
    "Reference for the opensmell Rust crate: feature extraction, anomaly detection, calibration, sensor health, the OSM serial protocol, classifier training, and live classification.",
}

export default function RustDocsPage() {
  return (
    <DocsShell
      title="Rust SDK"
      active="/docs/rust"
      subtitle="Reference for the opensmell Rust crate — MOX e-nose feature extraction, anomaly detection, calibration, health/fleet monitoring, the OSM serial protocol, classifier training, and live classification. Core logic mirrors the Python SDK and web stack, kept equal by tests."
    >
      <H2>Overview</H2>
      <P>
        The crate exposes a set of focused modules selected by use case. Everything public is
        re-exported at the crate root (<Code>opensmell::*</Code>), so you import one path, not
        internals. Data flows through two core types: <Code>SensorReading</Code> (one
        time-slice of channel values) and <Code>Baseline</Code> (per-channel R0 calibration).
      </P>
      <CodeBlock title="rust (Cargo.toml)">
{`opensmell = { git = "https://github.com/OpenSmell/opensmell-rs" }`}
      </CodeBlock>
      <P>
        A <Code>SensorReading</Code> carries its channel values, a timestamp, and its{" "}
        <em>active</em> channels (finite, non-zero) — so downstream code can skip dead
        channels without re-deriving them. A <Code>Baseline</Code> is built from the leading
        15% of samples per channel (median R0 plus per-channel std).{" "}
        <Code>RawData::from_csv(path)</Code> loads a CSV into rows-of-samples with an optional
        sampling rate and channel names.
      </P>

      <H2>Crate-root API</H2>
      <P>The following is the complete public surface re-exported at the crate root:</P>
      <Table
        head={["Module", "Public items"]}
        rows={[
          ["features", <span key="f">FeatureGroup · extract_features · extract_window_features · feature_names</span>],
          ["anomaly", <span key="a">AnomalyDetector · AnomalyScore · AnomalyMethod</span>],
          ["calibration", <span key="c">Calibrator · CalibrationProfile · CrossDeviceCalibrator</span>],
          ["health", <span key="h">HealthMonitor · SensorHealth · HealthStatus · FleetHealth · fisher_discriminant_ratio · pairwise_fdr · euclidean_distance · cosine_similarity · similarity_warning</span>],
          ["protocol", <span key="p">OsmProtocol · OsmMessage</span>],
          ["preprocessing", <span key="pp">RawData · BaselineCorrection · BaselineMethod · SignalFilter · FilterType · WindowExtractor · DataValidator</span>],
          ["adaptive", <span key="ad">AdaptiveAnomalyDetector · AdaptiveThreshold · FailSafeSystem · LabelingSystem · DetectionResult · AccuracyImprovement · DetectorState · LabelingStats · FailSafeResult · LabelRecord</span>],
          ["poisoning", <span key="po">PoisoningDetector · SensorHealthConfig · SensorHealthStatus · SensorMetrics · DegradationType</span>],
          ["quality", <span key="q">compute_quality · ChannelSeries · QualityParams · QualityReport</span>],
          ["training", <span key="t">train_classifier · TrainOptions · TrainingReport · ClassifierModel · ModelCard · ConfusionCell · PairSimilarity · LabeledRecording · paradigm_window_features · extract_window_features_by_mode · feature_length_for · framework_feature_len · extract_training_windows · compute_warning · DEFAULT_WINDOW_SIZE · TRAIN_STRIDE · PythonModelExport · PythonScalerExport · PythonLrExport · PythonMetadataExport</span>],
          ["framework", <span key="fw">framework_window_features · compute_multi_exp_decay</span>],
          ["live", <span key="l">LiveClassifier · LiveSnapshot · Prediction · ROLLING_WINDOW · LOCK_THRESHOLD · LOCK_CONSECUTIVE · UNKNOWN_THRESHOLD · UNKNOWN_CONSECUTIVE</span>],
        ]}
      />

      <H2>Feature extraction</H2>
      <P>
        <Code>FeatureGroup</Code> is an enum of seven groups, each a family of features and a
        use case. You select only the groups you need — the crate will not compute features
        you do not ask for.
      </P>
      <Table
        head={["Group", "Features", "Best for"]}
        rows={[
          ["Anomaly", "Drift rate, stability, noise floor, fractional derivatives", "Monitoring, spoilage/leak detection, cold-chain"],
          ["Classification", "Absolute resistance, calibrated concentration", "Substance identification, fingerprinting"],
          ["Health", "Hysteresis, sensitivity decay, thermal profile, ADC noise", "Predicting sensor failure, scheduling maintenance"],
          ["Kinetics", "Rise time, decay time, multi-exponential decay parameters", "Adsorption/desorption dynamics"],
          ["Selectivity", "Cross-channel ratios", "Gas discrimination, understanding sensor overlap"],
          ["Temporal", "High-frequency transients, oscillation, response latency", "Rapid events (gas leaks, spoilage onset)"],
          ["Hardware", "Circuit response, thermal profile, ADC noise", "Diagnosing hardware issues, quality control"],
        ]}
      />
      <CodeBlock title="rust">
{`use opensmell::{SensorReading, Baseline, FeatureGroup, extract_features, feature_names};

let reading = SensorReading::new(vec![120.0, 95.0, 300.0, 401.0, 25.0, 210.0], 0.0);
let baseline = /* from a clean-air window */;

let groups = &[FeatureGroup::Kinetics, FeatureGroup::Selectivity];
let names = feature_names(groups, 6);
let feats = extract_features(&reading, &baseline, groups)?;`}
      </CodeBlock>
      <P>
        <Code>extract_features(reading, baseline, groups)</Code> returns a flat{" "}
        <Code>Vec&lt;f64&gt;</Code>; <Code>feature_names(groups, n_channels)</Code> returns the
        matching ordered names; <Code>extract_window_features</Code> runs per-window for
        streaming buffers. The <Code>framework</Code> module provides the canonical model —{" "}
        <Code>framework_window_features</Code> and <Code>compute_multi_exp_decay</Code> — used
        by classifier training.
      </P>
      <Callout kind="note">
        The canonical framework&apos;s length is a <em>function of channel count</em>:{" "}
        <Code>framework_feature_len(n_channels) = 28·c + c(c−1)/2 + 4</Code>. That is{" "}
        <Code>187</Code> at the canonical 6-channel rig, but it recomputes for any c ({" "}
        <Code>feature_length_for(n_channels, mode)</Code> dispatches by feature mode). This is
        the sensor-count-agnostic statement of the same model that reads <Code>187</Code> at 6
        channels elsewhere in the stack.
      </Callout>

      <H2>Preprocessing</H2>
      <Ul
        items={[
          <span key="a"><Code>RawData::from_csv</Code> — load CSV into rows-of-samples with optional rate/names/timestamps.</span>,
          <span key="b"><Code>BaselineCorrection</Code> — estimate R0; <Code>BaselineMethod</Code> chooses median, mean, EWMA, or percentile.</span>,
          <span key="c"><Code>SignalFilter</Code> / <Code>FilterType</Code> — median, moving average, Savitzky-Golay, or high-pass.</span>,
          <span key="d"><Code>WindowExtractor</Code> — slide a window over a buffer.</span>,
          <span key="e"><Code>DataValidator</Code> — reject or flag malformed data before processing.</span>,
        ]}
      />
      <P>
        <Code>BaselineCorrection</Code> defaults to median baseline over the first 15% with a
        minimum of 30 samples.
      </P>

      <H2>Quality</H2>
      <P>
        <Code>compute_quality(time, channels, params)</Code> scores a recording and returns a{" "}
        <Code>QualityReport</Code>. <Code>ChannelSeries</Code> carries per-channel data;{" "}
        <Code>QualityParams</Code> sets the scoring context (ADC max, sampling rate, session
        role, baseline source). The role and baseline-source are honored — signal/recovery
        sub-scores are suppressed for non-exposure roles — and the report tracks the same
        flags as the Python scorer (used-default-ADC, used-median-rate, no-baseline,
        non-finite, dead sensors, unsorted rows).
      </P>

      <H2>Anomaly, adaptive & poisoning</H2>
      <P>
        Three layers protect live systems. <Code>AnomalyDetector</Code> (with{" "}
        <Code>AnomalyScore</Code>/<Code>AnomalyMethod</Code>) flags out-of-distribution
        readings. The <Code>adaptive</Code> module adds online learning —{" "}
        <Code>AdaptiveAnomalyDetector</Code>, <Code>AdaptiveThreshold</Code>, a{" "}
        <Code>FailSafeSystem</Code>, and a <Code>LabelingSystem</Code> that feeds{" "}
        <Code>AccuracyImprovement</Code> tracking. The <Code>poisoning</Code> module detects
        data poisoning via <Code>PoisoningDetector</Code> against per-sensor health metrics.
      </P>

      <H2>Calibration</H2>
      <P>
        <Code>Calibrator</Code> fits and inverts the MOX power law; <Code>CalibrationProfile</Code>{" "}
        is the persisted result. <Code>CrossDeviceCalibrator</Code> handles the harder — and
        honestly-reported — case of transferring a calibration across devices.
      </P>
      <Callout kind="honest">
        Cross-device calibration is a real limitation, not a solved claim: affine calibration
        degrades on real cross-device data (47% → 33%), and the SDK never presents a
        calibration as an absolute physical truth.
      </Callout>

      <H2>Health & fleet</H2>
      <P>
        <Code>HealthMonitor</Code> tracks per-sensor <Code>SensorHealth</Code> and a{" "}
        <Code>HealthStatus</Code>; <Code>FleetHealth</Code> aggregates across devices. Helper
        scores — <Code>fisher_discriminant_ratio</Code>, <Code>pairwise_fdr</Code>,{" "}
        <Code>euclidean_distance</Code>, <Code>cosine_similarity</Code>,{" "}
        <Code>similarity_warning</Code> — quantify how separable or confusable channels and
        substances are.
      </P>

      <H2>OSM protocol</H2>
      <P>
        <Code>OsmProtocol</Code> parses the serial framing used by connected e-nose boards.
        Lines begin with <Code>OSM</Code> and carry comma-separated readings; protocol is
        6-channel max and split off bootloader noise.{" "}
        <Code>OsmProtocol::new(expected_channels)</Code> and{" "}
        <Code>parse_line(line, host_timestamp)</Code> convert a line into an{" "}
        <Code>OsmMessage</Code>. The protocol module also ships a{" "}
        <Code>generate_arduino_sketch</Code> helper for producing firmware.
      </P>

      <H2>Classifier training & evaluation</H2>
      <P>
        <Code>train_classifier(recordings, name, options)</Code> trains on a set of{" "}
        <Code>LabeledRecording</Code>s and returns a <Code>TrainingReport</Code>. Training is
        device-agnostic on sensor count (windows are validated for hardware sufficiency),
        quality-gated, and evaluated by leave-one-recording-out (LORO). The report carries a{" "}
        <Code>ModelCard</Code> and per-class confusion cells and pair similarities.
      </P>
      <Table
        head={["Item", "Role"]}
        rows={[
          [<Code key="a">TrainOptions</Code>, "window_size, n_sensors (3–6), min_quality, stride, feature_mode, sampling rate."],
          [<Code key="b">LabeledRecording</Code>, "A recording plus its substance label."],
          [<Code key="c">TrainingReport</Code>, "Results: model, LORO metrics, warnings, quality notes."],
          [<Code key="d">ModelCard</Code>, "Provenance: name, classes, feature mode, hardware gate, evaluation."],
          [<Code key="e">Python*Export</Code>, "Serialize the trained classifier to Python (model / scaler / logistic-regression / metadata) for cross-language consumption."],
        ]}
      />
      <P>
        Training windowing is exposed through <Code>paradigm_window_features</Code>,{" "}
        <Code>extract_window_features_by_mode</Code>, <Code>feature_length_for</Code>,{" "}
        <Code>framework_feature_len</Code>, and <Code>extract_training_windows</Code>.
      </P>
      <Callout kind="honest">
        A model trained with six channels is never silently run on five: the hardware gate
        checks the rig&apos;s effective dimensionality against the model&apos;s requirement and
        warns (or refuses) rather than padding a dead channel with a mean.
      </Callout>

      <H2>Live classification</H2>
      <P>
        <Code>LiveClassifier</Code> loads a trained <Code>ClassifierModel</Code> and produces{" "}
        <Code>Prediction</Code>s from live buffers via a rolling window. It implements a
        deliberate lock/unknown state machine — constants <Code>ROLLING_WINDOW</Code>,{" "}
        <Code>LOCK_THRESHOLD</Code>, <Code>LOCK_CONSECUTIVE</Code>, <Code>UNKNOWN_THRESHOLD</Code>,{" "}
        <Code>UNKNOWN_CONSECUTIVE</Code> — that refuses to emit confident predictions until the
        window is large and stable enough, and honestly reports an unknown state otherwise.{" "}
        <Code>LiveSnapshot</Code> captures the state for UI polling.
      </P>

      <H2>Module reference</H2>
      <P>
        All modules are <Code>pub</Code>:{" "}
        <Code>features</Code>, <Code>anomaly</Code>, <Code>calibration</Code>, <Code>health</Code>,{" "}
        <Code>protocol</Code>, <Code>preprocessing</Code>, <Code>framework</Code>,{" "}
        <Code>adaptive</Code>, <Code>poisoning</Code>, <Code>quality</Code>, <Code>training</Code>,{" "}
        <Code>live</Code>. The crate depends on ndarray, num-traits, serde, thiserror, csv,
        chrono, and log.
      </P>
      <Callout kind="note">
        The Rust crate operates on CSV and JSON (serde). The portable .osmell ZIP container
        is implemented in the Python SDK, web platform, and the desktop app&apos;s Rust backend
        — the crate itself keeps I/O minimal by design.
      </Callout>
    </DocsShell>
  )
}

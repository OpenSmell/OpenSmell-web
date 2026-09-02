import DocsShell from "@/components/docs/DocsShell"
import {
  H2,
  H3,
  P,
  Code,
  Callout,
  Table,
  Ul,
  Ol,
  CodeBlock,
} from "@/components/docs/DocBlocks"

export const metadata = {
  title: "Python SDK — OpenSmell Docs",
  description:
    "Reference for the opensmell Python package: .osmell I/O, ingest, features, quality, calibration, hardware gate, and the smellability feasibility chain.",
}

export default function PythonDocsPage() {
  return (
    <DocsShell
      title="Python SDK"
      active="/docs/python"
      subtitle="Reference for the opensmell Python package. Covers .osmell I/O, ingest, feature extraction, quality scoring, calibration, the hardware-insufficiency gate, and the MOX thermodynamic feasibility chain."
    >
      <H2>Install</H2>
      <P>
        The package is <Code>opensmell</Code>, requires Python &ge;3.10, and depends on numpy,
        pandas, scikit-learn, and scipy. It declares no console-script entry points; the
        smellability CLI is a standalone script in the repository.
      </P>
      <CodeBlock title="shell">pip install opensmell</CodeBlock>
      <P>
        After import, everything is reachable from the package root — there is no need to
        import internals:
      </P>
      <CodeBlock title="python">
import opensmell

# data model & version
opensmell.OSMELL_FORMAT_VERSION          # "1.0.0"

# .osmell I/O
file = opensmell.parse_osmell_file("rec.osmell")
csv_text = opensmell.csv_from_file(file)
opensmell.write_osmell(file, "out.osmell")

# feature extraction
opensmell.extract_features("rec.csv")
opensmell.feature_names()

# thermodynamic feasibility chain
from opensmell import smellability
verdict = smellability.resolve_and_run("ethanol", "chemical")</CodeBlock>

      <H2>API surface</H2>
      <P>
        The package exposes a <strong>single coherent API</strong> at the root — there are no
        separate public generations. One flat namespace mirrors one framework: typed
        descriptors and <Code>.osmell</Code> containers for I/O, plus the same internal
        machinery surfaced through both the low-level functions and the convenience wrappers{" "}
        (<Code>load_recording</Code>, <Code>extract_features</Code>, <Code>train</Code>,{" "}
        <Code>process</Code>, <Code>predict</Code> are thin wrappers over the same
        framework, not a separate legacy stack). The groups below are organizational
        categories, not API tiers.
      </P>
      <Table
        head={["Category", "API"]}
        rows={[
          [
            "Container I/O",
            <span key="io">
              <Code>parse_osmell</Code>, <Code>parse_osmell_file</Code>,{" "}
              <Code>build_osmell</Code>, <Code>write_osmell</Code>, <Code>csv_from_file</Code>,{" "}
              <Code>default_file_name</Code>
            </span>,
          ],
          [
            "Ingest",
            <span key="i">
              <Code>parse_csv</Code>, <Code>guess_sensor_type</Code>, <Code>ingest_file</Code>,{" "}
              <Code>ingest_folder</Code>, <Code>build_osmell_file</Code>
            </span>,
          ],
          [
            "Processing & features",
            <span key="p">
              <Code>run_processor</Code>, <Code>process_mox</Code>,{" "}
              <Code>extract_features</Code>, <Code>feature_names</Code>,{" "}
              <Code>compute_quality</Code>
            </span>,
          ],
          [
            "Calibration",
            <span key="c">
              <Code>two_point_calibration</Code>, <Code>fit_power_law</Code>,{" "}
              <Code>loocv_power_law</Code>, <Code>invert_concentration</Code>,{" "}
              <Code>normed_to_rr</Code>, <Code>calibrate_quick</Code>, <Code>calibrate_precise</Code>,{" "}
              <Code>build_calibration_payload</Code>, <Code>concentration_series</Code>
            </span>,
          ],
          [
            "Hardware gate",
            <span key="h">
              <Code>check_rig_sufficiency</Code>, <Code>effective_dims</Code>,{" "}
              <Code>min_effective_dimensions</Code>, <Code>implied_channels</Code>
            </span>,
          ],
          [
            "Smellability",
            <span key="s">
              <Code>smellability</Code> (subpackage) — <Code>resolve_and_run</Code>,{" "}
              <Code>chemical_from_smiles</Code>, verdict types
            </span>,
          ],
        ]}
      />

      <H2>The .osmell container</H2>
      <P>
        <Code>.osmell</Code> is the portable recording container. It is a ZIP archive with a{" "}
        <Code>manifest.json</Code>, a <Code>data.csv</Code> member (the per-channel samples),
        and an optional <Code>events.json</Code>. The current format version is{" "}
        <Code>1.0.0</Code>. All I/O functions accept either a path or raw bytes.
      </P>
      <Table
        head={["Function", "Signature", "What it does"]}
        rows={[
          [<Code key="a">parse_osmell</Code>, <Code>parse_osmell(data: bytes) → OsmellFile</Code>, "Parse an in-memory bundle (ZIP bytes) into an OsmellFile, validating manifest/data consistency."],
          [<Code key="b">parse_osmell_file</Code>, <Code>parse_osmell_file(path) → OsmellFile</Code>, "Load a .osmell bundle from disk (delegates to parse_osmell)."],
          [<Code key="c">build_osmell</Code>, <Code>build_osmell(file) → bytes</Code>, "Serialize an OsmellFile to a ZIP bundle (DEFLATE)."],
          [<Code key="d">write_osmell</Code>, <Code>write_osmell(file, path) → Path</Code>, "Write an OsmellFile to disk as a .osmell bundle."],
          [<Code key="e">csv_from_file</Code>, <Code>csv_from_file(file) → str</Code>, "Serialize the data channel back to CSV text."],
          [<Code key="f">default_file_name</Code>, <Code>default_file_name(file, role=None) → str</Code>, "Suggest &lt;label&gt;_&lt;role&gt;_&lt;date&gt;.osmell, sanitized."],
        ]}
      />

      <H2>Data model</H2>
      <P>
        The typed descriptors serialize to camelCase JSON via uniform{" "}
        <Code>to_dict()</Code>/<Code>from_dict()</Code> methods. The key types:
      </P>
      <Table
        head={["Type", "Fields"]}
        rows={[
          [<span key="a"><Code>OsmellFile</Code></span>, <span key="a2"><Code>manifest</Code> · <Code>time</Code> (List[float]) · <Code>data</Code> (dict[str, List[float]]) · <Code>events</Code>?</span>],
          [<Code key="b">OsmellManifest</Code>, "osmell (formatVersion), sensor, session, baseline?, software?, extra"],
          [<Code key="c">SensorDescriptor</Code>, "sensor_type (default \"mox\"), channels, device?, sampling_rate_hz?, adc_bits?, adc_max?, time_column, calibration?"],
          [<Code key="d">ChannelDescriptor</Code>, "id, unit, target?"],
          [<Code key="e">CalibrationDescriptor</Code>, "a, b, reference_substance?, reference_ppm?, date?, method?"],
          [<Code key="f">SessionDescriptor</Code>, "role (single/baseline/exposure), label?, group_id?, recorded_at?, duration_ms?, notes?"],
          [<Code key="g">SessionEvent</Code>, "label, start_ms, end_ms?, note?"],
          [<Code key="h">ParsedSample</Code>, "time, values: dict[str, float|None]"],
          [<Code key="i">ChannelStats</Code>, "id, min, max, mean, std, r0, cv, dead, span, clipped, non_finite"],
          [<Code key="j">QualityReport</Code>, "format, version, computed_at, total?, badge, subscores, flags, reasons, notes"],
        ]}
      />

      <Callout kind="note">
        Session roles are <Code>baseline</Code>, <Code>exposure</Code>, or{" "}
        <Code>single</Code>. Baseline sources are <Code>explicit</Code>, <Code>auto</Code>, or{" "}
        <Code>none</Code>. Quality sub-scores for signal strength and recovery are{" "}
        <Code>None</Code> for non-exposure roles by design.
      </Callout>

      <H2>Ingest</H2>
      <P>
        Ingestion turns a raw CSV into an <Code>OsmellFile</Code> with provenance metadata,
        gracefully. It never raises for structural problems — errors are captured on the
        returned session object.
      </P>
      <Table
        head={["Function", "Signature", "What it does"]}
        rows={[
          [<Code key="a">parse_csv</Code>, <Code>parse_csv(text) → CsvParseResult</Code>, "Parse raw CSV text: detect delimiter, time column, sensor vs context channels; synthesize timing if absent; auto-convert epoch seconds; sort out-of-order rows; report every interpretation in warnings."],
          [<Code key="b">guess_sensor_type</Code>, <Code>guess_sensor_type(header) → str</Code>, "Guess sensor family from column names; \"mox\" if ≥2 columns match the MOX set, else \"unknown\"."],
          [<Code key="c">ingest_file</Code>, <Code>ingest_file(path, substance=None, role="single") → IngestedSession</Code>, "Ingest one CSV/TXT; computes the quality report internally; errors captured in session.error."],
          [<Code key="d">ingest_folder</Code>, <Code>ingest_folder(path, recurse=True, label_from_dir=True) → IngestedCollection</Code>, "Ingest a folder, grouping by subfolder = substance."],
          [<Code key="e">build_osmell_file</Code>, <Code>build_osmell_file(parsed, label, substance, source, role="single") → OsmellFile</Code>, "Normalize a parsed CSV into an OsmellFile with ingest provenance."],
        ]}
      />
      <P>
        Collected folders return an <Code>IngestedCollection</Code> keyed by substance, with{" "}
        <Code>session_count()</Code>, <Code>ok_count()</Code>, and{" "}
        <Code>iter_sessions()</Code>. The recognized MOX channel ids are{" "}
        <Code>VOC</Code>, <Code>Alcohol</Code>, <Code>LPG</Code>, <Code>CO</Code>,{" "}
        <Code>NO2</Code>, <Code>C2H5OH</Code>.
      </P>

      <H2>Feature extraction</H2>
      <P>
        The MOX framework is defined sensor-count-agnostically. For any channel count{" "}
        <Code>c</Code>, the vector has{" "}
        <Code>28·c + c(c−1)/2 + 4</Code> features — 28 features per channel, plus one
        selectivity ratio per unordered channel pair, plus 4 global metrics. At the canonical{" "}
        <Code>c = 6</Code> rig that is{" "}
        <Code>28×6 + 15 + 4 = 187</Code>; <Code>implied_channels(187) → 6</Code> inverts the same
        formula. It is auditable: every feature has a name, and the SDK tests assert the exact{" "}
        <Code>(187,)</Code> shape for the 6-channel recorder.
      </P>
      <Callout kind="note">
        The <em>formula</em> is channel-agnostic, but today the Python extractor is wired to a
        fixed <Code>N_CHANNELS = 6</Code> (<Code>feature_names()</Code> /
        <Code>extract_all_framework_features</Code>). The Rust SDK exposes the same count as a{" "}
        <Code>framework_feature_len(n_channels)</Code> <em>function</em>. So 187 is the
        6-channel instance, not a universal constant.
      </Callout>
      <Table
        head={["Family", "Per-channel features", "Count/channel"]}
        rows={[
          ["Device-agnostic", "relative_amplitude, direction, rise_time, decay_time, auc, endpoint_delta", "6"],
          ["Absolute", "raw_resistance, baseline_resistance, voltage, calibrated_concentration", "4"],
          ["Temporal", "hf_transient, oscillation_freq, oscillation_amp, response_latency", "4"],
          ["Health", "drift_rate, sensitivity_decay, noise_floor, hysteresis", "4"],
          ["Hardware", "circuit_response, thermal_profile, adc_noise", "3"],
          ["Advanced", "saturation_index + 6 decay terms (tau1-3, a1-3)", "7"],
          [<span key="x"><strong>Cross-channel</strong></span>, "selectivity ratio for each unordered channel pair", "15 total"],
          [<span key="y"><strong>Global</strong></span>, "max_delta_ratio, mean_delta_ratio, n_active_channels, total_auc", "4 total"],
        ]}
      />
      <H3>Top-level entry points</H3>
      <Table
        head={["Function", "Signature", "What it does"]}
        rows={[
          [<Code key="a">run_processor</Code>, <Code>run_processor(file: OsmellFile) → dict</Code>, "Dispatch by sensor_type: MOX → process_mox; miris/electrochemical → raw data (no extractor yet); other → marker dict."],
          [<Code key="b">process_mox</Code>, <Code>process_mox(file) → dict</Code>, "Per-channel kinetic features mirroring the web processMox; returns features + normalized series."],
          [<Code key="c">extract_features</Code>, <Code>extract_features(filepath) → tuple</Code>, "Full framework vector (array, names) from a CSV."],
          [<Code key="d">feature_names</Code>, <Code>feature_names() → list</Code>, "Ordered feature names (187 at the fixed 6-channel extractor)."],
        ]}
      />
      <Callout kind="honest">
        miris and electrochemical sensor types have no feature extractor or quality scorer{" "}
        yet — calls raise <Code>NotImplementedError</Code>. This is documented as an open item,
        not hidden.
      </Callout>

      <H2>Quality scoring</H2>
      <P>
        <Code>compute_quality</Code> dispatches to the MOX scorer, a seven-factor weighted
        scoring model, and returns a <Code>QualityReport</Code> with a badge (Excellent /
        Good / Fair / Poor / Unknown).
      </P>
      <Table
        head={["Factor", "Weight", "What it measures"]}
        rows={[
          ["baselineStability", "0.20", "CV of the baseline window."],
          ["signalStrength", "0.20", "Response relative to the noise floor."],
          ["continuity", "0.15", "Row/timing regularity."],
          ["recoveryCompleteness", "0.15", "Return toward baseline (exposure roles)."],
          ["dynamicRange", "0.10", "Fraction of ADC range used."],
          ["saturationFree", "0.10", "Absence of clipping."],
          ["durationAdequacy", "0.10", "Duration vs target."],
        ]}
      />
      <Callout kind="note">
        Flags track <Code>dead_sensors</Code>, <Code>unsorted_rows</Code>,{" "}
        <Code>non_finite_samples</Code>, <Code>used_default_adc_max</Code>,{" "}
        <Code>used_median_sampling_rate</Code>, <Code>no_baseline</Code>, and{" "}
        <Code>empty_recording</Code> — so the scorer&apos;s assumptions are always visible.
      </Callout>

      <H2>Calibration</H2>
      <P>
        Calibration fits the power law <Code>R/R0 = a·C^b</Code>. The quick path reads
        datasheet constants; the precise path fits measured points and falsifies the fit by
        leave-one-concentration-out cross-validation.
      </P>
      <Table
        head={["Function", "What it does"]}
        rows={[
          [<Code key="a">normed_to_rr</Code>, "Convert normalized response (R-R0)/R0 to resistance ratio R/R0 (rr = 1 + normed)."],
          [<Code key="b">invert_concentration</Code>, "Invert the power law to concentration C = (rr/a)^(1/b); NaN where undefined."],
          [<Code key="c">two_point_calibration</Code>, "Exact (a,b) from two (rr, C) points; raises CalibrationError on degenerate input."],
          [<Code key="d">fit_power_law</Code>, "Multi-point log-log fit; returns a, b, r2, RMSE, min/max ppm, decades, residuals."],
          [<Code key="e">loocv_power_law</Code>, "Leave-one-concentration-out falsification: mean/median/max % error + bias."],
          [<Code key="f">calibrate_quick</Code>, "Datasheet-derived single-channel calibration from the embedded constants table."],
          [<Code key="g">calibrate_precise</Code>, "Measured multi-point calibration wrapper returning payload + diagnostics + LOOCV."],
          [<Code key="h">build_calibration_payload</Code>, "Build a manifest sensor.calibration payload from per-channel fits."],
          [<Code key="i">concentration_series</Code>, "Per-channel concentration time series (uncalibrated channels → NaN)."],
        ]}
      />
      <Callout kind="honest">
        Calibration is a power-law point estimate, not an absolute truth. Verified
        cross-device work shows affine calibration degrades (47% → 33%); the engine never
        claims calibrated ppm as a physical absolute — headspace ppm is a thermodynamic
        estimate.
      </Callout>

      <H2>Hardware sufficiency gate</H2>
      <P>
        The gate stops a model trained on N channels from silently running on fewer.
        Resolution order for the required dimensional floor: the model&apos;s own{" "}
        <Code>min_effective_dimensions</Code>, then inference from{" "}
        <Code>n_features_in_</Code>, then a class-count heuristic.
      </P>
      <Table
        head={["Function", "What it does"]}
        rows={[
          [<Code key="a">effective_dims</Code>, "Empirical effective dimensionality of a same-family MOX rig (1→0.5, 2→1.0, 3→1.5, 4→2.0, 5+→2.5)."],
          [<Code key="b">implied_channels</Code>, "Invert 28c + c(c-1)/2 + 4 = n to recover the channel count; None for non-canonical counts."],
          [<Code key="c">min_effective_dimensions</Code>, "The dimensional floor a model requires."],
          [<Code key="d">check_rig_sufficiency</Code>, "Warn-and-proceed gate: emits HardwareInsufficiencyWarning when insufficient."],
        ]}
      />

      <H2>Smellability — the feasibility chain</H2>
      <P>
        The MOX thermodynamic feasibility chain answers &ldquo;will my e-nose actually smell
        this?&rdquo; — a physical feasibility estimate, not a calibrated measurement. It is{" "}
        <strong>MOX-specific</strong>, not sensor-agnostic, and is re-exported at{" "}
        <Code>opensmell.smellability</Code>.
      </P>
      <H3>The four-step chain</H3>
      <Ol
        items={[
          <span key="1"><Code>identity</Code> — resolve the entity and its measured properties.</span>,
          <span key="2"><Code>volatility</Code> — vapor pressure at ambient temperature (explicit, Antoine, gas/Clausius-Clapeyron fallbacks).</span>,
          <span key="3"><Code>signal</Code> — incident flux vs the ethanol reference, graded strong/moderate/weak/none.</span>,
          <span key="4"><Code>reactivity</Code> — whether the compound is redox-active in the reducing direction MOX sensors can see.</span>,
        ]}
      />
      <H3>Key functions</H3>
      <Table
        head={["Function", "What it does"]}
        rows={[
          [<Code key="a">resolve_and_run</Code>, "Top-level entry: resolve an entity by id+kind (chemical/composite/class) and run the chain."],
          [<Code key="b">chemical_from_smiles</Code>, "Build an estimated Chemical from SMILES fully offline (MW, Joback Tb, functional groups, redox)."],
          [<Code key="c">run_chemical_verdict</Code>, "Run the full chain for a chemical, with cross-check and guidance."],
          [<Code key="d">run_composite_verdict</Code>, "Weighted aggregation over a composite's constituents."],
          [<Code key="e">run_class_verdict</Code>, "Coarse class-level estimate for a functional class (alcohol, ester, …)."],
          [<Code key="f">search_substances</Code>, "Fuzzy search across chemicals, composites, user dictionary, and classes."],
        ]}
      />
      <P>
        The chain returns a <Code>FeasibilityVerdict</Code>: verdict (green/yellow/red),
        confidence, signal strength, response speed, per-constituent steps, exposure and
        dilution guidance, and a cross-check against how many substances the sensor count can
        actually distinguish.
      </P>
      <Callout kind="honest">
        The verdict is a <em>physical feasibility estimate</em>. It is not a calibrated
        concentration, a guarantee of mixture decomposition, a promise across unseen devices,
        or a replacement for capture discipline. Six pure anchors cannot cover odorant space
        (≈0.1% of 4,565 odorants), and the design ships a contribution loop rather than a
        &ldquo;calibrate to these bottles&rdquo; flow.
      </Callout>
      <H3>Constants & ontology</H3>
      <P>
        The chain ships a curated catalogue (~46 chemicals, 24 composites), the reference
        compound ethanol, 14 percept categories, and 9 capability boundaries (4 can, 5
        cannot). MOX detection floor is 1 ppm; default sensor count is 6; the per-sensor-count
        distinguishable-substance limits are tabulated (3→6, 4→12, 5→20, 6→40, 12→200,
        24→10000).
      </P>

      <H2>Convenience pipeline API</H2>
      <P>
        The low-level machinery is also surfaced through a convenience pipeline for the
        common CSV flow. <Code>load_recording</Code> loads and normalizes a CSV;{" "}
        <Code>extract_features</Code> segments and extracts the framework; <Code>train</Code>{" "}
        builds a standard-scaler + random-forest <Code>Pipeline</Code> (attaching the
        dimensional floor); <Code>process</Code> / <Code>predict</Code> run the full pipeline
        and return a <Code>SmellResult</Code> with a <Code>chemoprint</Code> property (a
        fixed-length 29-element slice). These are thin wrappers over the same framework as the
        rest of the package — a convenience entry point, not a separate API tier.
      </P>

      <H2>Constants table</H2>
      <P>
        The <Code>opensmell.constants</Code> module holds the offline datasheet table of
        power-law responses, keyed by sensor model. Upstream types like{" "}
        <Code>opensmell</Code> re-export the readable functions only indirectly — access via{" "}
        <Code>opensmell.constants</Code>:
      </P>
      <Table
        head={["Function", "What it does"]}
        rows={[
          [<Code key="a">sensor_models</Code>, "Sorted list of known sensor models."],
          [<Code key="b">sensor_gases</Code>, "Gases a sensor model has response constants for."],
          [<Code key="c">clean_air_ratio</Code>, "Clean-air Rs/R0 for a model."],
          [<Code key="d">power_law</Code>, "The (a, b) response for a sensor responding to a gas."],
          [<Code key="e">all_power_laws</Code>, "All (a, b) responses for a sensor."],
          [<Code key="f">sensor_sources</Code>, "Datasheet / verification URLs."],
        ]}
      />

      <H2>CLI script</H2>
      <P>
        A standalone script runs smellability lookups without writing code:
      </P>
      <CodeBlock title="shell">
python scripts/smellability_lookup.py "benzaldehyde"
python scripts/smellability_lookup.py --smiles "C1=CC=CC(=C1)C=O"
python scripts/smellability_lookup.py --mix "banana:0.5,coffee:0.5"</CodeBlock>
      <Ul
        items={[
          <span key="a"><Code>--sensor-count</Code> / <Code>--library</Code> set the cross-check rig.</span>,
          <span key="b"><Code>--json</Code> prints machine-readable output.</span>,
          <span key="c">Exit codes: 0 success, 2 unresolved, 3 usage error.</span>,
        ]}
      />
    </DocsShell>
  )
}

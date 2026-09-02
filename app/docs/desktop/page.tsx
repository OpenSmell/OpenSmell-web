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
  title: "Osmograph Desktop — OpenSmell Docs",
  description:
    "User guide for Osmograph Desktop: real-time MOX monitoring, the measured phenotype strip, the phase-recording protocol, compare/train/fleet, burn-in, plugins, and the local data commons.",
}

export default function DesktopDocsPage() {
  return (
    <DocsShell
      title="Osmograph Desktop"
      active="/docs/desktop"
      subtitle="User guide for Osmograph Desktop (v0.1.0), a Tauri application for real-time MOX sensor monitoring and adaptive learning. Covers every tab, the measured phenotype strip, the phase-recording protocol, connections, training, fleet, burn-in, plugins, and the data commons."
    >
      <H2>What the app is</H2>
      <P>
        Osmograph Desktop connects to a metal-oxide (MOX) e-nose — over serial, WiFi, or BLE —
        streams readings in real time, records phase-labelled sessions, measures a phenotype
        strip, lets you compare and train classifiers, manages a fleet of devices, tracks
        burn-in, and runs a local data-commons contribution pipeline with optional Hugging
        Face sync. It is <em>software</em>, not a device: it drives the hardware you already
        have.
      </P>
      <Table
        head={["Facts", "Value"]}
        rows={[
          ["Version / id", "v0.1.0 · com.opensmell.osmograph-desktop"],
          ["Stack", "Tauri 2 (Rust backend) + TypeScript/Vite frontend; Chart.js for charts"],
          ["Window", "Default 1360×740, resizable 960×640 → 1920×1080"],
          ["Connections", "Serial (OSM protocol, 115200 baud), WiFi (HTTP polling), BLE (async streaming)"],
          ["Max channels", "6 (presets for 3 / 4 / 6) — channel count is auto-detected and never hardcoded"],
        ]}
      />

      <H2>Tabs</H2>
      <P>
        Six top-level tabs: <strong>Dashboard</strong>, <strong>Library</strong>,{" "}
        <strong>Compare</strong>, <strong>Train</strong>, <strong>Fleet</strong>, and{" "}
        <strong>System</strong> (which carries the connection, sensor, hardware, calibration,
        OLED, buzzer, firmware, burn-in, data-hub, Hugging Face, and plugins panels).
      </P>

      <H2>Dashboard</H2>
      <P>
        The live view. It shows a real-time trace canvas (play/pause/clear/record), the{" "}
        <strong>phenotype strip</strong>, a time-position scrubber over the buffered readings,{" "}
        the phase-recording HUD, and live classification probability bars when a classifier is
        loaded. Sensor presets switch between 3/4/6-channel configurations, and channels can
        be renamed or toggled on/off.
      </P>
      <H3>The phenotype strip</H3>
      <P>
        The strip projects live (or replayed) sensor readings onto the A1/A3 fingerprint axis
        and reports amplitudes plus the A1 direction (reducing vs oxidizing). It wraps the
        two-cluster centroid model (Vergara et al. 2012) embedded in the app.
      </P>
      <Callout kind="honest">
        The phenotype strip is <em>measured and estimated</em>, never "identified". It is{" "}
        <em>not</em> molecule identification and it is <em>not</em> validated classification —
        those would be overclaims. The app explicitly reports when a sample is outside the
        model&apos;s valid region (<Code>boundaries_cannot</Code>). The strong/weak amplitude
        split and the oxidizing/mixture categories are <em>not</em> validated and are not
        presented as such.
      </Callout>

      <H2>Phase recording protocol</H2>
      <P>
        Recordings follow a disciplined three-phase protocol that the analysis stack expects:
        baseline (default 30s) → exposure (default 120s) → recovery (default 120s). Phases are
        colour-coded (blue baseline, red exposure, green recovery), with per-phase operator
        instructions, a countdown timer, and a state machine ({" "}
        <Code>start_phase_recording</Code> → <Code>set_phase</Code> →{" "}
        <Code>stop_phase_recording</Code> / <Code>cancel_phase_recording</Code>). Sessions
        export as <Code>.osmell</Code> bundles (manifest + data.csv + events) with the
        protocol, phase timeline, and dead channels recorded. Dead channels are detected
        automatically via a CV threshold.
      </P>
      <P>
        The base ROX normalization uses a clean-air baseline; a recording is only physically
        comparable when the capture protocol was followed — the app records the protocol so
        downstream analysis can check.
      </P>

      <H2>Library</H2>
      <P>
        The Library is a persistent index of sessions (a JSON index plus per-session CSV
        files). For each session it shows label, date, duration, sensor count, and quality
        score. Actions: rename, delete, analyze (runs the quality scorer → badge and breakdown),
        export (copy the raw CSV or convert to an <Code>.osmell</Code> bundle), edit the
        substance label and notes. Import via drag-and-drop of CSV files on the panel or the
        import button; bulk operations (multi-select analyze/delete) are supported.
      </P>

      <H2>Compare</H2>
      <P>
        Select two or more library sessions and overlay their traces for visual comparison.
        Series are loaded from disk and aligned for the overlay — useful for sanity-checking
        protocol compliance and seeing response differences directly.
      </P>

      <H2>Train</H2>
      <P>
        Training builds a logistic-regression classifier on labelled sessions, evaluated by
        leave-one-recording-out (LORO). Trained models persist to disk with a model card
        (name, classes, feature mode, hardware gate, evaluation, quality gates). The Train tab
        lists, deletes, and inspects classifiers; a trained model can be loaded for live
        prediction on the Dashboard, where it renders probability bars.
      </P>
      <Ul
        items={[
          <span key="a">Only well-formed, protocol-compliant, quality-gated recordings are used (min-quality gate).</span>,
          <span key="b">A model trained on N channels is never silently run with fewer (hardware gate).</span>,
          <span key="c">Live classification uses a rolling window with a lock/unknown state machine so it refuses to overclaim.</span>,
        ]}
      />

      <H2>Fleet</H2>
      <P>
        The Fleet tab shows a grid of known devices (serial + network).{" "}
        <Code>fleet_scan</Code> auto-discovers devices via serial-port enumeration and mDNS
        network scanning; <Code>probe_osm_info</Code> HTTP-probes OSM-capable devices on the
        LAN. Devices can be added or removed manually. Per-device state includes connection
        status, sensor configuration, and health.
      </P>

      <H2>System panels</H2>

      <H3>Connection</H3>
      <Ul
        items={[
          <span key="a"><strong>Serial</strong> — list ports, connect/disconnect, set baud (default 115200). The OSM protocol parses <Code>OSM</Code>-prefixed lines and filters bootloader noise.</span>,
          <span key="b"><strong>WiFi</strong> — host/port, HTTP polling connection with status and last-reading tracking.</span>,
          <span key="c"><strong>BLE</strong> — scan for devices, connect, and stream asynchronously with chunked reads.</span>,
        ]}
      />

      <H3>Sensors</H3>
      <P>
        View and edit channel names and preset mappings; set the channel count (3/4/6).
        Channel names you set are persisted and honoured when exporting.
      </P>

      <H3>Hardware</H3>
      <P>
        Auto-detects the board via USB VID/PID (e.g. ESP32, Arduino Uno, Raspberry Pi Pico) and
        shows a human-readable board label.
      </P>

      <H3>Calibration</H3>
      <P>
        Zero-point baseline calibration (<Code>calibrate_baseline</Code> from an array of
        baseline samples), reference-point / power-law fitting from datasheet values or a
        measured-fit path, concentration inversion, and import/export of calibration profiles.
      </P>

      <H3>OLED & Buzzer</H3>
      <P>
        Read and write OLED display and buzzer configuration on the connected board
        (<Code>oled_get/set_config</Code>, <Code>buzzer_get/set_config</Code>).
      </P>

      <H3>Firmware</H3>
      <P>
        Flash firmware to detected boards (ESP toolchain; channel count maps to sensor pins),
        verify <Code>esptool</Code> availability, erase flash, and read the MAC address.
      </P>

      <H3>Burn-in</H3>
      <P>
        A 24-hour (configurable) burn-in tracker. Elapsed time is tracked against the wall
        clock and persisted to JSON, so it survives restarts. Shows elapsed time, percentage,
        and burning-in/ready status; supports start and reset (with custom hours).
      </P>

      <H3>Data hub</H3>
      <P>
        A local contribution pipeline mirroring the commons protocol:{" "}
        <strong>Pending → Approved → Published</strong>. List local contributions, approve,
        reject (with reason), publish vetted contributions, import CSVs, submit a CSV plus
        metadata, or export-and-submit a recording in one step.
      </P>

      <H3>Hugging Face sync</H3>
      <P>
        Split by trust, deliberately. Downloading reads public HF datasets with{" "}
        <em>no token</em>; uploading vetted (Published) contributions requires a write token
        that is <strong>held in memory only and never persisted to disk</strong> — it is used
        for the upload request and then dropped. Operations: list files, download, upload with
        commit message, and set/clear/check the token.
      </P>

      <H3>Plugins</H3>
      <P>
        The app scans <Code>~/.config/Osmograph/plugins</Code> for Python scripts (with{" "}
        <Code># name:</Code>, <Code># description:</Code>, <Code># version:</Code> headers) and
        model files (<Code>.pkl</Code>, <Code>.json</Code>) and lists them with their parsed
        metadata.
      </P>

      <H2>Hardware & data expectations</H2>
      <P>
        The app is tolerant on input: the CSV parser never rejects on structure, auto-detects
        delimiting, recognizes six time-column aliases (and clock-style and epoch-seconds
        formats), synthesizes 10 Hz timing when absent, sorts out-of-order rows, detects
        context columns (temperature, humidity, etc.) to keep out of scoring, and surfaces
        every interpretation as a warning. This mirrors the Python SDK&apos;s parser semantics so
        desktop and SDK agree.
      </P>

      <H2>Scope of claims</H2>
      <Callout kind="note">
        The app reports a <em>measured phenotype</em>, not an identified smell, and presents
        model quality as LORO-evaluated rather than proof of generalization to unseen devices.
        Quality flags are always shown, never hidden.
      </Callout>
    </DocsShell>
  )
}

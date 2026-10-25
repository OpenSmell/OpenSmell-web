import type { Metadata } from "next"
import Link from "next/link"
import { FlaskConical } from "lucide-react"

import { Callout, Code, CodeBlock, H2, H3, P, Table, Ul } from "@/components/docs/DocBlocks"
import { VialNav } from "@/components/docs/VialNav"

export const metadata: Metadata = {
  title: "The Vial domain UI — OpenSmell",
  description:
    "The sandboxed Vial UI contract: the typed host snapshot, the bridge methods, the bounded action set, Home contributions, and the presentation laws.",
  alternates: { canonical: "/docs/vials/ui" },
}

export default function VialUiPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-20">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-6">
          <span className="inline-flex items-center gap-1.5 border border-border px-2 py-1 uppercase tracking-wider">
            <FlaskConical className="w-3.5 h-3.5" />
            Vials / UI
          </span>
          <span className="font-mono">sandbox/1</span>
          <span className="font-mono">osmograph.vial-host/1</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          The domain UI is a decision surface
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
          The UI is a body fragment mounted in a sandboxed iframe. It receives one typed snapshot at a
          time and returns a small, fixed set of actions. It cannot read raw buffers, open a socket,
          write storage, or change the detector. Its job is to turn host truth into a decision the
          person in front of the instrument can make.
        </p>

        <VialNav />

        <H2 id="sandbox">The sandbox</H2>
        <P>
          The host builds the document itself and injects the fragment into a{" "}
          <Code>{`<iframe sandbox="allow-scripts">`}</Code>. The iframe has no same-origin access, no
          top navigation, no forms, and no popups. The document&apos;s policy is:
        </P>
        <CodeBlock title="effective CSP">{`default-src 'none';
img-src data:;
style-src 'unsafe-inline';
font-src data:;
script-src 'unsafe-inline';
connect-src 'none';
media-src 'none';
frame-src 'none';
worker-src 'none';
form-action 'none';
base-uri 'none';`}</CodeBlock>
        <Table
          head={["Allowed", "Blocked"]}
          rows={[
            [
              "Inline HTML, inline CSS, inline scripts, data-URI images and fonts, canvas, SVG.",
              "fetch, XMLHttpRequest, WebSocket, external scripts/styles/images, localStorage, IndexedDB, cookies, forms, frames, workers, Tauri.",
            ],
            [
              <>
                The host bridge: <Code>osmograph.onData</Code>, <Code>action</Code>, <Code>setTrajectory</Code>,
                plus <Code>ready</Code>, and <Code>toast</Code>. The legacy <Code>setDetection</Code> / <Code>setTransforms</Code>{" "}
                methods are v1-only and are refused for a v2 profile.
              </>,
              "Any other global. A reference to an unknown osmograph method is a critical gate failure.",
            ],
          ]}
        />
        <Callout kind="warn">
          The fragment is a <b>body fragment</b>, not a document. Do not include{" "}
          <Code>{`<html>`}</Code>, <Code>{`<head>`}</Code>, or <Code>{`<body>`}</Code>; the host owns
          the document, the base styles, and the bridge. A Vial UI larger than 512 KB is refused.
        </Callout>

        <H2 id="payload">The host payload</H2>
        <P>
          Call <Code>osmograph.onData(callback)</Code> once at startup. The host immediately replays
          the latest payload, then sends a new one on the Vial&apos;s sampling cadence. The callback
          may run before the baseline is ready; treat every field as possibly null or unknown.
        </P>
        <Table
          head={["Field", "Type", "Meaning"]}
          rows={[
            [<Code key="s">schema</Code>, <Code key="v">"osmograph.vial-runtime/1"</Code>, "Payload contract."],
            [<Code key="sn">snapshot</Code>, <Code key="v">VialHostSnapshot</Code>, "The typed host state below."],
            [
              <Code key="se">series</Code>,
              <Code key="v">{`{ source, label, channels, time, timeUnit, values, fingerprint, evolution, response } | null`}</Code>,
              "A downsampled window. `response` is the profile-transformed series and is null until transforms are in force.",
            ],
            [
              <Code key="so">sources</Code>,
              <Code key="v">{`{ id, label, kind, detail? }[]`}</Code>,
              "The sources this Vial may select with `set-source`.",
            ],
            [<Code key="ss">selectedSource</Code>, "string", "The source currently feeding `series`."],
            [
              <Code key="ev">events</Code>,
              <Code key="v">{`{ start, end, alert, peak, channels, ongoing }[]`}</Code>,
              "The host change log for this session. Useful for context, not a second detector.",
            ],
            [
              <Code key="do">domain</Code>,
              <Code key="v">{`{ fields, checks, logs }`}</Code>,
              "The persisted local Vial state: saved fields, checklist checks, and log entries.",
            ],
            [<Code key="v">view</Code>, <Code key="v">workspace | home</Code>, "Which surface mounted this document."],
            [<Code key="h">host</Code>, <Code key="v">{`{ name, version, runtime }`}</Code>, "The host identity."],
          ]}
        />

        <H3>The snapshot</H3>
        <P>
          <Code>payload.snapshot</Code> is the only live state a Vial may depend on. Channel ids are{" "}
          <Code>ch0…chN</Code>; a dead channel is a refusal, not a zero.
        </P>
        <Table
          head={["Field", "Type", "Meaning"]}
          rows={[
            [<Code key="s">schema</Code>, <Code key="v">"osmograph.vial-host/1"</Code>, "Contract version."],
            [<Code key="t">takenAt</Code>, "number", "Unix milliseconds when the snapshot was built."],
            [
              <Code key="src">source</Code>,
              <Code key="v">live | replay | dataset | none</Code>,
              "Where the reading came from. Home is never a live source.",
            ],
            [
              <Code key="sm">samplingMode</Code>,
              <Code key="v">timeseries | trial | unknown</Code>,
              "The array is an ordered time series in this host.",
            ],
            [
              <Code key="c">channels</Code>,
              <>{`{ id, label, kind, unit?, health? }[]`}</>,
              <>
                Channel ids are <Code>ch0…chN</Code>. Health is <Code>ok | stuck | saturated | noisy | unknown</Code>.
              </>,
            ],
            [
              <Code key="e">environment</Code>,
              <>{`{ temperature, humidity } | null`}</>,
              "Only present when the host measured it.",
            ],
            [
              <Code key="b">baseline</Code>,
              <>{`{ state, progress, ageSec }`}</>,
              <>
                <Code>state</Code> is <Code>none | warming | ready</Code>; <Code>progress</Code> is
                0–1; <Code>ageSec</Code> is null when the host did not observe the baseline start.
              </>,
            ],
            [
              <Code key="a">anomaly</Code>,
              <>{`{ state, score, confidence, alertLevel, triggeredChannels, consecutive }`}</>,
              <>
                <Code>state</Code> is <Code>unknown | normal | warning | critical</Code>. This is
                the per-Vial engine state before the profile&apos;s band and admissibility gate; the
                decision the UI presents is <Code>detection</Code>.{" "}
                <Code>triggeredChannels</Code> is a <b>count</b>, not an array.{" "}
                <Code>consecutive</Code> is the number of consecutive anomalous samples.
              </>,
            ],
            [
              <Code key="cl">classifier</Code>,
              <>{`{ state, name, label, confidence }`}</>,
              "A loaded classifier, if the user trained one. Never invent a label.",
            ],
            [
              <Code key="lim">channelLimits</Code>,
              <>{`Record<channelId, { dead, cv, min, max, r0 }>`}</>,
              "Host-computed single-unit limits. A dead channel must be shown as dead, not zero.",
            ],
            [
              <Code key="dc">detectionConfig</Code>,
              <>{`{ enabled, alertThreshold, perChannelLimits } | null`}</>,
              "The profile in force. For v2 this comes from the manifest; the UI cannot change it.",
            ],
            [
              <Code key="d">detection</Code>,
              <>{`{ active, triggeredChannels: string[], admissible?, reason? } | null`}</>,
              "The Vial's verdict. `admissible: false` means the profile refused to arm (baseline not ready, coverage below the minimum, or a recording/no rig); show `reason`. Null means no verdict yet, not normal. A v2 profile detector runs on the live array only.",
            ],
            [
              <Code key="tr">transformsApplied</Code>,
              "string[]",
              "Transform ids the host actually applied, for display and debugging.",
            ],
            [
              <Code key="traj">trajectory</Code>,
              <>{`{ at, values }[]`}</>,
              "Recent points for the fields the UI asked the host to track. At most 600 points.",
            ],
          ]}
        />

        <Callout kind="honest">
          A v2 Vial does not configure the detector from the UI. The profile in <Code>vial.json</Code> is
          compiled by the host when the Vial opens, and a v2 UI that calls <Code>setDetection</Code> or{" "}
          <Code>setTransforms</Code> fails the gate. The UI reads the verdict and writes context; the
          manifest is the program.
        </Callout>

        <H2 id="actions">The action set</H2>
        <P>
          <Code>osmograph.action(action)</Code> posts one of the following. The host validates the
          shape, the nonce, the pane, and the current Vial. Invalid actions are dropped with a toast;
          they never throw into the page.
        </P>
        <Table
          head={["Action", "Payload", "Effect"]}
          rows={[
            [<Code key="r">ready</Code>, "—", "Tells the host the bridge is live; the host sends a fresh snapshot."],
            [<Code key="t">toast</Code>, <Code key="v">{`{ message }`}</Code>, "A host toast. Use it for confirmations, not alarms."],
            [<Code key="rz">resize</Code>, <Code key="v">{`{ height }`}</Code>, "Request a pane height. Clamped to 420–2000 px (320–620 px on Home)."],
            [<Code key="sf">save-field</Code>, <Code key="v">{`{ key, value }`}</Code>, "Persist one text field in the local Vial state."],
            [<Code key="al">add-log</Code>, <Code key="v">{`{ values }`}</Code>, "Append a timestamped record to the local Vial log."],
            [<Code key="rl">remove-log</Code>, <Code key="v">{`{ id }`}</Code>, "Remove one log record."],
            [<Code key="el">export-log</Code>, "—", "Export the local log through the host."],
            [<Code key="ow">open-workspace</Code>, "—", "Return to this Vial's workspace."],
            [<Code key="od">open-dashboard</Code>, "—", "Open the host dashboard."],
            [<Code key="ods">open-datasets</Code>, "—", "Open the host datasets view."],
            [<Code key="oc">open-check</Code>, "—", "Open the host check view."],
            [<Code key="ov">open-vials</Code>, "—", "Close the workspace and return to the Vials list."],
            [<Code key="ss">set-source</Code>, <Code key="v">{`{ source }`}</Code>, "Switch to a source the host offered for this Vial."],
            [
              <Code key="st">set-trajectory</Code>,
              <Code key="v">{`{ fields, intervalMs }`}</Code>,
              <>
                Ask the host to track fields such as <Code>ch0</Code>, <Code>anomaly.score</Code>,{" "}
                <Code>baseline.progress</Code>, <Code>env.temperature</Code>. Clamped to 1–600 s.
              </>,
            ],
            [
              <Code key="sd">set-detection</Code>,
              <Code key="v">{`{ enabled, alertThreshold, perChannelLimits }`}</Code>,
              "Legacy only. A v2 Vial is refused with a message: the profile is compiled from the manifest.",
            ],
            [
              <Code key="str">set-transforms</Code>,
              <Code key="v">{`{ baseline, conditioning, response }`}</Code>,
              "Legacy only. A v2 Vial is refused: transforms are declared in the manifest.",
            ],
          ]}
        />
        <Callout kind="honest">
          A Vial can tighten its own presentation and its own trajectory request. It cannot loosen the
          host's `channelLimits`, raise the base alert level, hide a dead channel, or overwrite another
          Vial's state.
        </Callout>

        <H2 id="example">A complete minimal UI</H2>
        <P>
          This fragment shows the contract without inventing a measurement. It reports baseline
          progress, the engine state, the profile verdict, the number of triggered channels, and a dead-channel refusal. It
          persists one field and one log entry.
        </P>
        <CodeBlock title="ui.html">{`<style>
  :root { color: #1a1a17; background: #fbf8f2; font: 13px/1.5 ui-monospace, monospace; }
  body { margin: 0; padding: 16px; }
  .row { display: flex; justify-content: space-between; gap: 16px; border-bottom: 1px solid #d8d4ca; padding: 8px 0; }
  .label { color: #6b665c; }
  .live { color: #0e7490; }
  .warn { color: #a16207; }
  .alarm { color: #e11d48; }
  .dead { color: #6b665c; text-decoration: line-through; }
  input, button { font: inherit; border: 1px solid #1a1a17; border-radius: 0; background: transparent; padding: 4px 8px; }
  button { cursor: pointer; }
</style>

<div class="row"><span class="label">Baseline</span><span id="baseline">waiting</span></div>
<div class="row"><span class="label">Engine</span><span id="engine">unknown</span></div>
<div class="row"><span class="label">Profile</span><span id="state">unknown</span></div>
<div class="row"><span class="label">Triggered channels</span><span id="triggered">—</span></div>
<div class="row"><span class="label">Channels</span><span id="channels">—</span></div>

<p><input id="note" placeholder="Batch note" /></p>
<p><button id="save">Save note</button> <button id="log">Log reading</button></p>

<script>
  const baseline = document.getElementById("baseline");
  const engine = document.getElementById("engine");
  const state = document.getElementById("state");
  const triggered = document.getElementById("triggered");
  const channels = document.getElementById("channels");
  const note = document.getElementById("note");

  function paint(payload) {
    const snapshot = payload.snapshot;
    const b = snapshot.baseline;
    baseline.textContent = b.state === "ready"
      ? "ready"
      : b.state === "warming"
        ? "warming " + Math.round(b.progress * 100) + "%"
        : "none";
    baseline.className = b.state === "ready" ? "live" : "warn";

    engine.textContent = snapshot.anomaly.state
      + (snapshot.anomaly.score === null ? "" : " · " + snapshot.anomaly.score.toFixed(2));

    const det = snapshot.detection;
    if (!det) {
      state.textContent = "no verdict yet";
      state.className = "";
    } else if (!det.admissible) {
      state.textContent = "not armed";
      state.className = "warn";
      state.title = det.reason || "the profile refused to arm";
    } else {
      state.textContent = det.active ? "change active" : "below profile";
      state.className = det.active ? "alarm" : "live";
      state.title = "";
    }
    triggered.textContent = det ? String(det.triggeredChannels.length) : "—";

    channels.innerHTML = "";
    for (const channel of snapshot.channels) {
      const limit = snapshot.channelLimits[channel.id];
      const row = document.createElement("span");
      row.textContent = channel.label;
      row.className = limit && limit.dead ? "dead" : "";
      row.title = limit
        ? "cv " + limit.cv.toFixed(4) + " · min " + limit.min + " · max " + limit.max
        : "no limit yet";
      channels.appendChild(row);
      channels.appendChild(document.createTextNode(" "));
    }
  }

  osmograph.onData(paint);
  document.getElementById("save").addEventListener("click", () => {
    osmograph.action({ type: "save-field", key: "note", value: note.value });
    osmograph.toast("Note saved locally.");
  });
  document.getElementById("log").addEventListener("click", () => {
    osmograph.action({ type: "add-log", values: { note: note.value } });
  });
  osmograph.ready();
</script>`}</CodeBlock>
        <P>
          The example uses the host palette deliberately: cyan only for live, healthy data; yellow for
          a warning; red only for an alarm; ink for primary text; 0 px radius; 1 px hairlines. A Vial
          UI that paints a warning red, or uses cyan for a static label, is lying about the state.
        </P>

        <H2 id="laws">Presentation laws</H2>
        <Ul
          items={[
            <>
              <b className="text-foreground">Cyan <Code>#0e7490</Code> is live data only.</b> Not a
              heading, not a button, not a decorative accent.
            </>,
            <>
              <b className="text-foreground">Red <Code>#e11d48</Code> is alarm only.</b> A critical
              state, a stop rule, a refusal that requires action.
            </>,
            <>
              <b className="text-foreground">Yellow <Code>#a16207</Code> is warning.</b> A degraded
              baseline, a stuck channel, a change that has not yet crossed the escalation timer.
            </>,
            <>
              <b className="text-foreground">Ink <Code>#1a1a17</Code> is primary.</b> Body text,
              borders, and the one action that matters.
            </>,
            <>
              <b className="text-foreground">0 px radius, 1 px hairlines.</b> The instrument is a
              measuring surface, not a card deck.
            </>,
            <>
              <b className="text-foreground">Never invent a number.</b> If the host gives null, show
              an em dash and the reason. A zero is a measurement; a placeholder zero is a lie.
            </>,
            <>
              <b className="text-foreground">Show the refusal.</b> A dead channel, a warming baseline,
              or a missing classifier is information the person needs before they trust the reading.
            </>,
          ]}
        />

        <H2 id="home">Home contribution</H2>
        <P>
          A Vial may also contribute a declarative Home card through the manifest&apos;s{" "}
          <Code>home</Code> block. Home cards are composed by the host; they never run arbitrary
          code. A card declares:
        </P>
        <Table
          head={["Field", "Meaning"]}
          rows={[
            [<Code key="h">headline</Code>, "One line of state, written in the Vial's voice."],
            [<Code key="d">detail</Code>, "One sentence of context or the next action."],
            [<Code key="m">metrics</Code>, <>{`{ label, value, hint? }[]`} — values are strings, so omit a number rather than invent one.</>],
            [<Code key="a">actions</Code>, <>{`{ id, label, kind, href? }[]`}; kind is open-workspace, open-check, open-datasets, open-gallery, or external.</>],
            [<Code key="l">limits</Code>, "The conditions where the card must not be read as a live claim."],
            [<Code key="s">sources</Code>, "Which host sources the card can reflect."],
          ]}
        />
        <P>
          The host adds the runtime state (<Code>idle | warming | live | attention | ready</Code>) and a
          generated timestamp. Home is a summary, not a second detector.
        </P>

        <H2 id="gate">What the gate checks</H2>
        <Ul
          items={[
            "The fragment is non-empty, under 512 KB, and does not contain a full document, external asset, form, frame, or storage call.",
            "Every `osmograph.*` reference is a known bridge method. An unknown method is a critical failure.",
            "The UI calls `osmograph.onData`; a UI that never listens is flagged as decoration.",
            "A legacy pack must declare transforms, a trajectory, or both. A v2 pack declares its profile in the manifest instead.",
            "The manifest's `ui.entry` and `homeUi.entry` are hashed at publish and re-hashed on install; a changed fragment is refused.",
          ]}
        />

        <div className="flex flex-wrap gap-3 mt-8">
          <Link href="/docs/vials/evidence" className="hex-btn hex-btn-outline no-underline">
            Next: evidence and fixtures
          </Link>
          <Link href="/docs/vials/reference" className="hex-btn hex-btn-outline no-underline">
            Bridge reference
          </Link>
        </div>
      </div>
    </div>
  )
}

import type { Metadata } from "next"
import Link from "next/link"
import { FlaskConical } from "lucide-react"

import { Callout, Code, CodeBlock, H2, H3, Ol, P, Table, Ul } from "@/components/docs/DocBlocks"
import { VialNav } from "@/components/docs/VialNav"

export const metadata: Metadata = {
  title: "Install and operate a Vial — OpenSmell",
  description:
    "How Osmograph installs, verifies, updates, and reports a Vial: manifest and UI hashes, the local gate, the update channel, per-Vial reports, offline behavior, and rollback.",
  alternates: { canonical: "/docs/vials/operate" },
}

export default function VialOperatePage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-20">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-6">
          <span className="inline-flex items-center gap-1.5 border border-border px-2 py-1 uppercase tracking-wider">
            <FlaskConical className="w-3.5 h-3.5" />
            Vials / Operate
          </span>
          <span className="font-mono">Aromatory → install → update</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          Install, update, and report
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
          A Vial is a local copy of a pinned program. The host fetches the manifest and its UI assets,
          verifies the hashes, runs the same gate as a local import, and only then writes the pack. An
          update is a second, verified install; a report carries the identity of the exact bytes that
          failed.
        </p>

        <VialNav />

        <H2 id="install">Install from the Aromatory</H2>
        <Ol
          items={[
            "Open Osmograph → Vials → Aromatory. The registry is fetched when the view opens.",
            "Find the Vial under From the registry and choose Install from source (or Update to vX when a newer version is pinned).",
            "The host downloads the manifest, parses it, and verifies the manifest sha256 pinned in the registry.",
            "It downloads every declared UI asset, hashes each one, and verifies the pinned value. A missing or changed asset is a refusal.",
            "It runs the local gate: schema, identity, scope, limits, profile ranges, citations, evidence, sandbox, and placeholders.",
            "Only after those pass does it save the pack and add it to the installed list. The workspace opens on the Vial.",
          ]}
        />
        <Callout kind="honest">
          If the registry has no pinned hash for a legacy Vial, the install still runs the local gate but
          cannot verify the bytes against a review record. That Vial is shown as a manifest install, not
          as a reviewed listing. New v2 Vials are pinned.
        </Callout>

        <H2 id="hashes">What “verified” means</H2>
        <Table
          head={["Check", "Failure"]}
          rows={[
            [
              "Manifest sha256 matches the registry",
              "“The manifest on disk does not match the sha256 recorded in the registry — it changed upstream. Refusing to install.”",
            ],
            [
              "Every UI asset sha256 matches",
              "The asset name and the mismatch are reported; nothing is cached or installed.",
            ],
            [
              "The manifest id matches the registry id",
              "“The manifest id does not match its registry entry. Refusing to install.”",
            ],
            [
              "The manifest passes the local gate",
              "The pack is saved only after the gate passes. A failing gate leaves the previous copy untouched.",
            ],
            [
              "The redirect stays on HTTPS",
              "A manifest that redirects away from HTTPS is refused before parsing.",
            ],
          ]}
        />
        <P>
          The hash is the contract. A changed profile or a changed UI is a new version; a changed byte
          under the same version is an integrity failure.
        </P>

        <H2 id="update">Updates</H2>
        <P>
          When the registry pins a version newer than the installed copy, the Aromatory adds an{" "}
          <b>Updates</b> section with <Code>Update to vX</Code>. The update path is the install path:
          fetch, verify the new manifest and every UI asset, run the gate, save, and replace the active
          copy. The old copy is not trusted because it was installed before.
        </P>
        <Ul
          items={[
            "The update is manual. Nothing replaces a working install in the background.",
            "A same-version manifest with different bytes is refused; the author must bump the version and resubmit.",
            "The registry is fetched with `cache: no-cache`; GitHub can still serve a stale copy for a few minutes. Reload the Aromatory if a just-approved version is missing.",
            "There is no silent downgrade. To roll back, install the previous version's manifest URL from source, if the author still hosts it.",
          ]}
        />
        <Callout kind="warn">
          There is no one-click rollback or signed revocation list in this release. If a version is bad,
          the author publishes a fixed version, the reviewer approves it, and users update. The report
          path is how the bad version is identified.
        </Callout>

        <H2 id="report">Report a problem with this Vial</H2>
        <P>
          The Vial runtime bar has <b>Report a problem</b>. It opens a prefilled issue with:
        </P>
        <Ul
          items={[
            "the Vial id, name, version, and author;",
            "the manifest sha256 and every verified UI asset sha256;",
            "the declared profile summary;",
            "the source URL and the host/rig diagnostics, including channel count, mode, port, and sample count;",
            "no recordings and no sensor data.",
          ]}
        />
        <P>
          If the manifest names a GitHub repository, the issue opens on the author&apos;s tracker. If it
          does not, it opens on the Osmograph tracker with <Code>[Vial report]</Code> in the title. The
          identity block is what lets the author reproduce the report instead of guessing which version
          the user had.
        </P>

        <H2 id="offline">Offline and local state</H2>
        <Table
          head={["Thing", "Needs network?", "Where it lives"]}
          rows={[
            ["Installed manifest", "No", "Local pack store"],
            ["Installed UI", "No", "Local UI cache, keyed by Vial id and version"],
            ["Registry list / update check", "Yes", "Fetched on Aromatory open; failure leaves installed Vials usable"],
            ["Fields and logs", "No", "Local storage for the Vial"],
            ["Report issue", "Yes", "Opens the system browser"],
          ]}
        />
        <P>
          Uninstalling removes the Vial from the active list. The saved manifest, cached UI, and local
          fields/logs remain in local storage until you delete the pack or its data. That is deliberate:
          an accidental uninstall should not destroy a batch log.
        </P>

        <H2 id="troubleshooting">Troubleshooting</H2>
        <Table
          head={["Symptom", "Cause", "Action"]}
          rows={[
            [
              "“Manifest changed upstream”",
              "The registry pins a hash that no longer matches the file.",
              "Ask the author to restore the file or publish a new version and resubmit. Do not bypass the check.",
            ],
            [
              "“UI asset does not match”",
              "The `ui.html` or `home.html` changed after review.",
              "Same as above. The UI is part of the reviewed program.",
            ],
            [
              "“Unknown bridge method”",
              "The UI calls an `osmograph.*` method that is not in the contract.",
              "Use only the documented bridge methods; the gate refuses the unknown call.",
            ],
            [
              "“This Vial's detection profile is compiled from its manifest”",
              "A v2 UI called `setDetection` or `setTransforms`.",
              "Publish a new manifest version with the profile change. Runtime override is legacy-only.",
            ],
            [
              "“All channels are silent or dead”",
              "The rig is not streaming, or every declared channel is flat.",
              "Check the link and the channel health. Detection stays off until the data supports it.",
            ],
            [
              "No update appears",
              "The registry has not updated, the version was not bumped, or GitHub is serving a cached file.",
              "Reload the Aromatory; verify the version and hash in the registry entry.",
            ],
            [
              "The workspace opens but the UI is blank",
              "The fragment failed its sandbox check or the script threw.",
              "Use Report a problem; the toast carries the UI error. Re-run `noses test` locally.",
            ],
          ]}
        />

        <H2 id="safety">The safety boundary</H2>
        <Ul
          items={[
            "A Vial cannot change the host's base detector or its alert level.",
            "A Vial cannot hide a dead, stuck, saturated, or noisy channel. The snapshot exposes health and limits.",
            "A Vial cannot arm before the host's baseline is ready when its profile requires readiness.",
            "A Vial cannot write outside its local state, open a network connection, or read another Vial's data.",
            "A Vial cannot turn a missing measurement into a number. The UI must render a refusal.",
          ]}
        />

        <div className="flex flex-wrap gap-3 mt-8">
          <Link href="/docs/vials/reference" className="hex-btn hex-btn-outline no-underline">
            Next: reference
          </Link>
          <Link href="/appstore" className="hex-btn hex-btn-outline no-underline">
            Open the Aromatory
          </Link>
        </div>
      </div>
    </div>
  )
}

// Server-side Vial registry automation.
//
// The desktop host is the authority on what can run: every install re-fetches
// the manifest, runs the local gate, and verifies the pinned hashes. This
// module is the *listing* gate. It turns a submitted manifest into a durable
// GitHub issue, validates it again at approval time, and writes the exact
// entry the Aromatory reads. A listing is a review of the claim and its
// evidence; it is never a signature and never replaces the host gate.

import { createHash, timingSafeEqual } from "node:crypto"
import { lookup } from "node:dns/promises"

export const VIAL_REPO_OWNER = "OpenSmell"
export const VIAL_REPO_NAME = "OpenSmell-web"
export const VIAL_REPO_BRANCH = "main"
export const VIAL_REGISTRY_PATH = "public/vials/registry.json"
const VIAL_ISSUE_PREFIX = "[Vial]"

const MAX_MANIFEST_BYTES = 1_500_000
const MAX_UI_BYTES = 512_000

export interface VialManifest {
  schema: "osmograph.domain-pack/2"
  id: string
  name: string
  version: string
  minHost?: string
  author: string
  license: string
  risk?: string
  domain: string
  tagline: string
  summary: string
  scope: string
  limits: string[]
  citations: string[]
  anomaly: Record<string, unknown>
  evidence: {
    grade: "A" | "B" | "C" | "D"
    reportUrl: string
    measuredAt: string
    dataset: string
    metrics: Record<string, number>
    fixtures: Array<{ id: string; file: string; expect: "normal" | "warning" | "critical" | "emergency" }>
  }
  ui?: { runtime: string; entry: string; height?: number }
  homeUi?: { runtime: string; entry: string; height?: number }
  [key: string]: unknown
}

export interface VialRegistryEntry {
  id: string
  name: string
  version: string
  author: string
  license: string
  domain: string
  tagline: string
  summary: string
  hasUi: boolean
  evidence: "A" | "B" | "C" | "D"
  schema: "osmograph.domain-pack/2"
  manifestUrl: string
  sourceUrl: string
  hash: string
  assets: Record<string, string>
  /** Hashes of the declared fixture files. The host does not execute these at
   *  runtime; they pin the evidence claim that review checked. */
  fixtures: Record<string, string>
  reviewedAt: string
  reviewedBy: string
  install: string
}

export interface VialSubmission {
  manifestUrl: string
  sourceUrl?: string
  evidenceUrl?: string
  name?: string
  author?: string
  email?: string
  notes?: string
}

export interface VialValidation {
  errors: string[]
  warnings: string[]
}

export interface PreparedVial {
  manifest: VialManifest
  manifestUrl: string
  manifestHash: string
  assets: Record<string, string>
  fixtures: Record<string, string>
  sourceUrl: string
  entry: VialRegistryEntry
}

export interface VialQueueItem {
  number: number
  title: string
  url: string
  createdAt: string
  author: string
  state: string
  submission: VialSubmission
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value)
}

function str(value: unknown): string {
  return typeof value === "string" ? value : ""
}

function sha256(text: string): string {
  return createHash("sha256").update(text, "utf8").digest("hex")
}

function httpsUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === "https:"
  } catch {
    return false
  }
}

function privateAddress(host: string): boolean {
  const value = host.toLowerCase().replace(/^\[|\]$/g, "")
  if (value === "localhost" || value.endsWith(".localhost") || value.endsWith(".local")) return true
  const v4 = value.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/)
  if (v4) {
    const [a, b] = [Number(v4[1]), Number(v4[2])]
    return a === 0 || a === 10 || a === 127
      || (a === 169 && b === 254)
      || (a === 172 && b >= 16 && b <= 31)
      || (a === 192 && b === 168)
      || (a === 100 && b >= 64 && b <= 127)
      || a >= 224
  }
  if (value.includes(":")) {
    return value === "::1"
      || value.startsWith("fc")
      || value.startsWith("fd")
      || value.startsWith("fe8")
      || value.startsWith("fe9")
      || value.startsWith("fea")
      || value.startsWith("feb")
      || value.startsWith("::ffff:127.")
      || value.startsWith("::ffff:10.")
      || value.startsWith("::ffff:192.168.")
  }
  return false
}

async function assertPublicHttps(value: string): Promise<URL> {
  if (!httpsUrl(value)) throw new Error("Every fetched URL must use HTTPS.")
  const url = new URL(value)
  if (privateAddress(url.hostname)) throw new Error("The URL points at a private or loopback address.")
  const addresses = await lookup(url.hostname, { all: true }).catch(() => [])
  if (addresses.some((entry) => privateAddress(entry.address))) {
    throw new Error("The URL resolves to a private or loopback address.")
  }
  return url
}

function versionTuple(value: string): [number, number, number] {
  const parts = value.split(".").map((n) => parseInt(n, 10) || 0)
  return [parts[0] ?? 0, parts[1] ?? 0, parts[2] ?? 0]
}

function versionGreater(a: string, b: string): boolean {
  const [a0, a1, a2] = versionTuple(a)
  const [b0, b1, b2] = versionTuple(b)
  return a0 > b0 || (a0 === b0 && (a1 > b1 || (a1 === b1 && a2 > b2)))
}

async function fetchText(
  input: string,
  maxBytes: number,
  timeoutMs: number,
): Promise<{ text: string; finalUrl: string }> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    let current = await assertPublicHttps(input)
    for (let hop = 0; hop < 5; hop += 1) {
      const response = await fetch(current, {
        headers: { Accept: "application/json, text/html;q=0.9, */*;q=0.1" },
        redirect: "manual",
        signal: controller.signal,
        cache: "no-store",
      })
      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get("location")
        if (!location) throw new Error(`${current.toString()} redirected without a Location header.`)
        current = await assertPublicHttps(new URL(location, current).toString())
        continue
      }
      if (!response.ok) throw new Error(`${current.toString()} returned HTTP ${response.status}.`)
      const declared = Number(response.headers.get("content-length") || "0")
      if (declared > maxBytes) throw new Error(`${current.toString()} is larger than the allowed size.`)
      const text = await response.text()
      if (Buffer.byteLength(text, "utf8") > maxBytes) throw new Error(`${current.toString()} is larger than the allowed size.`)
      return { text, finalUrl: current.toString() }
    }
    throw new Error(`${input} redirected too many times.`)
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(`${input} timed out after ${Math.round(timeoutMs / 1000)} seconds.`)
    }
    throw error
  } finally {
    clearTimeout(timer)
  }
}

function anomalyErrors(manifest: VialManifest, warnings: string[]): string[] {
  const errors: string[] = []
  const anomaly = isRecord(manifest.anomaly) ? manifest.anomaly : {}
  const baseline = isRecord(anomaly.baseline) ? anomaly.baseline : {}
  const transforms = isRecord(anomaly.transforms) ? anomaly.transforms : {}
  const detection = isRecord(anomaly.detection) ? anomaly.detection : {}
  const escalation = isRecord(detection.escalation) ? detection.escalation : {}
  const admissibility = isRecord(anomaly.admissibility) ? anomaly.admissibility : {}
  const num = (source: Record<string, unknown>, key: string): number => {
    const value = source[key]
    return typeof value === "number" && Number.isFinite(value) ? value : NaN
  }
  const warmup = num(baseline, "warmupS")
  const r0 = num(baseline, "r0WindowS")
  const sensitivity = num(detection, "sensitivity")
  const minChannels = num(detection, "minChannels")
  const levelBudget = num(detection, "levelBudget")
  const levelRefS = num(detection, "levelRefS")
  const alertThreshold = num(detection, "alertThreshold")
  const hysteresis = num(detection, "hysteresis")
  const warningS = num(escalation, "warningS")
  const criticalS = num(escalation, "criticalS")
  const emergencyS = num(escalation, "emergencyS")
  const resetNormalS = num(escalation, "resetNormalS")
  const coverage = num(admissibility, "minCoverage")
  const protocol = str(baseline.protocol)
  const response = str(transforms.response)
  const conditioning = transforms.conditioning
  if (protocol !== "first-n" && protocol !== "session-mean") errors.push("anomaly.baseline.protocol must be first-n or session-mean.")
  if (response !== "delta-over-r0" && response !== "relative" && response !== "delta") errors.push("anomaly.transforms.response must be delta-over-r0, relative, or delta.")
  if (conditioning !== undefined) {
    if (!Array.isArray(conditioning)) errors.push("anomaly.transforms.conditioning must be an array.")
    else for (const step of conditioning) {
      if (str(step) !== "median3") errors.push(`anomaly.transforms.conditioning has an unsupported step: ${str(step)}.`)
    }
  }
  if (!(warmup >= 0.5 && warmup <= 86400)) errors.push("anomaly.baseline.warmupS must be between 0.5 and 86400 seconds.")
  if (!(r0 >= 0.5 && r0 <= 3600)) errors.push("anomaly.baseline.r0WindowS must be between 0.5 and 3600 seconds.")
  if (r0 > warmup) warnings.push("anomaly.baseline.r0WindowS is longer than warmupS; the UI will use fewer early samples than declared.")
  if (!(sensitivity >= 0.1 && sensitivity <= 10)) errors.push("anomaly.detection.sensitivity must be between 0.1 and 10.")
  if (!(minChannels >= 1) || !Number.isInteger(minChannels) || minChannels > 32) errors.push("anomaly.detection.minChannels must be an integer between 1 and 32.")
  if (detection.enabled !== undefined && typeof detection.enabled !== "boolean") errors.push("anomaly.detection.enabled must be true or false.")
  if (!(levelBudget >= 0 && levelBudget <= 12)) errors.push("anomaly.detection.levelBudget must be between 0 and 12 sigma.")
  if (!(levelRefS >= 0 && levelRefS <= 86400)) errors.push("anomaly.detection.levelRefS must be between 0 and 86400 seconds.")
  if (levelRefS > 0 && levelBudget === 0) errors.push("anomaly.detection.levelRefS needs a non-zero levelBudget.")
  if (!(alertThreshold >= 0 && alertThreshold <= 1)) errors.push("anomaly.detection.alertThreshold must be between 0 and 1.")
  if (!(hysteresis >= 0 && hysteresis <= 0.95)) errors.push("anomaly.detection.hysteresis must be between 0 and 0.95.")
  if (!(warningS > 0 && warningS <= 86400)) errors.push("anomaly.detection.escalation.warningS must be between 0 and 86400 seconds.")
  if (!(criticalS >= warningS && criticalS <= 86400)) errors.push("anomaly.detection.escalation.criticalS must be at least warningS and at most 86400 seconds.")
  if (!(emergencyS >= criticalS && emergencyS <= 86400)) errors.push("anomaly.detection.escalation.emergencyS must be at least criticalS and at most 86400 seconds.")
  if (!(resetNormalS > 0 && resetNormalS <= 86400)) errors.push("anomaly.detection.escalation.resetNormalS must be between 0 and 86400 seconds.")
  if (admissibility.requireBaseline !== undefined && admissibility.requireBaseline !== "ready" && admissibility.requireBaseline !== "any") {
    errors.push("anomaly.admissibility.requireBaseline must be ready or any.")
  }
  if (!(coverage >= 0 && coverage <= 1)) errors.push("anomaly.admissibility.minCoverage must be between 0 and 1.")
  const limits = detection.perChannelLimits
  if (limits !== undefined) {
    if (!isRecord(limits)) {
      errors.push("anomaly.detection.perChannelLimits must be an object keyed by channel id.")
    } else {
      for (const [channel, value] of Object.entries(limits)) {
        if (!/^[a-z0-9][a-z0-9_-]{0,47}$/i.test(channel)) errors.push(`Invalid channel id in perChannelLimits: ${channel}.`)
        if (typeof value !== "number" || !Number.isFinite(value) || value <= 0 || value > 1e9) errors.push(`perChannelLimits.${channel} must be between 0 and 1,000,000,000.`)
      }
    }
  }
  const far = detection.farTargetPerMonth
  if (far !== undefined && far !== null && (typeof far !== "number" || !Number.isFinite(far) || far < 0 || far > 1e6)) {
    errors.push("anomaly.detection.farTargetPerMonth must be a number between 0 and 1,000,000, or null.")
  }
  if (warningS > 0 && warningS < 1) warnings.push("detection.escalation.warningS is under one second; a fast transient can become an alert.")
  if (far === undefined || far === null) warnings.push("No farTargetPerMonth is declared; the profile states no deployment false-alarm budget.")
  return errors
}

/** Validate the parts of a v2 manifest that a listing depends on. The host
 *  still runs the full sandbox and overclaim gate on install. */
export function validateVialManifest(
  value: unknown,
  manifestUrl: string,
): { manifest: VialManifest; validation: VialValidation } {
  const errors: string[] = []
  const warnings: string[] = []
  if (!isRecord(value)) throw new Error("The manifest is not a JSON object.")
  if (value.schema !== "osmograph.domain-pack/2") {
    throw new Error("A registry listing requires osmograph.domain-pack/2. Legacy /1 manifests are installable but cannot be listed.")
  }
  const manifest = value as unknown as VialManifest
  if (!/^[a-z0-9][a-z0-9._-]{2,80}$/.test(str(manifest.id))) errors.push("id must be a stable lowercase publisher.slug (3–80 characters).")
  if (!/^[a-z0-9][a-z0-9._-]{2,80}$/.test(manifest.id?.split(".").pop() || "")) errors.push("id must include a publisher prefix, for example publisher.slug.")
  if (str(manifest.name).trim().length < 2) errors.push("name is required.")
  if (!/^\d+\.\d+\.\d+/.test(str(manifest.version))) errors.push("version must be semver, for example 0.1.0.")
  if (str(manifest.author).trim().length < 2) errors.push("author is required.")
  if (str(manifest.license).trim().length < 2) errors.push("license is required.")
  if (str(manifest.domain).trim().length < 2) errors.push("domain is required.")
  if (str(manifest.tagline).trim().length < 10) errors.push("tagline must be at least 10 characters.")
  if (str(manifest.summary).trim().length < 20) errors.push("summary must be at least 20 characters.")
  if (str(manifest.scope).trim().length < 30) errors.push("scope must state the decision this Vial supports (30+ characters).")
  if (!Array.isArray(manifest.limits) || !manifest.limits.length || manifest.limits.some((l) => str(l).trim().length < 10)) {
    errors.push("limits must list at least one operating-envelope condition (10+ characters each).")
  }
  if (!Array.isArray(manifest.citations) || !manifest.citations.length || manifest.citations.some((c) => str(c).trim().length < 10)) {
    errors.push("citations must contain at least one real reference.")
  }
  if (!["low", "medium", "high", "critical"].includes(str(manifest.risk))) errors.push("risk must be low, medium, high, or critical.")
  if (!isRecord(manifest.anomaly)) errors.push("anomaly is required: baseline, transforms, detection, escalation.")
  else errors.push(...anomalyErrors(manifest, warnings))

  const evidence = manifest.evidence
  if (!isRecord(evidence)) {
    errors.push("evidence is required for a listing: grade, reportUrl, dataset, metrics, fixtures.")
  } else {
    if (!["A", "B", "C", "D"].includes(str(evidence.grade))) errors.push("evidence.grade must be A, B, C, or D.")
    if (!httpsUrl(str(evidence.reportUrl))) errors.push("evidence.reportUrl must be an HTTPS URL to the held-out report.")
    if (str(evidence.dataset).trim().length < 10) errors.push("evidence.dataset must describe the corpus and rig.")
    if (!/^\d{4}-\d{2}-\d{2}/.test(str(evidence.measuredAt))) errors.push("evidence.measuredAt must be an ISO date.")
    const metrics = isRecord(evidence.metrics) ? evidence.metrics : {}
    const hasNumber = ["farPerMonth", "latencyS", "mde", "nSamples", "nAlarms"].some((key) => {
      const n = metrics[key]
      return typeof n === "number" && Number.isFinite(n) && n >= 0
    })
    if (!hasNumber) errors.push("evidence.metrics needs at least one measured number (farPerMonth, latencyS, mde, nSamples, or nAlarms).")
    if (!Array.isArray(evidence.fixtures) || !evidence.fixtures.length) {
      errors.push("evidence.fixtures needs at least one declarative case so `noses test` can check the profile.")
    } else {
      for (const fixture of evidence.fixtures) {
        if (!isRecord(fixture) || !str(fixture.id) || !/^fixtures\/[a-z0-9][a-z0-9._-]*\.json$/i.test(str(fixture.file))) {
          errors.push("Each fixture needs an id and a fixtures/<name>.json path.")
          break
        }
        if (!["normal", "warning", "critical", "emergency"].includes(str(fixture.expect))) {
          errors.push("Each fixture expect must be normal, warning, critical, or emergency.")
          break
        }
      }
    }
  }

  for (const [key, spec] of [["ui", manifest.ui], ["homeUi", manifest.homeUi]] as const) {
    if (spec === undefined) continue
    if (!isRecord(spec) || spec.runtime !== "sandbox/1") errors.push(`${key}.runtime must be sandbox/1.`)
    else if (!/^[a-z0-9][a-z0-9._-]*\.html$/i.test(str(spec.entry)) || str(spec.entry).includes("..")) {
      errors.push(`${key}.entry must be a relative .html filename beside the manifest.`)
    }
  }

  const text = JSON.stringify(manifest)
  if (/REPLACE ME|TODO|TBD|yourname|your-handle|example\.(?:com|org|net)/i.test(text)) {
    errors.push("The manifest still contains a placeholder (REPLACE ME, TODO, TBD, yourname, your-handle, or an example domain).")
  }
  if (!httpsUrl(manifestUrl)) errors.push("manifestUrl must be HTTPS.")

  return { manifest, validation: { errors: [...new Set(errors)], warnings } }
}

async function hashUiAssets(
  manifest: VialManifest,
  manifestUrl: string,
): Promise<Record<string, string>> {
  const assets: Record<string, string> = {}
  for (const spec of [manifest.ui, manifest.homeUi]) {
    if (!spec) continue
    const url = new URL(spec.entry, manifestUrl).toString()
    const { text } = await fetchText(url, MAX_UI_BYTES, 15_000)
    if (!text.trim()) throw new Error(`${spec.entry} is empty.`)
    assertUiFragment(text, spec.entry, Boolean(manifest.anomaly))
    assets[spec.entry] = sha256(text)
  }
  return assets
}

function assertUiFragment(text: string, entry: string, v2: boolean): void {
  if (/<!doctype|<html[\s>]|<head[\s>]|<body[\s>]|<base[\s>]/i.test(text)) {
    throw new Error(`${entry} must be a body fragment, not a full HTML document.`)
  }
  if (/<(?:script|iframe|object|embed|link)[^>]+(?:src|href)\s*=/i.test(text)) {
    throw new Error(`${entry} references an external script, frame, object, or stylesheet.`)
  }
  if (/<(?:img|source|video|audio)[^>]+src\s*=\s*["'](?!#|data:)/i.test(text)) {
    throw new Error(`${entry} references a remote image or media file.`)
  }
  if (/javascript\s*:/i.test(text)) throw new Error(`${entry} uses a javascript: URL.`)
  if (/\b(?:fetch|XMLHttpRequest|WebSocket|EventSource)\s*\(/i.test(text)) {
    throw new Error(`${entry} uses the network; the sandbox has no network access.`)
  }
  if (/\b(?:localStorage|sessionStorage|indexedDB)\b/i.test(text)) {
    throw new Error(`${entry} uses browser storage; the sandbox has no storage access.`)
  }
  if (/\beval\s*\(|new\s+Function\s*\(/i.test(text)) {
    throw new Error(`${entry} evaluates strings as code.`)
  }
  if (v2 && /\b(?:setDetection|setTransforms)\b/.test(text)) {
    throw new Error(`${entry} calls a legacy detector override. The v2 profile is compiled from the manifest.`)
  }
  const allowed = new Set([
    "version", "onData", "action", "ready", "toast",
    "setDetection", "setTransforms", "setTrajectory",
  ])
  for (const match of text.matchAll(/osmograph\.([A-Za-z_$][\w$]*)/g)) {
    if (!allowed.has(match[1])) {
      throw new Error(`${entry} calls an unknown osmograph method: ${match[1]}.`)
    }
  }
}

async function hashFixtures(
  manifest: VialManifest,
  manifestUrl: string,
): Promise<Record<string, string>> {
  const fixtures: Record<string, string> = {}
  for (const fixture of manifest.evidence.fixtures) {
    const url = new URL(fixture.file, manifestUrl).toString()
    const { text } = await fetchText(url, MAX_UI_BYTES, 15_000)
    fixtures[fixture.file] = sha256(text)
  }
  return fixtures
}

function entryFromManifest(
  manifest: VialManifest,
  manifestUrl: string,
  sourceUrl: string,
  manifestHash: string,
  assets: Record<string, string>,
  fixtures: Record<string, string>,
): VialRegistryEntry {
  return {
    id: manifest.id,
    name: manifest.name,
    version: manifest.version,
    author: manifest.author,
    license: manifest.license,
    domain: manifest.domain,
    tagline: manifest.tagline,
    summary: manifest.summary,
    hasUi: !!(manifest.ui || manifest.homeUi),
    evidence: manifest.evidence.grade,
    schema: "osmograph.domain-pack/2",
    manifestUrl,
    sourceUrl,
    hash: manifestHash,
    assets,
    fixtures,
    reviewedAt: new Date().toISOString().slice(0, 10),
    reviewedBy: "OpenSmell review",
    install: "Install from the Aromatory, or paste the manifest URL in Osmograph → Vials.",
  }
}

/** Fetch, validate, and pin a manifest. This is the only function that turns
 *  an untrusted URL into a registry entry. */
export async function prepareVial(manifestUrl: string, sourceUrl?: string): Promise<PreparedVial> {
  if (!httpsUrl(manifestUrl)) throw new Error("manifestUrl must be an HTTPS URL.")
  const { text, finalUrl } = await fetchText(manifestUrl, MAX_MANIFEST_BYTES, 20_000)
  let parsed: unknown
  try {
    parsed = JSON.parse(text)
  } catch {
    throw new Error("The manifest is not valid JSON.")
  }
  const { manifest, validation } = validateVialManifest(parsed, finalUrl)
  if (validation.errors.length) {
    throw new Error(`Manifest rejected: ${validation.errors.slice(0, 4).join(" ")}`)
  }
  const manifestHash = sha256(text)
  const assets = await hashUiAssets(manifest, finalUrl)
  const fixtures = await hashFixtures(manifest, finalUrl)
  const source = sourceUrl && httpsUrl(sourceUrl) ? sourceUrl : finalUrl
  return {
    manifest,
    manifestUrl: finalUrl,
    manifestHash,
    assets,
    fixtures,
    sourceUrl: source,
    entry: entryFromManifest(manifest, finalUrl, source, manifestHash, assets, fixtures),
  }
}

// === GitHub issue queue ===

function githubToken(): string {
  const token = process.env.GITHUB_TOKEN
  if (!token) throw new Error("GITHUB_TOKEN is not configured. Set it in the deployment environment to enable the Vial registry queue.")
  return token
}

async function github(path: string, init: RequestInit = {}): Promise<Response> {
  const response = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${githubToken()}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init.headers || {}),
    },
    cache: "no-store",
  })
  return response
}

export function submissionBlock(submission: VialSubmission, prepared: PreparedVial): string {
  // Base64 inside an HTML comment: author-supplied notes cannot break a code
  // fence or inject a second machine-readable block.
  const payload = Buffer.from(JSON.stringify({
    ...submission,
    manifestUrl: prepared.manifestUrl,
    sourceUrl: prepared.sourceUrl,
    submittedHash: prepared.manifestHash,
    assets: prepared.assets,
    fixtures: prepared.fixtures,
  }), "utf8").toString("base64")
  return [`<!-- vial-submission/v2`, payload, "-->"].join("\n")
}

export async function createSubmissionIssue(
  submission: VialSubmission,
  prepared: PreparedVial,
): Promise<{ number: number; url: string }> {
  const body = [
    `## Vial submission: ${prepared.manifest.name}`,
    "",
    `- **Id:** \`${prepared.manifest.id}\``,
    `- **Version:** \`${prepared.manifest.version}\``,
    `- **Author:** ${prepared.manifest.author}`,
    `- **Manifest:** ${prepared.manifestUrl}`,
    `- **Source:** ${prepared.sourceUrl}`,
    `- **Evidence:** ${prepared.manifest.evidence.reportUrl}`,
    `- **Manifest sha256:** \`${prepared.manifestHash}\``,
    `- **UI assets:** ${Object.keys(prepared.assets).length ? Object.keys(prepared.assets).map((name) => `\`${name}\``).join(", ") : "none"}`,
    `- **Fixtures:** ${Object.keys(prepared.fixtures).length ? Object.keys(prepared.fixtures).map((name) => `\`${name}\``).join(", ") : "none"}`,
    submission.notes ? `\n**Notes:** ${submission.notes}` : "",
    "",
    "### Review",
    "",
    "A maintainer must approve this in `/admin`. Approval re-fetches the manifest,",
    "re-validates it, and refuses if the bytes changed since submission.",
    "",
    submissionBlock(submission, prepared),
  ].join("\n")
  const response = await github(`/repos/${VIAL_REPO_OWNER}/${VIAL_REPO_NAME}/issues`, {
    method: "POST",
    body: JSON.stringify({
      title: `${VIAL_ISSUE_PREFIX} ${prepared.manifest.id}@${prepared.manifest.version}`,
      body,
    }),
  })
  const data = await response.json().catch(() => null) as { number?: number; html_url?: string; message?: string } | null
  if (!response.ok || !data?.number) {
    throw new Error(data?.message || "GitHub could not create the submission issue.")
  }
  return { number: data.number, url: data.html_url || "" }
}

export function parseSubmission(body: string): VialSubmission & { submittedHash?: string; assets?: Record<string, string>; fixtures?: Record<string, string> } {
  let parsed: unknown
  const v2 = [...body.matchAll(/<!--\s*vial-submission\/v2\s*([A-Za-z0-9+/=\s]+?)-->/gi)]
  if (v2.length) {
    const payload = v2[v2.length - 1][1].replace(/\s+/g, "")
    try {
      parsed = JSON.parse(Buffer.from(payload, "base64").toString("utf8"))
    } catch {
      throw new Error("The Vial submission block is not valid base64 JSON.")
    }
  } else {
    const v1 = [...body.matchAll(/<!--\s*vial-submission\/v1\s*-->\s*```json\s*([\s\S]*?)```/gi)]
    if (!v1.length) throw new Error("The issue has no machine-readable Vial submission block.")
    try {
      parsed = JSON.parse(v1[v1.length - 1][1])
    } catch {
      throw new Error("The Vial submission block is not valid JSON.")
    }
  }
  if (!isRecord(parsed)) throw new Error("The Vial submission block is not an object.")
  return {
    manifestUrl: str(parsed.manifestUrl),
    sourceUrl: str(parsed.sourceUrl) || undefined,
    evidenceUrl: str(parsed.evidenceUrl) || undefined,
    name: str(parsed.name) || undefined,
    author: str(parsed.author) || undefined,
    email: str(parsed.email) || undefined,
    notes: str(parsed.notes) || undefined,
    submittedHash: str(parsed.submittedHash) || undefined,
    assets: isRecord(parsed.assets)
      ? Object.fromEntries(Object.entries(parsed.assets).filter(([, value]) => typeof value === "string")) as Record<string, string>
      : undefined,
    fixtures: isRecord(parsed.fixtures)
      ? Object.fromEntries(Object.entries(parsed.fixtures).filter(([, value]) => typeof value === "string")) as Record<string, string>
      : undefined,
  }
}

export async function listSubmissionIssues(): Promise<VialQueueItem[]> {
  // No label dependency: a fresh repository should not need a manual setup step
  // before the first submission can be queued. A Vial issue is identified by
  // its title prefix and its machine-readable submission block.
  const response = await github(
    `/repos/${VIAL_REPO_OWNER}/${VIAL_REPO_NAME}/issues?state=open&per_page=100&sort=created&direction=desc`,
  )
  const data = await response.json().catch(() => null) as Array<Record<string, unknown>> | { message?: string } | null
  if (!response.ok || !Array.isArray(data)) {
    throw new Error((data && "message" in data && typeof data.message === "string" ? data.message : "") || "GitHub could not list the Vial queue.")
  }
  return data.flatMap((issue) => {
    const title = str(issue.title)
    if (!title.startsWith(VIAL_ISSUE_PREFIX)) return []
    const body = str(issue.body)
    try {
      const submission = parseSubmission(body)
      return [{
        number: Number(issue.number),
        title,
        url: str(issue.html_url),
        createdAt: str(issue.created_at),
        author: isRecord(issue.user) ? str(issue.user.login) : "",
        state: str(issue.state),
        submission,
      }]
    } catch {
      return []
    }
  })
}

async function readRegistry(): Promise<{ data: { schema: string; updated?: string; vials: VialRegistryEntry[]; [key: string]: unknown }; sha: string; raw: string }> {
  const response = await github(`/repos/${VIAL_REPO_OWNER}/${VIAL_REPO_NAME}/contents/${VIAL_REGISTRY_PATH}?ref=${VIAL_REPO_BRANCH}`)
  const data = await response.json().catch(() => null) as { content?: string; sha?: string; message?: string } | null
  if (!response.ok || !data?.content || !data.sha) {
    throw new Error(data?.message || "Could not read the registry.")
  }
  const text = Buffer.from(data.content.replace(/\s/g, ""), "base64").toString("utf8")
  const parsed = JSON.parse(text) as { schema?: string; updated?: string; vials?: VialRegistryEntry[] }
  if (!parsed || !Array.isArray(parsed.vials)) throw new Error("The registry has no vials list.")
  return {
    data: { ...parsed, schema: parsed.schema || "osmograph.vial-registry/1", vials: parsed.vials },
    sha: data.sha,
    raw: text,
  }
}

async function writeRegistry(
  registry: { schema: string; updated?: string; vials: VialRegistryEntry[]; [key: string]: unknown },
  sha: string,
  entry: VialRegistryEntry,
): Promise<{ commitUrl: string }> {
  const existingIndex = registry.vials.findIndex((vial) => vial.id === entry.id)
  if (existingIndex >= 0) {
    const existing = registry.vials[existingIndex]
    if (!versionGreater(entry.version, existing.version) && entry.hash !== existing.hash) {
      throw new Error(`${entry.id}@${entry.version} is already listed. Bump the version before approving a changed manifest.`)
    }
    registry.vials[existingIndex] = entry
  } else {
    // Keep the list stable and reviewable: alphabetical by id.
    registry.vials.push(entry)
    registry.vials.sort((a, b) => a.id.localeCompare(b.id))
  }
  registry.updated = new Date().toISOString().slice(0, 10)
  const content = `${JSON.stringify(registry, null, 2)}\n`
  const response = await github(`/repos/${VIAL_REPO_OWNER}/${VIAL_REPO_NAME}/contents/${VIAL_REGISTRY_PATH}`, {
    method: "PUT",
    body: JSON.stringify({
      message: `registry: approve ${entry.id}@${entry.version}`,
      content: Buffer.from(content, "utf8").toString("base64"),
      sha,
      branch: VIAL_REPO_BRANCH,
    }),
  })
  const data = await response.json().catch(() => null) as { commit?: { html_url?: string }; message?: string } | null
  if (!response.ok) throw new Error(data?.message || "Could not write the registry.")
  return { commitUrl: data?.commit?.html_url || "" }
}

async function commentAndClose(issueNumber: number, decision: "approve" | "reject", message: string, close = true): Promise<void> {
  await github(`/repos/${VIAL_REPO_OWNER}/${VIAL_REPO_NAME}/issues/${issueNumber}/comments`, {
    method: "POST",
    body: JSON.stringify({ body: message }),
  })
  if (close) {
    await github(`/repos/${VIAL_REPO_OWNER}/${VIAL_REPO_NAME}/issues/${issueNumber}`, {
      method: "PATCH",
      body: JSON.stringify({
        state: "closed",
        state_reason: decision === "approve" ? "completed" : "not_planned",
      }),
    })
  }
}

export async function reviewVialSubmission(
  issueNumber: number,
  decision: "approve" | "reject",
): Promise<{ ok: boolean; message: string; commitUrl?: string; entry?: VialRegistryEntry }> {
  const issueResponse = await github(`/repos/${VIAL_REPO_OWNER}/${VIAL_REPO_NAME}/issues/${issueNumber}`)
  const issue = await issueResponse.json().catch(() => null) as { title?: string; body?: string; message?: string; state?: string } | null
  if (!issueResponse.ok || !issue) throw new Error(issue?.message || "Could not read that issue.")
  if (issue.state === "closed") throw new Error("That submission is already closed.")
  const submission = parseSubmission(str(issue.body))
  if (!submission.manifestUrl) throw new Error("The submission has no manifest URL.")

  if (decision === "reject") {
    await commentAndClose(issueNumber, "reject", "Rejected in `/admin`. The manifest was not listed. Resubmit after fixing the validation or evidence gaps.")
    return { ok: true, message: "Submission rejected." }
  }

  // Re-fetch at approval time. A manifest that changed after submission is not
  // the manifest a maintainer reviewed.
  if (!submission.submittedHash) {
    throw new Error("This submission predates hash pinning. Ask the author to resubmit.")
  }
  const prepared = await prepareVial(submission.manifestUrl, submission.sourceUrl)
  if (prepared.manifestUrl !== submission.manifestUrl) {
    throw new Error("The manifest URL redirected differently at approval time. Refusing to list an unreviewed source; ask the author to resubmit.")
  }
  if (prepared.manifestHash !== submission.submittedHash) {
    throw new Error("The manifest changed after submission. Refusing to list unreviewed bytes; ask the author to resubmit.")
  }
  const assetNames = Object.keys(prepared.assets).sort()
  const submittedAssetNames = Object.keys(submission.assets || {}).sort()
  if (assetNames.join("\n") !== submittedAssetNames.join("\n")) {
    throw new Error("The UI asset set changed after submission. Refusing to list unreviewed bytes; ask the author to resubmit.")
  }
  for (const [name, expected] of Object.entries(submission.assets || {})) {
    if (prepared.assets[name] !== expected) {
      throw new Error(`${name} changed after submission. Refusing to list unreviewed UI bytes; ask the author to resubmit.`)
    }
  }
  const fixtureNames = Object.keys(prepared.fixtures).sort()
  const submittedFixtureNames = Object.keys(submission.fixtures || {}).sort()
  if (fixtureNames.join("\n") !== submittedFixtureNames.join("\n")) {
    throw new Error("The fixture set changed after submission. Refusing to list unreviewed evidence; ask the author to resubmit.")
  }
  for (const [name, expected] of Object.entries(submission.fixtures || {})) {
    if (prepared.fixtures[name] !== expected) {
      throw new Error(`${name} changed after submission. Refusing to list unreviewed fixture bytes; ask the author to resubmit.`)
    }
  }
  const registry = await readRegistry()
  const write = await writeRegistry(registry.data, registry.sha, prepared.entry)
  await commentAndClose(
    issueNumber,
    "approve",
    `Listed \`${prepared.entry.id}@${prepared.entry.version}\` in the Aromatory.\n\n- Manifest sha256: \`${prepared.entry.hash}\`\n- UI assets: ${Object.keys(prepared.entry.assets).length ? Object.entries(prepared.entry.assets).map(([name, hash]) => `\`${name}\` \`${hash}\``).join(", ") : "none"}\n- Fixtures: ${Object.keys(prepared.entry.fixtures).length ? Object.entries(prepared.entry.fixtures).map(([name, hash]) => `\`${name}\` \`${hash}\``).join(", ") : "none"}\n- Evidence grade: ${prepared.entry.evidence}\n\nEvery install still re-runs the host gate and verifies the manifest and UI hashes; the fixture pins record the evidence claim that was reviewed.`,
  )
  return { ok: true, message: `Listed ${prepared.entry.id}@${prepared.entry.version}.`, commitUrl: write.commitUrl, entry: prepared.entry }
}

// === Admin auth ===

export function assertAdmin(request: Request): void {
  const expected = process.env.VIAL_ADMIN_TOKEN
  if (!expected) throw new Error("VIAL_ADMIN_TOKEN is not configured. Set it to enable Vial review.")
  const header = request.headers.get("authorization") || ""
  const supplied = header.startsWith("Bearer ") ? header.slice(7) : request.headers.get("x-vial-admin") || ""
  const a = Buffer.from(supplied)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    throw new Error("Not authorized.")
  }
}

import {
  sensorById,
  buildBom,
  WIRING_CHECKLIST,
  FIRMWARE_NOTES,
  TROUBLESHOOTING,
  MQ_ADC1_PINS,
  I2C_PINS,
  ENCLOSURE_SPECS,
  REPO_LINKS,
  CONTROLLERS,
  SAFETY_NOTES,
  COMMON_MISTAKES,
  TIPS,
  BREADBOARD_GUIDE,
  BUILD_FLOW,
} from "@/lib/e-nose/data"
import type { PlanInput } from "@/lib/e-nose/data"
import { buildRigSvg } from "@/lib/e-nose/rig-svg"

const PAGE_W = 210
const PAGE_H = 297
const M = 14
const BOTTOM = PAGE_H - M

const CP1252_SPECIAL = new Set([
  0x20ac, 0x2013, 0x2014, 0x2018, 0x2019, 0x201a, 0x201c, 0x201d, 0x201e, 0x2020, 0x2021,
  0x2022, 0x2026, 0x2030, 0x2039, 0x203a, 0x02c6, 0x02dc, 0x0152, 0x0153, 0x0160, 0x0161,
  0x0178, 0x017d, 0x017e, 0x0192, 0x2122,
])
const REPLACEMENTS: [RegExp, string][] = [
  [/→/g, "->"],
  [/Ω/g, "ohm"],
  [/≈/g, "~"],
  [/≥/g, ">="],
  [/≤/g, "<="],
  [/±/g, "+/-"],
  [/✓/g, "yes"],
  [/₀/g, "0"],
  [/₁/g, "1"],
  [/₂/g, "2"],
  [/₃/g, "3"],
  [/₄/g, "4"],
  [/₅/g, "5"],
  [/₆/g, "6"],
  [/₇/g, "7"],
  [/₈/g, "8"],
  [/₉/g, "9"],
]
const CP1252_UNASSIGNED = new Set([0x81, 0x8d, 0x8f, 0x90, 0x9d])

function sanitize(text: string): string {
  let out = text
  for (const [re, sub] of REPLACEMENTS) out = out.replace(re, sub)
  let result = ""
  for (const ch of out) {
    const cp = ch.codePointAt(0)!
    if ((cp <= 0xff && !CP1252_UNASSIGNED.has(cp)) || CP1252_SPECIAL.has(cp)) {
      result += ch
    } else {
      result += "?"
    }
  }
  return result
}

let y = 0
let doc: any = null

function ensure(needed: number) {
  if (y + needed > BOTTOM) {
    doc.addPage()
    y = M
  }
}

function rule() {
  doc.setDrawColor(180)
  doc.setLineWidth(0.3)
  doc.line(M, y, PAGE_W - M, y)
  y += 4
}

function heading(text: string) {
  text = sanitize(text)
  ensure(16)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(11.5)
  doc.text(text, M, y)
  y += 1.5
  rule()
}

function subheading(text: string) {
  text = sanitize(text)
  ensure(10)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(9.5)
  doc.text(text, M, y)
  y += 4.5
}

function para(text: string, size = 9, opts?: { bold?: boolean; muted?: boolean }) {
  text = sanitize(text)
  doc.setFont("helvetica", opts?.bold ? "bold" : "normal")
  doc.setFontSize(size)
  if (opts?.muted) doc.setTextColor(120)
  else doc.setTextColor(40)
  const lines = doc.splitTextToSize(text, PAGE_W - M * 2)
  for (const ln of lines) {
    ensure(5)
    doc.text(ln, M, y)
    y += 4.4
  }
  y += 1.5
}

function bullet(text: string) {
  text = sanitize(text)
  doc.setFont("helvetica", "normal")
  doc.setFontSize(9)
  doc.setTextColor(40)
  const lines = doc.splitTextToSize(text, PAGE_W - M * 2 - 6)
  lines.forEach((ln: string, i: number) => {
    ensure(5)
    doc.text(i === 0 ? "•  " + ln : "   " + ln, M, y)
    y += 4.4
  })
  y += 1
}

function note(text: string) {
  text = sanitize(text)
  ensure(8)
  const lines = doc.splitTextToSize(text, PAGE_W - M * 2)
  doc.setFont("helvetica", "italic")
  doc.setFontSize(8)
  doc.setTextColor(120)
  for (const ln of lines) {
    ensure(4.2)
    doc.text(ln, M, y)
    y += 4
  }
  y += 1.5
}

function callout(text: string) {
  text = sanitize(text)
  const boxW = PAGE_W - M * 2
  const pad = 4
  const lines = doc.splitTextToSize(text, boxW - pad * 2)
  const boxH = lines.length * 4.4 + pad * 2
  ensure(boxH + 4)
  doc.setDrawColor(150)
  doc.setLineWidth(0.4)
  doc.rect(M, y, boxW, boxH)
  doc.setFont("helvetica", "normal")
  doc.setFontSize(9)
  doc.setTextColor(40)
  lines.forEach((ln: string, i: number) => {
    doc.text(ln, M + pad, y + pad + 3.4 + i * 4.4)
  })
  y += boxH + 4
}

interface TableCol {
  title: string
  width: number
}

function table(cols: TableCol[], rows: (string[] | string)[][], opts?: { mutedRows?: Set<number> }) {
  const mutedRows = opts?.mutedRows ?? new Set<number>()
  cols = cols.map((c) => ({ ...c, title: sanitize(c.title) }))
  rows = rows.map((row) =>
    row.map((cell) => (typeof cell === "string" ? sanitize(cell) : cell.map(sanitize))),
  )
  const colX: number[] = []
  let x = M
  cols.forEach((c) => {
    colX.push(x)
    x += c.width
  })
  const cellPad = 1.6
  const rowH = (rows: (string | string[])[]) => {
    let max = 1
    rows.forEach((cell, i) => {
      const w = cols[i].width - cellPad * 2
      const n = doc.splitTextToSize(cell, w).length
      max = Math.max(max, n)
    })
    return max * 4.2 + 3.2
  }
  const headerH = 7
  ensure(headerH + 4)
  doc.setTextColor(120)
  cols.forEach((c, i) => {
    doc.setFont("helvetica", "bold")
    doc.setFontSize(8)
    doc.rect(colX[i], y, c.width, headerH)
    doc.text(c.title, colX[i] + cellPad, y + 4.8)
  })
  y += headerH
  doc.setFont("helvetica", "normal")
  doc.setFontSize(8)
  rows.forEach((row, ri) => {
    const h = rowH(row)
    ensure(h)
    let rowLines: string[][] = []
    row.forEach((cell, i) => {
      const w = cols[i].width - cellPad * 2
      rowLines.push(doc.splitTextToSize(cell, w))
    })
    const muted = mutedRows.has(ri)
    if (muted) doc.setTextColor(150)
    else doc.setTextColor(40)
    row.forEach((_, i) => {
      doc.rect(colX[i], y, cols[i].width, h)
      rowLines[i].forEach((ln: string, j: number) => {
        doc.text(ln, colX[i] + cellPad, y + 3.6 + j * 4.2)
      })
    })
    y += h
  })
  y += 3
}

// Rasterizes an SVG string to a PNG data URL using the browser's native
// SVG→canvas pipeline (no canvg dependency), at a fixed pixel density so the
// figure stays crisp in the PDF. Resolves with "" if rasterization fails.
function rasterizeSvgToPng(svg: string, pxPerMm: number): Promise<string> {
  return new Promise<string>((resolve) => {
    const img = new Image()
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    img.onload = () => {
      try {
        const pxW = Math.round((PAGE_W - M * 2) * pxPerMm)
        const pxH = Math.round(pxW * (520 / 640))
        const canvas = document.createElement("canvas")
        canvas.width = pxW
        canvas.height = pxH
        const ctx = canvas.getContext("2d")
        if (!ctx) {
          resolve("")
          return
        }
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(0, 0, pxW, pxH)
        ctx.drawImage(img, 0, 0, pxW, pxH)
        resolve(canvas.toDataURL("image/png"))
      } catch {
        resolve("")
      } finally {
        URL.revokeObjectURL(url)
      }
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      resolve("")
    }
    img.src = url
  })
}

async function createDoc(input: PlanInput): Promise<any> {
  ;({ doc } = await import("jspdf").then((m) => ({ doc: new m.jsPDF({ unit: "mm", format: "a4" }) })))
  y = M

  const sensors = input.sensors.map(sensorById).filter(Boolean) as NonNullable<ReturnType<typeof sensorById>>[]
  const mqCount = sensors.filter((s) => s.kind === "mox-analog").length
  const digital = sensors.filter((s) => s.kind === "mox-digital")
  const hasDigital = digital.length > 0
  const bom = buildBom(input)

  doc.setTextColor(40)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(20)
  doc.text("OpenSmell · E-Nose Build Plan", M, y + 6)
  y += 12

  doc.setFont("helvetica", "normal")
  doc.setFontSize(9)
  const summary = `${input.goal} — ${sensors.length} sensor${sensors.length > 1 ? "s" : ""}`
  para(summary, 10, { bold: true })
  para("Generated by the OpenSmell builder. Every part, pin, and step is sourced from the open electronic-nose reference build — verify against the repo before you order.", 8, { muted: true })
  y += 2

  heading("Your rig")
  const rigW = 150
  const rigH = (rigW * 520) / 640
  ensure(rigH + 8)
  const svg = buildRigSvg(
    sensors.map((s) => ({ id: s.id, name: s.name, kind: s.kind })),
    { color: "#1a1a1a" },
  )
  const png = await rasterizeSvgToPng(svg, 4)
  if (png) {
    doc.addImage(png, "PNG", (PAGE_W - rigW) / 2, y, rigW, rigH)
  } else {
    // Rasterization unavailable — keep the plan usable without the schematic
    // rather than failing the whole document.
    doc.setDrawColor(150)
    doc.setLineWidth(0.3)
    doc.rect((PAGE_W - rigW) / 2, y, rigW, rigH)
    doc.setFont("helvetica", "italic")
    doc.setFontSize(8)
    doc.setTextColor(120)
    doc.text(
      "Schematic unavailable — see the repo's wiring reference.",
      PAGE_W / 2,
      y + rigH / 2,
      { align: "center" },
    )
  }
  y += rigH + 4
  note("Schematic: the sensor array on a breadboard, wired to the ESP32. Pin numbers shown at each tap.")

  heading("How to use this plan")
  para("Build in this order — each step checks the one before it:", 9)
  BUILD_FLOW.forEach((s) => {
    bullet(`${s.step}. ${s.title} — ${s.desc}`)
  })

  heading("Sensors")
  table(
    [
      { title: "Sensor", width: 34 },
      { title: "Detects", width: 60 },
      { title: "Interface", width: 30 },
      { title: "Support", width: 58 },
    ],
    sensors.map((s) => [s.name, s.target, s.io, s.support === "full" ? "Full — in the standard kit" : s.support === "partial" ? "Hardware-ready · DIY firmware" : "Needs extra hardware"]),
  )
  para("The MQ family is fully supported today: one-click Osmograph flash, standard wiring, and channel mapping into the 6-channel encoder. Digital sensors are wireable and data-compatible, but need the PlatformIO firmware pattern.", 8.5, { muted: true })

  heading("Controllers")
  table(
    [
      { title: "Board", width: 42 },
      { title: "ADC inputs", width: 46 },
      { title: "Wireless", width: 34 },
      { title: "Fit", width: 60 },
    ],
    CONTROLLERS.map((c) => [c.name, c.adc, c.wireless, c.fit]),
  )
  para("The ESP32 is the recommended board — Osmograph flashes it one-click and its ADC1 pins are WiFi-safe. Other controllers work if you already own one: they share the same CSV stream contract, but need pin remaps, fewer channels, or a USB-only host.", 8.5, { muted: true })

  heading("Bill of materials")
  table(
    [
      { title: "Item", width: 78 },
      { title: "Qty", width: 14 },
      { title: "Purpose", width: 90 },
    ],
    bom.map((b) => [(b.optional ? b.item + " (optional)" : b.item), b.qty, b.purpose]),
    { mutedRows: new Set(bom.map((b, i) => (b.optional ? i : -1)).filter((i) => i >= 0)) },
  )
  para(`Prices are intentionally not listed — they vary by region. Source locally where possible. Two 10 kΩ resistors are needed per MQ sensor for the voltage divider. ${BREADBOARD_GUIDE.footprint}`, 8)

  heading("Wiring")
  if (mqCount > 0) {
    para("Each MQ sensor connects to a unique ADC1 GPIO. ADC1 is WiFi-safe on the ESP32 (avoid ADC2 pins 25/26 when recording over WiFi).", 8.5)
    table(
      [
        { title: "MQ sensor", width: 40 },
        { title: "GPIO (ADC1)", width: 40 },
        { title: "Notes", width: 102 },
      ],
      sensors
        .filter((s) => s.kind === "mox-analog")
        .map((s, i) => [s.name, MQ_ADC1_PINS[i] ?? "—", "AO → two equal 10 kΩ resistors → GPIO (half-voltage divider)" + (i === 0 ? "; VCC → 5 V rail; GND → common ground; DO ignored" : "")]),
    )
  }
  if (hasDigital) {
    para(
      `Digital sensors join the I²C bus: VDD → 3.3 V, GND → common ground, SDA → ${I2C_PINS.sda}, SCL → ${I2C_PINS.scl}. They do not need a voltage divider.`,
      8.5,
    )
  }

  heading("Wiring checklist")
  WIRING_CHECKLIST.forEach(bullet)

  heading("Before you power up — safety")
  SAFETY_NOTES.forEach(bullet)

  heading("Common mistakes")
  COMMON_MISTAKES.forEach(([m, f]) => {
    bullet(`${m} — ${f}`)
  })

  heading("Firmware")
  para(hasDigital ? FIRMWARE_NOTES.withDigital : FIRMWARE_NOTES.mqOnly, 9)
  para(FIRMWARE_NOTES.stream, 8, { muted: true })

  heading("Burn-in & first test")
  bullet("New metal-oxide sensors need ~24 cumulative hours powered on before readings stabilise. The clock does not reset if power is interrupted.")
  bullet("Before every recording session, let the sensors warm up for 5 minutes.")
  bullet("Flash the firmware, open the serial monitor at 115200 baud, and confirm comma-separated numbers stream steadily.")
  bullet("Crush a clove of garlic, bring it near the array — the numbers should rise or fall clearly, then drift back over 30–60 seconds.")

  heading("After flashing — tips")
  TIPS.forEach(bullet)

  heading("Calibration")
  para(
    "The OpenSmell calibration pipeline translates a new device's voltages into the shared representation OpenSmell apps understand. The Osmograph Calibration Wizard is under active development. Within-session experiments work now: record one substance, record another, and compare the sensor traces and latent vectors.",
    8.5,
  )

  heading("Enclosure")
  bullet(ENCLOSURE_SPECS.summary)
  bullet(ENCLOSURE_SPECS.base)
  bullet(ENCLOSURE_SPECS.lid)
  bullet(ENCLOSURE_SPECS.clearance)
  bullet(ENCLOSURE_SPECS.airflow)

  heading("Troubleshooting")
  table(
    [
      { title: "Symptom", width: 52 },
      { title: "Likely cause", width: 52 },
      { title: "Fix", width: 78 },
    ],
    TROUBLESHOOTING,
  )

  heading("Get help")
  callout(
    `Discuss your build on the OpenSmell Discord before you order or power anything. Builders share rig photos, catch mistakes early, and details that change between batches get flagged there first. Join at ${REPO_LINKS.discord} — mention your sensor list and goal.`,
  )
  para(
    "Cross-check every connection against this plan before applying power. This is open-source documentation maintained by hand and by community fixes — wiring, pin numbers, and part behaviour can vary between boards and sensor clones. Start with one sensor, prove it works, then grow the array.",
    8.5,
  )

  doc.setTextColor(40)
  doc.setFont("helvetica", "normal")
  doc.setFontSize(8)
  para("Sources: electronic-nose reference repo (BOM, WIRING, BUILD, ENCLOSURE, EXPERIMENT). Calibration and digital-sensor software are under active development — treat those capabilities as in-progress, not finished. This plan is provided as-is; verify before you order or power anything.", 8, { muted: true })

  const pages = doc.getNumberOfPages()
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i)
    doc.setFont("helvetica", "normal")
    doc.setFontSize(7.5)
    doc.setTextColor(150)
    doc.text("OpenSmell · open hardware / open data / open software", M, PAGE_H - 8)
    doc.text(`Page ${i} of ${pages} · ${REPO_LINKS.repo}`, PAGE_W - M, PAGE_H - 8, { align: "right" })
  }

  return doc
}

export async function buildPlanBlob(input: PlanInput): Promise<Blob> {
  const d = await createDoc(input)
  return d.output("blob")
}

export async function buildPlanPdf(input: PlanInput): Promise<void> {
  const d = await createDoc(input)
  const stamp = new Date().toISOString().slice(0, 10)
  d.save(`opensmell-enose-build-plan-${stamp}.pdf`)
}

"use client"

import type { SensorKind } from "@/lib/e-nose/data"
import { MQ_ADC1_PINS, I2C_PINS } from "@/lib/e-nose/data"

interface Module {
  id: string
  name: string
  kind: SensorKind
}

interface EnoseRigProps {
  sensors: Module[]
  activeId?: string
  className?: string
}

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace"
const LEFT = 140
const RIGHT = 500
const CY = 230
const BOARD = { x: 252, y: 340, w: 136, h: 58 }
const ELBOW = 306
const I2C_TAP = { x: 388, y: 356 }

function hexPoints(cx: number, cy: number, r: number): string {
  const x1 = cx - r * 0.866
  const x2 = cx + r * 0.866
  return `${cx},${cy - r} ${x2},${cy - r / 2} ${x2},${cy + r / 2} ${cx},${cy + r} ${x1},${cy + r / 2} ${x1},${cy - r / 2}`
}

function layout(sensors: Module[]) {
  const n = Math.max(1, sensors.length)
  const spacing = (RIGHT - LEFT) / n
  const r = Math.max(16, Math.min(38, spacing * 0.42))
  const analogFirst = [...sensors].sort((a, b) => (a.kind === "mox-analog" ? -1 : 1) - (b.kind === "mox-analog" ? -1 : 1))
  const centers = analogFirst.map((_, i) => LEFT + spacing * (i + 0.5))
  return { n, r, centers, analogFirst }
}

export function EnoseRig({ sensors, activeId, className }: EnoseRigProps) {
  const { r, centers, analogFirst } = layout(sensors)
  const analogCount = analogFirst.filter((s) => s.kind === "mox-analog").length
  const digital = analogFirst.filter((s) => s.kind !== "mox-analog")

  const analogTaps = Array.from({ length: analogCount }, (_, i) => BOARD.x + (BOARD.w / (analogCount + 1)) * (i + 1))
  let analogIdx = 0

  const chipW = r * 2
  const chipH = r * 1.25
  const chipCx = digital.length > 0 ? centers[centers.length - digital.length] : 0

  return (
    <svg
      viewBox="0 0 640 520"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <circle cx="320" cy="300" r="290" strokeWidth="1" opacity="0.05" />
      <circle cx="320" cy="300" r="242" strokeWidth="1" opacity="0.07" />
      <circle cx="320" cy="300" r="194" strokeWidth="1" opacity="0.09" />
      <polygon
        points="320,95 465,171 465,339 320,415 175,339 175,171"
        strokeWidth="1.5"
        opacity="0.3"
      />

      <g strokeWidth="1.5" opacity="0.9">
        <path d="M286,78 L354,78 L354,148 L286,148 Z" />
      </g>
      <rect x="282" y="66" width="76" height="12" rx="2" strokeWidth="1.2" opacity="0.5" />
      <g strokeWidth="1.2" opacity="0.7">
        <path d="M317,122 L323,114 L330,121 L327,132 L319,137 L311,131 Z" />
      </g>
      <g strokeWidth="1.2" opacity="0.4">
        <path d="M298,56 q8,-8 16,0" />
        <path d="M308,46 q8,-8 16,0" />
      </g>

      {analogFirst.map((mod, i) => {
        const cx = centers[i]
        if (mod.kind === "mox-analog") {
          const pin = MQ_ADC1_PINS[analogIdx]
          const tap = analogTaps[analogIdx]
          analogIdx++
          const isActive = activeId === mod.id
          return (
            <g key={mod.id}>
              <g strokeWidth="1.6" opacity="0.9">
                <polygon points={hexPoints(cx, CY, r)} />
                <circle cx={cx} cy={CY} r={r * 0.35} strokeWidth="1.2" opacity="0.5" />
                {[CY - r * 0.16, CY - r * 0.05, CY + r * 0.05, CY + r * 0.16].map((y) => (
                  <path key={y} d={`M${cx - r * 0.24},${y} L${cx + r * 0.24},${y}`} strokeWidth="1" opacity="0.5" />
                ))}
                <circle cx={cx} cy={CY} r={r * 0.08} fill="currentColor" opacity="0.6" />
                <path d={`M${cx - 7},${CY + r + 2} L${cx - 7},${CY + r + 12}`} strokeWidth="1.2" />
                <path d={`M${cx + 7},${CY + r + 2} L${cx + 7},${CY + r + 12}`} strokeWidth="1.2" />
              </g>
              {isActive && (
                <circle cx={cx} cy={CY} r={r + 6} strokeWidth="1.5" strokeDasharray="4 4" opacity="0.8" />
              )}
              <text
                x={cx}
                y={CY - r - 12}
                fontSize={r > 26 ? 11 : 9}
                fill="currentColor"
                opacity={isActive ? 0.95 : 0.75}
                fontFamily={MONO}
                textAnchor="middle"
              >
                {mod.name}
              </text>
              <path
                d={`M${cx},${CY + r} L${cx},${ELBOW} L${tap},${ELBOW} L${tap},${BOARD.y}`}
                strokeWidth="1.2"
                opacity="0.75"
              />
              <text
                x={tap}
                y={BOARD.y - 6}
                fontSize="7"
                fill="currentColor"
                opacity="0.5"
                fontFamily={MONO}
                textAnchor="middle"
              >
                {pin.replace("GPIO", "")}
              </text>
            </g>
          )
        }
        return null
      })}

      {digital.map((mod) => {
        const isActive = activeId === mod.id
        const top = CY - chipH / 2
        return (
          <g key={mod.id}>
            <g strokeWidth="1.4" opacity="0.85">
              <rect x={chipCx - chipW / 2} y={top} width={chipW} height={chipH} rx="6" />
              <rect x={chipCx - chipW * 0.32} y={CY - chipH * 0.3} width={chipW * 0.64} height={chipH * 0.6} rx="2" />
              <circle cx={chipCx} cy={CY} r={r * 0.08} fill="currentColor" opacity="0.6" />
              {[-10, -3, 3, 10].map((dx) => (
                <path key={dx} d={`M${chipCx + dx},${CY + chipH / 2} L${chipCx + dx},${CY + chipH / 2 + 6}`} strokeWidth="1.2" />
              ))}
            </g>
            {isActive && (
              <rect
                x={chipCx - chipW / 2 - 6}
                y={top - 6}
                width={chipW + 12}
                height={chipH + 12}
                rx="10"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.8"
              />
            )}
            <text
              x={chipCx}
              y={top - 12}
              fontSize={r > 26 ? 11 : 9}
              fill="currentColor"
              opacity={isActive ? 0.95 : 0.75}
              fontFamily={MONO}
              textAnchor="middle"
            >
              {mod.name}
            </text>
            <path
              d={`M${chipCx},${CY + chipH / 2 + 6} L${chipCx},${I2C_TAP.y} L${I2C_TAP.x},${I2C_TAP.y}`}
              strokeWidth="1.2"
              strokeDasharray="4 4"
              opacity="0.6"
            />
            <circle cx={I2C_TAP.x} cy={I2C_TAP.y} r="2.5" fill="currentColor" opacity="0.6" />
            <text
              x={I2C_TAP.x - 5}
              y={I2C_TAP.y - 8}
              fontSize="8"
              fill="currentColor"
              opacity="0.6"
              fontFamily={MONO}
              textAnchor="end"
            >
              I²C · {I2C_PINS.sda.replace("GPIO", "SDA")}/{I2C_PINS.scl.replace("GPIO", "SCL")}
            </text>
          </g>
        )
      })}

      <g strokeWidth="1.4" opacity="0.85">
        <rect x={BOARD.x} y={BOARD.y} width={BOARD.w} height={BOARD.h} />
        <rect x={238} y={BOARD.y + 22} width="14" height="24" />
      </g>
      <g strokeWidth="1" opacity="0.6">
        <rect x="290" y={BOARD.y + 20} width="60" height="36" />
      </g>
      <g strokeWidth="1" opacity="0.6">
        {[BOARD.y + 6, BOARD.y + 14, BOARD.y + 22, BOARD.y + 30, BOARD.y + 38, BOARD.y + 46].map((y) => (
          <g key={y}>
            <path d={`M248,${y} L256,${y}`} />
            <path d={`M384,${y} L392,${y}`} />
          </g>
        ))}
      </g>
      <text x="320" y={BOARD.y - 12} fontSize="10" fill="currentColor" opacity="0.8" fontFamily={MONO} textAnchor="middle">
        ESP32
      </text>

      <g strokeWidth="1.2" opacity="0.6">
        <path d="M272,398 L272,430" />
        <path d="M372,398 L372,430" />
      </g>
      <g fill="currentColor">
        <circle cx="272" cy="430" r="2" opacity="0.55" />
        <circle cx="372" cy="430" r="2" opacity="0.55" />
      </g>

      <g strokeWidth="1.4" opacity="0.85">
        <rect x="150" y="430" width="340" height="52" />
      </g>
      <line x1="150" y1="456" x2="490" y2="456" strokeWidth="1" opacity="0.4" />
      <g fill="currentColor" opacity="0.35">
        {[166, 190, 214, 238, 262, 286, 310, 334, 358, 382, 406, 430, 454, 478].map((x) => (
          <g key={x}>
            <circle cx={x} cy="442" r="1.7" />
            <circle cx={x} cy="470" r="1.7" />
          </g>
        ))}
      </g>

      <path d="M168,430 L168,298" strokeWidth="1" opacity="0.55" />
      <path d="M472,430 L472,298" strokeWidth="1" opacity="0.55" />
      <path d="M168,298 L182,298" strokeWidth="1" opacity="0.35" />
      <path d="M458,298 L472,298" strokeWidth="1" opacity="0.35" />
      <text x="178" y="292" fontSize="8" fill="currentColor" opacity="0.6" fontFamily={MONO}>
        5V
      </text>
      <text x="462" y="292" fontSize="8" fill="currentColor" opacity="0.6" fontFamily={MONO} textAnchor="end">
        GND
      </text>
      <g fill="currentColor">
        <circle cx="168" cy="430" r="2" opacity="0.55" />
        <circle cx="472" cy="430" r="2" opacity="0.55" />
      </g>

      <text x="320" y="500" fontSize="9" fill="currentColor" opacity="0.5" fontFamily={MONO} textAnchor="middle">
        BREADBOARD
      </text>
    </svg>
  )
}

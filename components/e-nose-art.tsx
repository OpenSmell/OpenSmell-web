"use client"

interface EnoseArtProps {
  className?: string
}

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace"

const tickXs = Array.from({ length: 18 }, (_, i) => 32 + i * 32)
const tickYs = Array.from({ length: 18 }, (_, i) => 32 + i * 32)
const tieXs = Array.from({ length: 13 }, (_, i) => 162 + i * 26)

const hexes: { cx: number; cy: number; label: string }[] = [
  { cx: 225, cy: 268, label: "MQ-135" },
  { cx: 320, cy: 268, label: "MQ-3" },
  { cx: 415, cy: 268, label: "MQ-7" },
]

export function EnoseArt({ className }: EnoseArtProps) {
  return (
    <svg
      viewBox="0 0 640 640"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <circle cx="320" cy="340" r="300" strokeWidth="1" opacity="0.05" />
      <circle cx="320" cy="340" r="252" strokeWidth="1" opacity="0.07" />
      <circle cx="320" cy="340" r="204" strokeWidth="1" opacity="0.09" />

      <polygon
        points="320,150 467,227 467,397 320,474 173,397 173,227"
        strokeWidth="1.5"
        opacity="0.35"
      />
      <polygon
        points="320,174 440.4,241.6 440.4,358.4 320,426 199.6,358.4 199.6,241.6"
        strokeWidth="0.75"
        strokeDasharray="6 6"
        opacity="0.22"
      />

      <g strokeWidth="1" opacity="0.5">
        <polygon points="150,128 161.3,134.5 161.3,147.5 150,154 138.7,147.5 138.7,134.5" />
        <polygon points="490,120 499.5,125.5 499.5,136.5 490,142 480.5,136.5 480.5,125.5" />
        <polygon points="126,321 133.8,325 133.8,335 126,339 118.2,335 118.2,325" />
        <polygon points="516,351 523.8,355 523.8,365 516,369 508.2,365 508.2,355" />
      </g>

      <g fill="currentColor">
        <circle cx="161.3" cy="147.5" r="3" opacity="0.4" />
        <circle cx="490" cy="142" r="3" opacity="0.4" />
        <circle cx="133.8" cy="325" r="2.5" opacity="0.35" />
        <circle cx="516" cy="369" r="2.5" opacity="0.35" />
      </g>

      <g strokeWidth="1" opacity="0.4">
        <path d="M20,24 L28,24 M24,20 L24,28" />
        <path d="M612,24 L620,24 M616,20 L616,28" />
        <path d="M20,612 L28,612 M24,616 L24,608" />
      </g>

      <g strokeWidth="1.5" opacity="0.9">
        <path d="M286,86 L354,86 L354,170 L286,170 Z" />
      </g>
      <rect x="282" y="74" width="76" height="12" rx="2" strokeWidth="1.2" opacity="0.5" />
      <g strokeWidth="1.2" opacity="0.7">
        <path d="M317,140 L323,132 L330,139 L327,150 L319,155 L311,149 Z" />
        <path d="M336,142 L340,138 L345,142 L343,149 L337,151 Z" />
      </g>
      <g strokeWidth="1.2" opacity="0.4">
        <path d="M298,64 q8,-8 16,0" />
        <path d="M308,54 q8,-8 16,0" />
        <path d="M318,44 q8,-8 16,0" />
      </g>
      <path d="M354,120 L392,120 L392,134" strokeWidth="1" opacity="0.5" />
      <text
        x="396"
        y="138"
        fontSize="9"
        fill="currentColor"
        opacity="0.55"
        fontFamily={MONO}
      >
        sample
      </text>

      {hexes.map((h) => {
        const x1 = h.cx - 32.9
        const x2 = h.cx + 32.9
        const top = h.cy - 38
        const bottom = h.cy + 38
        return (
          <g key={h.label} strokeWidth="1.6" opacity="0.9">
            <polygon
              points={`${h.cx},${top} ${x2},${h.cy - 19} ${x2},${h.cy + 19} ${h.cx},${bottom} ${x1},${h.cy + 19} ${x1},${h.cy - 19}`}
            />
            <circle cx={h.cx} cy={h.cy} r="13" strokeWidth="1.2" opacity="0.5" />
            {[h.cy - 6, h.cy - 2, h.cy + 2, h.cy + 6].map((y) => (
              <path
                key={y}
                d={`M${h.cx - 9},${y} L${h.cx + 9},${y}`}
                strokeWidth="1"
                opacity="0.5"
              />
            ))}
            <circle cx={h.cx} cy={h.cy} r="3" fill="currentColor" opacity="0.6" />
            <path d={`M${h.cx - 9},300 L${h.cx - 9},314`} strokeWidth="1.2" />
            <path d={`M${h.cx + 9},300 L${h.cx + 9},314`} strokeWidth="1.2" />
          </g>
        )
      })}

      {hexes.map((h) => (
        <text
          key={h.label}
          x={h.cx}
          y={h.cy - 52}
          fontSize="11"
          fill="currentColor"
          opacity="0.8"
          fontFamily={MONO}
          textAnchor="middle"
        >
          {h.label}
        </text>
      ))}

      <line x1="168" y1="316" x2="472" y2="316" strokeWidth="1" opacity="0.3" />
      <path d="M168,490 L168,316" strokeWidth="1" opacity="0.55" />
      <path d="M472,490 L472,316" strokeWidth="1" opacity="0.55" />
      <text x="176" y="310" fontSize="8" fill="currentColor" opacity="0.6" fontFamily={MONO}>
        5V
      </text>
      <text
        x="464"
        y="310"
        fontSize="8"
        fill="currentColor"
        opacity="0.6"
        fontFamily={MONO}
        textAnchor="end"
      >
        GND
      </text>
      <g fill="currentColor">
        {[168, 472, 225, 320, 415].map((x) => (
          <circle key={x} cx={x} cy="316" r="2" opacity="0.6" />
        ))}
      </g>

      <g strokeWidth="1.2" opacity="0.75">
        <polyline points="225,306 225,330 277,330 277,360" />
        <polyline points="320,306 320,360" />
        <polyline points="415,306 415,330 363,330 363,360" />
      </g>
      <g fill="currentColor">
        <circle cx="277" cy="330" r="2" opacity="0.55" />
        <circle cx="363" cy="330" r="2" opacity="0.55" />
      </g>
      <text x="277" y="350" fontSize="8" fill="currentColor" opacity="0.5" fontFamily={MONO} textAnchor="middle">
        34
      </text>
      <text x="320" y="350" fontSize="8" fill="currentColor" opacity="0.5" fontFamily={MONO} textAnchor="middle">
        35
      </text>
      <text x="363" y="350" fontSize="8" fill="currentColor" opacity="0.5" fontFamily={MONO} textAnchor="middle">
        32
      </text>

      <g strokeWidth="1.4" opacity="0.85">
        <rect x="252" y="360" width="136" height="76" />
        <rect x="238" y="382" width="14" height="26" />
      </g>
      <g strokeWidth="1" opacity="0.6">
        <rect x="290" y="380" width="60" height="40" />
      </g>
      <g strokeWidth="1" opacity="0.6">
        {tickYs.filter((y) => y >= 366 && y <= 428).map((y) => (
          <g key={y}>
            <path d={`M248,${y} L256,${y}`} />
            <path d={`M384,${y} L392,${y}`} />
          </g>
        ))}
      </g>
      <text x="320" y="452" fontSize="10" fill="currentColor" opacity="0.8" fontFamily={MONO} textAnchor="middle">
        ESP32 · WROOM-32
      </text>

      <g strokeWidth="1.2" opacity="0.6">
        <path d="M268,436 L268,490" />
        <path d="M372,436 L372,490" />
      </g>
      <g fill="currentColor">
        <circle cx="268" cy="490" r="2" opacity="0.55" />
        <circle cx="372" cy="490" r="2" opacity="0.55" />
      </g>

      <g strokeWidth="1.4" opacity="0.85">
        <rect x="150" y="490" width="340" height="62" />
      </g>
      <line x1="150" y1="521" x2="490" y2="521" strokeWidth="1" opacity="0.4" />
      <g fill="currentColor" opacity="0.35">
        {tieXs.map((x) => (
          <g key={x}>
            <circle cx={x} cy="502" r="1.8" />
            <circle cx={x} cy="540" r="1.8" />
          </g>
        ))}
      </g>
      <text x="320" y="566" fontSize="9" fill="currentColor" opacity="0.55" fontFamily={MONO} textAnchor="middle">
        BREADBOARD
      </text>

      <g strokeWidth="1" opacity="0.5">
        <line x1="150" y1="586" x2="490" y2="586" />
        <path d="M150,580 L150,592" />
        <path d="M490,580 L490,592" />
        <path d="M156,586 L150,582 L150,590 Z" />
        <path d="M484,586 L490,582 L490,590 Z" />
      </g>
      <text x="320" y="580" fontSize="9" fill="currentColor" opacity="0.6" fontFamily={MONO} textAnchor="middle">
        120 mm
      </text>

      <g strokeWidth="1" opacity="0.4">
        <rect x="470" y="598" width="158" height="34" />
      </g>
      <text x="478" y="612" fontSize="9" fill="currentColor" opacity="0.7" fontFamily={MONO}>
        OPENSMELL
      </text>
      <text x="478" y="624" fontSize="8" fill="currentColor" opacity="0.6" fontFamily={MONO}>
        E-NOSE · RIG · REV 1
      </text>
    </svg>
  )
}

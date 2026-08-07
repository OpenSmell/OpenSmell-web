"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Cpu, Database, Hexagon, Sigma, ExternalLink } from "lucide-react"

const PILLARS = [
  {
    icon: Cpu,
    title: "Open Hardware",
    desc: "Reference e-nose design from off-the-shelf parts. No PCB milling, no proprietary modules.",
    href: "/enose",
    internal: true,
  },
  {
    icon: Database,
    title: "Open Data",
    desc: "Community Data Commons for shared, device-invariant training data.",
    href: "https://github.com/opensmell/data-commons",
    internal: false,
  },
  {
    icon: Hexagon,
    title: "Open Protocol",
    desc: "Standardised recording procedure so temporal features stay reproducible across devices.",
    href: "https://github.com/opensmell/interoperability",
    internal: false,
  },
  {
    icon: Sigma,
    title: "Open Software",
    desc: "Osmograph zero-code GUI plus a Python SDK. Flash firmware, record, and classify with clicks.",
    href: "/osmograph",
    internal: true,
  },
]

const STEP = 90
const CARD_W = 224
const CARD_H = 288
const R = 180

function facing(angle: number) {
  let d = angle % 360
  if (d < 0) d += 360
  return d > 180 ? d - 360 : d
}

export default function OpenStack() {
  const [rotation, setRotation] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [hover, setHover] = useState(false)
  const [manual, setManual] = useState(false)
  const rotRef = useRef(0)
  const drag = useRef<{ startX: number; startRot: number; moved: boolean } | null>(null)
  const movedRef = useRef(false)

  const setRot = (v: number) => {
    rotRef.current = v
    setRotation(v)
  }

  useEffect(() => {
    if (manual || hover || dragging) return
    const t = setInterval(() => setRot(rotRef.current + 0.4), 30)
    return () => clearInterval(t)
  }, [manual, hover, dragging])

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setManual(true)
    setDragging(true)
    movedRef.current = false
    drag.current = { startX: e.clientX, startRot: rotRef.current, moved: false }
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return
    const dx = e.clientX - drag.current.startX
    if (Math.abs(dx) > 6) {
      drag.current.moved = true
      movedRef.current = true
    }
    setRot(drag.current.startRot + dx * 0.5)
  }

  const endDrag = () => {
    if (!drag.current) return
    drag.current = null
    setDragging(false)
    setRot(Math.round(rotRef.current / STEP) * STEP)
  }

  return (
    <div className="select-none">
      <div className="flex items-center justify-center gap-4 mb-10">
        <button
          type="button"
          aria-label="Rotate previous"
          onClick={() => {
            setManual(true)
            setRot(rotRef.current + STEP)
          }}
          className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div
          className="relative h-[360px] w-full max-w-3xl"
          style={{ perspective: "1200px", touchAction: "pan-y" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerEnter={() => setHover(true)}
          onPointerLeave={() => setHover(false)}
          onClickCapture={(e) => {
            if (movedRef.current) {
              e.preventDefault()
              e.stopPropagation()
              movedRef.current = false
            }
          }}
        >
          <div
            className="absolute left-1/2 top-1/2 h-full w-full"
            style={{ transformStyle: "preserve-3d", transform: `translateZ(${-R}px) rotateY(${rotation}deg)` }}
          >
            {PILLARS.map((p, i) => {
              const angle = i * STEP
              const d = facing(angle - rotRef.current)
              const front = Math.abs(d) < 30
              const dim = Math.min(1, 0.35 + (0.65 * (90 - Math.min(90, Math.abs(d)))) / 90)
              return (
                <div
                  key={p.title}
                  className="absolute"
                  style={{
                    width: CARD_W,
                    height: CARD_H,
                    left: `calc(50% - ${CARD_W / 2}px)`,
                    top: `calc(50% - ${CARD_H / 2}px)`,
                    transform: `rotateY(${angle}deg) translateZ(${R}px) rotateY(${-angle}deg)`,
                    opacity: dragging || front ? 1 : dim,
                    pointerEvents: dragging ? "none" : "auto",
                    transition: dragging ? "none" : "opacity 200ms ease",
                  }}
                >
                  {p.internal ? (
                    <Link
                      href={p.href}
                      className="hex-box flex flex-col h-full border border-border bg-background p-6 hover:bg-foreground hover:text-background transition-colors duration-300"
                    >
                      <CardBody p={p} front={front} />
                    </Link>
                  ) : (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hex-box flex flex-col h-full border border-border bg-background p-6 hover:bg-foreground hover:text-background transition-colors duration-300"
                    >
                      <CardBody p={p} front={front} />
                    </a>
                  )}
                </div>
              )
            })}
          </div>
        </div>
        <button
          type="button"
          aria-label="Rotate next"
          onClick={() => {
            setManual(true)
            setRot(rotRef.current - STEP)
          }}
          className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <p className="text-center text-xs text-muted-foreground font-mono uppercase tracking-widest">
        drag to spin · click a card
      </p>
    </div>
  )
}

function CardBody({ p, front }: { p: (typeof PILLARS)[number]; front: boolean }) {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <p.icon className="w-7 h-7" />
        {!p.internal && <ExternalLink className="w-4 h-4 opacity-50" />}
      </div>
      <h3 className="text-xl font-bold tracking-tight mb-3">{p.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed flex-1">{p.desc}</p>
      <div className={`text-sm font-medium mt-6 flex items-center gap-2 ${front ? "text-foreground" : "text-muted-foreground"}`}>
        Open
      </div>
    </>
  )
}

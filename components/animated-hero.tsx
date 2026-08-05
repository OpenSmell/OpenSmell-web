"use client"

import { useEffect, useRef } from "react"

interface HexCell {
  x: number; y: number; size: number; phase: number; baseAlpha: number
}

interface EvapParticle {
  x: number; y: number; vx: number; vy: number
  radius: number; alpha: number; life: number; maxLife: number; wobble: number
}

interface Molecule {
  atoms: { x: number; y: number; r: number }[]
  bonds: [number, number][]
  x: number; y: number; vx: number; vy: number
  rotation: number; rotSpeed: number; scale: number
}

function pointInTriangle(
  px: number, py: number,
  ax: number, ay: number,
  bx: number, by: number,
  cx: number, cy: number,
) {
  const d1 = (px - bx) * (ay - by) - (ax - bx) * (py - by)
  const d2 = (px - cx) * (by - cy) - (bx - cx) * (py - cy)
  const d3 = (px - ax) * (cy - ay) - (cx - ax) * (py - ay)
  const hasNeg = d1 < 0 || d2 < 0 || d3 < 0
  const hasPos = d1 > 0 || d2 > 0 || d3 > 0
  return !(hasNeg && hasPos)
}

export default function AnimatedHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animFrame: number
    let visible = true
    let mouse = { x: -1000, y: -1000 }
    let hexes: HexCell[] = []
    let particles: EvapParticle[] = []
    let molecules: Molecule[] = []
    const HEX_SIZE = 48

    const molDefs = [
      { atoms: [{ x: 0, y: 0, r: 1 }, { x: 1.8, y: 1.4, r: 0.7 }, { x: 1.8, y: -1.4, r: 0.7 }], bonds: [[0, 1], [0, 2]] },
      { atoms: [{ x: 0, y: 0, r: 1.2 }, { x: 2, y: 0, r: 0.8 }, { x: -1, y: 1.8, r: 0.8 }, { x: -1, y: -1.8, r: 0.8 }], bonds: [[0, 1], [0, 2], [0, 3]] },
      { atoms: [{ x: 0, y: 0, r: 0.8 }, { x: 1.8, y: 0.9, r: 0.7 }, { x: 1.8, y: -0.9, r: 0.7 }, { x: -1.4, y: 1.4, r: 0.6 }, { x: -1.4, y: -1.4, r: 0.6 }], bonds: [[0, 1], [0, 2], [0, 3], [0, 4]] },
      { atoms: [{ x: 0, y: 0, r: 1 }, { x: 2, y: 0, r: 0.7 }, { x: 1, y: 1.8, r: 0.7 }, { x: -1, y: 1.8, r: 0.7 }, { x: -2, y: 0, r: 0.7 }, { x: -1, y: -1.8, r: 0.7 }, { x: 1, y: -1.8, r: 0.7 }], bonds: [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6]] },
      { atoms: [{ x: 0, y: 0, r: 1.5 }, { x: 2.4, y: 0, r: 0.9 }, { x: -1.2, y: 2.2, r: 0.9 }, { x: -1.2, y: -2.2, r: 0.9 }, { x: 1.2, y: 2.2, r: 0.6 }], bonds: [[0, 1], [0, 2], [0, 3], [0, 4]] },
    ]

    const buildHexGrid = (w: number, h: number) => {
      hexes = []
      const hSpacing = HEX_SIZE * Math.sqrt(3) + 6
      const vSpacing = HEX_SIZE * 1.5 + 6
      const cols = Math.ceil(w / hSpacing) + 2
      const rows = Math.ceil(h / vSpacing) + 2

      const ax = w * 0.35, ay = h + 20
      const bx = w + 20, by = h + 20
      const cx = w + 20, cy = h * 0.2

      for (let row = 0; row < rows; row++) {
        const offX = (row % 2) * (hSpacing / 2)
        for (let col = 0; col < cols; col++) {
          const x = col * hSpacing + offX
          const y = row * vSpacing
          if (pointInTriangle(x, y, ax, ay, bx, by, cx, cy)) {
            hexes.push({
              x, y, size: HEX_SIZE,
              phase: Math.random() * Math.PI * 2,
              baseAlpha: 0.5 + Math.random() * 0.35,
            })
          }
        }
      }
    }

    const spawnParticleFromHex = (hexX: number, hexY: number) => {
      particles.push({
        x: hexX + (Math.random() - 0.5) * HEX_SIZE,
        y: hexY + (Math.random() - 0.5) * HEX_SIZE,
        vx: -(0.3 + Math.random() * 0.6),
        vy: -(0.6 + Math.random() * 1.2),
        radius: 2 + Math.random() * 4,
        alpha: 0.6 + Math.random() * 0.4,
        life: 0,
        maxLife: 100 + Math.random() * 200,
        wobble: Math.random() * Math.PI * 2,
      })
    }

    const initMolecules = (w: number, h: number) => {
      molecules = []
      for (let i = 0; i < 10; i++) {
        const d = molDefs[i % molDefs.length]
        molecules.push({
          atoms: d.atoms.map(a => ({ ...a })),
          bonds: d.bonds as [number, number][],
          x: w * (0.2 + Math.random() * 0.5),
          y: h * (0.05 + Math.random() * 0.5),
          vx: (Math.random() - 0.5) * 0.08 - 0.05,
          vy: -(0.05 + Math.random() * 0.08),
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.005,
          scale: 3 + Math.random() * 4,
        })
      }
    }

    const drawHex = (cx: number, cy: number, size: number) => {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 6
        const px = cx + size * Math.cos(a)
        const py = cy + size * Math.sin(a)
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
      }
      ctx.closePath()
    }

    const drawMol = (m: Molecule, dark: boolean) => {
      const ba = dark ? 0.35 : 0.2
      const cos = Math.cos(m.rotation)
      const sin = Math.sin(m.rotation)
      ctx.strokeStyle = dark ? `rgba(255,255,255,${ba * 0.9})` : `rgba(0,0,0,${ba * 0.9})`
      ctx.lineWidth = 1.5
      for (const [i, j] of m.bonds) {
        const a1 = m.atoms[i]; const a2 = m.atoms[j]
        const x1 = m.x + (a1.x * cos - a1.y * sin) * m.scale
        const y1 = m.y + (a1.x * sin + a1.y * cos) * m.scale
        const x2 = m.x + (a2.x * cos - a2.y * sin) * m.scale
        const y2 = m.y + (a2.x * sin + a2.y * cos) * m.scale
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke()
      }
      for (const a of m.atoms) {
        const x = m.x + (a.x * cos - a.y * sin) * m.scale
        const y = m.y + (a.x * sin + a.y * cos) * m.scale
        const r = a.r * m.scale * 0.65
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fillStyle = dark ? `rgba(255,255,255,${ba * 1.3})` : `rgba(0,0,0,${ba * 1.3})`
        ctx.fill()
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      buildHexGrid(canvas.width, canvas.height)
      initMolecules(canvas.width, canvas.height)
    }

    const animate = () => {
      if (!visible) { animFrame = requestAnimationFrame(animate); return }
      const w = canvas.width, h = canvas.height
      const t = Date.now() / 1000
      const dark = document.documentElement.classList.contains("dark")
      ctx.clearRect(0, 0, w, h)

      // -- HEX GRID (bottom-right triangle, bright) --
      for (const hex of hexes) {
        const pulse = Math.sin(t * 0.4 + hex.phase) * 0.25 + 0.75
        const dx = mouse.x - hex.x, dy = mouse.y - hex.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const glow = Math.max(0, 1 - dist / 150)
        const alpha = Math.min(hex.baseAlpha * pulse + glow * 1.0, 0.95)

        drawHex(hex.x, hex.y, hex.size)
        ctx.strokeStyle = dark ? `rgba(255,255,255,${alpha})` : `rgba(0,0,0,${alpha * 0.75})`
        ctx.lineWidth = 0.8 + glow * 0.6
        ctx.stroke()

        drawHex(hex.x, hex.y, hex.size * 0.85)
        ctx.fillStyle = dark
          ? `rgba(255,255,255,${alpha * 0.08 + glow * 0.12})`
          : `rgba(0,0,0,${alpha * 0.04 + glow * 0.06})`
        ctx.fill()

        if (glow > 0.05) {
          drawHex(hex.x, hex.y, hex.size * 1.2)
          ctx.fillStyle = dark
            ? `rgba(255,255,255,${glow * 0.25})`
            : `rgba(0,0,0,${glow * 0.12})`
          ctx.fill()
        }

        // Spawn evaporation from mouse-heated hexes
        if (glow > 0.3 && Math.random() < glow * 0.15) {
          spawnParticleFromHex(hex.x, hex.y)
        }
      }

      // slow ambient evaporation
      if (particles.length < 60 && Math.random() < 0.03) {
        const srcHex = hexes[Math.floor(Math.random() * hexes.length)]
        if (srcHex) spawnParticleFromHex(srcHex.x, srcHex.y)
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx + Math.sin(t * 0.8 + p.wobble + p.life * 0.03) * 0.3
        p.y += p.vy
        p.vx *= 0.997
        p.life++
        const prog = p.life / p.maxLife
        const a = p.alpha * (1 - prog * prog)

        if (prog >= 1 || p.y < -30 || p.x < -30) { particles.splice(i, 1); continue }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius * (1 - prog * 0.3), 0, Math.PI * 2)
        ctx.fillStyle = dark ? `rgba(255,255,255,${a})` : `rgba(0,0,0,${a * 0.6})`
        ctx.fill()

        // fading trail
        if (p.life > 5) {
          ctx.beginPath()
          ctx.arc(p.x + p.vx * 3, p.y + p.vy * 3, p.radius * (1 - prog * 0.3) * 0.5, 0, Math.PI * 2)
          ctx.fillStyle = dark ? `rgba(255,255,255,${a * 0.3})` : `rgba(0,0,0,${a * 0.15})`
          ctx.fill()
        }
      }

      // -- FLOATING MOLECULES --
      for (const m of molecules) {
        m.x += m.vx; m.y += m.vy; m.rotation += m.rotSpeed
        if (m.x < -150) m.x = w + 150
        if (m.x > w + 150) m.x = -150
        if (m.y < -150) m.y = h + 150
        if (m.y > h + 150) m.y = -150

        const dx = mouse.x - m.x, dy = mouse.y - m.y
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < 280 && d > 0) { const f = (280 - d) / 280; m.vx -= (dx / d) * f * 0.015; m.vy -= (dy / d) * f * 0.015 }
        m.vx *= 0.999; m.vy *= 0.999; drawMol(m, dark)
      }

      animFrame = requestAnimationFrame(animate)
    }

    const onMouse = (e: MouseEvent) => { mouse = { x: e.clientX, y: e.clientY } }
    const onTouch = (e: TouchEvent) => { const t = e.touches[0]; if (t) mouse = { x: t.clientX, y: t.clientY } }
    const onLeave = () => { mouse = { x: -1000, y: -1000 } }

    const observer = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting },
      { threshold: 0 }
    )
    observer.observe(canvas)

    resize(); animate()
    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", onMouse)
    window.addEventListener("touchmove", onTouch)
    window.addEventListener("mouseleave", onLeave)

    return () => {
      cancelAnimationFrame(animFrame)
      observer.disconnect()
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMouse)
      window.removeEventListener("touchmove", onTouch)
      window.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "auto" }}
    />
  )
}

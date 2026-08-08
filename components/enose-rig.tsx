"use client"

import type { SensorKind } from "@/lib/e-nose/data"
import { buildRigSvgContent } from "@/lib/e-nose/rig-svg"

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

export function EnoseRig({ sensors, activeId, className }: EnoseRigProps) {
  return (
    <svg
      viewBox="0 0 640 520"
      className={className}
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: buildRigSvgContent(sensors, { activeId }) }}
    />
  )
}

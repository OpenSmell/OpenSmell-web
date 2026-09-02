import type { ReactNode } from "react"

export function H2({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className="text-xl font-bold tracking-tight mt-10 mb-3 border-b border-border pb-2"
    >
      {children}
    </h2>
  )
}

export function H3({ children }: { children: ReactNode }) {
  return <h3 className="text-base font-semibold mt-7 mb-2">{children}</h3>
}

export function P({ children }: { children: ReactNode }) {
  return <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
}

export function Code({ children }: { children: ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 bg-muted/60 border border-border rounded font-mono text-[0.85em]">
      {children}
    </code>
  )
}

export function CodeBlock({ title, children }: { title?: string; children: string }) {
  return (
    <div className="border border-border my-4">
      {title && (
        <div className="px-3 py-1.5 border-b border-border text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          {title}
        </div>
      )}
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
        <code>{children}</code>
      </pre>
    </div>
  )
}

export function Callout({
  kind = "note",
  children,
}: {
  kind?: "note" | "warn" | "honest"
  children: ReactNode
}) {
  const styles = {
    note: "border-muted-foreground/30",
    warn: "border-amber-500/60",
    honest: "border-emerald-600/50",
  }[kind]
  const label = { note: "Note", warn: "Caution", honest: "Honesty rule" }[kind]
  return (
    <div className={`border-l-2 ${styles} pl-4 py-1 my-4`}>
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
        {label}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
    </div>
  )
}

export function Table({
  head,
  rows,
}: {
  head: string[]
  rows: (string | ReactNode)[][]
}) {
  return (
    <div className="overflow-x-auto border border-border my-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/40">
            {head.map((h) => (
              <th
                key={h}
                className="text-left px-4 py-2.5 text-xs font-mono uppercase tracking-wider text-muted-foreground border-b border-border"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border last:border-b-0">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2.5 align-top text-muted-foreground">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Ul({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc pl-5 text-sm text-muted-foreground leading-relaxed space-y-1.5">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
}

export function Ol({ items }: { items: ReactNode[] }) {
  return (
    <ol className="list-decimal pl-5 text-sm text-muted-foreground leading-relaxed space-y-1.5">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ol>
  )
}

import Link from "next/link"

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-24 text-center">
      <p className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
        404 — not found
      </p>
      <h1 className="mt-4 text-3xl font-bold">Nothing here by that smell.</h1>
      <p className="mt-4 text-muted-foreground">
        The page you asked for does not exist or moved.
      </p>
      <div className="mt-8 flex items-center justify-center gap-4">
        <Link href="/" className="hex-btn hex-btn-primary">
          Home
        </Link>
        <Link href="/osmograph" className="hex-btn">
          Get Osmograph
        </Link>
      </div>
    </main>
  )
}

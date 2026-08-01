"use client"

import { useEffect, useState, type FormEvent, type ReactNode } from "react"
import { Lock, LogOut, Plus, Save, Trash2, Download, Copy, Check, Eye, EyeOff } from "lucide-react"
import { articles as builtInArticles, type Article, type ArticleCategory } from "@/lib/articles"
import Markdown from "@/components/markdown"

const DEFAULT_HASH = "f650f775de4d874c9d82d5b74bc9f81f5196c485e2c208cf49fb2aec15477033"
const AUTH_KEY = "opensmell-admin-auth"
const STORAGE_KEY = "opensmell-admin-articles"
const HASH_KEY = "opensmell-admin-hash"
const categories: ArticleCategory[] = ["Foundations", "Hardware", "Tutorial", "Research"]

async function sha256(text: string): Promise<string> {
  const data = new TextEncoder().encode(text)
  const digest = await crypto.subtle.digest("SHA-256", data)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

function loadDrafts(): Record<string, Article> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Record<string, Article>) : {}
  } catch {
    return {}
  }
}

function mergeArticles(): Article[] {
  const drafts = loadDrafts()
  const merged = builtInArticles.map((a) => drafts[a.slug] ?? a)
  const draftSlugs = new Set(Object.keys(drafts))
  for (const slug of draftSlugs) {
    if (!merged.some((a) => a.slug === slug)) merged.push(drafts[slug])
  }
  return merged
}

function toTS(list: Article[]): string {
  const iface = `export type ArticleCategory = "Foundations" | "Hardware" | "Tutorial" | "Research"

export interface Article {
  slug: string
  title: string
  excerpt: string
  category: ArticleCategory
  tags: string[]
  readTime: string
  date: string
  author: string
  thumbnail: string
  content: string
}
`
  const entries = list.map((a) => {
    const props = [
      ["slug", a.slug],
      ["title", a.title],
      ["excerpt", a.excerpt],
      ["category", a.category],
      ["tags", a.tags],
      ["readTime", a.readTime],
      ["date", a.date],
      ["author", a.author],
      ["thumbnail", a.thumbnail],
      ["content", a.content],
    ]
      .map(([k, v]) => `    ${k}: ${JSON.stringify(v)}`)
      .join(",\n")
    return `  {\n${props}\n  }`
  })

  const helpers = `
export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

export function getRelated(current: Article, n = 3): Article[] {
  return articles
    .filter((a) => a.slug !== current.slug)
    .sort((a, b) => {
      const ab = a.category === current.category ? 1 : 0
      const bb = b.category === current.category ? 1 : 0
      return bb - ab
    })
    .slice(0, n)
}
`
  return `${iface}\nexport const articles: Article[] = [\n${entries.join(",\n")}\n]\n${helpers}`
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState("")
  const [authError, setAuthError] = useState("")
  const [list, setList] = useState<Article[]>([])
  const [current, setCurrent] = useState<Article | null>(null)
  const [draft, setDraft] = useState<Article | null>(null)
  const [exported, setExported] = useState("")
  const [copied, setCopied] = useState(false)
  const [preview, setPreview] = useState(false)
  const [toast, setToast] = useState("")

  useEffect(() => {
    if (sessionStorage.getItem(AUTH_KEY) === "1") setAuthed(true)
    setList(mergeArticles())
  }, [])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(""), 2000)
    return () => clearTimeout(t)
  }, [toast])

  const persist = (next: Article[]) => {
    const drafts: Record<string, Article> = {}
    for (const a of next) drafts[a.slug] = a
    localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts))
    setList(next)
  }

  async function attemptLogin(e: FormEvent) {
    e.preventDefault()
    const expected = localStorage.getItem(HASH_KEY) ?? DEFAULT_HASH
    const hash = await sha256(password)
    if (hash === expected) {
      sessionStorage.setItem(AUTH_KEY, "1")
      setAuthed(true)
      setPassword("")
      setAuthError("")
    } else {
      setAuthError("Incorrect password.")
    }
  }

  function logout() {
    sessionStorage.removeItem(AUTH_KEY)
    setAuthed(false)
    setCurrent(null)
    setDraft(null)
  }

  function select(slug: string) {
    const a = list.find((x) => x.slug === slug) ?? null
    setCurrent(a)
    setDraft(a ? { ...a, tags: [...a.tags] } : null)
    setPreview(false)
  }

  function newArticle() {
    const slug = `article-${Date.now().toString(36)}`
    const a: Article = {
      slug,
      title: "New Article",
      excerpt: "Short description shown on the Academy grid.",
      category: "Tutorial",
      tags: [],
      readTime: "5 min",
      date: new Date().toISOString().slice(0, 10),
      author: "OpenSmell Academy",
      thumbnail: "/thumbnails/chemoprint.svg",
      content: "# Start writing\n\nMarkdown goes here.",
    }
    persist([...list, a])
    select(slug)
  }

  function save() {
    if (!draft) return
    const next = list.map((a) => (a.slug === current?.slug ? draft : a))
    persist(next)
    setCurrent(draft)
    setToast("Saved")
  }

  function remove() {
    if (!current) return
    persist(list.filter((a) => a.slug !== current.slug))
    setCurrent(null)
    setDraft(null)
    setToast("Deleted")
  }

  function set<K extends keyof Article>(key: K, value: Article[K]) {
    if (!draft) return
    setDraft({ ...draft, [key]: value })
  }

  function exportTS() {
    setExported(toTS(list))
  }

  function downloadJSON() {
    const blob = new Blob([JSON.stringify(list, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "articles.json"
    a.click()
    URL.revokeObjectURL(url)
    setToast("Backup downloaded")
  }

  async function copyExport() {
    await navigator.clipboard.writeText(exported)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  async function importJSON(text: string) {
    try {
      const parsed = JSON.parse(text) as Article[]
      if (!Array.isArray(parsed)) throw new Error("not an array")
      persist(parsed)
      setToast(`Imported ${parsed.length} articles`)
    } catch {
      setToast("Invalid JSON")
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="border border-border p-8 bg-background">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border text-xs text-muted-foreground mb-6">
              <Lock className="w-3.5 h-3.5" />
              Admin Portal
            </div>
            <h1 className="text-2xl font-bold tracking-tight mb-2">OpenSmell Academy</h1>
            <p className="text-sm text-muted-foreground mb-6">
              Restricted access. Enter the admin password to manage articles.
            </p>
            <form onSubmit={attemptLogin} className="flex flex-col gap-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoFocus
                className="bg-background border border-border px-4 py-2.5 text-sm outline-none focus:border-foreground transition-colors font-mono"
              />
              {authError && <p className="text-xs text-destructive">{authError}</p>}
              <button
                type="submit"
                className="bg-foreground text-background px-4 py-2.5 text-sm font-medium hover:opacity-90 transition-all"
              >
                Sign in
              </button>
            </form>
          </div>
          <p className="text-xs text-muted-foreground mt-4 text-center leading-relaxed">
            Note: this is a client-side gate on a static site. Publishing to the live
            site happens by exporting <code className="font-mono">articles.ts</code> and committing it.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm font-semibold">
            <Lock className="w-4 h-4" />
            Academy Admin
          </div>
          <button
            onClick={logout}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-px bg-border min-h-[70vh]">
          <aside className="bg-background p-4 flex flex-col gap-1">
            <button
              onClick={newArticle}
              className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-3 py-2 text-sm font-medium hover:opacity-90 transition-all mb-3"
            >
              <Plus className="w-4 h-4" />
              New article
            </button>
            <div className="flex flex-col gap-px">
              {list.map((a) => (
                <button
                  key={a.slug}
                  onClick={() => select(a.slug)}
                  className={`text-left px-3 py-2 text-sm transition-colors ${
                    current?.slug === a.slug
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <span className="block truncate font-medium">{a.title}</span>
                  <span className={`block text-xs ${current?.slug === a.slug ? "text-background/70" : ""}`}>
                    {a.category} · {a.readTime}
                  </span>
                </button>
              ))}
            </div>
          </aside>

          <section className="bg-background p-6">
            {!draft ? (
              <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                Select an article to edit, or create a new one.
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={save}
                    className="inline-flex items-center gap-2 bg-foreground text-background px-4 py-2 text-sm font-medium hover:opacity-90 transition-all"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={remove}
                    className="inline-flex items-center gap-2 border border-destructive text-destructive px-4 py-2 text-sm hover:bg-destructive hover:text-background transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                  <button
                    onClick={() => setPreview((p) => !p)}
                    className="inline-flex items-center gap-2 border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {preview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {preview ? "Edit" : "Preview"}
                  </button>
                  <span className="text-xs text-muted-foreground">
                    Slug: <code className="font-mono">/academy/{draft.slug}</code>
                  </span>
                </div>

                {preview ? (
                  <div className="border border-border p-6 bg-background">
                    <h1 className="text-2xl font-bold mb-2">{draft.title}</h1>
                    <p className="text-muted-foreground mb-4">{draft.excerpt}</p>
                    <Markdown content={draft.content} />
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label="Slug">
                        <input
                          value={draft.slug}
                          onChange={(e) => set("slug", e.target.value)}
                          className="w-full bg-background border border-border px-3 py-2 text-sm outline-none focus:border-foreground transition-colors font-mono"
                        />
                      </Field>
                      <Field label="Read time">
                        <input
                          value={draft.readTime}
                          onChange={(e) => set("readTime", e.target.value)}
                          className="w-full bg-background border border-border px-3 py-2 text-sm outline-none focus:border-foreground transition-colors"
                        />
                      </Field>
                      <Field label="Title">
                        <input
                          value={draft.title}
                          onChange={(e) => set("title", e.target.value)}
                          className="w-full bg-background border border-border px-3 py-2 text-sm outline-none focus:border-foreground transition-colors"
                        />
                      </Field>
                      <Field label="Date">
                        <input
                          type="date"
                          value={draft.date}
                          onChange={(e) => set("date", e.target.value)}
                          className="w-full bg-background border border-border px-3 py-2 text-sm outline-none focus:border-foreground transition-colors"
                        />
                      </Field>
                      <Field label="Category">
                        <select
                          value={draft.category}
                          onChange={(e) => set("category", e.target.value as ArticleCategory)}
                          className="w-full bg-background border border-border px-3 py-2 text-sm outline-none focus:border-foreground transition-colors"
                        >
                          {categories.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Author">
                        <input
                          value={draft.author}
                          onChange={(e) => set("author", e.target.value)}
                          className="w-full bg-background border border-border px-3 py-2 text-sm outline-none focus:border-foreground transition-colors"
                        />
                      </Field>
                      <Field label="Tags (comma separated)" span>
                        <input
                          value={draft.tags.join(", ")}
                          onChange={(e) =>
                            set("tags", e.target.value.split(",").map((t) => t.trim()).filter(Boolean))
                          }
                          className="w-full bg-background border border-border px-3 py-2 text-sm outline-none focus:border-foreground transition-colors"
                        />
                      </Field>
                      <Field label="Thumbnail path" span>
                        <input
                          value={draft.thumbnail}
                          onChange={(e) => set("thumbnail", e.target.value)}
                          className="w-full bg-background border border-border px-3 py-2 text-sm outline-none focus:border-foreground transition-colors font-mono"
                        />
                      </Field>
                    </div>
                    <Field label="Excerpt">
                      <textarea
                        value={draft.excerpt}
                        onChange={(e) => set("excerpt", e.target.value)}
                        rows={2}
                        className="w-full bg-background border border-border px-3 py-2 text-sm outline-none focus:border-foreground transition-colors resize-y"
                      />
                    </Field>
                    <Field label="Content (Markdown)">
                      <textarea
                        value={draft.content}
                        onChange={(e) => set("content", e.target.value)}
                        rows={22}
                        className="w-full bg-background border border-border px-3 py-2 text-sm outline-none focus:border-foreground transition-colors resize-y font-mono leading-relaxed"
                      />
                    </Field>
                  </>
                )}
              </div>
            )}
          </section>
        </div>

        <section className="border border-border mt-px p-6 mt-4">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <button
              onClick={exportTS}
              className="inline-flex items-center gap-2 border border-border px-4 py-2 text-sm font-medium hover:bg-foreground hover:text-background transition-all"
            >
              <Download className="w-4 h-4" />
              Generate articles.ts
            </button>
            <button
              onClick={downloadJSON}
              className="inline-flex items-center gap-2 border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Download className="w-4 h-4" />
              Backup JSON
            </button>
          </div>
          {exported && (
            <div className="relative">
              <button
                onClick={copyExport}
                className="absolute top-3 right-3 inline-flex items-center gap-1.5 bg-foreground text-background px-3 py-1.5 text-xs font-medium hover:opacity-90 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
              <pre className="border border-border p-4 max-h-80 overflow-auto text-xs font-mono leading-relaxed whitespace-pre">
                {exported}
              </pre>
            </div>
          )}
          <div className="mt-4">
            <Field label="Import JSON backup (paste and it saves immediately)">
              <textarea
                placeholder='Paste a JSON backup here… e.g. [{"slug": "…", "title": "…"}]'
                rows={3}
                onBlur={(e) => e.target.value.trim() && importJSON(e.target.value)}
                className="w-full bg-background border border-border px-3 py-2 text-sm outline-none focus:border-foreground transition-colors resize-y font-mono"
              />
            </Field>
            <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
              To publish changes: generate <code className="font-mono">articles.ts</code>, copy it into{" "}
              <code className="font-mono">lib/articles.ts</code> in the repo, and commit — Vercel
              auto-deploys. Drafts are saved locally in this browser until then.
            </p>
          </div>
        </section>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-foreground text-background px-4 py-2 text-sm z-50">
          {toast}
        </div>
      )}
    </div>
  )
}

function Field({
  label,
  span,
  children,
}: {
  label: string
  span?: boolean
  children: ReactNode
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${span ? "md:col-span-2" : ""}`}>
      <span className="text-xs text-muted-foreground">{label}</span>
      {children}
    </label>
  )
}

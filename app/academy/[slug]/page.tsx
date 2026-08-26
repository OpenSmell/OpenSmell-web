import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, GraduationCap } from "lucide-react"
import { articles, getArticle, getRelated } from "@/lib/articles"
import Markdown from "@/components/markdown"

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return {}
  return {
    title: `${article.title} — OpenSmell Academy`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      images: [article.thumbnail],
      publishedTime: article.date,
      tags: article.tags,
    },
  }
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number)
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  return `${months[m - 1]} ${d}, ${y}`
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  const related = getRelated(article)

  return (
    <div className="overflow-x-clip">

      <main>
        <article>
          <section className="pt-28 pb-12 border-b border-border">
            <div className="max-w-4xl mx-auto px-6">
              <Link
                href="/academy"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 no-underline"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Academy
              </Link>

              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 border border-border text-xs text-muted-foreground">
                  <GraduationCap className="w-3.5 h-3.5" />
                  {article.category}
                </span>
                {article.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-xs text-muted-foreground">
                    #{tag}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5 leading-[1.02]">
                {article.title}
              </h1>

              <p className="text-lg text-muted-foreground max-w-2xl mb-6 leading-relaxed">
                {article.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground border-t border-border pt-5">
                <span className="inline-flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(article.date)}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {article.readTime}
                </span>
                <span>{article.author}</span>
              </div>
            </div>
          </section>

          <section className="py-12">
            <div className="max-w-4xl mx-auto px-6">
              <figure className="border border-border mb-12">
                <div className="relative aspect-[1200/630] bg-white">
                  <Image
                    src={article.thumbnail}
                    alt={article.title}
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 896px) 100vw, 896px"
                  />
                </div>
                <figcaption className="flex items-center justify-between px-4 py-2.5 border-t border-border text-xs text-muted-foreground">
                  <span>Fig. {String(articles.findIndex((a) => a.slug === article.slug) + 1).padStart(3, "0")} — {article.title}</span>
                  <span>OpenSmell Academy</span>
                </figcaption>
              </figure>

              <Markdown content={article.content} />
            </div>
          </section>
        </article>

        <section className="border-t border-border py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-xl font-semibold mb-8">Keep reading</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
              {related.map((a) => (
                <Link key={a.slug} href={`/academy/${a.slug}`} className="bg-background p-5 group no-underline">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] text-muted-foreground border border-border px-2 py-0.5 uppercase tracking-wider">
                      {a.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{a.readTime}</span>
                  </div>
                  <h3 className="text-sm font-semibold mb-2 group-hover:text-muted-foreground transition-colors">
                    {a.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{a.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-12">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="relative w-6 h-6">
              <Image src="/opensmell_logo.png" alt="OpenSmell" fill className="object-contain" sizes="24px" />
            </div>
            <span>OpenSmell Academy</span>
          </div>
          <Link href="/academy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Browse all articles
          </Link>
        </div>
      </footer>
    </div>
  )
}

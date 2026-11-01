import type { MetadataRoute } from "next"
import { articles } from "@/lib/articles"

const BASE = "https://www.opensmell.xyz"

const ROUTES = [
  "/",
  "/osmograph",
  "/appstore",
  "/docs",
  "/docs/python",
  "/docs/rust",
  "/docs/desktop",
  "/docs/data-model",
  "/docs/vials",
  "/docs/vials/quickstart",
  "/docs/vials/profile",
  "/docs/vials/ui",
  "/docs/vials/evidence",
  "/docs/vials/operate",
  "/docs/vials/reference",
  "/enose",
  "/academy",
  "/search",
  "/smell-monitor",
]

export default function sitemap(): MetadataRoute.Sitemap {
  const articleRoutes = articles.map((article) => `/academy/${article.slug}`)

  return [...ROUTES, ...articleRoutes].map((path) => ({ url: `${BASE}${path}` }))
}

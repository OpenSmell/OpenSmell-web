import type { MetadataRoute } from "next"

const BASE = "https://www.opensmell.xyz"

const ROUTES = [
  "/",
  "/osmograph",
  "/vials",
  "/docs",
  "/enose",
  "/academy",
  "/appstore",
  "/search",
  "/smell-monitor",
]

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
  }))
}

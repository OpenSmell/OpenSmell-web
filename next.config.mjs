// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  turbopack: {},
  async redirects() {
    return [{ source: "/appstore", destination: "/vials", permanent: true }]
  },
}

export default nextConfig
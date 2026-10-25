// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  turbopack: {},
  async redirects() {
    return [{ source: "/vials", destination: "/appstore", permanent: false }]
  },
}

export default nextConfig
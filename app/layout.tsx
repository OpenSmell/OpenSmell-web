import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "OpenSmell — Infrastructure for Machines to Smell",
  description: "Continuous chemical anomaly monitoring using modular gas-sensor arrays. Open-source hardware, software, and data for digital olfaction.",
  metadataBase: new URL("https://opensmell.org"),
  openGraph: {
    title: "OpenSmell — Infrastructure for Machines to Smell",
    description: "Continuous chemical anomaly monitoring using modular gas-sensor arrays.",
    type: "website",
  },
  icons: {
    icon: "/opensmell_logo.png",
    apple: "/opensmell_logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="opensmell-theme"
        >
          <SiteHeader />
          <main className="min-h-screen">{children}</main>
          <SiteFooter />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}

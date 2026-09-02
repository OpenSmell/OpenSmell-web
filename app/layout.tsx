import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import AnalyticsInit from "@/components/analytics-init"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "OpenSmell — Open Infrastructure for Digital Olfaction",
  description: "Building the tools, standards, and community to make smell as programmable as light and sound. Open-source chemoprint, e-nose hardware, and data commons.",
  metadataBase: new URL("https://opensmell.org"),
  openGraph: {
    title: "OpenSmell — Open Infrastructure for Digital Olfaction",
    description: "Building the tools, standards, and community to make smell as programmable as light and sound.",
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
    <html lang="en" suppressHydrationWarning className="light">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('opensmell-theme');if(t&&t!=='light'){localStorage.setItem('opensmell-theme','light')}document.documentElement.classList.remove('dark');document.documentElement.classList.add('light')}catch(e){}})()`,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="opensmell-theme"
        >
          <SiteHeader />
          {children}
          <SiteFooter />
        </ThemeProvider>
        <Analytics />
        <AnalyticsInit />
      </body>
    </html>
  )
}

import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import UmamiAnalytics from "@/components/umami-analytics"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" })

export const metadata: Metadata = {
  title: "OpenSmell — Digital smell on open hardware",
  description: "Detect chemical change in your process with open gas-sensor hardware and software. Open data, open firmware, every number linked to its source.",
  metadataBase: new URL("https://www.opensmell.xyz"),
  openGraph: {
    title: "OpenSmell — Digital smell on open hardware",
    description: "Detect chemical change in your process with open gas-sensor hardware and software. Open data, open firmware, every number linked to its source.",
    url: "https://www.opensmell.xyz",
    siteName: "OpenSmell",
    type: "website",
    // Image comes from the file convention at app/opengraph-image.tsx (see that file).
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenSmell — Digital smell on open hardware",
    description: "Detect chemical change in your process with open gas-sensor hardware and software. Open data, open firmware, every number linked to its source.",
    // Twitter image inherits the generated opengraph image.
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`light ${geist.variable} ${geistMono.variable}`}
    >
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
          <UmamiAnalytics />
        </ThemeProvider>
      </body>
    </html>
  )
}

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })

export const metadata: Metadata = {
  title: "Gestione consegnate",
  robots: { index: false, follow: false, nocache: true },
}

export default function GestioneLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${inter.variable} bg-background`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}

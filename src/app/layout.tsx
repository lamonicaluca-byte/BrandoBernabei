import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Bernabei Automobili | Auto Premium e Sportive Selezionate a Roma',
  description:
    'Concessionaria di auto usate premium e sportive a Roma. Selezione accurata, trasparenza garantita e assistenza personalizzata. Scopri le vetture disponibili.',
  keywords:
    'auto usate di lusso Roma, auto sportive usate Roma, Porsche usate Roma, concessionaria auto premium Roma, vendita auto sportive Roma',
  openGraph: {
    title: 'Bernabei Automobili | Auto Premium e Sportive Selezionate',
    description:
      'Concessionaria di auto usate premium e sportive a Roma. Selezione accurata, trasparenza garantita.',
    type: 'website',
    locale: 'it_IT',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="it"
      className={`${inter.variable} ${cormorant.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

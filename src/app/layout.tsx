import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.bernabeiautomobili.com'),
  title: {
    default: 'Bernabei Automobili | Auto Premium Selezionate a Roma',
    template: '%s | Bernabei Automobili',
  },
  description:
    'Selezione esclusiva di auto premium e sportive usate a Roma. Porsche, Ferrari, BMW M, Mercedes-AMG, Lamborghini. Trasparenza, competenza e garanzia inclusa.',
  keywords: [
    'auto usate di lusso Roma',
    'auto sportive usate Roma',
    'Porsche usate Roma',
    'concessionaria auto premium Roma',
    'vendita auto sportive Roma',
    'Ferrari usata Roma',
    'BMW M usata Roma',
    'Mercedes AMG usata Roma',
    'Bernabei Automobili',
    'Brando Bernabei',
  ],
  openGraph: {
    title: 'Bernabei Automobili | Auto Premium Selezionate a Roma',
    description:
      'Selezione esclusiva di auto premium e sportive usate a Roma. 97% recensioni positive su AutoScout24.',
    type: 'website',
    locale: 'it_IT',
    url: 'https://www.bernabeiautomobili.com',
    siteName: 'Bernabei Automobili',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
    other: [
      { rel: 'manifest', url: '/site.webmanifest' },
    ],
  },
  other: {
    'theme-color': '#080808',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): React.ReactNode {
  return children
}

import type { Locale } from '../i18n'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { OrganizationJsonLd } from '@/components/JsonLd'
import { MobileContactBar } from '@/components/mobile-contact-bar'
import { getDictionary } from '../i18n'
import '../globals.css'

export type { Locale }

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

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang as 'it' | 'en' | 'fr')
  return (
    <html lang={lang} className={`${inter.variable} ${cormorant.variable} bg-background`}>
      <body className="font-sans antialiased">
        <OrganizationJsonLd />
        {children}
        <MobileContactBar lang={lang} labels={dict.contactBar} />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

export async function generateStaticParams() {
  return [{ lang: 'it' }, { lang: 'en' }, { lang: 'fr' }]
}

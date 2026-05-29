export type Locale = 'it' | 'en' | 'fr'

const dictionaries = {
  it: () => import('./dictionaries/it.json').then(m => m.default),
  en: () => import('./dictionaries/en.json').then(m => m.default),
  fr: () => import('./dictionaries/fr.json').then(m => m.default),
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]()

const BASE = 'https://www.bernabeiautomobili.com'
const OG_IMAGE = `${BASE}/og-default.jpg`

const OG_LOCALE: Record<string, string> = {
  it: 'it_IT',
  en: 'en_US',
  fr: 'fr_FR',
}

export function getAlternates(path: string) {
  return {
    canonical: `${BASE}/it${path}`,
    languages: {
      'it':        `${BASE}/it${path}`,
      'en':        `${BASE}/en${path}`,
      'fr':        `${BASE}/fr${path}`,
      'x-default': `${BASE}/it${path}`,
    },
  }
}

export function buildMetadata(opts: {
  title: string
  description: string
  path: string
  lang: string
  ogImage?: string
}) {
  const { title, description, path, lang, ogImage = OG_IMAGE } = opts
  return {
    title: { absolute: `${title} | Bernabei Automobili` },
    description,
    alternates: getAlternates(path),
    openGraph: {
      title,
      description,
      url: `${BASE}/${lang}${path}`,
      siteName: 'Bernabei Automobili',
      locale: OG_LOCALE[lang] ?? 'it_IT',
      type: 'website' as const,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
      images: [ogImage],
    },
  }
}

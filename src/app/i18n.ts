export type Locale = 'it' | 'en' | 'fr'

const dictionaries = {
  it: () => import('./dictionaries/it.json').then(m => m.default),
  en: () => import('./dictionaries/en.json').then(m => m.default),
  fr: () => import('./dictionaries/fr.json').then(m => m.default),
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]()

const BASE = 'https://www.bernabeiautomobili.com'

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

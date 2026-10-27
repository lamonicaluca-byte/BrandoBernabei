import type { MetadataRoute } from 'next'
import { SHOW_VENDUTE } from '@/lib/links'

const BASE_URL = 'https://www.bernabeiautomobili.com'
const LOCALES = ['it', 'en', 'fr'] as const
const NOW = new Date()

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: '',        priority: 1.0, changeFrequency: 'weekly'  as const },
    ...(SHOW_VENDUTE ? [{ path: '/vendute', priority: 0.7, changeFrequency: 'monthly' as const }] : []),
    { path: '/chi-siamo', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/servizi',  priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/recensioni', priority: 0.6, changeFrequency: 'weekly'  as const },
    { path: '/contatti', priority: 0.6, changeFrequency: 'monthly' as const },
  ]

  const staticEntries: MetadataRoute.Sitemap = LOCALES.flatMap(lang =>
    staticRoutes.map(route => ({
      url: `${BASE_URL}/${lang}${route.path}`,
      lastModified: NOW,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }))
  )

  return staticEntries
}

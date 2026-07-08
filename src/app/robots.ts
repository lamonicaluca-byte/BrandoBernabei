import type { MetadataRoute } from 'next'

const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      ...AI_CRAWLERS.map(userAgent => ({
        userAgent,
        allow: '/',
      })),
    ],
    sitemap: 'https://www.bernabeiautomobili.com/sitemap.xml',
    host: 'https://www.bernabeiautomobili.com',
  }
}

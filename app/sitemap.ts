import { MetadataRoute } from 'next'
import { getAllTemplates } from '@/lib/templates'

const SITE_URL = process.env.NEXT_PUBLIC_URL || 'https://automation.market'

export default function sitemap(): MetadataRoute.Sitemap {
  const templates = getAllTemplates()
  const lastModified = new Date()

  // Main pages with high priority
  const mainPages = [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${SITE_URL}/templates`,
      lastModified,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ]

  // Static pages with medium priority
  const staticPages = [
    '/about',
    '/contact',
    '/custom',
    '/privacy',
    '/terms',
  ].map(route => ({
    url: `${SITE_URL}${route}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Template category pages
  const categoryPages = [
    '/templates/notion',
    '/templates/n8n',
    '/templates/make',
    '/templates/zapier',
    '/templates/chatgpt',
  ].map(route => ({
    url: `${SITE_URL}${route}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Individual template pages
  const templatePages = templates.map(template => ({
    url: `${SITE_URL}/templates/${template.category}/${template.id}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...mainPages, ...staticPages, ...categoryPages, ...templatePages]
}
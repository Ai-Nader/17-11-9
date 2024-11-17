import { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_URL || 'https://automation.market'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/checkout/', '/success/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
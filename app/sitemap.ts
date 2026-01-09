import { MetadataRoute } from 'next'

const BASE_URL = 'https://bustickets.ph'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ]

  const routes: MetadataRoute.Sitemap = [
    'manila-to-baguio',
    'cebu-to-bohol',
    'manila-to-legazpi',
    'el-nido-to-coron',
    'dumaguete-to-siquijor',
    'batangas-to-puerto-galera',
  ].map((slug) => ({
    url: `${BASE_URL}/route/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  const destinations: MetadataRoute.Sitemap = [
    'siargao',
    'sagada',
    'siquijor',
    'baguio',
    'boracay',
    'palawan',
  ].map((slug) => ({
    url: `${BASE_URL}/destination/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const operators: MetadataRoute.Sitemap = [
    'victory-liner',
    '2go-travel',
    'oceanjet',
    'dltb',
    'partas',
    'genesis',
  ].map((slug) => ({
    url: `${BASE_URL}/operator/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const terminals: MetadataRoute.Sitemap = [
    'pitx',
    'cubao',
    'pasay',
    'batangas-port',
  ].map((slug) => ({
    url: `${BASE_URL}/terminal/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...routes, ...destinations, ...operators, ...terminals]
}

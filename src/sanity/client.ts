import { createClient } from 'next-sanity'
import { unstable_cache } from 'next/cache'
import { apiVersion, dataset, projectId, useCdn } from './env'

const baseClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,         // true = Sanity Fastly CDN edge cache
  perspective: 'published',
  stega: false,   // disable stega encoding for cleaner payloads
})

// Cache TTLs (seconds)
const CATALOG_TTL  = 120  // catalog list   — 2 min
const PRODUCT_TTL  = 300  // product detail — 5 min
const GENERAL_TTL  = 60   // everything else — 1 min

// Build a stable cache key from query + params
const cacheKey = (query: string, params: Record<string, unknown>) =>
  [query, JSON.stringify(params)].join('|')

export const client = {
  ...baseClient,

  fetch: async (query: string, params: Record<string, unknown> = {}) => {
    try {
      if (projectId === 'your-project-id' || projectId === 'your_project_id_here') {
        console.warn('Using fallback Sanity project ID, returning empty data.')
        return []
      }

      // Pick TTL based on query type
      const isCatalogList  = query.includes('images[0..0]')
      const isProductDetail = query.includes('slug.current == $slug')
      const ttl = isCatalogList ? CATALOG_TTL : isProductDetail ? PRODUCT_TTL : GENERAL_TTL

      // Wrap in Next.js unstable_cache so identical queries within the TTL
      // window are served from the server-side in-memory cache — zero Sanity
      // round-trips on repeated visits or navigations.
      const cached = unstable_cache(
        () => baseClient.fetch(query, params),
        [cacheKey(query, params)],
        { revalidate: ttl }
      )

      return await cached()
    } catch (error) {
      console.warn('Sanity fetch failed, returning empty data.', error)
      return []
    }
  },
}
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-06-08'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id'

// true = use Sanity's global Fastly CDN (cached at edge, 3-5× faster reads)
// false = hit Sanity origin every time (slower, only needed for mutations)
export const useCdn = true
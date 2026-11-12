import type { MetadataRoute } from 'next';
import { client } from '@/sanity/client';
import { SITE_URL } from '@/lib/seo';

// Rebuilt at most once an hour so new products appear without a deploy
export const revalidate = 3600;

type ProductRef = { slug: string; updatedAt: string };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/catalog`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/collections`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/catalog-download`, lastModified: now, changeFrequency: 'weekly', priority: 0.5 },
  ];

  // Every product page, except ones marked "Hide from search engines" in Sanity
  const products: ProductRef[] = await client.fetch(
    `*[_type == "product" && defined(slug.current) && noIndex != true]{ "slug": slug.current, "updatedAt": _updatedAt }`,
  );

  return [
    ...pages,
    ...(Array.isArray(products) ? products : []).map((p) => ({
      url: `${SITE_URL}/catalog/${encodeURIComponent(p.slug)}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];
}

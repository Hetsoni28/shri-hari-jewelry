import { Suspense } from 'react';
import CatalogClient from '@/components/organisms/CatalogClient';
import { client } from '@/sanity/client';
import { catalogProductsQuery } from '@/sanity/queries';
import { toCatalogItem, type CatalogProduct } from '@/lib/catalogItems';
import { pageMeta } from '@/lib/seo';

// force-dynamic: always serve fresh data — prevents blank stale-cache page on first load
export const dynamic = 'force-dynamic';

// Filtered views (?category=, ?metal=…) share this canonical so search engines index one catalogue
export const metadata = pageMeta({
  title: 'Gold & Silver Jewellery Catalogue',
  description:
    'Browse 100+ handcrafted gold and silver designs: rings, mala, earrings, sets, mangalsutra and more. BIS hallmarked gold from Shri Hari Jewellers, Mogar.',
  path: '/catalog',
});

export default async function CatalogPage() {
  const products: CatalogProduct[] = await client.fetch(catalogProductsQuery); // newest first

  return (
    <Suspense>
      <CatalogClient items={products.map(toCatalogItem)} />
    </Suspense>
  );
}

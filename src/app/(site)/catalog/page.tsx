import { Suspense } from 'react';
import CatalogClient from '@/components/organisms/CatalogClient';
import { client } from '@/sanity/client';
import { catalogProductsQuery } from '@/sanity/queries';
import { toCatalogItem, type CatalogProduct } from '@/lib/catalogItems';

// force-dynamic: always serve fresh data — prevents blank stale-cache page on first load
export const dynamic = 'force-dynamic';

export const metadata = { title: 'Jewellery Catalogue' };

export default async function CatalogPage() {
  const products: CatalogProduct[] = await client.fetch(catalogProductsQuery); // newest first

  return (
    <Suspense>
      <CatalogClient items={products.map(toCatalogItem)} />
    </Suspense>
  );
}

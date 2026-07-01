import { Suspense } from 'react';
import CatalogClient from '@/components/organisms/CatalogClient';
import { client } from '@/sanity/client';
import { catalogProductsQuery } from '@/sanity/queries';

// force-dynamic: always serve fresh data — prevents blank stale-cache page on first load
export const dynamic = 'force-dynamic';

export default async function CatalogPage() {
  const products = await client.fetch(catalogProductsQuery);

  return (
    <div className="flex flex-col w-full bg-white pb-16">

      {/* Gold accent hairline at top */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />

      <section className="container mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-6">
        {/* Suspense required because CatalogClient uses useSearchParams */}
        <Suspense fallback={
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 pt-10">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex flex-col animate-pulse">
                <div className="aspect-[4/5] bg-gray-200 mb-3" />
                <div className="h-3 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-2.5 bg-gray-100 rounded w-1/2" />
              </div>
            ))}
          </div>
        }>
          <CatalogClient products={products} />
        </Suspense>
      </section>
    </div>
  );
}

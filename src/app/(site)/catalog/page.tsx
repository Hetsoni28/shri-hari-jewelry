import { Suspense } from 'react';
import CatalogClient from '@/components/organisms/CatalogClient';
import { client } from '@/sanity/client';
import { productsQuery } from '@/sanity/queries';

export const revalidate = 60;

export default async function CatalogPage() {
  const products = await client.fetch(productsQuery);

  return (
    <div className="flex flex-col w-full bg-white pb-16">
      <section className="container mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-6">
        {/* Suspense required because CatalogClient uses useSearchParams */}
        <Suspense fallback={
          <div className="flex items-center justify-center py-32 text-[var(--color-secondary)] text-xs uppercase tracking-widest">
            Loading catalogue...
          </div>
        }>
          <CatalogClient products={products} />
        </Suspense>
      </section>
    </div>
  );
}

import React from 'react';
import CatalogDownloadContent from '@/components/organisms/CatalogDownloadContent';
import { client } from '@/sanity/client';
import { productsQuery } from '@/sanity/queries';
import { urlForImage } from '@/sanity/image';

// export const revalidate = 60; // Removed to ensure PDFs are always perfectly up to date
export const dynamic = 'force-dynamic';

export default async function CatalogDownloadPage() {
  const sanityProducts = await client.fetch(productsQuery) || [];

  interface SanityProduct {
    _id: string;
    category?: string;
    subcategory?: string;
    metalType?: string;
    name?: string;
    images?: any[];
  }
  
  const catalogProducts = sanityProducts.map((p: SanityProduct) => ({
    id: p._id,
    category: p.category || '',
    subcategory: p.subcategory || '',
    metalType: p.metalType || 'Gold', // default Gold for untagged legacy products
    title: p.name || '',
    imageSrc: p.images && p.images.length > 0 
      // 800px is retina-quality for PDF cards (~250pt). 1500 was 3× oversized → slow.
      ? urlForImage(p.images[0])?.width(800).quality(88).format('jpg').url() || '' 
      : ''
  }));

  return (
    <div className="bg-[var(--color-background-light)] min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <CatalogDownloadContent catalogProducts={catalogProducts} />
      </div>
    </div>
  );
}

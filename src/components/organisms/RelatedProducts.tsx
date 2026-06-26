import React from 'react';
import CatalogGrid, { Product } from '@/components/organisms/CatalogGrid';

interface RelatedProductsProps {
  currentProductId: string;
  allProducts: Product[];
}

export default function RelatedProducts({ currentProductId, allProducts }: RelatedProductsProps) {
  const relatedProducts = allProducts
    .filter((p: Product) => p._id !== currentProductId)
    .slice(0, 6);

  if (relatedProducts.length === 0) return null;

  return (
    <div className="bg-[#FAFAF8] border-t border-[#C9A84C]/15 py-20">
      <div className="container mx-auto px-4">

        {/* Section heading — matching the luxury centered style */}
        <div className="flex flex-col items-center justify-center text-center mb-14">
          <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#C9A84C] mb-3">
            EXPLORE MORE
          </p>
          <h2 className="text-headline text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-6">
            You May Also Like
          </h2>
          {/* Gold divider with dot */}
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C9A84C]/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C9A84C]/60" />
          </div>
        </div>

        <CatalogGrid products={relatedProducts} />
      </div>
    </div>
  );
}

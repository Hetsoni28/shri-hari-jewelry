import React from 'react';
import WishlistHeader from '@/components/organisms/WishlistHeader';
import WishlistContent from '@/components/organisms/WishlistContent';
import WishlistCurated from '@/components/organisms/WishlistCurated';
import { client } from '@/sanity/client';
import { productsQuery } from '@/sanity/queries';

export default async function WishlistPage() {
  const products = await client.fetch(productsQuery) || [];

  return (
    <div className="bg-[var(--color-background-light)] min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-lg lg:max-w-6xl">
        
        {/* Header */}
        <WishlistHeader />

        {/* Wishlist Items Grid/List */}
        <WishlistContent />

        {/* Curated Suggestions Component */}
        <WishlistCurated products={products} />

      </div>
    </div>
  );
}

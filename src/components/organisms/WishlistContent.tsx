"use client";

import React from 'react';
import WishlistCard from '@/components/molecules/WishlistCard';
import { useWishlist } from '@/context/WishlistContext';
import Link from 'next/link';

export default function WishlistContent() {
  const { items, removeFromWishlist } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="text-center py-20 bg-white border border-[var(--color-secondary)]/10 shadow-sm mb-16">
        <h3 className="text-2xl font-headline text-[var(--color-primary)] mb-2">Your wishlist is empty</h3>
        <p className="text-[var(--color-neutral)] text-sm mb-6">Discover our collections to add your favorite pieces here.</p>
        <Link href="/catalog" className="inline-block bg-[var(--color-tertiary)] hover:brightness-90 text-white py-3 px-8 text-xs font-bold tracking-[0.15em] uppercase transition-all shadow-md">
          Browse Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-16">
      {items.map((item) => (
        <WishlistCard
          key={item.id}
          imageSrc={item.imageSrc}
          title={item.title}
          badge1={item.badge1}
          badge2={item.badge2}
          isNewArrival={item.isNewArrival}
          onRemove={() => removeFromWishlist(item.id)}
          onInquire={() => window.open(`https://wa.me/919924326574?text=Hi! I am inquiring about ${item.title}`, '_blank')}
        />
      ))}
    </div>
  );
}

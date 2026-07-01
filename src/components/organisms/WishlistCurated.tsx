import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlForImage } from '@/sanity/image';

export default function WishlistCurated({ products = [] }: { products?: { _id: string; slug: string; [key: string]: any }[] }) {
  const displayProducts = products.slice(0, 3);

  if (!displayProducts || displayProducts.length === 0) return null;

  return (
    <div className="mt-16 pt-12 border-t border-secondary/20">
      <div className="flex justify-between items-end mb-8">
        <div></div>
        <Link href="/catalog" className="text-[9px] uppercase tracking-widest font-bold text-tertiary hover:text-primary transition-colors border-b border-tertiary pb-1">
          VIEW CATALOG
        </Link>
      </div>

      <div className="space-y-4">
        {displayProducts.map((item) => (
          <Link href={`/catalog/${encodeURIComponent(item.slug)}`} key={item._id} className="flex gap-4 p-4 bg-white border border-secondary/10 shadow-sm items-center group cursor-pointer hover:border-tertiary/30 transition-colors block">
            <div className="relative w-20 h-24 flex-shrink-0 overflow-hidden bg-background-light">
              <Image 
                src={item.images && item.images.length > 0 ? urlForImage(item.images[0])?.url() || '/images/placeholder.png' : '/images/placeholder.png'} 
                alt={item.name} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500" 
                sizes="80px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[8px] uppercase tracking-widest font-bold text-[var(--color-tertiary)] mb-1">
                {item.category}
              </div>
              <h4 className="text-sm font-headline font-bold text-[var(--color-primary)] mb-1 truncate">
                {item.name}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

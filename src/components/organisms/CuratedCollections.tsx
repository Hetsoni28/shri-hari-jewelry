import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlForImage } from '@/sanity/image';

export default function CuratedCollections({ products }: { products: any[] }) {
  // Find best match products for each collection type
  const bridal   = products.find(p => p.category === 'Set' || p.category === 'Bridal' || p.category === 'Mangalsutra') || products[0];
  const mens     = products.find(p => p.category === 'Chains' || (p.name && p.name.toLowerCase().includes('chain'))) || products[1];
  const daily    = products.find(p => p.category === 'Earrings' || p.category === 'Rings' || p.category === 'Bangles') || products[2];
  const heritage = products.find(p => p.category === 'Necklaces' || p.category === 'Choker' || p.category === 'Mala') || products[3];

  const getImg = (p: any, fallbackIdx: number) => {
    const src = p?.images?.[0] || products[fallbackIdx]?.images?.[0];
    return src ? urlForImage(src)?.width(1200).quality(95).url() || '' : '/images/placeholder.png';
  };

  const collections = [
    {
      id: 1,
      imageSrc: getImg(bridal, 0),
      title: bridal?.name || 'Bridal Collection',
      subtitle: bridal?.category || 'Bridal',
      href: bridal?.slug ? `/catalog/${encodeURIComponent(bridal.slug)}` : '/catalog',
      colSpan: 'md:col-span-2',
    },
    {
      id: 2,
      imageSrc: getImg(mens, 1),
      title: mens?.name || "Men's Collection",
      subtitle: mens?.category || 'Chains',
      href: mens?.slug ? `/catalog/${encodeURIComponent(mens.slug)}` : '/catalog',
      colSpan: 'md:col-span-1',
    },
    {
      id: 3,
      imageSrc: getImg(daily, 2),
      title: daily?.name || 'Everyday Collection',
      subtitle: daily?.category || 'Jewellery',
      href: daily?.slug ? `/catalog/${encodeURIComponent(daily.slug)}` : '/catalog',
      colSpan: 'md:col-span-1',
    },
    {
      id: 4,
      imageSrc: getImg(heritage, 3),
      title: heritage?.name || 'Heritage Collection',
      subtitle: heritage?.category || 'Necklaces',
      href: heritage?.slug ? `/catalog/${encodeURIComponent(heritage.slug)}` : '/catalog',
      colSpan: 'md:col-span-2',
    },
  ];

  return (
    <section className="py-12 sm:py-20 md:py-24 bg-[var(--color-background-light)]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold text-[var(--color-primary)] mb-6">
            Explore Collections
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={collection.href}
              className={`relative h-[220px] sm:h-[300px] md:h-[400px] overflow-hidden group block cursor-pointer ${collection.colSpan}`}
            >
              {/* overlay — pointer-events-none so clicks reach the Link */}
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors duration-500 pointer-events-none z-10" />

              <Image
                src={collection.imageSrc}
                alt={collection.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={collection.id === 1}
              />

              {/* Bottom text */}
              <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 z-20 bg-gradient-to-t from-black/85 to-transparent pointer-events-none">
                <h3 className="text-xl sm:text-2xl font-headline font-bold text-white mb-1 line-clamp-1">
                  {collection.title}
                </h3>
                <p className="text-[10px] text-white/70 uppercase tracking-widest font-medium mb-3">
                  {collection.subtitle}
                </p>
                {/* Hover CTA */}
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  View Product <span>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}



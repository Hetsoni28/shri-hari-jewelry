import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function CuratedCollections() {
  const collections = [
    {
      id: 1,
      imageSrc: "/images/bridal_collection_1780906256760.png",
      title: "Bridal Elegance",
      subtitle: "The Complete Wedding Trousseau",
      colSpan: "md:col-span-2"
    },
    {
      id: 2,
      imageSrc: "/images/mens_chain_1780906231254.png",
      title: "Men's Edit",
      subtitle: "Sophisticated Chains & Rings",
      colSpan: "md:col-span-1"
    },
    {
      id: 3,
      imageSrc: "/images/rings_collection_1780906243842.png",
      title: "Everyday Essentials",
      subtitle: "Lightweight Silver & Gold",
      colSpan: "md:col-span-1"
    },
    {
      id: 4,
      imageSrc: "/images/emerald_haar_1780906804154.png",
      title: "Heritage Masterpieces",
      subtitle: "Heavy Temple Jewelry",
      colSpan: "md:col-span-2"
    }
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
              href="/collections" 
              className={`relative h-[220px] sm:h-[300px] md:h-[400px] overflow-hidden group block ${collection.colSpan}`}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10 duration-500"></div>
              <Image 
                src={collection.imageSrc} 
                alt={collection.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={collection.id === 1}
              />
              <div className="absolute bottom-0 left-0 w-full p-8 z-20 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-2xl font-headline font-bold text-white mb-2">
                  {collection.title}
                </h3>
                <p className="text-xs text-white/80 uppercase tracking-widest font-medium">
                  {collection.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

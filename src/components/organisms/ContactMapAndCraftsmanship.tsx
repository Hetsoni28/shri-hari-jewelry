import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ContactMapAndCraftsmanship({ items }: { items?: { url: string; link: string }[] }) {
  const getImg = (idx: number) => items?.[idx]?.url || '/images/placeholder.png';
  const getLink = (idx: number) => items?.[idx]?.link || '/catalog';

  return (
    <section>
      {/* Craftsmanship Section */}
      <div className="bg-[var(--color-background-light)] py-20 lg:py-32">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            
            {/* Text Content */}
            <div className="flex-1 md:pr-12 text-center md:text-left">
              <h2 className="text-4xl lg:text-5xl font-headline font-bold text-[var(--color-primary)] mb-6 leading-tight">
                Craftsmanship<br />Beyond<br />Boundaries
              </h2>
              <p className="text-[var(--color-neutral)] text-sm md:text-base leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
                Every piece at Shri Hari is a testament to over two decades of trust and artistic evolution. Explore our curated retail collections.
              </p>
              <Link href="/collections" className="inline-block border border-[var(--color-secondary)] hover:border-[var(--color-tertiary)] hover:text-[var(--color-tertiary)] text-[var(--color-primary)] py-3 px-8 text-xs font-bold tracking-[0.2em] uppercase transition-colors">
                View Collections
              </Link>
            </div>

            {/* Image Grid */}
            <div className="flex-1 w-full max-w-md mx-auto">
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4 sm:space-y-6">
                  <Link href={getLink(0)} className="relative aspect-square w-full overflow-hidden group block bg-[#fcfcfc] rounded-sm shadow-sm border border-gray-100">
                    <Image src={getImg(0)} alt="Craftsmanship 1" fill className="object-contain p-2 group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 50vw, 25vw" />
                  </Link>
                  <Link href={getLink(1)} className="relative aspect-square w-full overflow-hidden group block bg-[#fcfcfc] rounded-sm shadow-sm border border-gray-100">
                    <Image src={getImg(1)} alt="Craftsmanship 2" fill className="object-contain p-2 group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 50vw, 25vw" />
                  </Link>
                </div>
                <div className="space-y-4 sm:space-y-6 pt-6 sm:pt-10">
                  <Link href={getLink(2)} className="relative aspect-square w-full overflow-hidden group block bg-[#fcfcfc] rounded-sm shadow-sm border border-gray-100">
                    <Image src={getImg(2)} alt="Craftsmanship 3" fill className="object-contain p-2 group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 50vw, 25vw" />
                  </Link>
                  <Link href={getLink(3)} className="relative aspect-square w-full overflow-hidden group block bg-[#fcfcfc] rounded-sm shadow-sm border border-gray-100">
                    <Image src={getImg(3)} alt="Craftsmanship 4" fill className="object-contain p-2 group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 50vw, 25vw" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

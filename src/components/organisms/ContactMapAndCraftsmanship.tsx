import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ContactMapAndCraftsmanship() {
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
                Every piece at Shri Hari is a testament to four decades of trust and artistic evolution. Explore our curated retail collections.
              </p>
              <Link href="/catalog" className="inline-block border border-[var(--color-secondary)] hover:border-[var(--color-tertiary)] hover:text-[var(--color-tertiary)] text-[var(--color-primary)] py-3 px-8 text-xs font-bold tracking-[0.2em] uppercase transition-colors">
                View Collections
              </Link>
            </div>

            {/* Image Grid */}
            <div className="flex-1 w-full max-w-md mx-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative aspect-[3/4] w-full overflow-hidden group">
                    <Image src="/images/vedic_choker_thumb1_1780907181761.png" alt="Craftsmanship 1" fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 50vw, 25vw" />
                  </div>
                  <div className="relative aspect-square w-full overflow-hidden group">
                    <Image src="/images/rings_collection_1780906243842.png" alt="Craftsmanship 2" fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 50vw, 25vw" />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="relative aspect-square w-full overflow-hidden group">
                    <Image src="/images/gold_bangle_1780906267820.png" alt="Craftsmanship 3" fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 50vw, 25vw" />
                  </div>
                  <div className="relative aspect-[3/4] w-full overflow-hidden group">
                    <Image src="/images/mens_chain_1780906231254.png" alt="Craftsmanship 4" fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 50vw, 25vw" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

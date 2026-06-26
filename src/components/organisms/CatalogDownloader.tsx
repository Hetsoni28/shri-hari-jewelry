import React from 'react';
import Link from 'next/link';

export default function CatalogDownloader() {
  return (
    <section className="py-20 bg-[var(--color-primary)] text-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-[url('/images/media__1780905966503.png')] bg-cover bg-center"></div>
      
      <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-headline font-bold mb-6">
          Exclusive Jewelry Catalog
        </h2>
        <p className="text-[var(--color-neutral)] text-sm leading-relaxed mb-6">
          Access our complete collection of heritage gold and modern silver pieces, featuring exquisite details and high-resolution imagery.
        </p>
        
        <Link href="/catalog-download" className="bg-[var(--color-tertiary)] hover:brightness-110 text-white font-bold tracking-[0.2em] uppercase py-4 px-10 text-sm transition-all shadow-xl hover:shadow-2xl inline-flex items-center justify-center gap-3 w-auto mx-auto">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Download PDF Catalog
        </Link>
      </div>
    </section>
  );
}

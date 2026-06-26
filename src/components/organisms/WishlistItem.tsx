import React from 'react';
import Image from 'next/image';

interface WishlistItemProps {
  imageSrc: string;
  title: string;
  badge1: string;
  badge2: string;
  isNewArrival?: boolean;
}

export default function WishlistItem({ imageSrc, title, badge1, badge2, isNewArrival }: WishlistItemProps) {
  return (
    <div className="relative bg-white shadow-sm border border-[var(--color-secondary)]/10 mb-8 overflow-hidden group">
      
      {/* Remove Button */}
      <button className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[var(--color-neutral)] hover:text-red-500 shadow-sm transition-colors">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      {/* Image */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-background-light)]">
        <Image 
          src={imageSrc} 
          alt={title} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-700" 
          sizes="(max-width: 768px) 100vw, 50vw" 
        />
        {isNewArrival && (
          <div className="absolute bottom-4 left-4 bg-[var(--color-tertiary)] text-white text-[9px] font-bold tracking-widest uppercase py-1 px-3">
            New Arrival
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl md:text-2xl font-headline font-bold text-[var(--color-primary)] mb-4 leading-tight">
          {title}
        </h3>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="border border-[var(--color-secondary)]/30 text-[9px] uppercase tracking-widest font-bold text-[var(--color-neutral)] py-1.5 px-3">
            {badge1}
          </span>
          <span className="border border-[var(--color-secondary)]/30 text-[9px] uppercase tracking-widest font-bold text-[var(--color-neutral)] py-1.5 px-3">
            {badge2}
          </span>
        </div>

        <button className="w-full bg-[var(--color-tertiary)] hover:brightness-90 text-white py-3.5 px-4 text-[10px] font-bold tracking-[0.15em] uppercase transition-all flex items-center justify-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
          Inquire Via WhatsApp
        </button>
      </div>
    </div>
  );
}

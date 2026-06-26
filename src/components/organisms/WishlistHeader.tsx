"use client";

import React from 'react';
import { useWishlist } from '@/context/WishlistContext';

export default function WishlistHeader() {
  const { items } = useWishlist();

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[var(--color-secondary)]/20 pb-8 mb-12 gap-8">
      <div className="max-w-xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold text-[var(--color-primary)] mb-6 leading-tight">
          Luxury Wishlist
        </h1>
        <p className="text-[var(--color-neutral)] text-sm md:text-base leading-relaxed">
          A private collection of your most admired pieces. Review your selections or inquire for availability and current market rates.
        </p>
      </div>
      
      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
        <div className="text-xs uppercase tracking-widest font-bold text-[var(--color-primary)] text-right">
          <span className="text-2xl block text-[var(--color-tertiary)] mb-1">{items.length}</span>
          Items Saved
        </div>
        <div className="h-12 w-px bg-[var(--color-secondary)]/20"></div>
        <button 
          onClick={() => {
            if (typeof window !== 'undefined') {
              navigator.clipboard.writeText(window.location.href);
              alert('Wishlist link copied to clipboard!');
            }
          }}
          className="flex items-center gap-3 border border-[var(--color-secondary)]/30 hover:border-[var(--color-tertiary)] py-3 px-6 text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] hover:text-[var(--color-tertiary)] transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
          Share List
        </button>
      </div>
    </div>
  );
}

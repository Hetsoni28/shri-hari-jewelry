import React from 'react';
import Image from 'next/image';
import Button from '../atoms/Button';
import Badge from '../atoms/Badge';

interface WishlistCardProps {
  title: string;
  badge1: string;
  badge2?: string;
  imageSrc: string;
  isNewArrival?: boolean;
  onRemove?: () => void;
  onInquire?: () => void;
}

export default function WishlistCard({ 
  title, 
  badge1, 
  badge2, 
  imageSrc, 
  isNewArrival,
  onRemove,
  onInquire 
}: WishlistCardProps) {
  return (
    <div className="flex flex-col bg-white border border-[var(--color-secondary)]/20 shadow-sm relative group">
      {isNewArrival && (
        <div className="absolute top-4 left-4 z-20">
          <Badge variant="primary">New Arrival</Badge>
        </div>
      )}
      
      {onRemove && (
        <button 
          onClick={onRemove}
          className="absolute top-4 right-4 z-20 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-[var(--color-primary)] hover:text-red-500 hover:bg-white transition-all shadow-sm opacity-0 group-hover:opacity-100"
          aria-label="Remove from wishlist"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}

      <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-background-light)] w-full">
        <Image 
          src={imageSrc} 
          alt={title} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-700" 
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div className="p-6 text-center flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-xl md:text-2xl font-headline font-bold text-[var(--color-primary)] mb-4">
            {title}
          </h3>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <Badge variant="outline">{badge1}</Badge>
            {badge2 && <Badge variant="secondary">{badge2}</Badge>}
          </div>
        </div>
        
        <Button variant="outline" fullWidth onClick={onInquire}>
          Inquire Via WhatsApp
        </Button>
      </div>
    </div>
  );
}

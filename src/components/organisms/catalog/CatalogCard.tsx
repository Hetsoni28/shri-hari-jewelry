'use client';

import Link from 'next/link';
import FramedImage from '@/components/atoms/FramedImage';
import { useWishlist } from '@/context/WishlistContext';
import type { CatalogItem } from '@/components/organisms/CatalogClient';

const GENDER_NOTE: Record<string, string> = { Women: 'For women', Men: 'For men', Unisex: 'Unisex' };

export default function CatalogCard({ item, priority }: { item: CatalogItem; priority?: boolean }) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const saved = isInWishlist(item.id);

  const toggleSaved = () =>
    saved
      ? removeFromWishlist(item.id)
      : addToWishlist({
          id: item.id,
          imageSrc: item.thumb || '/images/placeholder.png',
          title: item.name,
          badge1: item.metal ?? '',
          isNewArrival: item.isNew,
        });

  return (
    <article className="group relative">
      <Link href={`/catalog/${encodeURIComponent(item.slug)}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#F6F2EA]">
          {item.image ? (
            <FramedImage
              src={item.image.src}
              fit={item.image.fit}
              ratio={item.image.ratio}
              alt={item.alt}
              priority={priority}
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              imgClassName="transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center font-label text-[11px] uppercase tracking-[0.2em] text-[#B5AFBF]">
              Photo coming soon
            </span>
          )}

          {item.isNew && (
            <span className="absolute left-3 top-3 z-10 bg-white/95 px-2.5 py-1 font-label text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8069BF]">
              New
            </span>
          )}
        </div>

        <p className="mt-4 font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A8873A]">
          {item.categoryLabel}
          {item.metal && <span className="text-[#C9BFA6]"> · </span>}
          {item.metal}
        </p>
        <h3 className="mt-1.5 line-clamp-2 pr-8 font-headline text-[16px] leading-snug text-[#1C1726] transition-colors duration-300 group-hover:text-[#8069BF] sm:text-[17px]">
          {item.name}
        </h3>
        {item.gender && GENDER_NOTE[item.gender] && (
          <p className="mt-1 font-label text-[12px] text-[#8C8698]">{GENDER_NOTE[item.gender]}</p>
        )}
      </Link>

      {/* Save — sits outside the link so tapping it never opens the product */}
      <button
        type="button"
        onClick={toggleSaved}
        aria-pressed={saved}
        aria-label={saved ? `Remove ${item.name} from wishlist` : `Save ${item.name} to wishlist`}
        className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#8069BF] shadow-[0_6px_16px_-8px_rgba(28,23,38,0.45)] transition-transform duration-300 hover:scale-105 active:scale-95"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6">
          <path d="M12 20.5s-7.5-4.6-9.3-9.4C1.6 8 3.4 4.5 7 4.5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.6 0 5.4 3.5 4.3 6.6-1.8 4.8-9.3 9.4-9.3 9.4z" />
        </svg>
      </button>
    </article>
  );
}

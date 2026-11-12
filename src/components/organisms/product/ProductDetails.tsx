'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useWishlist } from '@/context/WishlistContext';
import { shopInfo } from '@/data/shopInfo';

export type ProductDetailsData = {
  id: string;
  name: string;
  url: string;
  description?: string;
  category: string;
  categoryLabel: string;
  metal: string | null;
  gender: string | null;
  isNew: boolean;
  thumb: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;
const FOR_LABEL: Record<string, string> = { Women: 'Women', Men: 'Men', Unisex: 'Women & men' };

export default function ProductDetails({ product }: { product: ProductDetailsData }) {
  const reduceMotion = useReducedMotion();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [copied, setCopied] = useState(false);

  const saved = isInWishlist(product.id);
  const isGold = product.metal === 'Gold';

  const whatsappHref = `https://wa.me/${shopInfo.phone2.replace(/\D/g, '')}?text=${encodeURIComponent(
    `Namaste! I'd like today's price for this piece:\n\n*${product.name}*\n${[product.categoryLabel, product.metal]
      .filter(Boolean)
      .join(' · ')}\n${product.url}`,
  )}`;

  const toggleSaved = () =>
    saved
      ? removeFromWishlist(product.id)
      : addToWishlist({
          id: product.id,
          imageSrc: product.thumb || '/images/placeholder.png',
          title: product.name,
          badge1: product.metal ?? '',
          isNewArrival: product.isNew,
        });

  // Phones get the native share sheet (WhatsApp, etc.); desktops copy the link
  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: product.name, url: product.url });
      } catch {
        /* dismissed */
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(product.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — nothing to confirm */
    }
  };

  const rise = (i: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease: EASE, delay: 0.08 * i },
        };

  const details = [
    { label: 'Category', value: product.categoryLabel },
    product.metal && { label: 'Metal', value: product.metal },
    product.gender && FOR_LABEL[product.gender] && { label: 'For', value: FOR_LABEL[product.gender] },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div>
      {/* Breadcrumb */}
      <motion.nav {...rise(0)} aria-label="Breadcrumb" className="font-label text-[12px] text-[#8C8698]">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link href="/catalog" className="hover:text-[#1C1726]">Catalogue</Link></li>
          <li aria-hidden="true" className="text-[#D6CFC0]">/</li>
          <li>
            <Link href={`/catalog?category=${encodeURIComponent(product.category)}`} className="hover:text-[#1C1726]">
              {product.categoryLabel}
            </Link>
          </li>
        </ol>
      </motion.nav>

      <motion.p {...rise(1)} className="mt-5 font-label text-[11px] font-semibold uppercase tracking-[0.28em] text-[#A8873A]">
        {[product.categoryLabel, product.metal].filter(Boolean).join(' · ')}
      </motion.p>

      <motion.h1
        {...rise(2)}
        className="mt-2.5 font-headline text-[clamp(1.75rem,2.6vw,2.4rem)] font-medium leading-[1.12] tracking-[-0.015em] text-[#1C1726]"
      >
        {product.name}
      </motion.h1>

      {/* ── Actions ── */}
      <motion.div {...rise(3)} className="mt-7 flex flex-col gap-2.5">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 bg-[#8069BF] px-6 py-3.5 font-label text-[12px] font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-[#6A55A8]"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-[18px] w-[18px]">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Ask for today&apos;s price
        </a>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={toggleSaved}
            aria-pressed={saved}
            className={`flex items-center justify-center gap-2 border px-4 py-3 font-label text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 ${
              saved ? 'border-[#8069BF] bg-[#F7F5FA] text-[#8069BF]' : 'border-[#E2DCCF] text-[#1C1726] hover:border-[#1C1726]'
            }`}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.7">
              <path d="M12 20.5s-7.5-4.6-9.3-9.4C1.6 8 3.4 4.5 7 4.5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.6 0 5.4 3.5 4.3 6.6-1.8 4.8-9.3 9.4-9.3 9.4z" />
            </svg>
            {saved ? 'Saved' : 'Save'}
          </button>
          <button
            type="button"
            onClick={share}
            className="flex items-center justify-center gap-2 border border-[#E2DCCF] px-4 py-3 font-label text-[12px] font-semibold uppercase tracking-[0.16em] text-[#1C1726] transition-colors duration-300 hover:border-[#1C1726]"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
              <path d="M12 3v12M7 8l5-5 5 5M5 13v6a2 2 0 002 2h10a2 2 0 002-2v-6" />
            </svg>
            <span aria-live="polite">{copied ? 'Link copied' : 'Share'}</span>
          </button>
        </div>

        <a
          href={`tel:${shopInfo.phone1.replace(/\s+/g, '')}`}
          className="mt-0.5 text-center font-label text-[13px] text-[#5F5A6B] transition-colors hover:text-[#1C1726]"
        >
          Prefer to talk? Call <span className="font-semibold tabular-nums text-[#1C1726]">{shopInfo.phone1}</span>
        </a>
      </motion.div>

      {/* ── About the piece ── */}
      {product.description && (
        <motion.section {...rise(5)} className="mt-9 border-t border-[#E9E3D6] pt-7" aria-label="About this piece">
          <h2 className="font-headline text-[19px] text-[#1C1726]">About this piece</h2>
          <p className="mt-3 whitespace-pre-line font-body text-[15px] leading-[1.75] text-[#5F5A6B]">{product.description}</p>
        </motion.section>
      )}

      <motion.dl {...rise(6)} className="mt-7 grid grid-cols-3 gap-x-6 gap-y-5 border-t border-[#E9E3D6] pt-7">
        {details.map((d) => (
          <div key={d.label}>
            <dt className="font-label text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8C8698]">{d.label}</dt>
            <dd className="mt-1.5 font-body text-[15px] text-[#1C1726]">{d.value}</dd>
          </div>
        ))}
      </motion.dl>

      {/* ── What you can count on ── */}
      <motion.ul {...rise(7)} className="mt-7 space-y-2.5 border-t border-[#E9E3D6] pt-7 font-body text-[14px] text-[#5F5A6B]">
        {[
          isGold && 'BIS hallmarked gold',
          'Size or design changes can be discussed before it is made',
          `See it in person at our shop in ${shopInfo.address.city}, ${shopInfo.address.taluka_district}`,
        ]
          .filter(Boolean)
          .map((line) => (
            <li key={line as string} className="flex gap-3">
              <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rotate-45 bg-[#C9A74D]" aria-hidden="true" />
              {line}
            </li>
          ))}
      </motion.ul>
    </div>
  );
}

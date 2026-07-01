'use client';

import { motion } from 'framer-motion';
import { shopInfo } from '@/data/shopInfo';
import { useWishlist } from '@/context/WishlistContext';
import { urlForImage } from '@/sanity/image';
import { usePriceCalculator, type MetalType, type GoldPurity } from '@/hooks/usePriceCalculator';

export interface ProductActionData {
  _id: string;
  name: string;
  images?: Record<string, unknown>[];
  purity?: string;
  weight?: string;
  netWeight?: string;
  category?: string;
  subcategory?: string;
  tag?: string;
  isNewArrival?: boolean;
  metalType?: string;
  makingCharge?: number;
  makingChargeType?: 'flat' | 'per_gram';
  stoneCharge?: number;
}

export default function ProductActions({ product }: { product: ProductActionData }) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isAdded = isInWishlist(product._id);

  // Parse weight
  const parsedWeight = parseFloat((product.netWeight || product.weight)?.replace(/[^0-9.]/g, '') || '0');
  
  // Calculate price dynamically
  const breakdown = usePriceCalculator({
    metalType: (product.metalType as MetalType) || 'Gold',
    purity: product.purity as GoldPurity,
    netWeight: parsedWeight,
    makingCharge: product.makingCharge || 0,
    makingChargeType: product.makingChargeType || 'flat',
    stoneCharge: product.stoneCharge || 0,
    gstPercent: 3
  });

  const canShowPrice = parsedWeight > 0 && product.makingCharge !== undefined && breakdown !== null;
  const currentPriceText = canShowPrice ? `\n\nCurrent Price:\n₹${breakdown.total.toLocaleString('en-IN')}` : '';

  const handleToggle = () => {
    if (isAdded) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist({
        id: product._id,
        imageSrc: product.images && product.images.length > 0
          ? urlForImage(product.images[0])?.url() || '/images/placeholder.png'
          : '/images/placeholder.png',
        title: product.name,
        badge1: product.purity || '',
        badge2: product.tag || undefined,
        isNewArrival: !!product.isNewArrival,
      });
    }
  };

  const whatsappMessage = `Hello Shri Hari Jewellers,

I am interested in this jewellery.

Product:
*${product.name}*${product.category ? `\nCategory: ${product.category}${product.subcategory ? ` › ${product.subcategory}` : ''}` : ''}${product.purity ? `\nPurity: ${product.purity}` : ''}${product.weight || product.netWeight ? `\nWeight: ${product.weight || product.netWeight}` : ''}${currentPriceText}

Please share more details.`;

  return (
    <div className="flex flex-col space-y-3 sm:space-y-4">

      {/* ── WhatsApp CTA ── solid gold button */}
      <motion.a
        href={`https://wa.me/${shopInfo.phone2.replace(/\s+/g, '')}?text=${encodeURIComponent(whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-3 bg-[#C9A84C] hover:bg-[#b8933d] text-white py-4 px-6 text-xs font-bold tracking-[0.18em] uppercase transition-colors duration-300"
        whileHover={{ y: -1, boxShadow: '0 8px 24px -6px rgba(201,168,76,0.4)' }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.18 }}
      >
        {/* WhatsApp icon */}
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
        <span>WHATSAPP INQUIRY</span>
      </motion.a>

      {/* ── Wishlist toggle ── */}
      <motion.button
        onClick={handleToggle}
        className={`relative overflow-hidden group w-full flex items-center justify-center gap-2 border py-4 px-6 text-xs font-bold tracking-[0.18em] uppercase transition-colors duration-300 ${
          isAdded
            ? 'border-[#C9A84C] bg-[#C9A84C] text-white'
            : 'border-[var(--color-secondary)]/40 text-[var(--color-secondary)] hover:border-[#C9A84C] hover:text-[#C9A84C]'
        }`}
        whileHover={{ scale: 1.005 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.18 }}
      >
        {/* Heart icon */}
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill={isAdded ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
        {isAdded ? 'SAVED TO WISHLIST' : 'ADD TO WISHLIST'}
      </motion.button>
    </div>
  );
}

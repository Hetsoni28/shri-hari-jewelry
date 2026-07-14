'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUpVariant, cardHoverVariant, imageHoverVariant, luxuryEasing } from '@/lib/animations';
import { urlForImage } from '@/sanity/image';

export default function GoldHeritage({ products }: { products: any[] }) {
  // Pick 4 unique products across varied categories — no repeats
  const usedIds = new Set<string>();

  const pick = (...cats: string[]) => {
    const found = products.find(p => !usedIds.has(p._id) && cats.includes(p.category));
    const result = found || products.find(p => !usedIds.has(p._id)) || products[0];
    if (result) usedIds.add(result._id);
    return result;
  };

  const temple  = pick('Set', 'Choker', 'Necklaces');
  const antique = pick('Bangles', 'Kada', 'Bangle');
  const bridal  = pick('Mangalsutra', 'Bridal', 'Mala');
  const daily   = pick('Chains', 'Earrings', 'Rings');

  const getImg  = (p: any) => p?.images?.[0] ? urlForImage(p.images[0])?.width(800).quality(95).url() || '' : '/images/placeholder.png';
  const getHref = (p: any) => p?.slug ? `/catalog/${encodeURIComponent(p.slug)}` : '/catalog';

  const smallCards = [
    { img: getImg(antique), title: antique?.name || 'Gold Bangles',   category: antique?.category || 'Bangles',    href: getHref(antique) },
    { img: getImg(bridal),  title: bridal?.name  || 'Mangalsutra',    category: bridal?.category  || 'Bridal',     href: getHref(bridal)  },
    { img: getImg(daily),   title: daily?.name   || 'Everyday Picks', category: daily?.category   || 'Collection', href: getHref(daily)   },
  ];

  return (
    <div className="mb-16 sm:mb-24 overflow-hidden">

      {/* Section Title */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={staggerContainer}
        className="flex items-center space-x-4 mb-8 sm:mb-10"
      >
        <motion.div
          className="h-px bg-[var(--color-tertiary)] origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: luxuryEasing.reveal }}
          style={{ width: 28 }}
        />
        <motion.h2
          variants={fadeUpVariant}
          className="text-xl md:text-2xl font-headline font-bold text-[var(--color-primary)]"
        >
          The Gold Heritage
        </motion.h2>
        <div className="h-[1px] flex-grow bg-[var(--color-secondary)]/20 max-w-[80px]" />
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
      >
        {/* ── Large Card: Temple Jewelry ── */}
        <motion.div variants={fadeUpVariant}>
          <motion.div
            variants={cardHoverVariant}
            initial="rest"
            whileHover="hover"
            className="border border-[var(--color-secondary)]/20 bg-white group flex flex-col cursor-pointer h-full"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-background-light)]">
              <motion.div
                variants={imageHoverVariant}
                initial="rest"
                whileHover="hover"
                className="relative w-full h-full"
              >
                <Image
                  src={getImg(temple)}
                  alt={temple?.name || 'Temple Jewelry'}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>

              {/* Gold sheen overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-tertiary)]/0 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
            </div>

            <div className="p-6 sm:p-8 flex flex-col flex-grow">
              <p className="text-label text-[9px] uppercase tracking-[0.2em] text-[var(--color-secondary)] mb-2">
                {temple?.category || 'SIGNATURE SERIES'}
              </p>
              <h3 className="text-xl sm:text-2xl font-headline font-bold text-[var(--foreground)] mb-4">
                {temple?.name || 'Heritage Gold'}
              </h3>
              <p className="text-body text-sm text-[var(--color-neutral)] leading-relaxed mb-6 flex-grow line-clamp-3">
                {temple?.description
                  ? temple.description
                  : 'A masterpiece from our Gold Heritage collection — crafted with exceptional purity and timeless artistry.'}
              </p>

              {/* Extra image thumbnails if product has multiple images */}
              {temple?.images && temple.images.length > 1 && (
                <div className="flex gap-2 mb-5">
                  {temple.images.slice(1, 4).map((img: any, i: number) => {
                    const thumbUrl = urlForImage(img)?.width(80).height(80).quality(85).url();
                    return thumbUrl ? (
                      <div key={i} className="relative w-14 h-14 border border-[var(--color-secondary)]/20 overflow-hidden flex-shrink-0 bg-[var(--color-background-light)]">
                        <Image src={thumbUrl} alt={`${temple.name} view ${i + 2}`} fill sizes="56px" className="object-cover" />
                      </div>
                    ) : null;
                  })}
                </div>
              )}

              {/* Metal type badge */}
              {temple?.metalType && (
                <span className="inline-block mb-4 text-[9px] uppercase tracking-widest font-label font-bold text-[#C9A84C] border border-[#C9A84C]/30 px-2 py-0.5 w-fit">
                  {temple.metalType}
                </span>
              )}

              <Link
                href={temple?.slug ? `/catalog/${encodeURIComponent(temple.slug)}` : '/catalog'}
                className="group/link inline-flex items-center gap-2 text-xs font-label uppercase tracking-widest font-bold text-[var(--color-primary)] hover:text-[var(--color-tertiary)] transition-colors duration-300"
              >
                VIEW PRODUCT
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >→</motion.span>
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Small Cards ── */}
        <motion.div variants={fadeUpVariant} className="flex flex-col space-y-4 sm:space-y-6">
          {smallCards.map((item) => (
            <motion.div
              key={item.title}
              variants={cardHoverVariant}
              initial="rest"
              whileHover="hover"
            >
              <Link
                href={item.href}
                className="border border-[var(--color-secondary)]/20 bg-white flex items-center p-4 group cursor-pointer hover:border-[var(--color-tertiary)]/30 transition-colors duration-400 block"
              >
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-[var(--color-background-light)] overflow-hidden">
                  <motion.div
                    variants={imageHoverVariant}
                    initial="rest"
                    whileHover="hover"
                    className="relative w-full h-full"
                  >
                    <Image src={item.img} alt={item.title} fill sizes="96px" className="object-cover" />
                  </motion.div>
                </div>
                <div className="ml-4 sm:ml-6 flex flex-col gap-0.5">
                  <span className="text-[9px] uppercase tracking-[0.18em] text-[var(--color-tertiary)] font-label font-semibold">
                    {item.category}
                  </span>
                  <h4 className="text-base sm:text-lg font-headline font-bold text-[var(--foreground)] mb-1 group-hover:text-[var(--color-primary)] transition-colors duration-300 line-clamp-1">
                    {item.title}
                  </h4>
                  <span className="inline-flex items-center gap-1 text-[9px] font-label uppercase tracking-widest text-[var(--color-secondary)] group-hover:text-[#C9A84C] transition-colors duration-300">
                    View Product <span className="text-[#C9A84C]">→</span>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

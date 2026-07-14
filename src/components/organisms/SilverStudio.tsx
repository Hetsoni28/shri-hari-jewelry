'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUpVariant, cardHoverVariant, imageHoverVariant, luxuryEasing } from '@/lib/animations';
import { urlForImage } from '@/sanity/image';

export default function SilverStudio({ products }: { products: any[] }) {
  // Find silver products if possible, else fallback
  const silverProducts = products.filter(p => p.metalType === 'Silver' || p.category?.toLowerCase().includes('silver'));
  const getProduct = (idx: number) => silverProducts[idx] || products[idx + 4] || products[idx];

  const getImg = (p: any) => p?.images?.[0] ? urlForImage(p.images[0])?.width(800).quality(90).url() || '' : '/images/placeholder.png';

  const getHref = (p: any) => p?.slug ? `/catalog/${encodeURIComponent(p.slug)}` : '/catalog';

  const cards = [
    {
      image: getImg(getProduct(0)),
      title: getProduct(0)?.name || 'Sterling Silver',
      desc: '925 purity crafted into modern silhouettes for the contemporary woman.',
      href: getHref(getProduct(0)),
    },
    {
      image: getImg(getProduct(1)),
      title: getProduct(1)?.name || 'Modern Accents',
      desc: 'Innovative silver designs that blend artistic form with practical intent.',
      href: getHref(getProduct(1)),
    },
    {
      image: getImg(getProduct(2)),
      title: getProduct(2)?.name || 'Traditional Silverware',
      desc: 'Exquisite articles for rituals and home, carrying forward age-old traditions.',
      href: getHref(getProduct(2)),
    },
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
          className="h-px bg-[var(--color-secondary)]/50 origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: luxuryEasing.reveal }}
          style={{ width: 28 }}
        />
        <motion.h2
          variants={fadeUpVariant}
          className="text-xl md:text-2xl font-headline font-bold text-[#555]"
        >
          The Silver Studio
        </motion.h2>
      </motion.div>

      {/* Cards */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
      >
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            variants={fadeUpVariant}
            custom={index}
          >
            <Link href={card.href} className="block h-full">
              <motion.div
                variants={cardHoverVariant}
                initial="rest"
                whileHover="hover"
                className="border border-[var(--color-secondary)]/20 bg-white group flex flex-col cursor-pointer h-full hover:border-[var(--color-secondary)]/40 transition-colors duration-500"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-[var(--color-background-light)]">
                  <motion.div
                    variants={imageHoverVariant}
                    initial="rest"
                    whileHover="hover"
                    className="relative w-full h-full"
                  >
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(max-width: 767px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </motion.div>
                </div>

                <div className="p-5 sm:p-6 flex flex-col flex-grow">
                  <h3 className="text-lg sm:text-xl font-headline font-bold text-[var(--foreground)] mb-2 group-hover:text-[#444] transition-colors duration-300 line-clamp-1">
                    {card.title}
                  </h3>
                  <p className="text-body text-sm text-[var(--color-neutral)] leading-relaxed mb-5 flex-grow">
                    {card.desc}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[10px] font-label uppercase tracking-widest font-bold text-[#555] group-hover:text-[var(--foreground)] transition-colors duration-300">
                    VIEW PRODUCT
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
                    >→</motion.span>
                  </span>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUpVariant, cardHoverVariant, imageHoverVariant, luxuryEasing } from '@/lib/animations';

export default function GoldHeritage() {
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
                  src="/images/vedic_choker_main_1780907169188.png"
                  alt="Temple Jewelry"
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
                SIGNATURE SERIES
              </p>
              <h3 className="text-xl sm:text-2xl font-headline font-bold text-[var(--foreground)] mb-4">
                Temple Jewelry
              </h3>
              <p className="text-body text-sm text-[var(--color-neutral)] leading-relaxed mb-6 flex-grow">
                Sacred motifs brought to life in 22k pure gold, echoing the architectural grandeur of ancient Indian temples.
              </p>
              <Link
                href="/catalog"
                className="group/link inline-flex items-center gap-2 text-xs font-label uppercase tracking-widest font-bold text-[var(--color-primary)] hover:text-[var(--color-tertiary)] transition-colors duration-300"
              >
                VIEW CATALOG
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
          {[
            { img: '/images/samaan_kada_1780906778197.png', title: 'Antique Gold' },
            { img: '/images/emerald_haar_1780906804154.png', title: 'Bridal Sets' },
            { img: '/images/figaro_chain_1780906830280.png', title: 'Daily Wear' },
          ].map((item) => (
            <motion.div
              key={item.title}
              variants={cardHoverVariant}
              initial="rest"
              whileHover="hover"
            >
              <Link
                href="/catalog"
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
                <div className="ml-4 sm:ml-6 flex flex-col">
                  <h4 className="text-base sm:text-lg font-headline font-bold text-[var(--foreground)] mb-1 group-hover:text-[var(--color-primary)] transition-colors duration-300">
                    {item.title}
                  </h4>
                  <span className="text-[9px] font-label uppercase tracking-widest text-[var(--color-secondary)] group-hover:text-[var(--color-tertiary)] transition-colors duration-300">
                    VIEW CATALOG
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

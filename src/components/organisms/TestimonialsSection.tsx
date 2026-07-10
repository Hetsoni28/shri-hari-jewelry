'use client';

import { motion } from 'framer-motion';
import { staggerContainer, fadeUpVariant, luxuryEasing } from '@/lib/animations';

const testimonials = [
  {
    name: 'Priya Patel',
    location: 'Anand, Gujarat',
    text: 'Got my wedding jewellery set from Shri Hari Jewellers and I am absolutely in love! The quality of the gold is outstanding and the designs are beautiful. They made the whole experience so smooth and special.',
    rating: 5,
    initial: 'P',
  },
  {
    name: 'Meera Shah',
    location: 'Vadodara, Gujarat',
    text: 'Excellent craftsmanship and very honest pricing. They showed us exactly how the making charge was calculated based on the live gold rate. We trust them completely. Highly recommended!',
    rating: 5,
    initial: 'M',
  },
  {
    name: 'Rekha Desai',
    location: 'Mogar, Gujarat',
    text: 'The antique gold bangle collection is breathtaking! The intricate work is like nothing I have seen anywhere else. Bought 3 bangles for my daughter\'s engagement and everyone loved them.',
    rating: 5,
    initial: 'R',
  },
  {
    name: 'Sunita Joshi',
    location: 'Surat, Gujarat',
    text: 'Their bespoke service is amazing. I wanted a custom mangalsutra design and they created exactly what I imagined. The master craftsman was patient and understood my vision perfectly.',
    rating: 5,
    initial: 'S',
  },
  {
    name: 'Kavita Mehta',
    location: 'Nadiad, Gujarat',
    text: 'Shopping here feels special every time. They have been serving our family for over 15 years. The silver collection is very vast and the prices are always fair and transparent.',
    rating: 5,
    initial: 'K',
  },
  {
    name: 'Bhavna Trivedi',
    location: 'Kheda, Gujarat',
    text: 'Purchased a temple jewelry necklace set for my puja occasion. The quality and weight were exactly as promised. The hallmark certification gave us complete peace of mind. Will definitely return!',
    rating: 5,
    initial: 'B',
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 fill-[var(--color-tertiary)]" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="w-full py-16 sm:py-24 px-4 bg-[var(--color-background-light)] relative overflow-hidden">

      {/* Top gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[var(--color-tertiary)] to-transparent" />

      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #8069BF 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
          className="text-center mb-14"
        >
          <motion.div
            variants={fadeUpVariant}
            className="inline-flex items-center gap-3 mb-5"
          >
            <motion.div
              className="h-px bg-[var(--color-tertiary)] origin-right"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: luxuryEasing.reveal, delay: 0.2 }}
              style={{ width: 32 }}
            />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-tertiary)] font-bold font-label">
              Customer Love
            </span>
            <motion.div
              className="h-px bg-[var(--color-tertiary)] origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: luxuryEasing.reveal, delay: 0.2 }}
              style={{ width: 32 }}
            />
          </motion.div>

          <motion.h2
            variants={fadeUpVariant}
            className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold text-[var(--foreground)] mb-4 tracking-tight"
          >
            What Our Families Say
          </motion.h2>
          <motion.p
            variants={fadeUpVariant}
            className="text-sm sm:text-base text-[var(--color-neutral)] max-w-xl mx-auto leading-relaxed font-body"
          >
            Thousands of happy families across Gujarat trust Shri Hari Jewellers for their most precious moments.
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              variants={fadeUpVariant}
              custom={i}
            >
              <motion.div
                whileHover={{ y: -5, boxShadow: '0 16px 40px -12px rgba(128,105,191,0.15)', transition: { duration: 0.22 } }}
                className="group bg-white border border-[var(--color-primary)]/15 hover:border-[var(--color-primary)]/35 p-6 sm:p-7 flex flex-col gap-4 h-full transition-all duration-300"
              >
                {/* Gold quote mark */}
                <div className="text-[var(--color-tertiary)]/40 text-5xl font-serif leading-none select-none">❝</div>

                {/* Stars */}
                <StarRating count={t.rating} />

                {/* Review text */}
                <p className="text-sm text-[var(--color-neutral)] leading-relaxed flex-grow font-body italic">
                  {t.text}
                </p>

                {/* Gold divider */}
                <div className="h-px bg-gradient-to-r from-[var(--color-tertiary)]/40 to-transparent" />

                {/* Author */}
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/25 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-[var(--color-primary)] font-label">{t.initial}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)] font-label">{t.name}</p>
                    <p className="text-[11px] text-[var(--color-neutral)] tracking-wide font-label">{t.location}</p>
                  </div>
                  {/* Verified badge */}
                  <div className="ml-auto">
                    <span className="text-[10px] text-green-600 border border-green-200 bg-green-50 px-2 py-0.5 font-label font-semibold">✓ Verified</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Overall rating summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 text-center sm:text-left"
        >
          <div>
            <p className="text-5xl font-bold text-[var(--color-tertiary)] font-headline">4.9</p>
            <StarRating count={5} />
            <p className="text-[11px] text-[var(--color-neutral)] mt-1 tracking-wide font-label">Average Rating</p>
          </div>
          <div className="hidden sm:block w-px h-14 bg-[var(--color-primary)]/15" />
          <div>
            <p className="text-5xl font-bold text-[var(--foreground)] font-headline">500<span className="text-[var(--color-primary)]">+</span></p>
            <p className="text-sm text-[var(--color-neutral)] mt-1 font-body">Happy Families Served</p>
          </div>
          <div className="hidden sm:block w-px h-14 bg-[var(--color-primary)]/15" />
          <div>
            <p className="text-5xl font-bold text-[var(--foreground)] font-headline">20<span className="text-[var(--color-primary)]">+</span></p>
            <p className="text-sm text-[var(--color-neutral)] mt-1 font-body">Years of Excellence</p>
          </div>
        </motion.div>
      </div>

      {/* Bottom gold accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[var(--color-tertiary)] to-transparent" />
    </section>
  );
}

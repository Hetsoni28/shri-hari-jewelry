import HeroSection from '@/components/organisms/HeroSection';
import CuratedCollections from '@/components/organisms/CuratedCollections';
import GoldHeritage from '@/components/organisms/GoldHeritage';
import FeaturedProducts from '@/components/organisms/FeaturedProducts';
import WhyChooseUs from '@/components/organisms/WhyChooseUs';
import StatsSection from '@/components/organisms/StatsSection';
import CategoryShowcase from '@/components/organisms/CategoryShowcase';
import TestimonialsSection from '@/components/organisms/TestimonialsSection';
import ModernLookBanner from '@/components/organisms/ModernLookBanner';

// Lazy-load heavy sections to reduce initial page load
import dynamic from 'next/dynamic';

const SilverStudio   = dynamic(() => import('@/components/organisms/SilverStudio'));
const BespokeService = dynamic(() => import('@/components/organisms/BespokeService'));

import { client } from '@/sanity/client';
import { productsQuery } from '@/sanity/queries';

export const revalidate = 60;

export default async function Home() {
  const products = await client.fetch(productsQuery);

  return (
    <div className="flex flex-col w-full bg-[var(--background)]">

      {/* 1. Hero — Full screen cinematic opener */}
      <HeroSection />

      {/* 2. Curated Collections — Category highlights */}
      <CuratedCollections />

      {/* 3. The Gold Heritage — Showcase gold product cards */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10 py-16 sm:py-24">
        <GoldHeritage />
      </section>

      {/* 4. Featured Products — Shop the collection */}
      <FeaturedProducts products={products} />

      {/* 5. Why Choose Us — Trust pillars */}
      <WhyChooseUs />

      {/* 6. The Silver Studio — lazy loaded */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10 py-16 sm:py-24">
        <SilverStudio />
      </section>

      {/* 7. Stats Section — Social proof numbers */}
      <StatsSection />

      {/* 8. Bespoke Service — lazy loaded */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10 py-16 sm:py-20">
        <BespokeService />
      </section>

      {/* 9. Category Showcase — Browse all categories */}
      <CategoryShowcase />

      {/* 10. Testimonials — Customer love */}
      <TestimonialsSection />

      {/* 11. Modern Look Banner — Final CTA */}
      <ModernLookBanner />

    </div>
  );
}

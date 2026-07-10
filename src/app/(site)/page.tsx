import HeroSection from '@/components/organisms/HeroSection';
import CuratedCollections from '@/components/organisms/CuratedCollections';

import GoldHeritage from '@/components/organisms/GoldHeritage';
import FeaturedProducts from '@/components/organisms/FeaturedProducts';
import WhyChooseUs from '@/components/organisms/WhyChooseUs';
import SilverStudio from '@/components/organisms/SilverStudio';
import StatsSection from '@/components/organisms/StatsSection';
import BespokeService from '@/components/organisms/BespokeService';
import CategoryShowcase from '@/components/organisms/CategoryShowcase';
import TestimonialsSection from '@/components/organisms/TestimonialsSection';
import ModernLookBanner from '@/components/organisms/ModernLookBanner';

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


      {/* 4. The Gold Heritage — Showcase gold product cards */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10 py-16 sm:py-24">
        <GoldHeritage />
      </section>

      {/* 5. Featured Products — Shop the collection */}
      <FeaturedProducts products={products} />

      {/* 6. Why Choose Us — Trust pillars */}
      <WhyChooseUs />

      {/* 7. The Silver Studio — Silver collection showcase */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10 py-16 sm:py-24">
        <SilverStudio />
      </section>

      {/* 8. Stats Section — Social proof numbers */}
      <StatsSection />

      {/* 9. Bespoke Service — Custom jewelry CTA */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10 py-16 sm:py-20">
        <BespokeService />
      </section>

      {/* 10. Category Showcase — Browse all categories */}
      <CategoryShowcase />

      {/* 11. Testimonials — Customer love */}
      <TestimonialsSection />

      {/* 12. Modern Look Banner — Final CTA */}
      <ModernLookBanner />

    </div>
  );
}

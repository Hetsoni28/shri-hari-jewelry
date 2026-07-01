import HeroSection from '@/components/organisms/HeroSection';
import CuratedCollections from '@/components/organisms/CuratedCollections';
import FeaturedProducts from '@/components/organisms/FeaturedProducts';
import StatsSection from '@/components/organisms/StatsSection';
import ModernLookBanner from '@/components/organisms/ModernLookBanner';

import { client } from '@/sanity/client';
import { productsQuery } from '@/sanity/queries';

export const revalidate = 60;

export default async function Home() {
  const products = await client.fetch(productsQuery);

  return (
    <div className="flex flex-col w-full bg-[var(--background)]">

      <HeroSection />

      <CuratedCollections />
      <StatsSection />
      <FeaturedProducts products={products} />
      <ModernLookBanner />
    </div>
  );
}


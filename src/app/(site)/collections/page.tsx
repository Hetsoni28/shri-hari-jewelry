import CollectionsHeader from '@/components/organisms/CollectionsHeader';
import CuratedCollections from '@/components/organisms/CuratedCollections';
import dynamic from 'next/dynamic';

// Lazy-load heavy below-fold sections to reduce initial lag
const GoldHeritage   = dynamic(() => import('@/components/organisms/GoldHeritage'));
const SilverStudio   = dynamic(() => import('@/components/organisms/SilverStudio'));
const BespokeService = dynamic(() => import('@/components/organisms/BespokeService'));

export default function CollectionsPage() {
  return (
    <div className="flex flex-col w-full bg-[var(--background)] min-h-screen pt-12">
      <CollectionsHeader />
      <CuratedCollections />
      <div className="container mx-auto px-4 max-w-5xl">
        <GoldHeritage />
        <SilverStudio />
        <BespokeService />
      </div>
    </div>
  );
}

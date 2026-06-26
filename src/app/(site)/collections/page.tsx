import CollectionsHeader from '@/components/organisms/CollectionsHeader';
import CuratedCollections from '@/components/organisms/CuratedCollections';
import GoldHeritage from '@/components/organisms/GoldHeritage';
import SilverStudio from '@/components/organisms/SilverStudio';
import BespokeService from '@/components/organisms/BespokeService';

export default function CollectionsPage() {
  return (
    <div className="flex flex-col w-full bg-[#FDFAFF] min-h-screen pt-12">
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

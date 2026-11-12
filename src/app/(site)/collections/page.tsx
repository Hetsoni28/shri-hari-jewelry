import CollectionsHeader from '@/components/organisms/CollectionsHeader';
import CuratedCollections from '@/components/organisms/CuratedCollections';
import dynamic from 'next/dynamic';
import { client } from '@/sanity/client';
import { productsQuery } from '@/sanity/queries';

// Lazy-load heavy below-fold sections to reduce initial lag
const GoldHeritage   = dynamic(() => import('@/components/organisms/GoldHeritage'));
const SilverStudio   = dynamic(() => import('@/components/organisms/SilverStudio'));
const BespokeService = dynamic(() => import('@/components/organisms/BespokeService'));

export const revalidate = 60;

export const metadata = { title: 'Collections' };

export default async function CollectionsPage() {
  const products = await client.fetch(productsQuery);

  // Offset the products so the Collections page picks different items 
  // than the Homepage (which picks from the front) and the Contact page (which picks from the back).
  // We'll take the middle chunk of products to guarantee fresh classy imagery.
  const offsetProducts = [...(products as any[])].slice(8).filter(p => p.images?.length > 0);

  // ── ZERO-REPEAT ALLOCATOR ─────────────────────────────────────────────────
  const usedIds = new Set<string>();

  const pick = (...cats: string[]): any => {
    const hit = offsetProducts.find(p => !usedIds.has(p._id) && cats.includes(p.category));
    const out = hit || offsetProducts.find(p => !usedIds.has(p._id));
    if (out) usedIds.add(out._id);
    return out;
  };

  // CuratedCollections — 4 landmark category photos
  const curatedPool = [
    pick('Set', 'Bridal', 'Choker'), // Classy heavy sets
    pick('Mala', 'Necklaces'),
    pick('Bangles', 'Kada'),
    pick('Mangalsutra', 'Rings'),
  ].filter(Boolean);

  // GoldHeritage — 1 large hero + 3 small cards
  const goldPool = [
    pick('Set', 'Choker', 'Necklaces'),   
    pick('Bangles', 'Kada', 'Bangle'),    
    pick('Mangalsutra', 'Bridal', 'Mala'),
    pick('Chains', 'Earrings', 'Pendants'),
  ].filter(Boolean);

  // SilverStudio — 3 silver / lightweight modern pieces
  const silverPool = (() => {
    const silverFirst = offsetProducts.filter(p =>
      !usedIds.has(p._id) && 
      (p.metalType === 'Silver' || p.category?.toLowerCase().includes('silver'))
    ).slice(0, 3);
    silverFirst.forEach(p => usedIds.add(p._id));
    
    // Fallback if not enough silver
    const remaining = offsetProducts.filter(p => !usedIds.has(p._id)).slice(0, 3 - silverFirst.length);
    remaining.forEach(p => usedIds.add(p._id));
    return [...silverFirst, ...remaining];
  })();

  return (
    <div className="flex flex-col w-full bg-[var(--background)] min-h-screen pt-12">
      <CollectionsHeader />
      <CuratedCollections products={curatedPool} />
      <div className="container mx-auto px-4 max-w-5xl">
        <GoldHeritage products={goldPool} />
        <SilverStudio products={silverPool} />
        <BespokeService />
      </div>
    </div>
  );
}

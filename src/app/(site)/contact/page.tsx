import ContactHeader from '@/components/organisms/ContactHeader';
import ContactInfoAndForm from '@/components/organisms/ContactInfoAndForm';
import ContactMapAndCraftsmanship from '@/components/organisms/ContactMapAndCraftsmanship';
import { client } from '@/sanity/client';
import { groq } from 'next-sanity';
import { urlForImage } from '@/sanity/image';
import { productsQuery } from '@/sanity/queries';

export const dynamic = 'force-dynamic';

export default async function ContactPage() {
  const products = await client.fetch(productsQuery);

  // Pick unique images for the contact page by searching backwards (oldest first).
  // The homepage picks from the front (newest first), so this guarantees no overlap
  // between the homepage and the contact page.
  const revProducts = [...(products as any[])].reverse().filter(p => p.images?.length > 0);
  
  const usedIds = new Set<string>();
  const pick = (...cats: string[]) => {
    const hit = revProducts.find(p => !usedIds.has(p._id) && cats.includes(p.category));
    const out = hit || revProducts.find(p => !usedIds.has(p._id));
    if (out) usedIds.add(out._id);
    return out;
  };

  const heroItem = pick('Set', 'Necklaces', 'Mala', 'Choker');
  const gridItems = [
    pick('Set', 'Pendants'),
    pick('Bangles', 'Kada'),
    pick('Rings', 'Bali'),
    pick('Earrings', 'Chains'),
  ];

  const heroImg = heroItem?.images?.[0];
  const gridRaw = gridItems.map(item => item?.images?.[0]).filter(Boolean);

  const heroUrl = heroImg
    ? urlForImage(heroImg)?.width(1920).height(1080).quality(95).format('jpg').url() || ''
    : '/images/placeholder.png';

  // Build 4 grid images from the diverse query results
  const gridUrls = Object.values(gridRaw as Record<string, any>)
    .filter(Boolean)
    .map((img: any) => urlForImage(img)?.width(800).quality(90).url() || '/images/placeholder.png');

  return (
    <div className="bg-[var(--color-background-light)] min-h-screen">
      <ContactHeader image={heroUrl} />
      <ContactInfoAndForm />
      <ContactMapAndCraftsmanship images={gridUrls} />
    </div>
  );
}


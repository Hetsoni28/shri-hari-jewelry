import ContactHeader from '@/components/organisms/ContactHeader';
import ContactInfoAndForm from '@/components/organisms/ContactInfoAndForm';
import ContactMapAndCraftsmanship from '@/components/organisms/ContactMapAndCraftsmanship';
import { client } from '@/sanity/client';
import { urlForImage } from '@/sanity/image';
import { productsQuery } from '@/sanity/queries';
import { jsonLd, pageMeta } from '@/lib/seo';
import { jewelryStoreLd } from '@/lib/storeLd';

export const dynamic = 'force-dynamic';

export const metadata = pageMeta({
  title: 'Visit Our Jewellery Shop in Mogar, Anand',
  description:
    'Visit Shri Hari Jewellers near Mahadev Temple, Mogar, Anand, Gujarat. Call +91 99781 01081 or WhatsApp us for gold rates, designs and custom orders.',
  path: '/contact',
});

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

  const heroUrl = heroImg
    ? urlForImage(heroImg)?.width(1920).quality(95).format('jpg').url() || ''
    : '/images/placeholder.png';

  // Build 4 grid images from the diverse query results
  const gridData = gridItems.map((item) => {
    if (!item) return null;
    const img = item.images?.[0];
    const url = img ? urlForImage(img)?.width(800).quality(90).url() || '/images/placeholder.png' : '/images/placeholder.png';
    const link = item.slug ? `/catalog/${encodeURIComponent(item.slug)}` : `/catalog?category=${item.category || 'All'}`;
    return { url, link };
  }).filter(Boolean) as { url: string; link: string }[];

  return (
    <div className="bg-[var(--color-background-light)] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(jewelryStoreLd)} />
      <ContactHeader image={heroUrl} />
      <ContactInfoAndForm />
      <ContactMapAndCraftsmanship items={gridData} />
    </div>
  );
}


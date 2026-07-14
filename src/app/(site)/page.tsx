import HeroSection from '@/components/organisms/HeroSection';
import CuratedCollections from '@/components/organisms/CuratedCollections';
import GoldHeritage from '@/components/organisms/GoldHeritage';
import FeaturedProducts from '@/components/organisms/FeaturedProducts';
import WhyChooseUs from '@/components/organisms/WhyChooseUs';
import StatsSection from '@/components/organisms/StatsSection';
import CategoryShowcase from '@/components/organisms/CategoryShowcase';
import TestimonialsSection from '@/components/organisms/TestimonialsSection';
import ModernLookBanner from '@/components/organisms/ModernLookBanner';
import { groq } from 'next-sanity';
import { urlForImage } from '@/sanity/image';

// Lazy-load heavy sections to reduce initial page load
import dynamic from 'next/dynamic';

const SilverStudio   = dynamic(() => import('@/components/organisms/SilverStudio'));
const BespokeService = dynamic(() => import('@/components/organisms/BespokeService'));

import { client } from '@/sanity/client';
import { productsQuery } from '@/sanity/queries';

// Query to fetch 1 product per category for a diverse hero slider
const heroImagesQuery = groq`{
  "necklaces":    *[_type=="product" && category=="Necklaces"    && defined(images[0].asset)] | order(_createdAt desc)[0]{ name, category, slug, "image": images[0] },
  "earrings":     *[_type=="product" && category=="Earrings"     && defined(images[0].asset)] | order(_createdAt desc)[0]{ name, category, slug, "image": images[0] },
  "rings":        *[_type=="product" && category=="Rings"        && defined(images[0].asset)] | order(_createdAt desc)[0]{ name, category, slug, "image": images[0] },
  "bangles":      *[_type=="product" && category=="Bangles"      && defined(images[0].asset)] | order(_createdAt desc)[0]{ name, category, slug, "image": images[0] },
  "mangalsutra":  *[_type=="product" && category=="Mangalsutra"  && defined(images[0].asset)] | order(_createdAt desc)[0]{ name, category, slug, "image": images[0] },
  "mala":         *[_type=="product" && category=="Mala"         && defined(images[0].asset)] | order(_createdAt desc)[0]{ name, category, slug, "image": images[0] },
  "pendants":     *[_type=="product" && category=="Pendants"     && defined(images[0].asset)] | order(_createdAt desc)[0]{ name, category, slug, "image": images[0] },
  "bracelets":    *[_type=="product" && category=="Bracelets"    && defined(images[0].asset)] | order(_createdAt desc)[0]{ name, category, slug, "image": images[0] },
  "sets":         *[_type=="product" && category=="Set"          && defined(images[0].asset)] | order(_createdAt desc)[0]{ name, category, slug, "image": images[0] },
  "bali":         *[_type=="product" && category=="Bali"         && defined(images[0].asset)] | order(_createdAt desc)[0]{ name, category, slug, "image": images[0] },
}`;

export const revalidate = 60;

export default async function Home() {
  const [products, heroRaw] = await Promise.all([
    client.fetch(productsQuery),
    client.fetch(heroImagesQuery),
  ]);

  // ── Build hero image URLs ──────────────────────────────────────────────────
  type RawProduct = { name: string; category: string; slug: { current: string }; image: Parameters<typeof urlForImage>[0] } | null;
  const heroImages: { urlDesktop: string; urlMobile: string; name: string; category: string; slug?: string }[] = Object.values(heroRaw as Record<string, RawProduct>)
    .filter((p): p is NonNullable<RawProduct> => p != null)
    .map((p) => ({
      urlDesktop: urlForImage(p.image)?.width(1920).height(1080).quality(95).format('jpg').url() || '',
      urlMobile:  urlForImage(p.image)?.width(800).height(1200).quality(95).format('jpg').url() || '',
      name: p.name,
      category: p.category,
      slug: p.slug?.current,
    }))
    .filter((p) => p.urlDesktop !== '' && p.urlMobile !== '');

  // ── ZERO-REPEAT ALLOCATOR ─────────────────────────────────────────────────
  // Each product appears in exactly ONE section. Products used in the Hero
  // slider are marked used first so they never repeat below.
  const usedIds = new Set<string>();

  // Mark hero slugs as used
  const heroSlugs = new Set(heroImages.map((h) => h.slug));
  (products as any[]).forEach((p) => { if (heroSlugs.has(p.slug)) usedIds.add(p._id); });

  // Picks the first unused product matching any of the given categories.
  // Falls back to any unused product so we never return undefined.
  const pick = (...cats: string[]): any => {
    const hit = (products as any[]).find(p => !usedIds.has(p._id) && cats.includes(p.category) && p.images?.length > 0);
    const out  = hit || (products as any[]).find(p => !usedIds.has(p._id) && p.images?.length > 0);
    if (out) usedIds.add(out._id);
    return out;
  };

  // ── Section pools (priority order = most impactful first) ─────────────────

  // CategoryShowcase — 1 representative image per category grid
  // We prioritize this FIRST so the "Shop by Category" grid gets the absolute
  // best and most accurate images for these 4 specific categories.
  const categoryPool = [
    pick('Necklaces', 'Choker', 'Mala'),
    pick('Rings'),
    pick('Earrings', 'Bali'),
    pick('Pendants', 'Pendant'),
  ].filter(Boolean);

  // CuratedCollections — 4 landmark category photos (big full-bleed cards)
  const curatedPool = [
    pick('Set', 'Bridal'),
    pick('Mala', 'Necklaces', 'Choker'),
    pick('Bangles', 'Kada'),
    pick('Mangalsutra'),
  ].filter(Boolean);

  // GoldHeritage — 1 large hero + 3 small cards (classic gold pieces)
  const goldPool = [
    pick('Set', 'Choker', 'Necklaces'),   // large hero card
    pick('Bangles', 'Kada', 'Bangle'),    // small 1
    pick('Mangalsutra', 'Bridal', 'Mala'),// small 2
    pick('Chains', 'Earrings', 'Pendants'),// small 3
  ].filter(Boolean);

  // FeaturedProducts — 3 spotlight "must-have" items
  const featuredPool = [
    pick('Rings', 'Bali'),
    pick('Earrings', 'Chains'),
    pick('Set', 'Necklaces', 'Choker'),
  ].filter(Boolean);

  // SilverStudio — 3 silver / lightweight modern pieces
  const silverPool = (() => {
    const silverFirst = (products as any[]).filter(p =>
      !usedIds.has(p._id) && p.images?.length > 0 &&
      (p.metalType === 'Silver' || p.category?.toLowerCase().includes('silver'))
    ).slice(0, 3);
    silverFirst.forEach(p => usedIds.add(p._id));
    // If fewer than 3 silver, pad with any unused
    const remaining = (products as any[]).filter(p => !usedIds.has(p._id) && p.images?.length > 0).slice(0, 3 - silverFirst.length);
    remaining.forEach(p => usedIds.add(p._id));
    return [...silverFirst, ...remaining];
  })();

  return (
    <div className="flex flex-col w-full bg-[var(--background)]">

      {/* 1. Hero — Full screen cinematic opener */}
      <HeroSection heroImages={heroImages} />

      {/* 2. Curated Collections — Category highlights */}
      <CuratedCollections products={curatedPool} />

      {/* 3. The Gold Heritage — Showcase gold product cards */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10 py-16 sm:py-24">
        <GoldHeritage products={goldPool} />
      </section>

      {/* 4. Featured Products — Shop the collection */}
      <FeaturedProducts products={featuredPool} />

      {/* 5. Why Choose Us — Trust pillars */}
      <WhyChooseUs />

      {/* 6. The Silver Studio — lazy loaded */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10 py-16 sm:py-24">
        <SilverStudio products={silverPool} />
      </section>

      {/* 7. Stats Section — Social proof numbers */}
      <StatsSection productCount={products.length} />

      {/* 8. Bespoke Service — lazy loaded */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10 py-16 sm:py-20">
        <BespokeService />
      </section>

      {/* 9. Category Showcase — Browse all categories */}
      <CategoryShowcase products={categoryPool} />

      {/* 10. Testimonials — Customer love */}
      <TestimonialsSection />

      {/* 11. Modern Look Banner — Final CTA */}
      <ModernLookBanner />

    </div>
  );
}


import HeroSection from '@/components/organisms/HeroSection';
import HomeCategories, { type CategoryTile } from '@/components/organisms/home/HomeCategories';
import HomeNewIn, { type NewInItem } from '@/components/organisms/home/HomeNewIn';
import HomeRates from '@/components/organisms/home/HomeRates';
import HomeCustomOrder from '@/components/organisms/home/HomeCustomOrder';
import HomeVisit from '@/components/organisms/home/HomeVisit';
import { groq } from 'next-sanity';
import { urlForImage } from '@/sanity/image';
import { client } from '@/sanity/client';
import { catalogProductsQuery } from '@/sanity/queries';
import { bestFit, fitOf, frame } from '@/lib/framing';

// Up to 6 recent pieces per category; the hero picks the one whose photo best fits its arch
const heroImagesQuery = groq`{
  "necklaces":    *[_type=="product" && category=="Necklaces"    && defined(images[0].asset)] | order(_createdAt desc)[0...6]{ name, category, slug, "image": images[0] },
  "earrings":     *[_type=="product" && category=="Earrings"     && defined(images[0].asset)] | order(_createdAt desc)[0...6]{ name, category, slug, "image": images[0] },
  "rings":        *[_type=="product" && category=="Rings"        && defined(images[0].asset)] | order(_createdAt desc)[0...6]{ name, category, slug, "image": images[0] },
  "bangles":      *[_type=="product" && category=="Bangles"      && defined(images[0].asset)] | order(_createdAt desc)[0...6]{ name, category, slug, "image": images[0] },
  "mangalsutra":  *[_type=="product" && category=="Mangalsutra"  && defined(images[0].asset)] | order(_createdAt desc)[0...6]{ name, category, slug, "image": images[0] },
  "mala":         *[_type=="product" && category=="Mala"         && defined(images[0].asset)] | order(_createdAt desc)[0...6]{ name, category, slug, "image": images[0] },
  "pendants":     *[_type=="product" && category=="Pendants"     && defined(images[0].asset)] | order(_createdAt desc)[0...6]{ name, category, slug, "image": images[0] },
  "bracelets":    *[_type=="product" && category=="Bracelets"    && defined(images[0].asset)] | order(_createdAt desc)[0...6]{ name, category, slug, "image": images[0] },
  "sets":         *[_type=="product" && category=="Set"          && defined(images[0].asset)] | order(_createdAt desc)[0...6]{ name, category, slug, "image": images[0] },
  "bali":         *[_type=="product" && category=="Bali"         && defined(images[0].asset)] | order(_createdAt desc)[0...6]{ name, category, slug, "image": images[0] },
}`;

// Categories shown in "Browse by piece", in display order. `value` is the exact
// Sanity category the catalogue filter matches, so each tile's count equals what
// the visitor sees after clicking it.
const CATEGORY_TILES = [
  { value: 'Rings',       label: 'Rings' },
  { value: 'Mala',        label: 'Mala' },
  { value: 'Earrings',    label: 'Earrings' },
  { value: 'Set',         label: 'Sets' },
  { value: 'Necklaces',   label: 'Necklaces' },
  { value: 'Mangalsutra', label: 'Mangalsutra' },
  { value: 'Bracelet',    label: 'Bracelets' },
  { value: 'Pendants',    label: 'Pendants' },
];

type SanityImage = Parameters<typeof urlForImage>[0];
type Product = {
  _id: string;
  name: string;
  slug: string;
  images?: SanityImage[];
  category?: string;
  isNewArrival?: boolean;
  metalType?: string;
};
type RawHero = { name: string; category: string; slug: { current: string }; image: SanityImage };

export const revalidate = 60;

export default async function Home() {
  const [products, heroRaw]: [Product[], Record<string, RawHero[] | null>] = await Promise.all([
    client.fetch(catalogProductsQuery), // newest first
    client.fetch(heroImagesQuery),
  ]);

  // ── Hero — per category, the recent piece whose photo best fits the arch.
  // The hero is the showcase, so a category with no well-fitting photo sits this one out.
  const heroImages = Object.values(heroRaw)
    .map((list) => bestFit(list ?? [], (p) => p.image))
    .filter((p): p is RawHero => !!p && fitOf(p.image) === 'cover')
    .map((p) => ({ ...frame(p.image, 960), name: p.name, category: p.category, slug: p.slug?.current }))
    .filter((p) => p.src !== '');

  // ── Zero-repeat allocator: each product appears in only one section,
  // and each slot takes the best-fitting photo among the matches
  const withImage = products.filter((p) => p.images?.[0]);
  const used = new Set<string>(heroImages.map((h) => h.slug).filter(Boolean) as string[]);
  const take = (match: (p: Product) => boolean) => {
    const pool = withImage.filter((p) => !used.has(p.slug) && match(p));
    const hit = bestFit(pool.length ? pool : withImage.filter(match), (p) => p.images![0]);
    if (hit) used.add(hit.slug);
    return hit;
  };

  const categories: CategoryTile[] = CATEGORY_TILES.flatMap(({ value, label }) => {
    const count = products.filter((p) => p.category === value).length;
    const p = count > 0 ? take((x) => x.category === value) : undefined;
    return p?.images?.[0]
      ? [{ label, count, ...frame(p.images[0], 640), href: `/catalog?category=${encodeURIComponent(value)}` }]
      : [];
  });

  const customOrder = take((p) => ['Set', 'Necklaces', 'Mangalsutra', 'Mala'].includes(p.category ?? ''));

  // New arrivals first, then the most recently added
  const newIn: NewInItem[] = [...withImage]
    .sort((a, b) => Number(!!b.isNewArrival) - Number(!!a.isNewArrival))
    .filter((p) => !used.has(p.slug))
    .slice(0, 8)
    .map((p) => ({
      name: p.name,
      slug: p.slug,
      category: p.category ?? '',
      metal: p.metalType ?? 'Gold',
      ...frame(p.images![0], 640),
      isNew: !!p.isNewArrival,
    }));

  const goldCount = products.filter((p) => p.metalType === 'Gold').length;
  const silverCount = products.filter((p) => p.metalType === 'Silver').length;

  return (
    <div className="flex w-full flex-col bg-[#FDFCFA]">
      <HeroSection heroImages={heroImages} productCount={products.length} />
      <HomeCategories categories={categories} total={products.length} />
      <HomeNewIn items={newIn} />
      <HomeRates goldCount={goldCount} silverCount={silverCount} />
      <HomeCustomOrder
        image={customOrder?.images?.[0] ? frame(customOrder.images[0], 920) : undefined}
        imageAlt={customOrder?.name}
      />
      <HomeVisit />
    </div>
  );
}

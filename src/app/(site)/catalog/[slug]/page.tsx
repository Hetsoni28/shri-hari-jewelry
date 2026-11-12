import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductGallery, { type GalleryImage } from '@/components/organisms/product/ProductGallery';
import ProductDetails from '@/components/organisms/product/ProductDetails';
import CatalogCard from '@/components/organisms/catalog/CatalogCard';
import { ArrowRight, Eyebrow } from '@/components/organisms/home/SectionHeading';
import { client } from '@/sanity/client';
import { urlForImage } from '@/sanity/image';
import { catalogProductsQuery, productBySlugQuery } from '@/sanity/queries';
import { frame } from '@/lib/framing';
import { categoryKey, categoryLabel } from '@/lib/catalog';
import { toCatalogItem, type CatalogProduct } from '@/lib/catalogItems';
import { shopInfo } from '@/data/shopInfo';

// export const revalidate = 60; // Removed to prevent aggressive caching
export const dynamic = 'force-dynamic';

type SanityImage = Parameters<typeof urlForImage>[0];
type Product = {
  _id: string;
  name: string;
  slug: string;
  images?: SanityImage[];
  description?: string;
  category?: string;
  subcategory?: string;
  isNewArrival?: boolean;
  metalType?: string;
};

const getProduct = async (slug: string): Promise<Product | null> =>
  client.fetch(productBySlugQuery, { slug: decodeURIComponent(slug) });

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const product = await getProduct((await params).slug);
  if (!product) return { title: 'Product not found' };
  const description = product.description?.slice(0, 160)
    || `${product.name} — ${product.metalType || 'Gold'} ${product.category || 'jewellery'} by Shri Hari Jewellers, Mogar.`;
  const image = product.images?.[0] ? urlForImage(product.images[0])?.width(1200).height(630).fit('crop').url() : undefined;
  return {
    title: product.name,
    description,
    openGraph: { title: product.name, description, ...(image && { images: [{ url: image, width: 1200, height: 630 }] }) },
  };
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [product, all]: [Product | null, CatalogProduct[]] = await Promise.all([
    getProduct(slug),
    client.fetch(catalogProductsQuery), // newest first — only first images, for the related cards
  ]);

  if (!product) notFound();

  const key = categoryKey(product.category);
  const label = categoryLabel(key, product.category);
  const url = `${shopInfo.siteUrl}/catalog/${encodeURIComponent(product.slug)}`;

  const images: GalleryImage[] = (product.images ?? []).map((img) => ({
    ...frame(img, 1100),
    full: urlForImage(img)?.width(2000).fit('max').quality(90).auto('format').url() || '',
  }));

  // ── More from the same category — same gender first, then newest
  const sameCategory = all.filter((p) => p._id !== product._id && categoryKey(p.category) === key);
  const related = [...sameCategory]
    .sort((a, b) => Number(b.subcategory === product.subcategory) - Number(a.subcategory === product.subcategory))
    .slice(0, 4)
    .map((p) => toCatalogItem(p, all.indexOf(p)));

  // Structured data so search engines can show the piece properly (no price: it's set on the day)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: images.map((i) => i.full),
    category: label,
    material: product.metalType,
    url,
    brand: { '@type': 'Brand', name: shopInfo.name },
  };

  return (
    <div className="bg-[#FDFCFA]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />

      <div className="mx-auto max-w-7xl px-5 pb-20 pt-6 sm:px-8 sm:pt-10 lg:px-12 lg:pb-24">
        {/* Photo + details as one centred pair: the photo column is exactly as wide as the
            photo (which is sized to fit the screen), so there's never a dead gap between them */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-center lg:gap-14">
          {/* self-stretch: the column must be as tall as the details for the photo to stay
              pinned (sticky) while the description scrolls past — otherwise it leaves a void */}
          <div className="w-full lg:w-[min(56%,calc((100svh-10rem)*0.8))] lg:shrink-0 lg:self-stretch">
            <div className="lg:sticky lg:top-28">
              <ProductGallery images={images} name={product.name} isNew={!!product.isNewArrival} />
            </div>
          </div>
          <div className="w-full min-w-0 lg:max-w-[480px] lg:flex-1">
            <ProductDetails
              product={{
                id: product._id,
                name: product.name,
                url,
                description: product.description,
                category: key,
                categoryLabel: label,
                metal: product.metalType ?? null,
                gender: product.subcategory ?? null,
                isNew: !!product.isNewArrival,
                thumb: product.images?.[0] ? urlForImage(product.images[0])?.width(480).auto('format').url() ?? '' : '',
              }}
            />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-[#EFE9DC] bg-white py-20 sm:py-24" aria-label={`More ${label}`}>
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <Eyebrow>Keep browsing</Eyebrow>
                <h2 className="mt-4 font-headline text-[clamp(1.9rem,3.2vw,2.7rem)] font-medium leading-[1.1] tracking-[-0.015em] text-[#1C1726]">
                  More <em className="font-normal italic text-[#8069BF]">{label.toLowerCase()}</em>
                </h2>
              </div>
              <Link
                href={`/catalog?category=${encodeURIComponent(key)}`}
                className="group inline-flex shrink-0 items-center gap-2.5 self-start border-b border-[#C9A74D]/70 pb-1 font-label text-[13px] font-semibold text-[#1C1726] transition-colors hover:border-[#1C1726] sm:self-auto"
              >
                View all {sameCategory.length + 1} {label.toLowerCase()}
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 lg:gap-x-8">
              {related.map((item) => (
                <li key={item.id}>
                  <CatalogCard item={item} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}

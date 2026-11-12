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
import { SITE_NAME, SITE_URL, clip, jsonLd, pageMeta, productAlt } from '@/lib/seo';

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
  seoTitle?: string;
  seoDescription?: string;
  noIndex?: boolean;
  _updatedAt?: string;
};

const getProduct = async (slug: string): Promise<Product | null> =>
  client.fetch(productBySlugQuery, { slug: decodeURIComponent(slug) });

const altOf = (img: SanityImage) => (img as { alt?: string })?.alt;

// Search title / description: the SEO fields from Sanity when set, otherwise generated
// Generated titles stay within ~60 characters including " | Shri Hari Jewellers";
// the "– Gold Mala" part is dropped when it would push the title past that
const seoTitleOf = (p: Product, label: string) => {
  if (p.seoTitle?.trim()) return p.seoTitle.trim();
  const full = `${p.name} – ${[p.metalType, label].filter(Boolean).join(' ')}`;
  return `${full} | ${SITE_NAME}`.length <= 60 ? full : p.name;
};
const seoDescriptionOf = (p: Product, label: string) =>
  p.seoDescription?.trim() ||
  p.description?.trim() ||
  `${p.name}: ${(p.metalType || 'gold').toLowerCase()} ${label.toLowerCase()} handcrafted by ${shopInfo.name}, ${shopInfo.address.city}, ${shopInfo.address.taluka_district}. Ask for today's price on WhatsApp.`;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const product = await getProduct((await params).slug);
  if (!product) return { title: 'Product not found', robots: { index: false } };
  const label = categoryLabel(categoryKey(product.category), product.category);
  const img = product.images?.[0];
  return pageMeta({
    title: seoTitleOf(product, label),
    description: seoDescriptionOf(product, label),
    path: `/catalog/${encodeURIComponent(product.slug)}`,
    noIndex: product.noIndex,
    image: img
      ? {
          url: urlForImage(img)?.width(1200).height(630).fit('crop').auto('format').url() || '',
          width: 1200,
          height: 630,
          alt: productAlt({ name: product.name, category: product.category, metal: product.metalType, alt: altOf(img) }),
        }
      : undefined,
  });
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
  const url = `${SITE_URL}/catalog/${encodeURIComponent(product.slug)}`;

  const images: GalleryImage[] = (product.images ?? []).map((img) => ({
    ...frame(img, 1100),
    full: urlForImage(img)?.width(2000).fit('max').quality(90).auto('format').url() || '',
    alt: productAlt({ name: product.name, category: product.category, metal: product.metalType, alt: altOf(img) }),
  }));

  // ── More from the same category — same gender first, then newest
  const sameCategory = all.filter((p) => p._id !== product._id && categoryKey(p.category) === key);
  const related = [...sameCategory]
    .sort((a, b) => Number(b.subcategory === product.subcategory) - Number(a.subcategory === product.subcategory))
    .slice(0, 4)
    .map((p) => toCatalogItem(p, all.indexOf(p)));

  // Structured data so search engines can show the piece and its place in the site
  // (no price or offer: gold is priced on the day)
  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: clip(seoDescriptionOf(product, label), 500),
    image: images.map((i) => i.full),
    category: label,
    material: product.metalType,
    url,
    sku: product._id,
    brand: { '@type': 'Brand', name: shopInfo.name },
  };
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Catalogue', item: `${SITE_URL}/catalog` },
      { '@type': 'ListItem', position: 3, name: label, item: `${SITE_URL}/catalog?category=${encodeURIComponent(key)}` },
      { '@type': 'ListItem', position: 4, name: product.name, item: url },
    ],
  };

  return (
    <div className="bg-[#FDFCFA]">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(productLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbLd)} />

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

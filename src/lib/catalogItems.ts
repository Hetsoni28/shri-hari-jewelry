import { urlForImage } from '@/sanity/image';
import { frame } from '@/lib/framing';
import { categoryKey, categoryLabel } from '@/lib/catalog';
import type { CatalogItem } from '@/components/organisms/CatalogClient';

type SanityImage = Parameters<typeof urlForImage>[0];

/** A product as returned by `catalogProductsQuery` (newest first) */
export type CatalogProduct = {
  _id: string;
  name: string;
  slug: string;
  images?: SanityImage[];
  category?: string;
  subcategory?: string;
  metalType?: string;
  isNewArrival?: boolean;
};

/** Ready-to-show card data, prepared on the server */
export const toCatalogItem = (p: CatalogProduct, newest: number): CatalogItem => {
  const img = p.images?.[0];
  const key = categoryKey(p.category);
  return {
    id: p._id,
    name: p.name,
    slug: p.slug,
    category: key,
    categoryLabel: categoryLabel(key, p.category),
    gender: p.subcategory ?? null,
    metal: p.metalType ?? null,
    isNew: !!p.isNewArrival,
    newest,
    image: img ? frame(img, 640) : null,
    thumb: img ? urlForImage(img)?.width(480).auto('format').url() ?? '' : '',
  };
};

import type { Metadata } from 'next';
import { shopInfo } from '@/data/shopInfo';

/** The live address. Set NEXT_PUBLIC_SITE_URL on Vercel when a custom domain is added. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || shopInfo.siteUrl).replace(/\/$/, '');
export const SITE_NAME = shopInfo.name;
export const DEFAULT_OG_IMAGE = '/opengraph-image';

/** Trim to `max` characters at a word boundary (meta descriptions: 160). */
export function clip(text: string, max = 160): string {
  const t = text.replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const atWord = cut.lastIndexOf(' ') > max * 0.6 ? cut.slice(0, cut.lastIndexOf(' ')) : cut;
  return `${atWord.replace(/[\s,;:.\-–—]+$/, '')}…`;
}

const CATEGORY_WORD: Record<string, string> = { Set: 'jewellery set', 'MS Lockets': 'locket' };

/**
 * Image alt text for a product photo (≤125 characters, the practical limit for
 * screen readers). Uses the alt written in Sanity when there is one, otherwise
 * describes the piece: "Chevron Weave Gold Chain – gold mala by Shri Hari Jewellers".
 */
export function productAlt(p: { name: string; category?: string | null; metal?: string | null; alt?: string | null }): string {
  if (p.alt?.trim()) return clip(p.alt, 125);
  const kind = [p.metal?.toLowerCase(), p.category ? (CATEGORY_WORD[p.category] ?? p.category.toLowerCase()) : 'jewellery']
    .filter(Boolean)
    .join(' ');
  return clip(`${p.name} – ${kind} by ${SITE_NAME}`, 125);
}

type PageMetaInput = {
  /** shown in the tab as "<title> | Shri Hari Jewellers" */
  title: string;
  description: string;
  /** path from the site root, e.g. "/catalog" — becomes the canonical URL */
  path: string;
  image?: { url: string; width?: number; height?: number; alt?: string };
  noIndex?: boolean;
};

/** Consistent metadata for a page: title, ≤160-char description, canonical, Open Graph, Twitter. */
export function pageMeta({ title, description, path, image, noIndex }: PageMetaInput): Metadata {
  const desc = clip(description);
  const ogTitle = `${title} | ${SITE_NAME}`;
  const images = [image ?? { url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }];
  return {
    title,
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description: desc,
      url: path,
      siteName: SITE_NAME,
      locale: 'en_IN',
      type: 'website',
      images,
    },
    twitter: { card: 'summary_large_image', title: ogTitle, description: desc, images: images.map((i) => i.url) },
    ...(noIndex && { robots: { index: false, follow: true } }),
  };
}

/** Renders a JSON-LD block (escaped so product text can't break out of the script tag). */
export function jsonLd(data: object) {
  return { __html: JSON.stringify(data).replace(/</g, '\\u003c') };
}

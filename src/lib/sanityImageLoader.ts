/**
 * next/image loader: responsive sizes come straight from Sanity's image CDN.
 *
 * next/image asks for each width in its srcset; for Sanity URLs we rewrite the
 * width (keeping any crop's aspect ratio by scaling the height to match), the
 * quality and auto=format (WebP/AVIF). Phones download small files, desktops sharp
 * ones — and no image proxy is involved. Other sources are passed through.
 */
export default function sanityImageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (src.startsWith('https://cdn.sanity.io/')) {
    const url = new URL(src);
    const w = Number(url.searchParams.get('w'));
    const h = Number(url.searchParams.get('h'));
    url.searchParams.set('w', String(width));
    if (w && h) url.searchParams.set('h', String(Math.round((h * width) / w)));
    url.searchParams.set('q', String(quality ?? (Number(url.searchParams.get('q')) || 80)));
    url.searchParams.set('auto', 'format');
    if (!url.searchParams.has('fit')) url.searchParams.set('fit', 'max');
    return url.toString();
  }
  // Local files and other hosts are served as they are
  return src.startsWith('/') ? `${src}?w=${width}` : src;
}

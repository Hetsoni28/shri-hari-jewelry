import { urlForImage } from '@/sanity/image';
import type { Fit } from '@/components/atoms/FramedImage';

// ── Smart framing ──────────────────────────────────────────────────────────────
// Product photos come in all shapes (2:3, 1:1, 5:4…) but the site shows them in
// 4:5 portrait frames. A photo close to that shape is cropped to fill; one that
// would lose too much is shown whole instead (see FramedImage).

type SanityImage = Parameters<typeof urlForImage>[0];

export const FRAME = 4 / 5;

// Trimming top/bottom of a tall photo is usually harmless (pieces sit centred with
// room around them); trimming the sides of a wide one cuts pieces off, so allow far less.
const MAX_CROP_LOSS = { tall: 0.2, wide: 0.12 };

// Sanity encodes the original size in the asset id: image-<hash>-<w>x<h>-<ext>
export const ratioOf = (img: SanityImage) => {
  const m = (img as { asset?: { _ref?: string } })?.asset?._ref?.match(/-(\d+)x(\d+)-/);
  return m ? Number(m[1]) / Number(m[2]) : 1;
};

export const cropLoss = (img: SanityImage) => {
  const a = ratioOf(img);
  return 1 - Math.min(a, FRAME) / Math.max(a, FRAME);
};

export const fitOf = (img: SanityImage): Fit => {
  const shape = ratioOf(img) > FRAME ? 'wide' : 'tall';
  return cropLoss(img) <= MAX_CROP_LOSS[shape] ? 'cover' : shape;
};

/** The item whose photo needs the least cropping for a 4:5 frame */
export const bestFit = <T,>(items: T[], imageOf: (t: T) => SanityImage) =>
  items.reduce<T | undefined>((best, t) => (!best || cropLoss(imageOf(t)) < cropLoss(imageOf(best)) - 0.001 ? t : best), undefined);

/** Image URL + how to place it, for a 4:5 frame `width` pixels wide */
export const frame = (img: SanityImage, width: number) => {
  const fit = fitOf(img);
  const base = urlForImage(img)?.width(width);
  const src = (fit === 'cover' ? base?.height(Math.round(width / FRAME)).fit('crop') : base?.fit('max'))
    ?.quality(85).auto('format').url() || '';
  return { src, fit, ratio: ratioOf(img) };
};

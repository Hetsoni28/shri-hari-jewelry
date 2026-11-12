import Image from 'next/image';

/**
 * How a photo sits in its frame:
 * - 'cover': shape is close enough — crop to fill
 * - 'wide' / 'tall': shape doesn't match — show the whole photo, its edges feathered
 *   into a soft blurred copy of itself so the frame never shows bands
 */
export type Fit = 'cover' | 'wide' | 'tall';

type Props = {
  src: string;
  alt: string;
  fit?: Fit;
  /** the photo's own width / height — needed to feather a 'wide' or 'tall' photo */
  ratio?: number;
  sizes: string;
  priority?: boolean;
  /** extra classes for the visible photo (e.g. hover zoom) */
  imgClassName?: string;
};

// The feather is applied to a box exactly the photo's shape, so it fades the photo's
// real edges rather than the empty parts of the frame.
const BOX: Record<Exclude<Fit, 'cover'>, string> = {
  wide: 'inset-x-0 top-1/2 w-full -translate-y-1/2 [mask-image:linear-gradient(to_bottom,transparent,black_16%,black_84%,transparent)]',
  tall: 'inset-y-0 left-1/2 h-full -translate-x-1/2 [mask-image:linear-gradient(to_right,transparent,black_16%,black_84%,transparent)]',
};

// Fills its (relative, sized) parent with a product photo without cutting the piece off.
export default function FramedImage({ src, alt, fit = 'cover', ratio = 1, sizes, priority, imgClassName = '' }: Props) {
  if (fit === 'cover') {
    return (
      <Image src={src} alt={alt} fill unoptimized priority={priority} sizes={sizes} className={`object-cover ${imgClassName}`} />
    );
  }

  return (
    <>
      <Image src={src} alt="" aria-hidden="true" fill unoptimized sizes={sizes} className="scale-150 object-cover blur-3xl saturate-[0.85]" />
      <div className={`absolute ${BOX[fit]}`} style={{ aspectRatio: ratio }}>
        <Image src={src} alt={alt} fill unoptimized priority={priority} sizes={sizes} className={`object-cover ${imgClassName}`} />
      </div>
    </>
  );
}

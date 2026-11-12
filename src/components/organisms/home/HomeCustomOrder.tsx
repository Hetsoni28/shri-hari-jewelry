import Reveal from '@/components/atoms/Reveal';
import FramedImage, { type Fit } from '@/components/atoms/FramedImage';
import MaskReveal from '@/components/atoms/MaskReveal';
import { shopInfo } from '@/data/shopInfo';
import { Eyebrow } from './SectionHeading';

const STEPS = [
  {
    title: 'Bring us the idea',
    text: 'Pick a design from the catalogue, send a photo on WhatsApp, or sit with us at the shop and describe what you have in mind.',
  },
  {
    title: 'Agree the weight and price',
    text: 'We talk you through the purity, approximate weight and making charge, so you know exactly how the price is worked out.',
  },
  {
    title: 'Crafted and hallmarked',
    text: 'Your piece is made by our craftsmen, BIS hallmarked, and ready to collect from the shop in Mogar.',
  },
];

const WHATSAPP_HREF = `https://wa.me/${shopInfo.phone2.replace(/\D/g, '')}?text=${encodeURIComponent(
  'Namaste! I would like to discuss a custom jewellery order.',
)}`;

export default function HomeCustomOrder({
  image,
  imageAlt,
}: {
  image?: { src: string; fit: Fit; ratio: number };
  imageAlt?: string;
}) {
  return (
    <section className="bg-[#FDFCFA] py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-20 lg:px-12">

        {/* Framed photograph */}
        {image && (
          <Reveal className="lg:col-span-5">
            <div className="relative mx-auto max-w-[460px] lg:mx-0">
              <div aria-hidden="true" className="absolute -bottom-4 -right-4 left-4 top-4 border border-[#C9A74D]/50" />
              <MaskReveal className="relative aspect-[4/5] overflow-hidden bg-[#F3EFE6]">
                <FramedImage src={image.src} fit={image.fit} ratio={image.ratio} alt={imageAlt ?? 'Handcrafted jewellery'} sizes="(min-width: 1024px) 460px, 90vw" />
              </MaskReveal>
            </div>
          </Reveal>
        )}

        <div className={image ? 'lg:col-span-7' : 'lg:col-span-12'}>
          <Reveal>
            <Eyebrow>Made to order</Eyebrow>
            <h2 className="mt-4 font-headline text-[clamp(2rem,3.6vw,3.1rem)] font-medium leading-[1.08] tracking-[-0.015em] text-[#1C1726]">
              A piece made <em className="font-normal italic text-[#8069BF]">only for you.</em>
            </h2>
            <p className="mt-5 max-w-xl font-body text-[16px] leading-[1.7] text-[#5F5A6B]">
              Wedding sets, mangalsutras, rings in a family design — if you can describe it, we can make it.
            </p>
          </Reveal>

          <ol className="mt-10 border-t border-[#E9E3D6]">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={0.08 * i}>
                  <div className="grid grid-cols-[3.25rem_minmax(0,1fr)] gap-x-4 border-b border-[#E9E3D6] py-6 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:py-7">
                    <span className="font-headline text-[28px] italic leading-none text-[#C9A74D] sm:text-[34px]" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-headline text-[20px] text-[#1C1726] sm:text-[22px]">{s.title}</h3>
                      <p className="mt-2 max-w-lg font-body text-[15px] leading-[1.7] text-[#5F5A6B]">{s.text}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#1C1726] px-7 py-4 font-label text-[12px] font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-[#8069BF]"
              >
                Start on WhatsApp
              </a>
              <a
                href={`tel:${shopInfo.phone1.replace(/\s+/g, '')}`}
                className="font-label text-[14px] text-[#5F5A6B] transition-colors hover:text-[#1C1726] inline-block py-2 tap-target"
              >
                or call <span className="font-semibold text-[#1C1726] tabular-nums">{shopInfo.phone1}</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

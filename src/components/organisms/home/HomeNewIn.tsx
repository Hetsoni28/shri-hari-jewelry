import Link from 'next/link';
import Reveal from '@/components/atoms/Reveal';
import FramedImage, { type Fit } from '@/components/atoms/FramedImage';
import MaskReveal from '@/components/atoms/MaskReveal';
import SectionHeading from './SectionHeading';

export type NewInItem = {
  name: string;
  slug: string;
  category: string;
  metal: string;
  src: string;
  fit: Fit;
  ratio: number;
  isNew: boolean;
};

const CATEGORY_LABEL: Record<string, string> = { Set: 'Set', 'MS Lockets': 'Locket' };

export default function HomeNewIn({ items }: { items: NewInItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="border-t border-[#EFE9DC] bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Reveal>
          <SectionHeading
            eyebrow="Just added"
            title={<>New in the <em className="font-normal italic text-[#8069BF]">workshop</em></>}
            intro="The latest pieces to join the catalogue — ask about any of them on WhatsApp."
            link={{ href: '/catalog', label: 'See the full catalogue' }}
          />
        </Reveal>

        {/* Swipe row on phones, 4-column grid from tablet up */}
        <ul className="-mx-5 mt-12 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 sm:scroll-px-8 [scrollbar-width:none] sm:-mx-8 sm:px-8 md:mx-0 md:mt-16 md:grid md:grid-cols-4 md:gap-x-6 md:gap-y-14 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
          {items.map((p, i) => (
            <li key={p.slug} className="w-[68%] shrink-0 snap-start sm:w-[42%] md:w-auto">
              <Reveal delay={0.06 * (i % 4)}>
                <Link href={`/catalog/${p.slug}`} className="group block">
                  <MaskReveal delay={0.06 * (i % 4)} className="relative aspect-[4/5] overflow-hidden bg-[#F6F2EA]">
                    <FramedImage
                      src={p.src}
                      fit={p.fit}
                      ratio={p.ratio}
                      alt={p.name}
                      sizes="(min-width: 768px) 25vw, 68vw"
                      imgClassName="transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                    {p.isNew && (
                      <span className="absolute left-3 top-3 z-10 bg-white/95 px-2.5 py-1 font-label text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8069BF]">
                        New
                      </span>
                    )}
                  </MaskReveal>
                  <p className="mt-4 font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A8873A]">
                    {CATEGORY_LABEL[p.category] ?? p.category} · {p.metal}
                  </p>
                  <p className="mt-1.5 line-clamp-2 font-headline text-[17px] leading-snug text-[#1C1726] transition-colors duration-300 group-hover:text-[#8069BF]">
                    {p.name}
                  </p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

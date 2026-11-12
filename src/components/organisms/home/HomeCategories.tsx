import Link from 'next/link';
import Reveal from '@/components/atoms/Reveal';
import FramedImage, { type Fit } from '@/components/atoms/FramedImage';
import MaskReveal from '@/components/atoms/MaskReveal';
import SectionHeading from './SectionHeading';

export type CategoryTile = { label: string; count: number; src: string; fit: Fit; ratio: number; href: string };

export default function HomeCategories({ categories, total }: { categories: CategoryTile[]; total: number }) {
  if (categories.length === 0) return null;

  return (
    <section className="bg-[#FDFCFA] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Reveal>
          <SectionHeading
            eyebrow="The collection"
            title={<>Browse by <em className="font-normal italic text-[#8069BF]">piece</em></>}
            intro="Every design in the catalogue, sorted the way you shop for it."
            link={{ href: '/catalog', label: `View all ${total} designs` }}
          />
        </Reveal>

        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:mt-16 sm:gap-x-6 md:grid-cols-4 lg:gap-x-8 lg:gap-y-14">
          {categories.map((c, i) => (
            <li key={c.label}>
              <Reveal delay={0.06 * (i % 4)}>
                <Link href={c.href} className="group block">
                  <MaskReveal delay={0.06 * (i % 4)} className="arch-soft relative aspect-[4/5] overflow-hidden bg-[#F3EFE6]">
                    <FramedImage
                      src={c.src}
                      fit={c.fit}
                      ratio={c.ratio}
                      alt={`${c.label} – gold and silver ${c.label.toLowerCase()} at Shri Hari Jewellers, Mogar`}
                      sizes="(min-width: 768px) 25vw, 50vw"
                      imgClassName="transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    />
                  </MaskReveal>
                  <div className="mt-4 flex items-baseline justify-between gap-3 border-b border-[#E9E3D6] pb-3 transition-colors duration-300 group-hover:border-[#C9A74D]">
                    <span className="font-headline text-[18px] text-[#1C1726] transition-colors duration-300 group-hover:text-[#8069BF] sm:text-[21px]">
                      {c.label}
                    </span>
                    <span className="font-label text-[12px] tabular-nums text-[#8C8698]">
                      {c.count} {c.count === 1 ? 'design' : 'designs'}
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

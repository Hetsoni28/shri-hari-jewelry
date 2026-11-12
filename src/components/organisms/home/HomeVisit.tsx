import Link from 'next/link';
import Reveal from '@/components/atoms/Reveal';
import { shopInfo } from '@/data/shopInfo';
import { ArrowRight, Eyebrow } from './SectionHeading';

const { address } = shopInfo;
const MAPS_HREF = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${shopInfo.name}, ${address.line1}, ${address.city}, ${address.taluka_district}, ${address.state}`,
)}`;

export default function HomeVisit() {
  return (
    <section className="border-t border-[#EFE9DC] bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">

        <Reveal className="lg:col-span-7">
          <Eyebrow>Visit us</Eyebrow>
          <h2 className="mt-4 font-headline text-[clamp(2rem,3.6vw,3.1rem)] font-medium leading-[1.08] tracking-[-0.015em] text-[#1C1726]">
            Come and see it <em className="font-normal italic text-[#8069BF]">in person.</em>
          </h2>
          <p className="mt-5 max-w-xl font-body text-[16px] leading-[1.7] text-[#5F5A6B]">
            Gold looks different in your hand than on a screen. Visit the shop to try pieces on,
            see the weight for yourself, and talk to us about a custom order.
          </p>

          <div className="mt-10 grid max-w-xl gap-8 sm:grid-cols-2">
            <div>
              <p className="font-label text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6B6577]">Address</p>
              <address className="mt-3 font-body text-[16px] not-italic leading-[1.7] text-[#1C1726]">
                {address.line1},<br />
                {address.line2},<br />
                {address.city}, {address.taluka_district},<br />
                {address.state}
              </address>
            </div>
            <div>
              <p className="font-label text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6B6577]">Call</p>
              <ul className="mt-3 space-y-1.5 font-body text-[16px] text-[#1C1726]">
                {[shopInfo.phone1, shopInfo.phone2].map((ph) => (
                  <li key={ph}>
                    <a href={`tel:${ph.replace(/\s+/g, '')}`} className="tabular-nums transition-colors hover:text-[#8069BF]">
                      {ph}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <a
              href={MAPS_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-[#8069BF] px-7 py-4 font-label text-[12px] font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-[#6A55A8]"
            >
              Get directions
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <Link
              href="/catalog-download"
              className="group inline-flex items-center gap-2.5 border-b border-[#C9A74D]/70 pb-1 font-label text-[13px] font-semibold text-[#1C1726] transition-colors hover:border-[#1C1726]"
            >
              Download the PDF catalogue
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        {/* Shop name plate — the name as it reads above the door */}
        <Reveal className="lg:col-span-5" delay={0.1}>
          <div className="relative flex h-full min-h-[320px] flex-col items-center justify-center overflow-hidden rounded-t-full border border-[#C9A74D]/45 bg-[#FDFCFA] px-8 pb-12 pt-24 text-center">
            <div aria-hidden="true" className="absolute inset-3 rounded-t-full border border-[#C9A74D]/20" />
            <p className="relative text-[clamp(2.2rem,4vw,3.2rem)] font-bold leading-tight text-[#8069BF]">શ્રી હરિ જ્વેલર્સ</p>
            <p className="relative mt-2 text-[18px] font-bold text-[#8A6D25]">પાદરાવાળા</p>
            <span aria-hidden="true" className="relative my-6 h-px w-16 bg-[#C9A74D]" />
            <p className="relative font-label text-[11px] font-semibold uppercase tracking-[0.3em] text-[#5F5A6B]">
              {address.city} · {address.taluka_district} · Since 2001
            </p>
            <p className="relative mt-3 font-body text-[14px] italic text-[#6B6577]">{shopInfo.owner}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

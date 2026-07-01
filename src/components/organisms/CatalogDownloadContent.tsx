import React from 'react';
import DownloadPdfButton from '@/components/molecules/DownloadPdfButton';

export interface CatalogProduct {
  id: string;
  category: string;
  subcategory: string;
  metalType: string;
  title: string;
  imageSrc: string;
}

export default function CatalogDownloadContent({ catalogProducts }: { catalogProducts: CatalogProduct[] }) {
  // ── Helpers ──────────────────────────────────────────────────────────────
  const bySubcat = (sub: string) =>
    catalogProducts.filter((p) => p.subcategory?.toLowerCase() === sub.toLowerCase());

  const byCatSubcat = (cat: string, sub: string) =>
    catalogProducts.filter(
      (p) =>
        p.category?.toLowerCase()    === cat.toLowerCase() &&
        p.subcategory?.toLowerCase()  === sub.toLowerCase()
    );

  const byMetal = (metal: string) =>
    catalogProducts.filter((p) => p.metalType?.toLowerCase() === metal.toLowerCase());

  const byMetalSubcat = (metal: string, sub: string) =>
    catalogProducts.filter(
      (p) =>
        p.metalType?.toLowerCase()   === metal.toLowerCase() &&
        p.subcategory?.toLowerCase() === sub.toLowerCase()
    );

  const byMetalCat = (metal: string, cat: string) =>
    catalogProducts.filter(
      (p) =>
        p.metalType?.toLowerCase()  === metal.toLowerCase() &&
        p.category?.toLowerCase()   === cat.toLowerCase()
    );

  // First product's image URL — shown as live thumbnail on the button
  const preview = (list: CatalogProduct[]) => list[0]?.imageSrc || '';

  return (
    <>
      <div className="text-center mb-8 sm:mb-16">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-headline font-bold text-primary mb-4 sm:mb-6">
          Catalog Download Center
        </h1>
        <p className="text-sm text-secondary max-w-2xl mx-auto leading-relaxed px-2">
          Generate and download our real-time jewelry catalogs. These print-ready PDFs contain exact
          specifications and high-resolution images of our beautiful collections.
        </p>
      </div>

      {/* ── Full Catalog ──────────────────────────────────────────────────── */}
      <div className="bg-white p-6 sm:p-10 border border-[var(--color-tertiary)]/30 text-center mb-8 sm:mb-16 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-tertiary)]/5 rounded-bl-full pointer-events-none" />
        <h2 className="text-2xl font-headline font-bold text-primary mb-6">
          Master Inventory Catalog
        </h2>
        <DownloadPdfButton
          title="Download Full Catalog PDF"
          pdfTitle="MASTER INVENTORY"
          subtitle="Complete Master Collection"
          filename="shri-hari-full-catalog.pdf"
          products={catalogProducts}
          variant="full"
          count={catalogProducts.length}
          previewImage={preview(catalogProducts)}
        />
      </div>
      {/* ── GOLD & SILVER FEATURED BLOCKS ─────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 sm:mb-14">

        {/* Gold */}
        <div className="bg-gradient-to-br from-[#FFFDF5] to-[#FDF6E3] border border-[#C9A84C]/30 p-6 sm:p-8 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#C9A84C]/8 rounded-bl-full pointer-events-none" />
          <div className="flex items-center gap-2 mb-1">
            <span className="w-3 h-3 rounded-full bg-gradient-to-br from-[#F0D060] to-[#C9A84C]" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#C9A84C]">Gold Jewellery</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-headline font-bold text-[#8B6914] mb-5">
            Gold Collection
          </h2>
          <div className="flex flex-col gap-2">
            {[
              { title: 'ALL GOLD',       pdfTitle: 'GOLD JEWELLERY',         subtitle: 'Complete Gold Collection',      file: 'gold-all.pdf',         list: byMetal('Gold') },
              { title: 'GOLD — FEMALE',  pdfTitle: 'GOLD FEMALE JEWELLERY',  subtitle: "Women's Gold Collection",       file: 'gold-women.pdf',       list: byMetalSubcat('Gold', 'Women') },
              { title: 'GOLD — MALE',    pdfTitle: 'GOLD MALE JEWELLERY',    subtitle: "Men's Gold Collection",         file: 'gold-men.pdf',         list: byMetalSubcat('Gold', 'Men') },
              { title: 'GOLD — UNISEX',  pdfTitle: 'GOLD UNISEX JEWELLERY',  subtitle: 'Unisex Gold Collection',        file: 'gold-unisex.pdf',      list: byMetalSubcat('Gold', 'Unisex') },
              { title: 'GOLD — KIDS',    pdfTitle: 'GOLD KIDS JEWELLERY',    subtitle: 'Kids Gold Collection',          file: 'gold-kids.pdf',        list: byMetalSubcat('Gold', 'Kids') },
              { title: 'GOLD — ANTIQUE', pdfTitle: 'ANTIQUE GOLD JEWELLERY', subtitle: 'Antique Gold Collection',       file: 'gold-antique.pdf',     list: byMetalSubcat('Gold', 'Antique') },
            ].map((b) => (
              <DownloadPdfButton
                key={b.file}
                title={b.title}
                pdfTitle={b.pdfTitle}
                subtitle={b.subtitle}
                filename={b.file}
                products={b.list}
                variant="row"
                count={b.list.length}
                previewImage={preview(b.list)}
              />
            ))}
          </div>
        </div>

        {/* Silver */}
        <div className="bg-gradient-to-br from-[#F8F8F8] to-[#F0F0F0] border border-[#9E9E9E]/30 p-6 sm:p-8 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#9E9E9E]/8 rounded-bl-full pointer-events-none" />
          <div className="flex items-center gap-2 mb-1">
            <span className="w-3 h-3 rounded-full bg-gradient-to-br from-[#D0D0D0] to-[#9E9E9E]" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#6E6E6E]">Silver Jewellery</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-headline font-bold text-[#4a4a4a] mb-5">
            Silver Collection
          </h2>
          <div className="flex flex-col gap-2">
            {[
              { title: 'ALL SILVER',       pdfTitle: 'SILVER JEWELLERY',         subtitle: 'Complete Silver Collection',   file: 'silver-all.pdf',       list: byMetal('Silver') },
              { title: 'SILVER — FEMALE',  pdfTitle: 'SILVER FEMALE JEWELLERY',  subtitle: "Women's Silver Collection",    file: 'silver-women.pdf',     list: byMetalSubcat('Silver', 'Women') },
              { title: 'SILVER — MALE',    pdfTitle: 'SILVER MALE JEWELLERY',    subtitle: "Men's Silver Collection",      file: 'silver-men.pdf',       list: byMetalSubcat('Silver', 'Men') },
              { title: 'SILVER — UNISEX',  pdfTitle: 'SILVER UNISEX JEWELLERY',  subtitle: 'Unisex Silver Collection',     file: 'silver-unisex.pdf',    list: byMetalSubcat('Silver', 'Unisex') },
              { title: 'SILVER — KIDS',    pdfTitle: 'SILVER KIDS JEWELLERY',    subtitle: 'Kids Silver Collection',       file: 'silver-kids.pdf',      list: byMetalSubcat('Silver', 'Kids') },
              { title: 'SILVER — ANTIQUE', pdfTitle: 'ANTIQUE SILVER JEWELLERY', subtitle: 'Antique Silver Collection',    file: 'silver-antique.pdf',   list: byMetalSubcat('Silver', 'Antique') },
            ].map((b) => (
              <DownloadPdfButton
                key={b.file}
                title={b.title}
                pdfTitle={b.pdfTitle}
                subtitle={b.subtitle}
                filename={b.file}
                products={b.list}
                variant="row"
                count={b.list.length}
                previewImage={preview(b.list)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-10 sm:gap-14">

        {/* ── FEMALE ───────────────────────────────────────────────────────── */}
        <Section title="Female">
          {[
            { title: 'ALL FEMALE',   pdfTitle: 'ALL FEMALE',         subtitle: "Women's Collection",      file: 'female-catalog.pdf',    list: bySubcat('Women') },
            { title: 'RINGS',        pdfTitle: "WOMEN'S RINGS",      subtitle: "Women's Rings",           file: 'female-rings.pdf',      list: byCatSubcat('Rings', 'Women') },
            { title: 'EARRINGS',     pdfTitle: "WOMEN'S EARRINGS",   subtitle: "Women's Earrings",        file: 'female-earrings.pdf',   list: byCatSubcat('Earrings', 'Women') },
            { title: 'NECKLACES',    pdfTitle: "WOMEN'S NECKLACES",  subtitle: "Women's Necklaces",       file: 'female-necklaces.pdf',  list: byCatSubcat('Necklaces', 'Women') },
            { title: 'MS LOCKETS',   pdfTitle: 'MS LOCKETS',         subtitle: 'MS Lockets Collection',   file: 'female-ms-lockets.pdf', list: byCatSubcat('MS Lockets', 'Women') },
            { title: 'PENDANTS',     pdfTitle: "WOMEN'S PENDANTS",   subtitle: "Women's Pendants",        file: 'female-pendants.pdf',   list: byCatSubcat('Pendants', 'Women') },
            { title: 'DOKIYA',       pdfTitle: 'DOKIYA',             subtitle: 'Dokiya Collection',       file: 'female-dokiya.pdf',     list: byCatSubcat('Dokiya', 'Women') },
            { title: 'MALA',         pdfTitle: 'MALA',               subtitle: 'Mala Collection',         file: 'female-mala.pdf',       list: byCatSubcat('Mala', 'Women') },
            { title: 'BRACELET',     pdfTitle: "WOMEN'S BRACELETS",  subtitle: "Women's Bracelets",       file: 'female-bracelets.pdf',  list: byCatSubcat('Bracelet', 'Women') },
            { title: 'KANCHAIN',     pdfTitle: 'KANCHAIN',           subtitle: 'Kanchain Collection',     file: 'female-kanchain.pdf',   list: byCatSubcat('Kanchain', 'Women') },
            { title: 'MANGALSUTRA', pdfTitle: 'MANGALSUTRA',         subtitle: 'Mangalsutra Collection',  file: 'female-mangalsutra.pdf',list: byCatSubcat('Mangalsutra', 'Women') },
          ].map((b) => (
            <DownloadPdfButton
              key={b.file}
              title={b.title}
              pdfTitle={b.pdfTitle}
              subtitle={b.subtitle}
              filename={b.file}
              products={b.list}
              variant="row"
              count={b.list.length}
              previewImage={preview(b.list)}
            />
          ))}
        </Section>

        {/* ── ANTIQUE ───────────────────────────────────────────────────────── */}
        <Section title="Antique">
          {[
            { title: 'ALL ANTIQUE', pdfTitle: 'ALL ANTIQUE',     subtitle: 'Complete Antique Collection', file: 'antique-catalog.pdf', list: bySubcat('Antique') },
            { title: 'SET',         pdfTitle: 'ANTIQUE SETS',    subtitle: 'Antique Set Collection',      file: 'antique-sets.pdf',    list: byCatSubcat('Set', 'Antique') },
            { title: 'JHUMAR',      pdfTitle: 'ANTIQUE JHUMAR',  subtitle: 'Antique Jhumar Collection',   file: 'antique-jhumar.pdf',  list: byCatSubcat('Jhumar', 'Antique') },
            { title: 'BANGLES',     pdfTitle: 'ANTIQUE BANGLES', subtitle: 'Antique Bangles Collection',  file: 'antique-bangles.pdf', list: byCatSubcat('Bangles', 'Antique') },
          ].map((b) => (
            <DownloadPdfButton
              key={b.file}
              title={b.title}
              pdfTitle={b.pdfTitle}
              subtitle={b.subtitle}
              filename={b.file}
              products={b.list}
              variant="row"
              count={b.list.length}
              previewImage={preview(b.list)}
            />
          ))}
        </Section>

        {/* ── MALE ─────────────────────────────────────────────────────────── */}
        <Section title="Male">
          {[
            { title: 'ALL MALE',   pdfTitle: 'ALL MALE',        subtitle: "Men's Collection",      file: 'male-catalog.pdf',    list: bySubcat('Men') },
            { title: 'RINGS',      pdfTitle: "MEN'S RINGS",     subtitle: "Men's Rings",           file: 'male-rings.pdf',      list: byCatSubcat('Rings', 'Men') },
            { title: 'PENDANTS',   pdfTitle: "MEN'S PENDANTS",  subtitle: "Men's Pendants",        file: 'male-pendants.pdf',   list: byCatSubcat('Pendants', 'Men') },
            { title: 'RUDRAKASH',  pdfTitle: 'RUDRAKASH',       subtitle: 'Rudrakash Collection',  file: 'male-rudrakash.pdf',  list: byCatSubcat('Rudrakash', 'Men') },
            { title: 'MALA',       pdfTitle: "MEN'S MALA",      subtitle: "Men's Mala & Chains",   file: 'male-mala.pdf',       list: byCatSubcat('Mala', 'Men') },
          ].map((b) => (
            <DownloadPdfButton
              key={b.file}
              title={b.title}
              pdfTitle={b.pdfTitle}
              subtitle={b.subtitle}
              filename={b.file}
              products={b.list}
              variant="row"
              count={b.list.length}
              previewImage={preview(b.list)}
            />
          ))}
        </Section>

        {/* ── KIDS ─────────────────────────────────────────────────────────── */}
        <Section title="Kids">
          {[
            { title: 'ALL KIDS', pdfTitle: 'ALL KIDS',     subtitle: 'Kids Collection',       file: 'kids-catalog.pdf',  list: bySubcat('Kids') },
            { title: 'RINGS',    pdfTitle: 'KIDS RINGS',   subtitle: 'Kids Rings',            file: 'kids-rings.pdf',    list: byCatSubcat('Rings', 'Kids') },
            { title: 'LUCKY',    pdfTitle: 'KIDS LUCKY',   subtitle: 'Kids Lucky Collection', file: 'kids-lucky.pdf',    list: byCatSubcat('Lucky', 'Kids') },
            { title: 'NAZRIYA',  pdfTitle: 'NAZRIYA',      subtitle: 'Nazriya Collection',    file: 'kids-nazriya.pdf',  list: byCatSubcat('Nazriya', 'Kids') },
          ].map((b) => (
            <DownloadPdfButton
              key={b.file}
              title={b.title}
              pdfTitle={b.pdfTitle}
              subtitle={b.subtitle}
              filename={b.file}
              products={b.list}
              variant="row"
              count={b.list.length}
              previewImage={preview(b.list)}
            />
          ))}
        </Section>

        {/* ── UNISEX ────────────────────────────────────────────────────────── */}
        <Section title="Unisex">
          {[
            { title: 'ALL UNISEX', pdfTitle: 'ALL UNISEX',       subtitle: 'Unisex Collection',       file: 'unisex-catalog.pdf',   list: bySubcat('Unisex') },
            { title: 'RINGS',      pdfTitle: 'UNISEX RINGS',     subtitle: 'Unisex Rings',            file: 'unisex-rings.pdf',     list: byCatSubcat('Rings', 'Unisex') },
            { title: 'PENDANTS',   pdfTitle: 'UNISEX PENDANTS',  subtitle: 'Unisex Pendants',         file: 'unisex-pendants.pdf',  list: byCatSubcat('Pendants', 'Unisex') },
            { title: 'MALA',       pdfTitle: 'UNISEX MALA',      subtitle: 'Unisex Mala & Chains',   file: 'unisex-mala.pdf',      list: byCatSubcat('Mala', 'Unisex') },
            { title: 'BRACELETS',  pdfTitle: 'UNISEX BRACELETS', subtitle: 'Unisex Bracelets',       file: 'unisex-bracelets.pdf', list: byCatSubcat('Bracelet', 'Unisex') },
          ].map((b) => (
            <DownloadPdfButton
              key={b.file}
              title={b.title}
              pdfTitle={b.pdfTitle}
              subtitle={b.subtitle}
              filename={b.file}
              products={b.list}
              variant="row"
              count={b.list.length}
              previewImage={preview(b.list)}
            />
          ))}
        </Section>

      </div>
    </>
  );
}

// ── Reusable section wrapper ──────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-secondary/15 shadow-sm">
      <div className="p-5 border-b border-secondary/15 bg-background-light/50">
        <h3 className="text-xl font-headline font-bold text-primary tracking-widest uppercase">
          {title}
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 p-5 sm:p-6 bg-white">
        {children}
      </div>
    </div>
  );
}

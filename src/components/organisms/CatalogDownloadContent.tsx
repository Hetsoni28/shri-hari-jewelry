import React from 'react';
import DownloadPdfButton from '@/components/molecules/DownloadPdfButton';

export interface CatalogProduct {
  id: string;
  category: string;
  subcategory: string;
  title: string;
  imageSrc: string;
}

export default function CatalogDownloadContent({ catalogProducts }: { catalogProducts: CatalogProduct[] }) {
  // Helpers to filter data
  const getSubcategoryProducts = (category: string, subcategory: string) => 
    catalogProducts.filter((p: CatalogProduct) => p.category?.toLowerCase() === category.toLowerCase() && p.subcategory?.toLowerCase() === subcategory.toLowerCase());

  return (
    <>
      <div className="text-center mb-8 sm:mb-16">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-headline font-bold text-primary mb-4 sm:mb-6">
          Catalog Download Center
        </h1>
        <p className="text-sm text-secondary max-w-2xl mx-auto leading-relaxed px-2">
          Generate and download our real-time jewelry catalogs. These print-ready PDFs contain exact specifications and high-resolution images of our beautiful collections.
        </p>
      </div>

      {/* Full Catalog */}
      <div className="bg-white p-6 sm:p-10 border border-[var(--color-tertiary)]/30 text-center mb-8 sm:mb-16 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-tertiary)]/5 rounded-bl-full pointer-events-none"></div>
        <h2 className="text-2xl font-headline font-bold text-primary mb-4">
          Master Inventory Catalog
        </h2>
        <DownloadPdfButton 
          title="Download Full Catalog PDF"
          pdfTitle="MASTER INVENTORY"
          subtitle="Complete Master Collection"
          filename="shri-hari-full-catalog.pdf"
          products={catalogProducts}
          variant="full"
        />
      </div>

      <div className="flex flex-col gap-10 sm:gap-14">
        
        {/* FEMALE */}
        <div className="bg-white border border-secondary/15 shadow-sm">
          <div className="p-5 border-b border-secondary/15 bg-background-light/50">
            <h3 className="text-xl font-headline font-bold text-primary tracking-widest uppercase">
              Female
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 p-5 sm:p-6 bg-white">
            <DownloadPdfButton title="ALL FEMALE" pdfTitle="ALL FEMALE" subtitle="Women's Collection" filename="female-catalog.pdf" variant="row"
              products={catalogProducts.filter((p: CatalogProduct) => p.subcategory === 'Women')} count={catalogProducts.filter((p: CatalogProduct) => p.subcategory === 'Women').length} />
            <DownloadPdfButton title="RINGS" pdfTitle="WOMEN's RINGS" subtitle="Women's Rings" filename="female-rings.pdf" variant="row"
              products={getSubcategoryProducts('Rings', 'Women')} count={getSubcategoryProducts('Rings', 'Women').length} />
            <DownloadPdfButton title="EARRINGS" pdfTitle="WOMEN's EARRINGS" subtitle="Women's Earrings" filename="female-earrings.pdf" variant="row"
              products={getSubcategoryProducts('Earrings', 'Women')} count={getSubcategoryProducts('Earrings', 'Women').length} />
            <DownloadPdfButton title="NECKLACES" pdfTitle="WOMEN's NECKLACES" subtitle="Women's Necklaces" filename="female-necklaces.pdf" variant="row"
              products={getSubcategoryProducts('Necklaces', 'Women')} count={getSubcategoryProducts('Necklaces', 'Women').length} />
            <DownloadPdfButton title="MS LOCKETS" pdfTitle="MS LOCKETS" subtitle="MS Lockets Collection" filename="female-ms-lockets.pdf" variant="row"
              products={getSubcategoryProducts('MS Lockets', 'Women')} count={getSubcategoryProducts('MS Lockets', 'Women').length} />
            <DownloadPdfButton title="PENDANTS" pdfTitle="WOMEN's PENDANTS" subtitle="Women's Pendants" filename="female-pendants.pdf" variant="row"
              products={getSubcategoryProducts('Pendants', 'Women')} count={getSubcategoryProducts('Pendants', 'Women').length} />
            <DownloadPdfButton title="DOKIYA" pdfTitle="DOKIYA" subtitle="Dokiya Collection" filename="female-dokiya.pdf" variant="row"
              products={getSubcategoryProducts('Dokiya', 'Women')} count={getSubcategoryProducts('Dokiya', 'Women').length} />
            <DownloadPdfButton title="MALA" pdfTitle="MALA" subtitle="Mala Collection" filename="female-mala.pdf" variant="row"
              products={getSubcategoryProducts('Mala', 'Women')} count={getSubcategoryProducts('Mala', 'Women').length} />
            <DownloadPdfButton title="BRACELET" pdfTitle="WOMEN's BRACELETS" subtitle="Women's Bracelets" filename="female-bracelets.pdf" variant="row"
              products={getSubcategoryProducts('Bracelet', 'Women')} count={getSubcategoryProducts('Bracelet', 'Women').length} />
            <DownloadPdfButton title="KANCHAIN" pdfTitle="KANCHAIN" subtitle="Kanchain Collection" filename="female-kanchain.pdf" variant="row"
              products={getSubcategoryProducts('Kanchain', 'Women')} count={getSubcategoryProducts('Kanchain', 'Women').length} />
          </div>
        </div>

        {/* ANTIQUE */}
        <div className="bg-white border border-secondary/15 shadow-sm">
          <div className="p-5 border-b border-secondary/15 bg-background-light/50">
            <h3 className="text-xl font-headline font-bold text-primary tracking-widest uppercase">
              Antique
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-5 sm:p-6 bg-white">
            <DownloadPdfButton title="ALL ANTIQUE" pdfTitle="ALL ANTIQUE" subtitle="Complete Antique Collection" filename="antique-catalog.pdf" variant="row"
              products={catalogProducts.filter((p: CatalogProduct) => p.subcategory === 'Antique')} count={catalogProducts.filter((p: CatalogProduct) => p.subcategory === 'Antique').length} />
            <DownloadPdfButton title="SET" pdfTitle="ANTIQUE SETS" subtitle="Antique Set Collection" filename="antique-sets.pdf" variant="row"
              products={getSubcategoryProducts('Set', 'Antique')} count={getSubcategoryProducts('Set', 'Antique').length} />
            <DownloadPdfButton title="JHUMAR" pdfTitle="ANTIQUE JHUMAR" subtitle="Antique Jhumar Collection" filename="antique-jhumar.pdf" variant="row"
              products={getSubcategoryProducts('Jhumar', 'Antique')} count={getSubcategoryProducts('Jhumar', 'Antique').length} />
            <DownloadPdfButton title="BANGLES" pdfTitle="ANTIQUE BANGLES" subtitle="Antique Bangles Collection" filename="antique-bangles.pdf" variant="row"
              products={getSubcategoryProducts('Bangles', 'Antique')} count={getSubcategoryProducts('Bangles', 'Antique').length} />
          </div>
        </div>

        {/* MALE */}
        <div className="bg-white border border-secondary/15 shadow-sm">
          <div className="p-5 border-b border-secondary/15 bg-background-light/50">
            <h3 className="text-xl font-headline font-bold text-primary tracking-widest uppercase">
              Male
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-5 sm:p-6 bg-white">
            <DownloadPdfButton title="ALL MALE" pdfTitle="ALL MALE" subtitle="Men's Collection" filename="male-catalog.pdf" variant="row"
              products={catalogProducts.filter((p: CatalogProduct) => p.subcategory === 'Men')} count={catalogProducts.filter((p: CatalogProduct) => p.subcategory === 'Men').length} />
            <DownloadPdfButton title="RINGS" pdfTitle="MEN's RINGS" subtitle="Men's Rings" filename="male-rings.pdf" variant="row"
              products={getSubcategoryProducts('Rings', 'Men')} count={getSubcategoryProducts('Rings', 'Men').length} />
            <DownloadPdfButton title="PENDANTS" pdfTitle="MEN's PENDANTS" subtitle="Men's Pendants" filename="male-pendants.pdf" variant="row"
              products={getSubcategoryProducts('Pendants', 'Men')} count={getSubcategoryProducts('Pendants', 'Men').length} />
            <DownloadPdfButton title="RUDRAKASH" pdfTitle="RUDRAKASH" subtitle="Rudrakash Collection" filename="male-rudrakash.pdf" variant="row"
              products={getSubcategoryProducts('Rudrakash', 'Men')} count={getSubcategoryProducts('Rudrakash', 'Men').length} />
          </div>
        </div>

        {/* KIDS */}
        <div className="bg-white border border-secondary/15 shadow-sm">
          <div className="p-5 border-b border-secondary/15 bg-background-light/50">
            <h3 className="text-xl font-headline font-bold text-primary tracking-widest uppercase">
              Kids
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-5 sm:p-6 bg-white">
            <DownloadPdfButton title="ALL KIDS" pdfTitle="ALL KIDS" subtitle="Kids Collection" filename="kids-catalog.pdf" variant="row"
              products={catalogProducts.filter((p: CatalogProduct) => p.subcategory === 'Kids')} count={catalogProducts.filter((p: CatalogProduct) => p.subcategory === 'Kids').length} />
            <DownloadPdfButton title="RINGS" pdfTitle="KIDS RINGS" subtitle="Kids Rings" filename="kids-rings.pdf" variant="row"
              products={getSubcategoryProducts('Rings', 'Kids')} count={getSubcategoryProducts('Rings', 'Kids').length} />
            <DownloadPdfButton title="LUCKY" pdfTitle="KIDS LUCKY" subtitle="Kids Lucky Collection" filename="kids-lucky.pdf" variant="row"
              products={getSubcategoryProducts('Lucky', 'Kids')} count={getSubcategoryProducts('Lucky', 'Kids').length} />
            <DownloadPdfButton title="NAZRIYA" pdfTitle="NAZRIYA" subtitle="Nazriya Collection" filename="kids-nazriya.pdf" variant="row"
              products={getSubcategoryProducts('Nazriya', 'Kids')} count={getSubcategoryProducts('Nazriya', 'Kids').length} />
          </div>
        </div>

      </div>
    </>
  );
}

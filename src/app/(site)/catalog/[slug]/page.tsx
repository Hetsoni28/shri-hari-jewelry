import { notFound } from 'next/navigation';
import ProductBreadcrumb from '@/components/organisms/ProductBreadcrumb';
import ProductGallery from '@/components/organisms/ProductGallery';
import ProductInfo from '@/components/organisms/ProductInfo';
import ProductActions from '@/components/organisms/ProductActions';
import RelatedProducts from '@/components/organisms/RelatedProducts';
import { client } from '@/sanity/client';
import { productBySlugQuery, productsQuery } from '@/sanity/queries';

// export const revalidate = 60; // Removed to prevent aggressive caching
export const dynamic = 'force-dynamic';

export default async function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = await client.fetch(productBySlugQuery, { slug: resolvedParams.slug });
  const allProducts = await client.fetch(productsQuery);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full bg-white min-h-screen">

      {/* Gold accent hairline at top */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">

        <ProductBreadcrumb product={product} />

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 mb-16 sm:mb-24">
          <ProductGallery images={product.images} name={product.name} tag={product.tag} tagColor={product.tagColor} />

          <div className="flex flex-col pt-0 sm:pt-2">
            <ProductInfo product={product} />
            <ProductActions product={product} />
          </div>
        </div>

      </div>

      {/* Related Products Section */}
      <RelatedProducts currentProductId={product._id} allProducts={allProducts} />
    </div>
  );
}

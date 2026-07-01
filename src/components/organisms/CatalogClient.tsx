'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import CatalogHeader from '@/components/organisms/CatalogHeader';
import CatalogFilters from '@/components/organisms/CatalogFilters';
import CatalogGrid from '@/components/organisms/CatalogGrid';
import CatalogPagination from '@/components/organisms/CatalogPagination';

interface Product {
  _id: string;
  name: string;
  slug: string;
  images: Record<string, unknown>[];
  category: string;
  subcategory?: string;
  metalType?: string;
  isNewArrival?: boolean;
}

const ITEMS_PER_PAGE = 12;

export default function CatalogClient({ products }: { products: Product[] }) {
  const router       = useRouter();
  const searchParams = useSearchParams();

  // Fix: blank page on browser Back button
  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) router.refresh();
    };
    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, [router]);

  // Read initial values from URL query params
  const initialCategory = searchParams.get('category') || 'all';
  const initialGender   = searchParams.get('gender')   || null;
  const initialMetal    = searchParams.get('metal')    || null;

  const [activeGender,   setActiveGender]   = useState<string | null>(initialGender);
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [activeMetal,    setActiveMetal]    = useState<string | null>(initialMetal);
  const [currentPage,    setCurrentPage]    = useState<number>(1);

  // Keep state in sync if URL params change
  useEffect(() => {
    setActiveCategory(searchParams.get('category') || 'all');
    setActiveGender(searchParams.get('gender') || null);
    setActiveMetal(searchParams.get('metal') || null);
    setCurrentPage(1);
  }, [searchParams]);

  // Combined filter: subcategory + metalType + category (all AND logic)
  // Unisex cross-lists under Women & Men tabs
  const filtered = useMemo(() => {
    return products.filter((p) => {
      const sub = p.subcategory;
      const genderMatch =
        activeGender === null ||
        sub === activeGender ||
        (sub === 'Unisex' && (activeGender === 'Women' || activeGender === 'Men'));

      const metalMatch =
        activeMetal === null || p.metalType === activeMetal;

      const categoryMatch =
        activeCategory === 'all' ||
        (p.category ?? '').toLowerCase() === activeCategory.toLowerCase();

      return genderMatch && metalMatch && categoryMatch;
    });
  }, [products, activeGender, activeMetal, activeCategory]);

  // Available categories for the current gender+metal combo
  const availableCategories = useMemo(() => {
    const available = new Set<string>();
    for (const p of products) {
      const sub = p.subcategory;
      const genderOk =
        activeGender === null ||
        sub === activeGender ||
        (sub === 'Unisex' && (activeGender === 'Women' || activeGender === 'Men'));
      const metalOk = activeMetal === null || p.metalType === activeMetal;
      if (genderOk && metalOk && p.category) available.add(p.category.toLowerCase());
    }
    return available;
  }, [products, activeGender, activeMetal]);

  // Reset category if no longer available
  useEffect(() => {
    if (activeCategory !== 'all' && !availableCategories.has(activeCategory.toLowerCase())) {
      setActiveCategory('all');
      setCurrentPage(1);
    }
  }, [availableCategories, activeCategory]);

  const handleGenderChange = (gender: string | null) => {
    setActiveGender(gender);
    setCurrentPage(1);
  };

  const handleMetalChange = (metal: string | null) => {
    setActiveMetal(metal);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) setCurrentPage(1);
  }, [totalPages, currentPage]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  return (
    <>
      <CatalogHeader
        products={products}
        activeGender={activeGender}
        activeMetal={activeMetal}
        onGenderChange={handleGenderChange}
        onMetalChange={handleMetalChange}
      />
      <CatalogFilters
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        availableCategories={availableCategories}
      />
      <CatalogGrid
        key={`page-${currentPage}`}
        products={paginatedProducts}
      />
      <CatalogPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}

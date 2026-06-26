'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
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
}

const ITEMS_PER_PAGE = 12;

export default function CatalogClient({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();

  // Read initial values from URL query params (set by breadcrumb links)
  const initialCategory = searchParams.get('category') || 'all';
  const initialGender   = searchParams.get('gender')   || null;

  const [activeGender,   setActiveGender]   = useState<string | null>(initialGender);
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Keep state in sync if URL params change (e.g. browser back/forward)
  // Also reset pagination to page 1
  useEffect(() => {
    setActiveCategory(searchParams.get('category') || 'all');
    setActiveGender(searchParams.get('gender') || null);
    setCurrentPage(1);
  }, [searchParams]);

  // Combined filter: both must match
  const filtered = useMemo(() => {
    return products.filter((p) => {
      const genderMatch = activeGender === null || p.subcategory === activeGender;
      const categoryMatch =
        activeCategory === 'all' ||
        (p.category ?? '').toLowerCase() === activeCategory.toLowerCase();
      return genderMatch && categoryMatch;
    });
  }, [products, activeGender, activeCategory]);

  // Compute available categories for the currently selected gender
  const availableCategories = useMemo(() => {
    const available = new Set<string>();
    for (const p of products) {
      if (activeGender === null || p.subcategory === activeGender) {
        if (p.category) available.add(p.category.toLowerCase());
      }
    }
    return available;
  }, [products, activeGender]);

  // Reset category (and page) if the selected category is no longer available for the new gender
  useEffect(() => {
    if (activeCategory !== 'all' && !availableCategories.has(activeCategory.toLowerCase())) {
      setActiveCategory('all');
      setCurrentPage(1);
    }
  }, [availableCategories, activeCategory]);

  // Handle manual filter changes (reset page to 1)
  const handleGenderChange = (gender: string | null) => {
    setActiveGender(gender);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  // Pagination Math
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  
  // Ensure current page is valid if total pages shrinks due to filtering
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
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
        onGenderChange={handleGenderChange}
      />
      <CatalogFilters
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        availableCategories={availableCategories}
      />
      {/* Add a key to force re-render and trigger stagger animation on page change */}
      <CatalogGrid key={`page-${currentPage}-${activeCategory}-${activeGender}`} products={paginatedProducts} />
      
      <CatalogPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}

'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CatalogPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function CatalogPagination({
  currentPage,
  totalPages,
  onPageChange,
}: CatalogPaginationProps) {
  if (totalPages <= 1) return null;

  // Generate page numbers to display
  // Logic: always show first, last, current, and +/- 1 around current.
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);
    
    if (currentPage > 3) {
      pages.push('...');
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    pages.push(totalPages);

    return pages;
  };

  const pages = getPageNumbers();

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      window.scrollTo({ top: 300, behavior: 'smooth' }); // Scroll near top of grid
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  const handlePage = (page: number | string) => {
    if (typeof page === 'number' && page !== currentPage) {
      onPageChange(page);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex justify-center items-center gap-1 sm:gap-2 mt-16 mb-8 w-full">
      {/* Prev Button */}
      <motion.button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-10 h-10 border border-[var(--color-secondary)]/20 text-[var(--color-secondary)] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#C9A84C]/50 hover:text-[#C9A84C] transition-colors duration-300 mr-2"
        whileHover={currentPage !== 1 ? { y: -2 } : {}}
        whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </motion.button>

      {/* Page Numbers */}
      {pages.map((page, index) => {
        const isActive = page === currentPage;
        const isEllipsis = page === '...';

        if (isEllipsis) {
          return (
            <span key={`ellipsis-${index}`} className="flex items-center justify-center w-8 h-10 text-[var(--color-secondary)]/50 tracking-widest text-xs">
              ...
            </span>
          );
        }

        return (
          <motion.button
            key={page}
            onClick={() => handlePage(page)}
            className={`relative flex items-center justify-center w-10 h-10 text-xs font-label font-bold tracking-widest transition-colors duration-300 ${
              isActive ? 'text-[#C9A84C]' : 'text-[var(--color-secondary)]/70 hover:text-[var(--color-secondary)]'
            }`}
            whileHover={!isActive ? { y: -2 } : {}}
            whileTap={!isActive ? { scale: 0.95 } : {}}
          >
            {page}
            {/* Active state underline (like navbar) */}
            {isActive && (
              <motion.div
                layoutId="pagination-active"
                className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#C9A84C]"
                initial={false}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
          </motion.button>
        );
      })}

      {/* Next Button */}
      <motion.button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-10 h-10 border border-[var(--color-secondary)]/20 text-[var(--color-secondary)] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#C9A84C]/50 hover:text-[#C9A84C] transition-colors duration-300 ml-2"
        whileHover={currentPage !== totalPages ? { y: -2 } : {}}
        whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </motion.button>
    </div>
  );
}

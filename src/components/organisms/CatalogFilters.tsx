"use client";

import React from 'react';

const CATEGORIES = [
  { label: 'ALL JEWELRY TYPES', value: 'all'       },
  { label: 'NECKLACES',         value: 'Necklaces' },
  { label: 'EARRINGS',          value: 'Earrings'  },
  { label: 'RINGS',             value: 'Rings'     },
  { label: 'BANGLES',           value: 'Bangles'   },
  { label: 'BRACELETS',         value: 'Bracelets' },
  { label: 'BRACELET',          value: 'Bracelet'  },
  { label: 'PENDANTS',          value: 'Pendants'  },
  { label: 'MALA',              value: 'Mala'      },
  { label: 'BALI',              value: 'Bali'      },
  { label: 'MANGALSUTRA',       value: 'Mangalsutra'},
  { label: 'RUDRAKASH',         value: 'Rudrakash' },
  { label: 'LUCKY',             value: 'Lucky'     },
  { label: 'NAZRIYA',           value: 'Nazriya'   }
];

interface Props {
  activeCategory:   string;
  onCategoryChange: (value: string) => void;
  availableCategories: Set<string>;
}

export default function CatalogFilters({ activeCategory, onCategoryChange, availableCategories }: Props) {
  // Filter the options based on what's available for the current gender
  const filteredCategories = CATEGORIES.filter(
    (c) => c.value === 'all' || availableCategories.has(c.value.toLowerCase())
  );

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      <div className="relative w-full sm:w-auto">
        <select
          value={activeCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="appearance-none border border-[var(--color-secondary)]/30 text-label text-xs uppercase px-4 py-3 pr-10 text-[var(--foreground)] bg-white w-full sm:min-w-[180px] focus:outline-none focus:border-[#C9A84C] cursor-pointer tracking-[0.08em] transition-colors duration-200"
        >
          {filteredCategories.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[8px] text-[var(--color-secondary)]">
          &#9660;
        </div>
      </div>
    </div>
  );
}

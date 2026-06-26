'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type WishlistItem = {
  id: string;
  imageSrc: string;
  title: string;
  badge1: string;
  badge2?: string;
  isNewArrival: boolean;
};

type WishlistContextType = {
  items: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // Use useEffect to ensure hydration matches and to load from storage
  useEffect(() => {
    const saved = localStorage.getItem('shrihari_wishlist');
    if (saved) {
      try {
        setItems(() => JSON.parse(saved));
      } catch {
        setItems(() => []);
      }
    } else {
      setItems(() => []);
    }
    setMounted(true);
  }, []);

  // Save to localStorage whenever items change (only after initial mount)
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('shrihari_wishlist', JSON.stringify(items));
    }
  }, [items, mounted]);

  const addToWishlist = (newItem: WishlistItem) => {
    setItems(prev => {
      if (prev.some(item => item.id === newItem.id)) return prev;
      return [...prev, newItem];
    });
  };

  const removeFromWishlist = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const isInWishlist = (id: string) => {
    return items.some(item => item.id === id);
  };

  // Prevent hydration mismatch for the count
  if (!mounted) {
    return <WishlistContext.Provider value={{ items: [], addToWishlist, removeFromWishlist, isInWishlist }}>{children}</WishlistContext.Provider>;
  }

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}

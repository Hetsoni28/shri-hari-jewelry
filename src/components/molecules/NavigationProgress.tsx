'use client';

import NextTopLoader from 'nextjs-toploader';

/**
 * NavigationProgress — a thin gold bar at the very top of the screen that
 * appears immediately when any link is clicked and fills across while Next.js
 * fetches the next page from the server. Eliminates the perception of blank
 * pages during server-side navigation.
 */
export default function NavigationProgress() {
  return (
    <NextTopLoader
      color="#C9A84C"          // Brand gold colour
      initialPosition={0.08}   // Start at 8% immediately on click
      crawlSpeed={200}         // Smooth crawl speed
      height={2}               // Thin premium line (2px)
      crawl={true}             // Keep crawling while server fetches
      showSpinner={false}      // No spinner — clean look
      easing="ease"
      speed={200}
      shadow="0 0 8px #C9A84C, 0 0 4px #C9A84C"  // Subtle gold glow
    />
  );
}

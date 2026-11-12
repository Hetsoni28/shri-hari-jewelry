import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// ─── Security headers applied to every response ───────────────────────────────
const securityHeaders = [
  // Prevent clickjacking — stops your site being embedded in iframes
  { key: 'X-Frame-Options',           value: 'SAMEORIGIN' },
  // Prevent MIME-type sniffing attacks
  { key: 'X-Content-Type-Options',    value: 'nosniff' },
  // Control referrer information for privacy
  { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
  // Disable browser features that aren't needed (camera, mic, etc.)
  { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  // Force HTTPS for 1 year (only active on production)
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
  // Basic XSS protection for older browsers
  { key: 'X-XSS-Protection',         value: '1; mode=block' },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',   // Apply to every page and API route
        headers: securityHeaders,
      },
    ];
  },

  // ─── Dev origins (tunnel / local network support) ──────────────────────────
  allowedDevOrigins: [
    "localhost:3000",
    "localhost:3001",
    "127.0.0.1:3000",
    "192.168.1.10",
    "192.168.1.*",
    "192.168.0.*",
    "10.0.0.*",
    "*.ngrok.io",
    "*.ngrok.app",
    "*.ngrok-free.app",
    "*.loca.lt",
    "*.serveo.net",
    "*.gitpod.io",
    "*.app.github.dev",
    "*.csb.app",
  ],

  // ─── World-class image optimization ────────────────────────────────────────
  images: {
    // Responsive images come straight from Sanity's image CDN (resized, WebP/AVIF):
    // see src/lib/sanityImageLoader.ts. No Next.js image proxy is involved, which also
    // avoids the local-dev NAT64 issue with the proxy.
    loader: "custom",
    loaderFile: "./src/lib/sanityImageLoader.ts",

    // All quality levels used across the codebase
    qualities: [75, 85, 90, 95],

    // Responsive breakpoints tuned for jewelry grid:
    //   mobile 2-col → ~200px, tablet 3-col → ~300px,
    //   desktop 4–6 col → 400–600px, full-width hero → 1080–1920px
    deviceSizes: [390, 640, 768, 1024, 1280, 1440, 1920],
    imageSizes:  [24, 48, 96, 128, 200, 300, 400, 600],

    // Cache optimized images for 30 days on the CDN edge
    minimumCacheTTL: 60 * 60 * 24 * 30,

    // Allow images from Sanity CDN and Unsplash
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],

    // Use modern AVIF then WebP — smallest file size, best quality
    formats: ["image/avif", "image/webp"],
  },

  // ─── Production hardening ───────────────────────────────────────────────────
  compress: true,          // Gzip/Brotli all responses
  poweredByHeader: false,  // Don't expose "X-Powered-By: Next.js"
};

export default nextConfig;

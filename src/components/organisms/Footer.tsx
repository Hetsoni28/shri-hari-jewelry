'use client';

import Link from 'next/link'
import { shopInfo } from '@/data/shopInfo'

export default function Footer() {
  return (
    <footer className="bg-[var(--color-primary)] text-white pt-12 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Info */}
          <div className="text-white/90">
            <Link href="/" className="inline-flex flex-col items-center gap-4 mb-6 hover:opacity-90 transition-opacity">
              {/* ── Self-contained footer logo SVG (unique IDs, no clashes) ── */}
              <svg
                width="80"
                height="80"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="ft-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFD700" />
                    <stop offset="50%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#B8860B" />
                  </linearGradient>
                  <linearGradient id="ft-gold-inv" x1="100%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#FFD700" />
                    <stop offset="50%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#B8860B" />
                  </linearGradient>
                </defs>

                {/* Outer circle */}
                <circle cx="50" cy="50" r="48" fill="rgba(255,255,255,0.08)" stroke="url(#ft-gold)" strokeWidth="1.5" />

                {/* Sunburst ring */}
                {Array.from({ length: 36 }).map((_, i) => (
                  <path key={i} d="M50 4 L51 8 L49 8 Z" fill="url(#ft-gold)" transform={`rotate(${i * 10} 50 50)`} />
                ))}

                {/* Dashed inner ring */}
                <circle cx="50" cy="50" r="40" stroke="url(#ft-gold-inv)" strokeWidth="1.5" strokeDasharray="2 4" strokeLinecap="round" />

                {/* Diamond geometry */}
                <path d="M50 15 L85 50 L50 85 L15 50 Z" stroke="url(#ft-gold)" strokeWidth="1" fill="none" opacity="0.3" />
                <path d="M50 20 L80 50 L50 80 L20 50 Z" stroke="url(#ft-gold-inv)" strokeWidth="1" fill="none" opacity="0.5" />

                {/* Center white disc */}
                <circle cx="50" cy="50" r="32" fill="rgba(255,255,255,0.12)" />
                <circle cx="50" cy="50" r="30" stroke="url(#ft-gold)" strokeWidth="1" opacity="0.7" />

                {/* Crown ornament */}
                <path d="M44 26 C48 20, 52 20, 56 26 C53 28, 47 28, 44 26 Z" fill="url(#ft-gold)" />
                <circle cx="50" cy="22" r="1.5" fill="#FFD700" />

                {/* SH monogram */}
                <text
                  x="50" y="58"
                  fontFamily="Georgia, 'Times New Roman', serif"
                  fontSize="30"
                  fontWeight="900"
                  fill="url(#ft-gold)"
                  textAnchor="middle"
                  letterSpacing="1"
                >
                  SH
                </text>

                {/* Bottom diamond */}
                <path d="M50 78 L47 72 L53 72 Z" fill="url(#ft-gold-inv)" />
              </svg>

              {/* Text block */}
              <div className="flex flex-col items-center text-center">
                <span className="text-2xl font-bold leading-tight text-white">
                  શ્રી હરિ જ્વેલર્સ
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase font-serif mt-1 text-white/80">
                  Shree Hari Jewellers
                </span>
                <span className="text-[9px] font-bold mt-0.5 text-[#D4AF37]">
                  પાદરાવાળા
                </span>
              </div>
            </Link>

            <p className="text-body text-sm mb-1">
              <strong>Owner:</strong> {shopInfo.owner}
            </p>
            <p className="text-body text-sm opacity-90">
              {shopInfo.services.join(' • ')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.22em] mb-5 text-[var(--color-tertiary)] font-label border-b border-white/10 pb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-body">
              <li>
                <Link href="/" className="hover:text-[var(--color-tertiary)] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-[var(--color-tertiary)] transition-colors">
                  Jewelry Catalog
                </Link>
              </li>
              <li>
                <Link href="/catalog-download" className="hover:text-[var(--color-tertiary)] transition-colors">
                  PDF Catalog
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-[var(--color-tertiary)] transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[var(--color-tertiary)] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.22em] mb-5 text-[var(--color-tertiary)] font-label border-b border-white/10 pb-3">
              Contact &amp; Visit Us
            </h4>
            <div className="text-body space-y-3">
              <p>
                <strong>Phone:</strong><br />
                <a href={`tel:${shopInfo.phone1.replace(/\s+/g, '')}`} className="hover:text-[var(--color-tertiary)]">
                  {shopInfo.phone1}
                </a>
                <br />
                <a href={`tel:${shopInfo.phone2.replace(/\s+/g, '')}`} className="hover:text-[var(--color-tertiary)]">
                  {shopInfo.phone2}
                </a>
              </p>
              <p>
                <strong>Address:</strong><br />
                <span className="opacity-90">
                  {shopInfo.address.line1},<br />
                  {shopInfo.address.line2},<br />
                  {shopInfo.address.city}, {shopInfo.address.taluka_district},<br />
                  {shopInfo.address.state}, {shopInfo.address.country}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 mt-8 text-center text-body text-sm opacity-80">
          <p>&copy; {new Date().getFullYear()} {shopInfo.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
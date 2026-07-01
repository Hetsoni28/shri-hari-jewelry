const fs = require('fs');

// Create rays for the sunburst
const rays = Array.from({ length: 36 }, (_, i) => 
  `<path d='M50 4 L51 8 L49 8 Z' fill='#D4AF37' transform='rotate(${i * 10} 50 50)'/>`
).join('\n    ');

// Create a full OG image as SVG (1200x630)
const ogSvg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0A0A0A"/>
  <rect x="20" y="20" width="1160" height="590" fill="none" stroke="#D4AF37" stroke-width="1.5"/>
  <rect x="26" y="26" width="1148" height="578" fill="none" stroke="#B8860B" stroke-width="0.5" opacity="0.5"/>

  <g transform="translate(155, 185) scale(2.6)">
    <circle cx="50" cy="50" r="48" fill="#1A1A1A" stroke="#D4AF37" stroke-width="1.5"/>
    ${rays}
    <circle cx="50" cy="50" r="40" stroke="#B8860B" stroke-width="1.5" stroke-dasharray="2 4" stroke-linecap="round" fill="none"/>
    <path d="M50 15 L85 50 L50 85 L15 50 Z" stroke="#D4AF37" stroke-width="1" fill="none" opacity="0.4"/>
    <path d="M50 20 L80 50 L50 80 L20 50 Z" stroke="#B8860B" stroke-width="1" fill="none" opacity="0.6"/>
    <circle cx="50" cy="50" r="32" fill="#111111"/>
    <circle cx="50" cy="50" r="30" stroke="#D4AF37" stroke-width="1" opacity="0.6" fill="none"/>
    <path d="M44 26 C48 20, 52 20, 56 26 C53 28, 47 28, 44 26 Z" fill="#D4AF37"/>
    <circle cx="50" cy="22" r="1.5" fill="#FFD700"/>
    <path d="M50 78 L47 72 L53 72 Z" fill="#B8860B"/>
    <text x="50" y="60" font-family="Georgia,serif" font-size="32" font-weight="900" fill="#D4AF37" text-anchor="middle" letter-spacing="1">SH</text>
  </g>

  <line x1="500" y1="170" x2="500" y2="460" stroke="#D4AF37" stroke-width="0.8" opacity="0.4"/>

  <text x="560" y="265" font-family="Georgia,serif" font-size="76" font-weight="900" fill="#D4AF37">Shri Hari</text>
  <text x="560" y="350" font-family="Georgia,serif" font-size="60" font-weight="400" fill="#F5F0E8" letter-spacing="4">Jewellers</text>
  <line x1="560" y1="375" x2="1140" y2="375" stroke="#D4AF37" stroke-width="0.8"/>
  <text x="560" y="415" font-family="Georgia,serif" font-size="22" fill="#A89060" letter-spacing="3">GOLD &amp; SILVER ORNAMENTS · PADRAWALA</text>
</svg>`;

fs.writeFileSync('public/images/og-image.svg', ogSvg);
console.log('SVG OG image created successfully!');

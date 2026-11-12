import type { MetadataRoute } from 'next';
import { shopInfo } from '@/data/shopInfo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${shopInfo.name} — Gold & Silver Jewellery, Mogar`,
    short_name: shopInfo.name,
    description: 'Handcrafted gold and silver jewellery from Mogar, Anand. BIS hallmarked gold and made-to-order pieces.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#8069BF',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}

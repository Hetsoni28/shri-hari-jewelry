import { shopInfo } from '@/data/shopInfo';
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from '@/lib/seo';

const { address } = shopInfo;

/** schema.org JewelryStore — the shop as a local business (home + contact pages) */
export const jewelryStoreLd = {
  '@context': 'https://schema.org',
  '@type': 'JewelryStore',
  '@id': `${SITE_URL}/#store`,
  name: SITE_NAME,
  alternateName: ['શ્રી હરિ જ્વેલર્સ', `${SITE_NAME} ${shopInfo.subtitle.replace(/[()]/g, '')}`],
  description: 'Handcrafted gold and silver jewellery, BIS hallmarked gold and made-to-order pieces in Mogar, Anand.',
  url: SITE_URL,
  image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
  logo: `${SITE_URL}/icon.svg`,
  telephone: shopInfo.phone1.replace(/\s+/g, ''),
  contactPoint: [shopInfo.phone1, shopInfo.phone2].map((ph) => ({
    '@type': 'ContactPoint',
    telephone: ph.replace(/\s+/g, ''),
    contactType: 'customer service',
    areaServed: 'IN',
    availableLanguage: ['Gujarati', 'Hindi', 'English'],
  })),
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${address.line1}, ${address.line2}`,
    addressLocality: address.city,
    addressRegion: address.state,
    addressCountry: 'IN',
    ...(address.pin && { postalCode: address.pin }),
  },
  areaServed: [`${address.city}`, `${address.taluka_district}`, 'Gujarat'],
  founder: { '@type': 'Person', name: shopInfo.owner },
  foundingDate: '2001',
  currenciesAccepted: 'INR',
};

/** schema.org WebSite */
export const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: 'en-IN',
  publisher: { '@id': `${SITE_URL}/#store` },
};

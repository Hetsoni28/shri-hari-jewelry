import { client } from './src/sanity/client.js';
import { productBySlugQuery } from './src/sanity/queries.js';

async function test() {
  const product = await client.fetch(productBySlugQuery, { slug: 'gold-necklaces' });
  console.log("PRODUCT:", product);
}

test().catch(console.error);

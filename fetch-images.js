const { createClient } = require('@sanity/client');
const fs = require('fs');

const client = createClient({
  projectId: 'k4h1rv66',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
});

async function run() {
  const query = `*[_type == "product" && defined(images)][0...20]{
    "url": images[0].asset->url,
    name,
    category
  }`;
  const products = await client.fetch(query);
  fs.writeFileSync('remotion-hero/src/images.json', JSON.stringify(products, null, 2));
  console.log('Saved images to remotion-hero/src/images.json');
}

run();

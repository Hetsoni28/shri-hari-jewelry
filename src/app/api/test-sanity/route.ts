import { NextResponse } from 'next/server';
import { client } from '@/sanity/client';
import { productBySlugQuery } from '@/sanity/queries';

export async function GET() {
  const product = await client.fetch(productBySlugQuery, { slug: 'gold-necklaces' });
  return NextResponse.json({ product, projectId: 'Available in Sanity Studio' });
}

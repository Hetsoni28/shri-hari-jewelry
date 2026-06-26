import { NextResponse } from 'next/server';
import https from 'https';
import http from 'http';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'No url provided' }, { status: 400 });
  }

  try {
    const base64 = await new Promise<string>((resolve, reject) => {
      const client = url.startsWith('https') ? https : http;
      client.get(url, (res) => {
        if (res.statusCode && res.statusCode >= 300) {
          reject(new Error(`Failed to fetch: ${res.statusCode}`));
          return;
        }
        const data: Buffer[] = [];
        res.on('data', (chunk) => data.push(chunk));
        res.on('end', () => resolve(Buffer.concat(data).toString('base64')));
      }).on('error', reject);
    });

    const mimeType = url.toLowerCase().includes('.png') ? 'image/png' : 'image/jpeg';
    
    return NextResponse.json({ base64: `data:${mimeType};base64,${base64}` });
  } catch (error) {
    console.error('Image proxy error:', error);
    return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 });
  }
}

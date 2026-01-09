import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { TerminalData } from '@/lib/terminal-types';
import terminals from '@/data/terminals.json';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!slug) {
    return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
  }

  // CACHE-ONLY: Never call Google API live
  if (process.env.KV_REST_API_URL) {
    try {
      const [cached, photos] = await Promise.all([
        kv.get<TerminalData>(`terminal:${slug}`),
        kv.get<string[]>(`terminal-photos:${slug}`),
      ]);

      if (cached) {
        return NextResponse.json({
          ...cached,
          photos: photos || [],
          cached: true,
        });
      }
    } catch (err) {
      console.error('KV read error:', err);
    }
  }

  // Fallback: return basic terminal data from JSON (no Google data)
  const terminal = (terminals as Array<{ slug: string; name: string; city: string; lat: number; lon: number; operators?: string[] }>)
    .find(t => t.slug === slug);

  if (terminal) {
    return NextResponse.json({
      ...terminal,
      photos: [],
      cached: false,
      message: 'Basic data only - cache not populated yet',
    });
  }

  return NextResponse.json({ error: 'Terminal not found' }, { status: 404 });
}

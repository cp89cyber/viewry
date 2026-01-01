import { NextResponse } from 'next/server';

import { searchVideos } from '@/lib/youtube';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const q = searchParams.get('q');
  const page = searchParams.get('page') ?? 1;
  const limit = searchParams.get('limit') ?? 24;
  const type = searchParams.get('type') ?? 'video';

  if (!q) {
    return NextResponse.json({ error: 'Missing q' }, { status: 400 });
  }

  try {
    const data = await searchVideos({ query: q, page, limit, type });
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: e?.message || 'Search failed' },
      { status: 500 }
    );
  }
}

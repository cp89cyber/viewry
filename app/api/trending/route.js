import { NextResponse } from 'next/server';

import { getTrending } from '@/lib/youtube';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const tab = searchParams.get('tab') ?? undefined;
  const limit = searchParams.get('limit') ?? 24;

  try {
    const data = await getTrending({ tab, limit });
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: e?.message || 'Trending failed' },
      { status: 500 }
    );
  }
}

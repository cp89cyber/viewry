import { NextResponse } from 'next/server';

import { getVideo } from '@/lib/youtube';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_request, { params }) {
  const id = params?.id;

  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  try {
    const data = await getVideo(id);
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: e?.message || 'Video lookup failed' },
      { status: 500 }
    );
  }
}

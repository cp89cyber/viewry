import Link from 'next/link';

import VideoGrid from '@/components/VideoGrid';

import { searchVideos } from '@/lib/youtube';

export const dynamic = 'force-dynamic';

export default async function SearchPage({ searchParams }) {
  const query = typeof searchParams?.q === 'string' ? searchParams.q : '';
  const page = typeof searchParams?.page === 'string' ? searchParams.page : 1;

  if (!query) {
    return <p className="text-sm text-white/60">Search for something above.</p>;
  }

  let data;

  try {
    data = await searchVideos({ query, page, limit: 24, type: 'video' });
  } catch (e) {
    return (
      <div className="space-y-2">
        <h1 className="text-xl font-semibold">Search</h1>
        <p className="text-sm text-red-400">{e?.message || 'Search failed'}</p>
      </div>
    );
  }

  const prevPage = Number.parseInt(String(data.page), 10) - 1;
  const nextPage = Number.parseInt(String(data.page), 10) + 1;

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold">Results</h1>
        <div className="text-sm text-white/60">{query}</div>
      </div>

      <VideoGrid videos={data.videos} />

      <div className="flex items-center justify-center gap-2">
        {prevPage >= 1 ? (
          <Link
            href={`/search?q=${encodeURIComponent(query)}&page=${prevPage}`}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
          >
            Prev
          </Link>
        ) : null}

        {data.hasContinuation ? (
          <Link
            href={`/search?q=${encodeURIComponent(query)}&page=${nextPage}`}
            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90"
          >
            Next
          </Link>
        ) : null}
      </div>
    </div>
  );
}

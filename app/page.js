import VideoGrid from '@/components/VideoGrid';

import { getTrending } from '@/lib/youtube';

export const dynamic = 'force-dynamic';

const TABS = [
  { key: 'trending', label: 'Trending' },
  { key: 'music', label: 'Music' },
  { key: 'gaming', label: 'Gaming' },
  { key: 'news', label: 'News' },
  { key: 'shorts', label: 'Shorts' }
];

export default async function HomePage({ searchParams }) {
  const tab = typeof searchParams?.tab === 'string' ? searchParams.tab : undefined;
  const trending = await getTrending({ tab, limit: 24 });

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <h1 className="text-xl font-semibold">Browse</h1>
        <div className="text-sm text-white/60">{trending.title || 'Now'}</div>
      </div>

      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => {
          const active = (tab || 'trending') === t.key;
          return (
            <a
              key={t.key}
              href={t.key === 'trending' ? '/' : `/?tab=${encodeURIComponent(t.key)}`}
              className={
                active
                  ? 'rounded-full bg-white px-4 py-2 text-sm font-medium text-black'
                  : 'rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10'
              }
            >
              {t.label}
            </a>
          );
        })}
      </div>

      <VideoGrid videos={trending.videos} />
    </div>
  );
}

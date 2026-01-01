import VideoListItem from '@/components/VideoListItem';

import { getTrending, getVideo } from '@/lib/youtube';

export const dynamic = 'force-dynamic';

function formatNumber(n) {
  if (typeof n !== 'number') return null;
  try {
    return new Intl.NumberFormat().format(n);
  } catch {
    return String(n);
  }
}

export default async function WatchPage({ params }) {
  const id = params?.id;

  if (!id) {
    return <p className="text-sm text-white/60">Missing video id.</p>;
  }

  let video;
  try {
    video = await getVideo(id);
  } catch (e) {
    return (
      <div className="space-y-2">
        <h1 className="text-xl font-semibold">Watch</h1>
        <p className="text-sm text-red-400">{e?.message || 'Video lookup failed'}</p>
      </div>
    );
  }

  const trending = await getTrending({ limit: 10 }).catch(() => ({ videos: [] }));

  const views = formatNumber(video.viewCount);
  const likes = formatNumber(video.likeCount);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="space-y-4">
        <div className="aspect-video overflow-hidden rounded-lg bg-white/5">
          {video.embedUrl ? (
            <iframe
              className="h-full w-full"
              src={video.embedUrl}
              title={video.title || 'YouTube video'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : null}
        </div>

        <div className="space-y-2">
          <h1 className="text-lg font-semibold leading-snug">
            {video.title || 'Untitled'}
          </h1>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/70">
            {video.channel?.name ? (
              <a
                href={video.channel.url}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-white/80 hover:text-white"
              >
                {video.channel.name}
              </a>
            ) : null}

            {views ? <span>{views} views</span> : null}
            {likes ? <span>{likes} likes</span> : null}
          </div>
        </div>

        {video.description ? (
          <pre className="whitespace-pre-wrap rounded-lg bg-white/5 p-4 text-sm text-white/80">
            {video.description}
          </pre>
        ) : null}
      </div>

      <aside className="space-y-3">
        <div className="text-sm font-semibold text-white/80">Trending</div>
        <div className="space-y-2">
          {trending.videos.map((v) => (
            <VideoListItem key={v.id} video={v} />
          ))}
        </div>
      </aside>
    </div>
  );
}

import Image from 'next/image';
import Link from 'next/link';

const twoLineClamp = {
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden'
};

export default function VideoCard({ video }) {
  if (!video?.id) return null;

  const meta = [video.viewCount, video.published].filter(Boolean).join(' • ');

  return (
    <Link
      href={`/watch/${video.id}`}
      className="group block overflow-hidden rounded-lg"
    >
      <div className="relative overflow-hidden rounded-lg bg-white/5">
        {video.thumbnailUrl ? (
          <Image
            src={video.thumbnailUrl}
            alt=""
            width={640}
            height={360}
            className="h-auto w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
            sizes="(max-width: 1024px) 50vw, 33vw"
            priority={false}
          />
        ) : (
          <div className="aspect-video w-full bg-white/5" />
        )}

        {video.isLive ? (
          <div className="absolute bottom-2 left-2 rounded bg-red-600 px-2 py-1 text-xs font-semibold">
            LIVE
          </div>
        ) : video.duration ? (
          <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs font-medium">
            {video.duration}
          </div>
        ) : null}
      </div>

      <div className="mt-3 space-y-1">
        <div
          className="text-sm font-medium leading-5 text-white/90 group-hover:text-white"
          style={twoLineClamp}
        >
          {video.title || 'Untitled'}
        </div>

        <div className="truncate text-xs text-white/60">
          {video.channel?.name || 'Unknown channel'}
        </div>

        {meta ? <div className="truncate text-xs text-white/50">{meta}</div> : null}
      </div>
    </Link>
  );
}

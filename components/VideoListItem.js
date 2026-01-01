import Image from 'next/image';
import Link from 'next/link';

const twoLineClamp = {
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden'
};

export default function VideoListItem({ video }) {
  if (!video?.id) return null;

  return (
    <Link
      href={`/watch/${video.id}`}
      className="group grid grid-cols-[168px_minmax(0,1fr)] gap-3 rounded-lg p-2 hover:bg-white/5"
    >
      <div className="relative overflow-hidden rounded-md bg-white/5">
        {video.thumbnailUrl ? (
          <Image
            src={video.thumbnailUrl}
            alt=""
            width={336}
            height={189}
            className="h-auto w-full object-cover"
            sizes="168px"
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

      <div className="min-w-0 space-y-1">
        <div
          className="text-sm font-medium leading-5 text-white/90 group-hover:text-white"
          style={twoLineClamp}
        >
          {video.title || 'Untitled'}
        </div>
        <div className="truncate text-xs text-white/60">
          {video.channel?.name || 'Unknown channel'}
        </div>
      </div>
    </Link>
  );
}

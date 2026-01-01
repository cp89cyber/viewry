import VideoCard from '@/components/VideoCard';

export default function VideoGrid({ videos }) {
  if (!videos || videos.length === 0) {
    return <p className="text-sm text-white/60">No videos found.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}

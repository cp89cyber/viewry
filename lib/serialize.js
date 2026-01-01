export function normalizeUrl(url) {
  if (!url || typeof url !== 'string') return null;
  if (url.startsWith('//')) return `https:${url}`;
  return url;
}

export function pickLargestThumbnail(thumbnails) {
  if (!Array.isArray(thumbnails) || thumbnails.length === 0) return null;
  const t = thumbnails[thumbnails.length - 1];
  return normalizeUrl(t?.url);
}

export function normalizeVideoId(value) {
  if (!value) return null;

  if (typeof value === 'string') {
    const trimmed = value.trim();

    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;

    const match =
      trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/) ||
      trimmed.match(/\/embed\/([a-zA-Z0-9_-]{11})/) ||
      trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/) ||
      trimmed.match(/\/shorts\/([a-zA-Z0-9_-]{11})/) ||
      trimmed.match(/watch\?v=([a-zA-Z0-9_-]{11})/) ||
      trimmed.match(/^([a-zA-Z0-9_-]{11})[?&].*/);

    return match?.[1] || null;
  }

  if (typeof value === 'object') {
    return (
      normalizeVideoId(value.video_id) ||
      normalizeVideoId(value.videoId) ||
      normalizeVideoId(value.id) ||
      normalizeVideoId(value.url) ||
      normalizeVideoId(value?.endpoint?.payload?.videoId) ||
      normalizeVideoId(value?.endpoint?.payload?.video_id) ||
      normalizeVideoId(value?.watch_endpoint?.video_id) ||
      null
    );
  }

  return normalizeVideoId(String(value));
}

export function serializeAuthor(author) {
  if (!author) return null;

  const thumbnailUrl =
    normalizeUrl(author.best_thumbnail?.url) || pickLargestThumbnail(author.thumbnails);

  return {
    id: author.id || null,
    name: author.name || author.toString?.() || null,
    url: normalizeUrl(author.url),
    thumbnailUrl
  };
}

export function serializeVideoNode(video) {
  if (!video) return null;

  const id =
    normalizeVideoId(video.video_id) ||
    normalizeVideoId(video.id) ||
    normalizeVideoId(video.url) ||
    null;
  const title = video.title?.toString?.() ?? video.title ?? '';

  const thumbnailUrl =
    normalizeUrl(video.best_thumbnail?.url) ||
    pickLargestThumbnail(video.thumbnails) ||
    pickLargestThumbnail(video.thumbnail);

  const channel = serializeAuthor(video.author);

  const duration = video.duration?.text || video.length_text?.toString?.() || null;
  const viewCount =
    video.short_view_count?.toString?.() || video.view_count?.toString?.() || null;
  const published = video.published?.toString?.() || null;

  const isLive = Boolean(video.is_live);

  return {
    id,
    title,
    thumbnailUrl,
    channel,
    duration,
    viewCount,
    published,
    isLive
  };
}

export function serializeVideoInfo(info, fallbackId) {
  const basic = info?.basic_info || {};
  const id = normalizeVideoId(basic.id) || normalizeVideoId(fallbackId) || null;

  const thumbnails = Array.isArray(basic.thumbnail) ? basic.thumbnail : [];

  return {
    id,
    title: basic.title || null,
    channel: basic.channel || null,
    viewCount: basic.view_count ?? null,
    likeCount: basic.like_count ?? null,
    description: basic.short_description || null,
    thumbnails: thumbnails
      .map((t) => ({
        url: normalizeUrl(t.url),
        width: t.width,
        height: t.height
      }))
      .filter((t) => Boolean(t.url)),
    duration: basic.duration ?? null,
    isLive: Boolean(basic.is_live),
    embedUrl: id ? `https://www.youtube.com/embed/${id}` : null
  };
}

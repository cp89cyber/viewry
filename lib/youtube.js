import { getYT } from '@/lib/yt';
import { serializeVideoInfo, serializeVideoNode } from '@/lib/serialize';

function clampInt(value, min, max, fallback) {
  const n = Number.parseInt(String(value ?? ''), 10);
  if (Number.isNaN(n)) return fallback;
  return Math.max(min, Math.min(max, n));
}

export async function searchVideos({ query, page = 1, limit = 24, type = 'video' }) {
  const safePage = clampInt(page, 1, 50, 1);
  const safeLimit = clampInt(limit, 1, 50, 24);

  const yt = await getYT();

  let result = await yt.search(query, { type });

  for (let i = 1; i < safePage; i += 1) {
    if (!result.has_continuation) break;
    result = await result.getContinuation();
  }

  const videos = result.videos
    .slice(0, safeLimit)
    .map(serializeVideoNode)
    .filter(Boolean);

  return {
    query,
    page: safePage,
    hasContinuation: result.has_continuation,
    videos
  };
}

export async function getTrending({ tab, limit = 24 }) {
  const safeLimit = clampInt(limit, 1, 50, 24);
  const yt = await getYT();

  try {
    let feed = await yt.getTrending();
    if (tab) {
      feed = await feed.getTabByName(tab);
    }

    const videos = feed.videos
      .slice(0, safeLimit)
      .map(serializeVideoNode)
      .filter(Boolean);

    return {
      title: feed.title || null,
      tabs: feed.tabs,
      videos
    };
  } catch {
    const tag = tab ? String(tab).replace(/^#/, '') : 'trending';
    const feed = await yt.getHashtag(tag);

    const videos = feed.videos
      .slice(0, safeLimit)
      .map(serializeVideoNode)
      .filter(Boolean);

    return {
      title: `#${tag}`,
      tabs: [],
      videos
    };
  }
}

export async function getVideo(id) {
  const yt = await getYT();
  const info = await yt.getBasicInfo(id);
  return serializeVideoInfo(info, id);
}

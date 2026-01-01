import { Innertube, Log, UniversalCache } from 'youtubei.js';

const globalForYT = globalThis;

if (!globalForYT.__viewry_yt_promise) {
  Log.setLevel(Log.Level.ERROR);
  globalForYT.__viewry_yt_promise = Innertube.create({
    cache: new UniversalCache(true, './.cache'),
    retrieve_player: false
  });
}

export function getYT() {
  return globalForYT.__viewry_yt_promise;
}

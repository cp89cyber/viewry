'use client';

import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get('q') || '';

  const [query, setQuery] = useState(current);

  useEffect(() => {
    setQuery(current);
  }, [current]);

  function onSubmit(e) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <form onSubmit={onSubmit} className="flex items-center gap-2">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          className="w-full rounded-full border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-sm text-white placeholder:text-white/40 outline-none ring-offset-0 focus:border-white/20 focus:bg-white/10"
        />
      </div>
      <button
        type="submit"
        className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90"
      >
        Search
      </button>
    </form>
  );
}

import Link from 'next/link';

import { PlaySquare } from 'lucide-react';

import SearchBar from '@/components/SearchBar';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-neutral-950/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <PlaySquare className="h-6 w-6 text-red-500" />
          <span>Viewry</span>
        </Link>
        <div className="flex-1">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}

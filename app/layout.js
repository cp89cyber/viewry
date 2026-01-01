import './globals.css';

import Header from '@/components/Header';

export const metadata = {
  title: 'Viewry',
  description: 'Alternative YouTube website'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className="min-h-dvh bg-neutral-950 text-neutral-50">
          <Header />
          <main className="mx-auto w-full max-w-6xl px-4 py-6">{children}</main>
        </div>
      </body>
    </html>
  );
}

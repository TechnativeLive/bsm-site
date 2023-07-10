import './globals.css';

import { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { figtree, audiowide, saira } from '@/fonts';

export const metadata: Metadata = {
  title: { default: 'British Supermoto', template: '%s | British Supermoto' },
  // TODO: Better description
  description:
    'All things British Supermoto - Event details, news, live championship scores and more',

  themeColor: '#002550',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body
        className={`font-sans ${figtree.variable} ${audiowide.variable} ${saira.variable} overflow-y-scroll scrollbar-thin scrollbar-track-zinc-100 scrollbar-thumb-zinc-400`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}

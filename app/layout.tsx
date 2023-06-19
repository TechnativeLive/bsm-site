import './globals.css';

import { Audiowide, Figtree, Saira } from 'next/font/google';
import { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';

// TODO: Optimise loaded font subsets etc.
// https://nextjs.org/docs/app/building-your-application/optimizing/fonts
// https://tailwindcss.com/blog/tailwindcss-v3-3#configure-font-variation-settings-for-custom-font-families
const figtree = Figtree({ variable: '--font-sans', subsets: ['latin'], display: 'swap' });
const audiowide = Audiowide({
  variable: '--font-display',
  weight: '400',
  subsets: ['latin'],
  display: 'block',
});
const saira = Saira({ variable: '--font-numeric', subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: { default: 'British Supermoto', template: '%s | British Supermoto' },
  // TODO: Better description
  description: 'All things Supermoto - Event details, news, live scores and more',
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

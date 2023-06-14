import { Header } from '@/app/(home)/layout';
import { Footer } from '@/components/footer/footer';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main className='flex grow flex-col items-center justify-center bg-slate-100'>
        <div className='mb-12 bg-gradient-to-b from-slate-400 to-slate-200 bg-clip-text text-7xl text-transparent'>
          404
        </div>
        <div className='flex flex-col'>
          <h1 className='mb-2 text-lg text-slate-600'>
            Sorry, we couldn&apos;t find that article.
          </h1>
          <Link href='/latest'>
            <div className='flex items-center text-xl font-medium text-black'>
              View all Articles
            </div>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

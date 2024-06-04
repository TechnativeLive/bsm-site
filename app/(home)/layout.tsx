import clsx from 'clsx';
import { BannerSeparator, HomeLogo } from '@/components/logos/main';
import { Footer } from '@/components/footer/footer';
import { containerRow } from '@/components/tailwind';
import { Suspense } from 'react';
import { MobileNav } from '@/components/nav/client';
import { MainNav } from '@/components/nav/main';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main className='flex grow flex-col'>{children}</main>
      <Footer />
    </div>
  );
}

export function Header() {
  return (
    <header className='sticky top-0 z-40 w-full max-w-[100vw] border-b border-slate-300 bg-white'>
      <div className={clsx(containerRow, 'items-center')}>
        <HomeLogo priority className='z-20 -ml-5 -mr-2 grow py-2 pr-1 xs:ml-0 xs:mr-0' />
        <div
          // style={{ height: 'clamp(53px, 8vw, 81px)' }}
          className={clsx(
            'relative z-10 h-[81px]',
            // 'after:absolute after:left-full after:top-0 after:z-0 after:h-full after:w-screen after:bg-white',
            'before:absolute before:right-full before:top-0 before:z-0 before:h-full before:w-screen before:border-b-2 before:border-secondary before:bg-primary'
          )}
        >
          <BannerSeparator />
        </div>
        <MainNav />
        <Suspense>
          <MobileNav />
        </Suspense>
      </div>
    </header>
  );
}

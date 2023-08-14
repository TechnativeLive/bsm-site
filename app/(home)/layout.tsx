import clsx from 'clsx';
import { BannerSeparator, HomeLogo } from '@/components/logos/main';
import { Footer } from '@/components/footer/footer';
import { containerRow } from '@/components/tailwind';
import { Suspense } from 'react';
import { MainNavLink, MobileNav } from '@/components/nav/nav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main className='flex flex-col'>{children}</main>
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
        <nav className='z-10 -mr-2 hidden shrink-0 grow items-center justify-end gap-2 font-bold uppercase md:flex lg:gap-6'>
          <MainNavLink href='/latest'>Latest</MainNavLink> {/* Article feed */}
          {/* <MainNavLink href="/teams">Teams & Drivers</MainNavLink> */}
          <MainNavLink href='/results'>Results</MainNavLink>
          <MainNavLink href='/teams'>Teams</MainNavLink>
          {/* <MainNavLink href='/calendar'>Calendar</MainNavLink> */}
          <MainNavLink
            href='https://speedhive.mylaps.com/Organizations/19155'
            target='_blank'
            className='gap-1'
          >
            Live Timing <span className='i-ic-baseline-launch mb-0.5 inline-block' />
          </MainNavLink>
          <MainNavLink href='/about'>About BSM</MainNavLink>
          {/* Includes rules and regs, rider entry */}
        </nav>
        <Suspense>
          <MobileNav />
        </Suspense>
      </div>
    </header>
  );
}

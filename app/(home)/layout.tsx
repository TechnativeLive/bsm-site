import clsx from 'clsx';
import { BannerSeparator, HomeLogo } from '@/components/logos/main';
import { Footer } from '@/components/footer/footer';
import { MainNavLink, MobileNav, MobileNavLink } from '@/components/nav/client-components';
import { containerRow } from '@/components/tailwind';
import { Suspense } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen flex-col overflow-x-hidden'>
      <header className='sticky top-0 z-40 w-full border-b border-slate-300'>
        <div className={clsx(containerRow, 'items-center')}>
          <HomeLogo priority className='z-10 grow basis-[40%] py-2 pr-1' />
          <div
            // style={{ height: 'clamp(53px, 8vw, 81px)' }}
            className={clsx(
              'relative h-[81px]',
              'after:absolute after:left-full after:top-0 after:z-0 after:h-full after:w-screen after:bg-white',
              'before:absolute before:right-full before:top-0 before:z-0 before:h-full before:w-screen before:border-b-2 before:border-secondary before:bg-primary'
            )}
          >
            <BannerSeparator />
          </div>
          <nav className='z-10 -mr-2 hidden shrink-0 grow basis-[60%] items-center justify-end gap-2 font-bold uppercase md:flex lg:gap-6'>
            <MainNavLink href='/latest'>Latest</MainNavLink> {/* Article feed */}
            {/* <MainNavLink href="/teams">Teams & Drivers</MainNavLink> */}
            <MainNavLink href='/results'>Results</MainNavLink>
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
      <main className='flex flex-col'>{children}</main>
      <Footer />
    </div>
  );
}

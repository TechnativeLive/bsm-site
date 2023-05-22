import { Footer } from '@/components/footer';
import { BannerSeparator, HomeLogo } from '@/components/logos/main';
import { MainNavLink } from '@/components/main-nav-link';
import { containerRow } from '@/components/tailwind';
import clsx from 'clsx';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen flex-col'>
      <header className='sticky top-0 z-40 w-full overflow-hidden border-b border-slate-300'>
        <div className={clsx(containerRow, 'items-center justify-between')}>
          <HomeLogo priority />
          <div
            className={clsx(
              'relative h-full',
              'after:absolute after:left-full after:top-0 after:z-0 after:h-full after:w-screen after:bg-white',
              'before:absolute before:right-full before:top-0 before:z-0 before:h-full before:w-screen before:border-b-2 before:border-secondary before:bg-primary'
            )}
          >
            <BannerSeparator />
          </div>
          <nav className='-mr-2 flex items-center gap-2 font-bold uppercase lg:gap-6'>
            <MainNavLink href='/latest'>Latest</MainNavLink> {/* Article feed */}
            {/* <MainNavLink href="/teams">Teams & Drivers</MainNavLink> */}
            <MainNavLink href='/results'>Results</MainNavLink>
            <MainNavLink href='/calendar'>Calendar</MainNavLink>
            <MainNavLink href='/live'>Live Timing</MainNavLink>
            <MainNavLink href='/about'>About BSM</MainNavLink>{' '}
            {/* Includes rules and regs, rider entry */}
          </nav>
        </div>
      </header>
      <main className='flex flex-col'>{children}</main>
      <Footer />
    </div>
  );
}

import clsx from 'clsx';
import { BannerSeparator, HomeLogo } from '@/components/logos/main';
import { Footer } from '@/components/footer/footer';
import { MainNavLink, MobileNavLink } from '@/components/nav/client-components';
import { containerRow } from '@/components/tailwind';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen flex-col'>
      <header className='sticky top-0 z-40 w-full border-b border-slate-300'>
        <div className={clsx(containerRow, 'items-center overflow-hidden')}>
          <HomeLogo priority className='z-10 min-w-[8rem] grow basis-[40%] py-4 pr-1' />
          <div
            className={clsx(
              'relative h-[82px]',
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
          <div className='z-10 -mr-2 flex grow basis-full items-center justify-end gap-2 font-bold uppercase text-black md:hidden lg:gap-6'>
            <input type='checkbox' id='nav-menu' className='modal peer absolute h-0 w-0' />
            <label
              htmlFor='nav-menu'
              className='rounded [&>div]:i-basil-menu-solid peer-checked:[&>div]:i-basil-cancel-outline hover:bg-slate-200'
            >
              <span className='sr-only'>Open nevigation menu</span>
              <div />
            </label>
            <nav className='fixed inset-0 top-[82px] z-40 hidden bg-white p-4 shadow-lg peer-checked:block md:!hidden'>
              <div className='ml-auto flex w-fit flex-col gap-2'>
                <MobileNavLink href='/latest'>Latest</MobileNavLink> {/* Article feed */}
                {/* <MobileNavLink href="/teams">Teams & Drivers</MobileNavLink> */}
                <MobileNavLink href='/results'>Results</MobileNavLink>
                {/* <MobileNavLink href='/calendar'>Calendar</MobileNavLink> */}
                <MobileNavLink
                  href='https://speedhive.mylaps.com/Organizations/19155'
                  target='_blank'
                  className='gap-1'
                >
                  Live Timing <span className='i-ic-baseline-launch mb-0.5 inline-block' />
                </MobileNavLink>
                <MobileNavLink href='/about'>About BSM</MobileNavLink>
                {/* Includes rules and regs, rider entry */}
              </div>
            </nav>
          </div>
        </div>
      </header>
      <main className='flex flex-col'>{children}</main>
      <Footer />
    </div>
  );
}

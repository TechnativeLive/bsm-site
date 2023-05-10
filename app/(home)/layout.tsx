import { MainNavLink } from '@/components/main-nav-link';
import { container, containerRow } from '@/components/tailwind';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

const HomeLogo = () => (
  <Link href={'/'} className='z-10 py-4 pr-4'>
    <Image priority src='/logo.svg' width={182} height={48} alt='BSM Logo' />
  </Link>
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen flex-col'>
      <header className='sticky top-0 z-20 w-full overflow-hidden'>
        <div className={clsx(containerRow, 'items-center justify-between')}>
          <HomeLogo />
          <div
            className={clsx(
              'relative h-full',
              'after:absolute after:left-full after:top-0 after:z-0 after:h-full after:w-screen after:bg-white',
              'before:absolute before:right-full before:top-0 before:z-0 before:h-full before:w-screen before:border-b-2 before:border-secondary before:bg-primary'
            )}
          >
            <svg
              className='relative z-10'
              width='110'
              height='82'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M0 0h110v82H0V0Z' fill='#fff' />
              <path
                d='M73 26.67h22.63a5.45 5.45 0 0 0 5.27-4.02L107 0H84.37a5.45 5.45 0 0 0-5.27 4.02L73 26.67ZM66.9 49.31 73 26.67H46.19L39 53.33h22.63a5.45 5.45 0 0 0 5.27-4.02Z'
                fill='#002550'
              />
              <path
                d='M19.37 26.67H46.2L53.37 0H0v80h27.63a5.45 5.45 0 0 0 5.27-4.02L39 53.33H16.37a5.45 5.45 0 0 0-5.27 4.02l8.27-30.68Z'
                fill='#002550'
              />
              <path
                d='M27.63 80a5.45 5.45 0 0 0 5.27-4.02L39 53.33h22.63a5.45 5.45 0 0 0 5.27-4.02L73 26.67h22.63a5.45 5.45 0 0 0 5.27-4.02L107 0h2.07l-6.24 23.17a7.45 7.45 0 0 1-7.2 5.5h-21.1l-5.7 21.16a7.45 7.45 0 0 1-7.2 5.5h-21.1l-5.7 21.17a7.45 7.45 0 0 1-7.2 5.5H0v-2h27.63Z'
                fill='#FFED00'
              />
            </svg>
          </div>
          <nav className='-mr-2 flex gap-6 font-bold uppercase'>
            <MainNavLink href='/latest'>Latest</MainNavLink> {/* Article feed */}
            {/* <MainNavLink href="/teams">Teams & Drivers</MainNavLink> */}
            <MainNavLink href='/calendar'>Calendar</MainNavLink>
            <MainNavLink href='/results'>Results</MainNavLink>
            <MainNavLink href='/live'>Live Timing</MainNavLink>
            <MainNavLink href='/about'>About BSM</MainNavLink>{' '}
            {/* Includes rules and regs, rider entry */}
          </nav>
        </div>
      </header>
      <main className='flex flex-col'>{children}</main>
      <footer className='mt-auto w-full bg-primary py-6 text-white'>
        <div className={clsx(container, 'gap-6')}>
          <div className='flex gap-6 text-sm font-medium uppercase'>
            <div>T & C</div>
            <div>Cookie Policy</div>
            <div>Privacy Notice</div>
            <div>Contact Us</div>
            <div className='ml-auto flex gap-4'>
              <div>Insta</div>
              <div>FB</div>
            </div>
          </div>
          <div className='flex flex-col items-center'>
            <div>PARTNERS</div>
            <div className='flex'>
              <div>sponsor 1</div>
              <div>sponsor 2</div>
              <div>sponsor 3</div>
            </div>
          </div>
          <div className='flex w-full items-center justify-between'>
            <HomeLogo />
            <div className='text-xs'>© 2023 TNL Sports</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

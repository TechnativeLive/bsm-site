import { container, containerRow } from '@/components/tailwind';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

const HomeLogo = () => (
  <Link href={'/'} className='py-4 pr-4'>
    <Image priority src='/logo.svg' width={182} height={48} alt='BSM Logo' />
  </Link>
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen flex-col'>
      <header className='w-full border-b-2 border-secondary bg-primary text-white'>
        <div className={clsx(containerRow, 'items-center')}>
          <HomeLogo />
          <nav className='flex gap-4'>
            <Link href='/latest'>Latest</Link> {/* Article feed */}
            {/* <Link href="/teams">Teams & Drivers</Link> */}
            <Link href='/calendar'>Calendar</Link>
            <Link href='/results'>Results</Link>
            <Link href='/live'>Live Timing</Link>
            <Link href='/about'>About BSM</Link> {/* Includes rules and regs, rider entry */}
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

'use client';
import { linkHighlight } from '@/components/tailwind';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useCallback } from 'react';

type LinkProps = React.ComponentProps<typeof Link>;

export const MainNavLink = ({ className, ...props }: LinkProps) => {
  const pathname = usePathname();
  const hrefStr = typeof props.href === 'string' ? props.href : props.href.href;
  const isActive = !!hrefStr && pathname.startsWith(hrefStr);

  return (
    <Link
      className={clsx(
        className,
        'flex min-w-min items-center whitespace-nowrap',
        linkHighlight,
        isActive && 'text-primary-600'
      )}
      {...props}
    />
  );
};

export const MobileNavLink = ({ className, ...props }: LinkProps) => {
  const pathname = usePathname();
  const hrefStr = typeof props.href === 'string' ? props.href : props.href.href;
  const isActive = !!hrefStr && pathname.startsWith(hrefStr);

  return (
    <Link
      className={clsx(
        className,
        'relative flex items-center bg-primary px-3 py-2 font-semibold uppercase text-white after:corner-3 after:corner-white',
        isActive && 'text-primary-600'
      )}
      {...props}
    />
  );
};

export const MobileNav = () => {
  const ref = useRef<HTMLInputElement>(null);
  const close = useCallback(() => ref.current && (ref.current.checked = false), [ref]);

  return (
    <div className='z-10 -mr-2 ml-7 flex grow items-center justify-end gap-2 font-bold uppercase text-black md:hidden lg:gap-6'>
      <input ref={ref} type='checkbox' id='nav-menu' className='modal peer absolute h-0 w-0' />
      <label
        htmlFor='nav-menu'
        className='rounded [&>div]:i-basil-menu-solid peer-checked:[&>div]:i-basil-cancel-outline hover:bg-slate-200'
      >
        <span className='sr-only'>Open nevigation menu</span>
        <div />
      </label>
      <nav
        // style={{ top: 'clamp(53px, 8vw, 81px)' }}
        className='fixed left-0 right-0 top-[81px] z-40 hidden bg-white p-4 shadow-lg peer-checked:block md:!hidden'
      >
        <div className='mb-6 ml-auto flex w-fit flex-col gap-2'>
          <MobileNavLink onClick={close} href='/latest'>
            Latest
          </MobileNavLink>{' '}
          {/* Article feed */}
          {/* <MobileNavLink href="/teams">Teams & Drivers</MobileNavLink> */}
          <MobileNavLink onClick={close} href='/results'>
            Results
          </MobileNavLink>
          {/* <MobileNavLink href='/calendar'>Calendar</MobileNavLink> */}
          <MobileNavLink
            onClick={close}
            href='https://speedhive.mylaps.com/Organizations/19155'
            target='_blank'
            className='gap-1'
          >
            Live Timing <span className='i-ic-baseline-launch mb-0.5 inline-block' />
          </MobileNavLink>
          <MobileNavLink onClick={close} href='/about'>
            About BSM
          </MobileNavLink>
          {/* Includes rules and regs, rider entry */}
        </div>
      </nav>
      <div
        onClick={close}
        className='fixed bottom-0 left-0 right-0 top-[81px] z-30 hidden bg-slate-900/25 peer-checked:block md:!hidden'
      />
    </div>
  );
};

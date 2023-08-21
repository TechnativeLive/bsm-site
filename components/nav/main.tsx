import { MainNavLink } from '@/components/nav/client';

export function MainNav() {
  return (
    <nav className='z-10 -mr-2 hidden shrink-0 grow items-center justify-end gap-2 font-bold uppercase lg:flex lg:gap-6'>
      <MainNavLink href='/latest'>Latest</MainNavLink> {/* Article feed */}
      {/* <MainNavLink href="/teams">Teams & Drivers</MainNavLink> */}
      <MainNavLink href='/results'>Results</MainNavLink>
      <MainNavLink href='/teams'>Teams</MainNavLink>
      <MainNavLink href='/riders'>Riders</MainNavLink>
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
  );
}

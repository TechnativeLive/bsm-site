import { HomeLogo } from '@/components/logos/main';
import { container } from '@/components/tailwind';
import clsx from 'clsx';
import Link from 'next/link';

type FooterLink = { label: string; href: string; icon?: string };
// const footerLinks: FooterLink[][] = [
//   [
//     { label: 'Latest News', href: '/latest' },
//     { label: 'Results', href: '/results' },
//     { label: 'Calendar', href: '/calendar' },
//     { label: 'Live Timing', href: '/live' },
//     { label: 'About BSM', href: '/about' },
//   ],
//   [
//     { label: 'Contact Us', href: 'mailto:info@britishsupermoto.com' },
//     { label: 'Rules & Regs', href: '/rules' },
//   ],
//   [
//     {
//       label: 'Instagram',
//       href: 'https://www.instagram.com/british_supermoto/',
//       icon: 'i-basil-instagram-outline',
//     },
//   ],
// ];

const footerLinks: FooterLink[][] = [
  [
    { label: 'Contact Us', href: 'mailto:info@britishsupermoto.com' },
    { label: 'Rules & Regs', href: '/rules' },
  ],
  [
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/british_supermoto/',
      icon: 'i-basil-instagram-outline',
    },
  ],
];

export const Footer = () => (
  <footer className='mt-auto w-full bg-primary py-6 text-white'>
    <div className={clsx(container, 'gap-6')}>
      <div className='flex items-center gap-12 border-b border-primary-500 pb-2 text-sm font-medium uppercase'>
        {footerLinks.map((group, i) => (
          <div key={i} className='flex justify-start gap-6 last:grow last:justify-end'>
            {group.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                aria-label={item.icon ? item.label : undefined}
                className={clsx(
                  item.icon,
                  item.icon
                    ? 'hover:text-secondary'
                    : 'border-b-2 border-transparent hover:border-secondary',
                  'inline-block'
                )}
              >
                {item.icon ? undefined : item.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className='flex flex-col items-center'>
        <div className='font-display text-xl'>OUR PARTNERS</div>
        <div className='flex gap-6'>
          <div>sponsor</div>
          <div>sponsor</div>
          <div>sponsor</div>
        </div>
      </div>
      <div className='flex w-full items-center justify-between'>
        <HomeLogo />
        <div className='text-xs'>© 2023 TNL Sports</div>
      </div>
    </div>
  </footer>
);

import Image from 'next/image';
import Link from 'next/link';

export const HomeLogo = ({ priority, className }: { className?: string; priority?: boolean }) => (
  <Link href={'/'} className={className}>
    <Image priority={priority} src='/logo.svg' width={182} height={48} alt='BSM Logo' />
  </Link>
);

export const BannerSeparator = () => (
  <svg
    className='relative z-10'
    height='100%'
    viewBox='0 0 110 82'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    preserveAspectRatio='xMinYMin'
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
);

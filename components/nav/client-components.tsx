'use client';
import { linkHighlight } from '@/components/tailwind';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

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

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
      className={clsx(className, 'min-w-min', linkHighlight, isActive && 'text-primary-600')}
      {...props}
    />
  );
};

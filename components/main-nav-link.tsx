import clsx from 'clsx';
import Link from 'next/link';

type LinkProps = React.ComponentProps<typeof Link>;

export const MainNavLink = ({ className, ...props }: LinkProps) => (
  <Link
    className={clsx(
      className,
      'relative overflow-hidden px-2 py-1',
      'after:absolute after:left-2 after:right-2 after:top-full after:h-1 after:bg-primary-500',
      'after:transition-transform after:ease-slide hover:after:-translate-y-full'
    )}
    {...props}
  />
);

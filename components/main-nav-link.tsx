import { linkHighlight } from '@/components/tailwind';
import clsx from 'clsx';
import Link from 'next/link';

type LinkProps = React.ComponentProps<typeof Link>;

export const MainNavLink = ({ className, ...props }: LinkProps) => (
  <Link className={clsx(className, 'min-w-min', linkHighlight)} {...props} />
);

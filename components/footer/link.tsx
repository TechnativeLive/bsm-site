'use client';

import clsx from 'clsx';
import { Url } from 'next/dist/shared/lib/router/router';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HTMLAttributeAnchorTarget } from 'react';

export const FooterActiveLink = ({
  href,
  children,
  target,
}: {
  href: Url;
  children: React.ReactNode;
  target?: HTMLAttributeAnchorTarget;
}) => {
  const pathname = usePathname();
  const hrefStr = typeof href === 'string' ? href : href.href;
  const isActive = !!hrefStr && pathname.startsWith(hrefStr);

  return (
    <Link
      target={target}
      href={href}
      className={clsx(
        'inline-block border-b-2 border-transparent hover:border-secondary',
        isActive && 'text-secondary'
      )}
    >
      {children}
    </Link>
  );
};

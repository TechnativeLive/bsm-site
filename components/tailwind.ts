import clsx from 'clsx';

export const containerRow = clsx('mx-auto flex max-w-7xl px-4 md:px-8');
export const container = clsx(containerRow, 'flex-col');

export const linkHighlight = clsx(
  'relative overflow-hidden px-2 py-1 text-center',
  'after:absolute after:left-2 after:right-2 after:top-full after:h-1 after:bg-primary-500',
  'after:transition-transform after:ease-slide hover:after:-translate-y-full'
);

export const tag =
  'relative border-l border-t border-primary px-4 py-1 md:py-2 text-sm font-bold uppercase text-primary after:corner-2 after:corner-primary hover:border-primary-600 hover:text-primary-600 hover:after:corner-primary-600';

export const tagTopLeft =
  'relative border-r border-b border-primary px-4 py-1 md:py-2 text-sm font-bold uppercase text-primary after:corner-tl-2 after:corner-primary hover:border-primary-600 hover:text-primary-600 hover:after:corner-primary-600';

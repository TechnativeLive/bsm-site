import clsx from 'clsx';

export const containerRow = clsx('mx-auto flex max-w-7xl px-8');
export const container = clsx(containerRow, 'flex-col');

export const linkHighlight = clsx(
  'relative overflow-hidden px-2 py-1 text-center',
  'after:absolute after:left-2 after:right-2 after:top-full after:h-1 after:bg-primary-500',
  'after:transition-transform after:ease-slide hover:after:-translate-y-full'
);

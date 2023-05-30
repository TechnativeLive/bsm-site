import clsx from 'clsx';

export const containerRow = clsx('mx-auto flex max-w-7xl px-8');
export const container = clsx(containerRow, 'flex-col');

export const linkHighlight = clsx(
  'relative overflow-hidden px-2 py-1 text-center',
  'after:absolute after:left-2 after:right-2 after:top-full after:h-1 after:bg-primary-500',
  'after:transition-transform after:ease-slide hover:after:-translate-y-full'
);

export const tag = clsx(
  'text-sm uppercase border bg-slate-200 border-slate-300 hover:border-slate-400 px-2 rounded-full'
);

export const tagPrimary = clsx(
  'text-sm uppercase border px-2 rounded-full',
  'border-primary-800 bg-primary-900 text-slate-200 hover:text-secondary'
);
export const tagSecondary = clsx(
  tag,
  'border-secondary-500 bg-secondary-100 hover:border-secondary-600 hover:bg-secondary-200'
);

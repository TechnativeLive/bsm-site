import { GetAttributesValues } from '@strapi/strapi';
import { classed } from '@tw-classed/react';
import Link from 'next/link';

type CallToActionProps = GetAttributesValues<'blocks.cta'>;

export function CallToAction({ heading, label, link, theme }: CallToActionProps) {
  return (
    <div className='not-prose relative flex w-full max-w-7xl'>
      <CTA href='iroeje' theme={theme}>
        {heading && <h3 className='text-lg font-bold tracking-wider'>{heading}</h3>}
        <div>{label}</div>
      </CTA>
    </div>
  );
}

const CTA = classed(
  Link,
  `px-4 pt-1 block mx-6 my-2 rounded-br-xl rounded-tl-xl rounded-md min-w-[20rem] pb-2 relative overflow-hidden
  after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1
  after:-translate-x-full after:hover:translate-x-0 after:transition-transform after:ease-slide`,
  {
    variants: {
      theme: {
        primary: 'bg-primary text-secondary-500 after:bg-secondary-500',
        secondary: 'bg-orange-400 text-slate-800 after:bg-secondary-400',
        neutral: 'bg-slate-800 to-black text-slate-300 after:bg-primary-400',
      },
    },
    defaultVariants: {
      theme: 'primary',
    },
  }
);

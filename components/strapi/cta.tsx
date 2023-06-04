import { GetAttributesValues } from '@strapi/strapi';
import { classed } from '@tw-classed/react';
import Link from 'next/link';

type CallToActionProps = GetAttributesValues<'blocks.cta'>;

export function CallToAction(props: CallToActionProps) {
  return (
    <div className='not-prose relative mt-4 flex p-2'>
      <div className='bg-pattern absolute inset-0 bottom-5' />
      {props.link?.url ? (
        <CtaLink
          href={props.link.url}
          theme={props.link.theme}
          target={props.link.isExternal ? '_blank' : undefined}
        >
          <CallToActionContents {...props} />
        </CtaLink>
      ) : (
        <Cta theme={props?.link?.theme}>
          <CallToActionContents {...props} />
        </Cta>
      )}
    </div>
  );
}

function CallToActionContents({ heading, link }: CallToActionProps) {
  return (
    <>
      <CtaTransitionBackground theme={link?.theme} />
      <div className='mr-4 flex flex-col'>
        <div>{heading}</div>
        {link && <div className={heading ? 'font-normal' : undefined}>{link?.label}</div>}
      </div>
      <span className='i-ic-twotone-keyboard-arrow-right z-20 -mx-1 inline-block shrink-0 transition-transform duration-700 ease-slide group-hover:translate-x-1' />{' '}
      <span className='i-ic-twotone-keyboard-arrow-right z-20 -mx-1 inline-block shrink-0 transition-transform duration-500 ease-slide group-hover:translate-x-3' />{' '}
      <span className='i-ic-twotone-keyboard-arrow-right z-20 -mx-1 inline-block shrink-0 transition-transform duration-300 ease-slide group-hover:translate-x-5' />{' '}
    </>
  );
}

const Cta = classed.div(
  `group relative inline-flex items-center self-start py-1 pl-4 pr-3 
   text-sm font-extrabold uppercase transition-colors duration-300 ease-slide`,
  {
    variants: {
      theme: {
        primary: 'bg-primary-500 hover:bg-primary hover:text-primary-500 text-white',
        secondary: 'bg-secondary-500 hover:bg-primary hover:text-secondary text-primary',
        neutral: 'bg-slate-900 hover:text-secondary text-white',
      },
    },
    defaultVariants: { theme: 'neutral' },
  }
);

const CtaTransitionBackground = classed.div(
  'absolute left-full z-10 h-full w-5 -translate-x-full transition-all duration-300 ease-slide after:corner-3 group-hover:translate-x-0',
  {
    variants: {
      theme: {
        primary: 'bg-primary-500 group-hover:bg-primary',
        secondary: 'bg-secondary-500 group-hover:bg-primary',
        neutral: 'bg-slate-900',
      },
    },
    defaultVariants: { theme: 'neutral' },
  }
);

const CtaLink = classed(Link, Cta);

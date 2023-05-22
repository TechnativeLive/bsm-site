import { FeedPrimaryArticle } from '@/components/latest/feed/primary';
import { FeedSecondaryArticle } from '@/components/latest/feed/secondary';
import { container } from '@/components/tailwind';
import clsx from 'clsx';
import Link from 'next/link';

export const LatestFeed = () => (
  <div className={clsx(container, 'p-8')}>
    <div className='grid gap-12 md:grid-cols-[3fr,2fr]'>
      <article className='pt-2' aria-label='Featured Story'>
        <FeedPrimaryArticle />
      </article>
      <aside className='flex flex-col gap-4' aria-label='News Feed'>
        <FeedSecondaryArticle />
        <FeedSecondaryArticle />
        <FeedSecondaryArticle />
      </aside>
    </div>
    <Link
      href='/latest'
      className={clsx(
        'group relative flex items-center self-start bg-primary-500 py-1 pl-4 pr-3 text-sm font-extrabold uppercase text-white transition-colors duration-300 ease-slide hover:bg-primary hover:text-secondary',
        'after:absolute after:left-full after:-z-10 after:h-full after:w-5 after:-translate-x-full after:bg-primary-500 after:transition-all after:duration-300 after:ease-slide hover:after:translate-x-0 hover:after:bg-primary'
      )}
    >
      <span className='mr-4'>see latest news</span>
      <span className='i-ic-twotone-keyboard-arrow-right -mx-1 inline-block transition-transform duration-700 ease-slide group-hover:translate-x-1' />{' '}
      <span className='i-ic-twotone-keyboard-arrow-right -mx-1 inline-block transition-transform duration-500 ease-slide group-hover:translate-x-3' />{' '}
      <span className='i-ic-twotone-keyboard-arrow-right -mx-1 inline-block transition-transform duration-300 ease-slide group-hover:translate-x-5' />{' '}
    </Link>
  </div>
);

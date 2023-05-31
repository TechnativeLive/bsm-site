import { FeedPrimaryArticle, FeedPrimaryArticleSkeleton } from '@/components/latest/feed/primary';
import {
  FeedSecondaryArticle,
  FeedSecondaryArticleSkeleton,
} from '@/components/latest/feed/secondary';
import { container } from '@/components/tailwind';
import { getArticlesPreview } from '@/lib/api';
import clsx from 'clsx';
import Link from 'next/link';
import { Suspense } from 'react';

export const LatestFeed = () => (
  <div className={clsx(container, 'p-8')}>
    <Suspense fallback={<NewsFeedSkeleton />}>
      {/* @ts-expect-error async component */}
      <NewsFeed />
    </Suspense>
    <Link
      href='/latest'
      className={clsx(
        'group relative mt-4 flex items-center self-start bg-primary-500 py-1 pl-4 pr-3 text-sm font-extrabold uppercase text-white transition-colors duration-300 ease-slide hover:bg-primary hover:text-secondary',
        'after:absolute after:left-full after:-z-10 after:h-full after:w-5 after:-translate-x-full after:bg-primary-500 after:transition-all after:duration-300 after:ease-slide hover:after:translate-x-0 hover:after:bg-primary'
      )}
    >
      <span className='mr-4 self-end'>see latest news</span>
      <span className='i-ic-twotone-keyboard-arrow-right -mx-1 inline-block transition-transform duration-700 ease-slide group-hover:translate-x-1' />{' '}
      <span className='i-ic-twotone-keyboard-arrow-right -mx-1 inline-block transition-transform duration-500 ease-slide group-hover:translate-x-3' />{' '}
      <span className='i-ic-twotone-keyboard-arrow-right -mx-1 inline-block transition-transform duration-300 ease-slide group-hover:translate-x-5' />{' '}
    </Link>
  </div>
);

function NewsFeedSkeleton() {
  return (
    <div className='grid gap-12 md:grid-cols-[3fr,2fr]'>
      <article className='pt-2' aria-label='loading'>
        <FeedPrimaryArticleSkeleton />
      </article>
      <aside className='flex flex-col gap-4' aria-label='loading'>
        <FeedSecondaryArticleSkeleton />
        <FeedSecondaryArticleSkeleton />
        <FeedSecondaryArticleSkeleton />
      </aside>
    </div>
  );
}

async function NewsFeed() {
  const articles = await getArticlesPreview({
    pagination: { pageSize: 4 },
    sort: ['publishedAt:desc'],
    populate: ['tags', 'cover'],
  });

  const [firstArticle, ...otherArticles] = articles.data;

  return (
    <div className='grid gap-12 md:grid-cols-[3fr,2fr]'>
      <article className='pt-2' aria-label='Featured Story'>
        <FeedPrimaryArticle article={firstArticle} />
      </article>
      <Suspense fallback={<NewsFeedSkeleton />}>
        <aside className='flex flex-col gap-4' aria-label='News Feed'>
          {otherArticles?.map((article) => (
            <FeedSecondaryArticle key={article.slug} article={article} />
          ))}
        </aside>
      </Suspense>
    </div>
  );
}

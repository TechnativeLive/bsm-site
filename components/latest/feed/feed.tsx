import { FeedPrimaryArticle, FeedPrimaryArticleSkeleton } from '@/components/latest/feed/primary';
import {
  FeedSecondaryArticle,
  FeedSecondaryArticleSkeleton,
} from '@/components/latest/feed/secondary';
import { CallToAction } from '@/components/strapi/cta';
import { container } from '@/components/tailwind';
import { getArticlesPreview } from '@/lib/strapi';
import clsx from 'clsx';
import Link from 'next/link';
import { Suspense } from 'react';

export const LatestFeed = () => (
  <div className={clsx(container, 'p-8')}>
    <Suspense fallback={<NewsFeedSkeleton />}>
      {/* @ts-expect-error async component */}
      <NewsFeed />
    </Suspense>
    <CallToAction link={{ url: '/latest', label: 'See Latest News', theme: 'primary' }} />
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

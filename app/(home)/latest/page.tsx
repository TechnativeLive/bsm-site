import clsx from 'clsx';
import { FeedSecondaryArticle } from '@/components/latest/feed/secondary';
import { GetAttributesValues } from '@strapi/strapi';
import { Metadata } from 'next';
import { cms } from '@/utils/cms';
import { container } from '@/components/tailwind';
import Link from 'next/link';

export default async function Page() {
  const tagsQuery = cms('tags');
  const tags: Strapi.Response<GetAttributesValues<'api::tag.tag'>[]> = await fetch(tagsQuery, {
    next: { revalidate: Infinity },
  }).then((res) => res.json());

  const articlesQuery = cms('articles', { populate: '*' });
  const articles: Strapi.Response<GetAttributesValues<'api::article.article'>[]> = await fetch(
    articlesQuery,
    { next: { revalidate: Infinity } }
  ).then((res) => res.json());

  return (
    <section className={clsx(container, 'my-6 w-full items-start gap-4')}>
      <div className='flex items-center divide-x divide-slate-400'>
        <h1 className='px-8 py-2 text-center font-display text-3xl uppercase'>Latest News</h1>
        <ul className='flex flex-wrap gap-2 px-8'>
          {tags.data.map((tag) => (
            <Link
              key={tag.slug}
              href={`/latest/tag/${tag.slug}`}
              className='relative border-l border-t border-primary bg-slate-100 px-4 py-2 text-sm font-bold uppercase text-primary after:corner-2 after:corner-primary hover:border-primary-600 hover:text-primary-600 hover:after:corner-primary-600'
            >
              {tag.label}
            </Link>
          ))}
        </ul>
      </div>
      <div className='my-6 grid grid-cols-3 gap-4'>
        {articles.data.map((article) => (
          <FeedSecondaryArticle key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}

export const metadata: Metadata = {
  title: 'Latest News',
  // TODO: Better description
  description: 'Lastest News from British Supermoto',
};

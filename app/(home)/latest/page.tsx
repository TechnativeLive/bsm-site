import clsx from 'clsx';
import { FeedSecondaryArticle } from '@/components/latest/feed/secondary';
import { GetAttributesValues } from '@strapi/strapi';
import { Metadata } from 'next';
import { cms } from '@/utils/cms';
import { container, tag as tagNeutral, tagPrimary } from '@/components/tailwind';

export default async function Page() {
  const tagsQuery = cms('tags');
  const tags: Strapi.Response<GetAttributesValues<'api::tag.tag'>[]> = await fetch(tagsQuery).then(
    (res) => res.json()
  );

  const articlesQuery = cms('articles', { populate: '*' });
  const articles: Strapi.Response<GetAttributesValues<'api::article.article'>[]> = await fetch(
    articlesQuery
  ).then((res) => res.json());

  return (
    <section className={clsx(container, 'my-6 w-full items-start gap-4')}>
      <h1 className='rounded-br-2xl border-b-4 border-r-4 border-primary px-2 py-1 font-display text-3xl uppercase'>
        Latest News
      </h1>
      <div>
        <div className='mb-2 flex gap-2'>
          <span>Search Tags</span>
          <button
            disabled
            className='cursor-pointer rounded border border-slate-300 bg-slate-200 px-2 text-slate-700 hover:border-slate-400 hover:bg-slate-300 disabled:cursor-not-allowed disabled:text-slate-400 disabled:hover:border-slate-300 disabled:hover:bg-slate-200'
          >
            clear tags
          </button>
        </div>
        <ul className='flex gap-2'>
          {tags.data.map((tag) => (
            <button key={tag.slug} className={tag.priority === 'high' ? tagPrimary : tagNeutral}>
              {tag.label}
            </button>
          ))}
        </ul>
      </div>
      <div className='my-6 grid grid-cols-3 gap-4'>
        {articles.data.map((article) => (
          <FeedSecondaryArticle article={article} />
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

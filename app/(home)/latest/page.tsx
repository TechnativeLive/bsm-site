import clsx from 'clsx';
import { FeedSecondaryArticle } from '@/components/latest/feed/secondary';
import { GetAttributesValues } from '@strapi/strapi';
import { Metadata } from 'next';
import { cms } from '@/utils/cms';
import { container, tag as tagStyles } from '@/components/tailwind';
import Link from 'next/link';

export default async function Page() {
  const tagsQuery = cms('tags', { populate: ['articles'] });
  const allTags: Strapi.Response<GetAttributesValues<'api::tag.tag'>[]> = await fetch(tagsQuery, {
    next: { revalidate: Infinity },
  }).then((res) => res.json());
  const tags = allTags.data.filter((tag) => tag.articles && tag.articles.length > 0);

  const articlesQuery = cms('articles', { populate: '*' });
  const articles: Strapi.Response<GetAttributesValues<'api::article.article'>[]> = await fetch(
    articlesQuery,
    { next: { revalidate: Infinity } }
  ).then((res) => res.json());

  return (
    <>
      <header className='grid w-full place-items-center border-b border-slate-300 bg-slate-100'>
        <h1 className='text-emboss py-8 text-3xl font-bold uppercase'>Latest News</h1>
        <ul className='flex flex-wrap items-center justify-center gap-4 px-8 pb-4'>
          {tags.map((tag) => (
            <Link key={tag.slug} href={`/latest/tag/${tag.slug}`} className={tagStyles}>
              {tag.label}
            </Link>
          ))}
        </ul>
      </header>
      <section className={clsx(container, 'my-6 w-full items-start gap-4')}>
        <div className='auto-cols my-6 grid gap-4'>
          {articles.data.map((article) => (
            <FeedSecondaryArticle key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </>
  );
}

export const metadata: Metadata = {
  title: 'Latest News',
  // TODO: Better description
  description: 'Lastest News from British Supermoto',
};

import { FeedSecondaryArticle } from '@/components/latest/feed/secondary';
import { container, tagTopLeft } from '@/components/tailwind';
import { getArticlesPreview } from '@/lib/strapi';
import { cms } from '@/utils/cms';
import { GetAttributesValues } from '@strapi/strapi';
import clsx from 'clsx';
import Link from 'next/link';

type PageParams = { params: { slug: string } };

const dynamicParams = false;
export { dynamicParams };

async function getArticlesByTag(slug: string) {
  const articles = await getArticlesPreview({
    sort: ['publishedAt:desc'],
    populate: ['tags', 'cover'],
    filters: {
      tags: {
        slug: {
          $eq: slug,
        },
      },
    },
  });

  return articles;
}

export async function generateStaticParams() {
  const tags: Strapi.Response<GetAttributesValues<'api::tag.tag'>[]> = await fetch(
    cms('tags')
  ).then((res) => res.json());

  console.log({ tags: JSON.stringify(tags) });

  return tags.data.map((tag) => ({
    slug: tag.slug,
  }));
}

async function getTag(slug: string) {
  const tagQuery = cms('tags', {
    filters: { slug: { $eq: slug } },
  });

  const tags: Strapi.Response<GetAttributesValues<'api::tag.tag'>[]> = await fetch(tagQuery).then(
    (res) => res.json()
  );

  return tags.data?.[0];
}

export default async function AuthorArticlePage({ params: { slug } }: PageParams) {
  const tag = await getTag(slug);
  const articles = await getArticlesByTag(slug);

  return (
    <>
      <header className='relative w-full border-b border-slate-300 bg-slate-100'>
        <div className='mx-auto flex max-w-7xl flex-col items-center px-8 py-4'>
          <Link className={clsx('mb-2 self-start md:mb-0', tagTopLeft)} href='/latest'>
            Latest
          </Link>
          <h1 className='text-emboss mb-10 text-3xl font-bold uppercase'>{tag.label}</h1>
        </div>
      </header>
      <section className={clsx(container, 'my-6')}>
        <div className='auto-cols my-6 grid w-full gap-4'>
          {articles.data.map((article) => (
            <FeedSecondaryArticle key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </>
  );
}

export async function generateMetadata({ params: { slug: tag } }: PageParams) {
  // const article = await getArticleBySlug(slug);
  const tagData = await getTag(tag);

  return {
    title: `${tagData.label} Articles`,
    description: `Find all our articles with the tag ${tagData.label}`,
  };
}

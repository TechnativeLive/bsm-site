import { FeedSecondaryArticle } from '@/components/latest/feed/secondary';
import { container } from '@/components/tailwind';
import { getArticlesPreview } from '@/lib/strapi';
import { cms } from '@/utils/cms';
import { GetAttributesValues } from '@strapi/strapi';
import clsx from 'clsx';

type PageParams = { params: { slug: string } };

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

  return tags.data.map((tag) => ({
    tag: tag.slug,
  }));
}

async function getTag(slug: string) {
  const tagQuery = cms('tags', {
    filters: { slug: { $eq: slug } },
  });

  const tags: Strapi.Response<GetAttributesValues<'api::tag.tag'>[]> = await fetch(tagQuery, {
    next: { revalidate: Infinity },
  }).then((res) => res.json());

  return tags.data?.[0];
}

export default async function AuthorArticlePage({ params: { slug } }: PageParams) {
  const tag = await getTag(slug);
  const articles = await getArticlesByTag(slug);

  return (
    <>
      <header className='grid h-36 w-full place-items-center border-b border-slate-300 bg-slate-100'>
        <h1 className='text-emboss text-3xl font-bold uppercase'>{tag.label}</h1>
      </header>
      <section className={clsx(container, 'my-6')}>
        <div
          className='my-6 grid w-full gap-4'
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%/3, max(64px, 100%/5)), 1fr))',
          }}
        >
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

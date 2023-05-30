import clsx from 'clsx';
import { GetAttributesValues } from '@strapi/strapi';
import { cms } from '@/utils/cms';
import { container } from '@/components/tailwind';
import { mdToHtml } from '@/lib/api';

type PageParams = { params: { slug: string } };

export async function generateStaticParams() {
  const posts: Strapi.Response<GetAttributesValues<'api::article.article'>[]> = await fetch(
    cms('articles')
  ).then((res) => res.json());

  return posts.data.map((post) => ({
    slug: post.slug,
  }));
}

async function getArticleBySlug(slug: string) {
  try {
    const query = cms(`articles`, {
      filter: { slug: { $eq: slug } },
      populate: ['blocks', 'seo'],
    });

    const article: Strapi.Response<GetAttributesValues<'api::article.article'>[]> = await fetch(
      query
    ).then((res) => res.json());

    return article;
  } catch (e) {
    console.log("Couldn't find post by slug", e);
  }
}

export default async function Page({ params: { slug } }: PageParams) {
  const article = await getArticleBySlug(slug);
  const m = await mdToHtml(article?.data[0].blocks[0].content);
  return (
    article && (
      <article className={clsx(container, 'prose w-full lg:prose-xl')}>
        <div dangerouslySetInnerHTML={{ __html: m.value }} />
        {article.data?.[0].blocks
          ?.filter((block) => block.__component === 'blocks.rich-text')
          .map((block) => block.content)
          .join('\n\n')}
      </article>
    )
  );
}

// Set the title of the page to be the post title, note that we no longer use
// e.g. next/head in app dir, and this can be async just like the server
// component
export async function generateMetadata({ params: { slug } }: PageParams) {
  const article = await getArticleBySlug(slug);

  return {
    title: article?.data?.[0].title,
  };
}

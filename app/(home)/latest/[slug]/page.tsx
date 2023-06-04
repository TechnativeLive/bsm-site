import { GetAttributesValues } from '@strapi/strapi';
import { cms } from '@/utils/cms';
import { Article } from '@/components/strapi/collections/article';
import { getArticleBySlug } from '@/lib/strapi';
import { getMetadata } from '@/lib/meta';

const dynamicParams = false;
export { dynamicParams };

type PageParams = { params: { slug: string } };

export async function generateStaticParams() {
  const posts: Strapi.Response<GetAttributesValues<'api::article.article'>[]> = await fetch(
    cms('articles')
  ).then((res) => res.json());

  return posts.data.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Page({ params: { slug } }: PageParams) {
  const article = await getArticleBySlug(slug);
  return article && <Article {...article} />;
}

export async function generateMetadata({ params: { slug } }: PageParams) {
  const article = await getArticleBySlug(slug);

  return {
    title: article?.title,
    ...getMetadata(article?.seo),
  };
}

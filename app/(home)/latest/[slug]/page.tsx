import { GetAttributesValues } from '@strapi/strapi';
import { cms } from '@/utils/cms';
import { Article } from '@/components/strapi/collections/article';
import { getArticleBySlug } from '@/lib/api';

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

// async function getArticleBySlug(slug: string) {
//   console.log('query slug', slug);
//   try {
//     const query = cms(`articles`, {
//       filter: { slug: { $eq: slug } },
//       populate: ['blocks', 'seo'],
//     });
//     console.log({query})

//     const article: Strapi.Response<GetAttributesValues<'api::article.article'>[]> = await fetch(
//       query,
//       { next: { revalidate: Infinity } }
//     ).then((res) => res.json());

//     return article.data[0];
//   } catch (e) {
//     console.log("Couldn't find post by slug", e);
//   }
// }

export default async function Page({ params: { slug } }: PageParams) {
  const article = await getArticleBySlug(slug);
  return article && <Article {...article} />;
}

// Set the title of the page to be the post title, note that we no longer use
// e.g. next/head in app dir, and this can be async just like the server
// component
export async function generateMetadata({ params: { slug } }: PageParams) {
  const article = await getArticleBySlug(slug);

  return {
    title: article?.title,
  };
}

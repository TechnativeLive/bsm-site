import { cms } from '@/utils/cms';
import { GetAttributesValues } from '@strapi/strapi';

export async function generateStaticParams() {
  const posts: Strapi.Response<GetAttributesValues<'api::article.article'>[]> = await fetch(
    cms('articles')
  ).then((res) => res.json());

  return posts.data.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Page({ params: { slug } }: { params: { slug: string } }) {
  const query = cms(`articles`, {
    filter: { slug: { $eq: slug } },
    populate: ['blocks', 'seo'],
  });
  const article: Strapi.Response<GetAttributesValues<'api::article.article'>[]> = await fetch(
    query
  ).then((res) => res.json());
  console.log({ query, article });

  return (
    <article className='prose lg:prose-xl'>
      {article.data[0].blocks
        ?.filter((block) => block.__component === 'blocks.rich-text')
        .map((block) => block.content)
        .join('\n\n')}
    </article>
  );
}

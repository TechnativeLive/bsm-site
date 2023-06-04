import { FeedSecondaryArticle } from '@/components/latest/feed/secondary';
import { container } from '@/components/tailwind';
import { getArticlesPreview } from '@/lib/strapi';
import { getUser } from '@/lib/strapi/user';
import { cms } from '@/utils/cms';
import { GetAttributesValues } from '@strapi/strapi';
import clsx from 'clsx';

type PageParams = { params: { username: string } };

async function getArticlesByAuthor(username: string) {
  const articles = await getArticlesPreview({
    // populate: '*',
    sort: ['publishedAt:desc'],
    populate: ['tags', 'cover'],
    filters: {
      authors: {
        username: {
          $eq: username,
        },
      },
    },
  });

  return articles;
}

export async function generateStaticParams() {
  const users: GetAttributesValues<'plugin::users-permissions.user'>[] = await fetch(
    cms('users', { fields: ['username'] })
  ).then((res) => res.json());

  return users.map((user) => ({
    username: user.username,
  }));
}

export default async function AuthorArticlePage({ params: { username } }: PageParams) {
  const user = await getUser(username);
  const articles = await getArticlesByAuthor(username);

  return (
    <>
      <header className='grid w-full place-items-center border-b border-slate-300 bg-slate-100'>
        <h1 className='text-emboss block pb-3 pt-16 text-3xl font-bold uppercase'>
          {user.firstname} {user.lastname}
        </h1>
        <h2 className='text-emboss block pb-16 text-xl font-semibold uppercase'>{user.jobTitle}</h2>
      </header>
      <section className={clsx(container, 'my-6')}>
        <div className='my-6 grid grid-cols-3 gap-4'>
          {articles.data.map((article) => (
            <FeedSecondaryArticle key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </>
  );
}

export async function generateMetadata({ params: { username } }: PageParams) {
  // const article = await getArticleBySlug(slug);
  const user = await getUser(username);

  return user
    ? {
        title: `${user.firstname} ${user.lastname}`,
        description: `Articles written by ${user.firstname} ${user.lastname}}`,
      }
    : {};
}

import { Block } from '@/components/strapi/components/block';
import { Hero } from '@/components/strapi/hero';
import { container } from '@/components/tailwind';
import { StrapiMedia } from '@/types/strapi';
import { GetAttributesValues } from '@strapi/strapi';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

type ArticleProps = GetAttributesValues<'api::article.article'>;

export function Article(article: ArticleProps) {
  const publishDate = new Date(article.publishedAt!);

  return (
    <article className='w-full bg-slate-50'>
      <div
        className={clsx(
          container,
          'prose prose-slate w-full bg-slate-50 lg:prose-lg prose-img:mx-auto prose-img:max-h-[550px]'
        )}
      >
        <div
          className={clsx(
            'not-prose relative border-l border-primary-500 pl-8 pt-12 after:absolute after:bottom-0 after:right-full after:top-0 after:-z-10 after:w-3',
            'after:bg-pattern'
          )}
        >
          <h1 className='mb-3 font-display text-3xl capitalize md:text-5xl'>{article.title}</h1>
          {article.description && (
            <h2 className='font-semibold text-slate-600'>{article.description}</h2>
          )}

          <div className='mb-4 flex flex-wrap items-center justify-between'>
            <div className='flex flex-col items-end'>
              <address className='flex flex-col gap-4 not-italic'>
                {article.authors?.map((author) => (
                  <Link
                    href={`/latest/author/${author.username}`}
                    key={author.username}
                    className='group flex gap-2 rounded bg-gradient-to-r from-slate-300 pl-2'
                  >
                    <Avatar author={author} />
                    <div className='flex flex-col justify-center'>
                      <div className='text-emboss bg-clip-text text-lg font-semibold text-slate-600 group-hover:text-primary-600'>
                        {author.firstname} {author.lastname}
                      </div>
                      <time
                        className='slate-700 inline-block text-sm'
                        dateTime={article.publishedAt}
                      >
                        {publishDate.toLocaleDateString(undefined, { dateStyle: 'long' })}
                      </time>
                      {/* <div className='text-base'>{author.jobTitle}</div> */}
                    </div>
                  </Link>
                ))}
              </address>
            </div>

            <div className='flex flex-wrap gap-2'>
              {article.tags?.map((tag) => (
                <Link
                  key={tag.slug}
                  href={`/latest/tag/${tag.slug}`}
                  className='relative border-l border-t border-primary bg-slate-100 px-4 py-2 text-sm font-bold uppercase text-primary after:corner-2 after:corner-primary hover:border-primary-600 hover:text-primary-600 hover:after:corner-primary-600'
                >
                  {tag.label}
                </Link>
              ))}
            </div>
          </div>

          <Hero {...article.hero} />
        </div>
        {article.blocks?.map((block, i) => (
          <Block key={i} type={block.__component} block={block} />
        ))}
      </div>
    </article>
  );
}

function Avatar({ author }: { author: GetAttributesValues<'plugin::users-permissions.user'> }) {
  if (author.avatar?.url) {
    const avatar: StrapiMedia = author.avatar;
    return (
      <div className='relative m-1.5 h-9 w-9 overflow-hidden rounded-full'>
        <Image
          fill
          className='object-cover transition-transform group-hover:scale-105'
          alt='Avatar Image'
          src={
            avatar.formats && 'thumbnail' in avatar.formats
              ? avatar.formats.thumbnail.url
              : avatar.url
          }
        />
      </div>
    );
  }

  const initials = `${author.firstname.charAt(0)}${author.lastname.charAt(0)}`;

  return (
    <div className='text-emboss m-auto flex h-12 w-12 shrink-0 items-center justify-center text-2xl font-extrabold uppercase text-slate-600 group-hover:text-primary-600'>
      {initials}
    </div>
  );
}

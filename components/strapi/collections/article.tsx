import { Block } from '@/components/strapi/components/block';
import { Hero } from '@/components/strapi/hero';
import { container } from '@/components/tailwind';
import { GetAttributesValues } from '@strapi/strapi';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

type ArticleProps = GetAttributesValues<'api::article.article'>;

export function Article(article: ArticleProps) {
  const publishDate = new Date(article.publishedAt!);

  return (
    <article
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
        <div className='mb-4 grid grid-cols-12 items-start'>
          <div className='col-span-9 mr-8'>
            <h1 className='font-display text-5xl capitalize'>{article.title}</h1>
            {article.description && (
              <h2 className='font-semibold text-slate-600'>{article.description}</h2>
            )}

            <div className='mt-4 flex flex-wrap gap-2'>
              {article.tags?.map((tag) => (
                <Link
                  key={tag.slug}
                  href={`/tags/${tag.slug}`}
                  className='relative border-l border-t border-primary bg-slate-100 px-4 py-2 text-sm font-bold uppercase text-primary after:corner-2 after:corner-primary hover:border-primary-600 hover:text-primary-600 hover:after:corner-primary-600'
                >
                  {tag.label}
                </Link>
              ))}
            </div>
          </div>

          <div className='col-span-3 mb-2 flex flex-col items-end'>
            <address className='mb-2 flex flex-col gap-4 not-italic'>
              {article.authors?.map((author) => (
                <Link
                  href={`/latest/author/${author.username}`}
                  key={author.username}
                  className='group flex flex-row-reverse gap-4 rounded bg-gradient-to-l from-slate-300'
                >
                  {/* @ts-ignore */}
                  {author.avatar ? (
                    // @ts-ignore
                    <Image src={author.avatar} alt='Avatar' />
                  ) : (
                    <Avatar
                      initials={`${author.firstname.charAt(0)}${author.lastname.charAt(0)}`}
                    />
                  )}
                  <div className='flex flex-col justify-center'>
                    <div className='text-emboss bg-clip-text text-lg font-semibold text-slate-600 group-hover:text-primary-600'>
                      {author.firstname} {author.lastname}
                    </div>
                    {/* @ts-ignore */}
                    <div className='text-base'>{author.jobTitle}</div>
                  </div>
                </Link>
              ))}
            </address>
            <time className='slate-700 inline-block text-sm' dateTime={article.publishedAt}>
              {publishDate.toLocaleDateString(undefined, { dateStyle: 'long' })}
            </time>
          </div>
        </div>

        <Hero {...article.hero} />
      </div>
      {article.blocks?.map((block, i) => (
        <Block key={i} type={block.__component} block={block} />
      ))}
    </article>
  );
}

function Avatar({ initials }: { initials: string }) {
  return (
    <div className='text-emboss flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-clip-text text-2xl font-extrabold uppercase text-slate-600 group-hover:text-primary-600'>
      {initials}
    </div>
  );
}

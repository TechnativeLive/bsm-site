import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { GetAttributesValues } from '@strapi/strapi';
import { StrapiMedia } from '@/types/strapi';

export const FeedSecondaryArticle = ({
  article,
}: {
  article: GetAttributesValues<'api::article.article'>;
}) => {
  const cover = article.cover as StrapiMedia | undefined;
  return (
    article && (
      <Link href={`/latest/${article.slug ?? ''}`} className='group relative'>
        <div className='flex flex-col'>
          <div
            className={clsx(
              'relative grid grid-cols-[3fr,2fr] gap-4 overflow-hidden pr-2',
              'after:absolute after:right-0 after:top-0 after:h-full after:w-1 after:translate-y-[calc(-100%-1px)] after:bg-primary-500 after:transition-transform after:duration-300 after:ease-slide after:group-hover:translate-y-0'
            )}
          >
            <div className='relative aspect-video overflow-hidden'>
              <Image
                src={cover?.url ?? article.hero.images?.[0]?.url}
                alt={cover?.alternativeText ?? 'Preview image'}
                priority
                fill
                className='object-cover transition-transform duration-300 ease-in-out group-hover:scale-105'
              />
            </div>

            <div className='flex flex-col space-y-1'>
              {article.tags?.map((tag, i) => (
                <p key={i} className='inline-block font-display text-sm uppercase text-primary-500'>
                  {tag.label}
                </p>
              ))}

              <h2 className='text-xl font-bold uppercase md:text-base lg:text-xl'>
                {article.title}
              </h2>
            </div>
          </div>
        </div>
      </Link>
    )
  );
};

export const FeedSecondaryArticleSkeleton = () => (
  <div className='relative grid grid-cols-[3fr,2fr] gap-4 overflow-hidden pr-2'>
    <div className='aspect-[800/450] rounded-md bg-gradient-to-r from-slate-100 to-slate-300' />
    <div className='flex flex-col space-y-1'>
      <p className='inline-block h-[1em] w-12 rounded-full bg-gradient-to-r from-slate-100 to-slate-300 text-sm' />
      <h2 className='h-[2em] rounded  bg-gradient-to-r from-slate-100 to-slate-300 text-xl md:text-base lg:text-xl' />
    </div>
  </div>
);

import { StrapiMedia } from '@/types/strapi';
import { GetAttributesValues } from '@strapi/strapi';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

export const FeedPrimaryArticle = ({
  article,
}: {
  article: GetAttributesValues<'api::article.article'>;
}) => {
  const cover = article.cover as StrapiMedia | undefined;
  return (
    <Link
      href={`/latest/${article.slug ?? ''}`}
      className='group relative -m-2 mb-2 inline-block p-2'
    >
      <div
        className={clsx(
          'relative z-0',
          'after:absolute after:inset-0 after:transition-transform after:delay-0 after:duration-500 after:ease-slide after:group-hover:delay-0',
          'after:translate-x-2 after:translate-y-2',
          'after:group-hover:translate-x-0 after:group-hover:translate-y-1',
          'after:border-b-4  after:border-primary-500 after:will-change-transform',
          'after:bg-pattern'
        )}
      >
        {cover?.alternativeText && (
          <div className='absolute bottom-0 left-0 right-0 z-20 overflow-hidden'>
            <div className='max-h-full translate-y-full bg-primary-900/50 px-8 py-4 text-white shadow-sm transition-transform ease-slide group-hover:translate-y-0 group-hover:delay-300'>
              <div className='line-clamp-3'>{cover.alternativeText}</div>
            </div>
          </div>
        )}
        <Image
          src={
            cover?.url ??
            'https://res.cloudinary.com/prod-f2f3/ar_16:9,c_fill,dpr_1.0,f_auto,g_auto,h_450,w_800/v1/f2/global/articles/2023/05_May/GettyImages-1398074999'
          }
          alt={cover?.alternativeText ?? 'Cover Image'}
          width={cover?.width ?? 800}
          height={cover?.height ?? 450}
          className='relative z-10 -translate-x-2 -translate-y-2 transition-transform duration-500 ease-slide will-change-transform group-hover:translate-x-0 group-hover:translate-y-0'
        />
      </div>
      <div className='flex flex-wrap gap-4 pb-1.5 pt-8 font-display uppercase text-primary-500'>
        {article.tags?.map((tag, i) => (
          <p key={i} className='border-b border-primary-500 last:group-hover:grow'>
            {tag.label}
          </p>
        ))}
      </div>
      <h1 className='pt-2.5 text-3xl font-bold uppercase'>{article.title}</h1>
    </Link>
  );
};

export const FeedPrimaryArticleSkeleton = () => (
  <div className='relative'>
    <div className='aspect-[800/450] rounded-md bg-gradient-to-r from-slate-100 to-slate-300' />
    <div className='inline-block h-[1em] w-12 rounded-full bg-gradient-to-r from-slate-100 to-slate-300 pb-1.5 pt-8' />
    <div className='h-[1em] w-3/4 rounded-full bg-gradient-to-r from-slate-100 to-slate-300 pb-4 pt-2.5 text-3xl' />
  </div>
);

import { getFeatureLinks } from '@/lib/strapi/homepage';
import { GetAttributesValues } from '@strapi/strapi';
import clsx from 'clsx';
import Link from 'next/link';

export const FeatureHomeLinks = async () => {
  const featuredLinks = await getFeatureLinks();

  return (
    <div className='grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-3'>
      {featuredLinks?.map((link, i) => (
        <FeatureHomeLink key={i} {...link.link} />
      ))}
    </div>
  );
};

const FeatureHomeLink = ({ label, isExternal, theme, url }: GetAttributesValues<'shared.link'>) =>
  !!url ? (
    <Link
      href={url}
      target={isExternal ? '_blank' : undefined}
      className='group relative flex aspect-video flex-col justify-end rounded-lg bg-gradient-to-br from-slate-300 px-8 py-12'
    >
      <h4
        className={clsx(
          theme === 'primary'
            ? 'text-emboss text-primary'
            : theme === 'secondary'
            ? 'text-secondary drop-shadow'
            : 'text-white drop-shadow',
          'text-center text-2xl font-bold uppercase'
        )}
      >
        {label}
      </h4>
      <div
        className={clsx(
          theme === 'primary'
            ? 'border-primary'
            : theme === 'secondary'
            ? 'border-secondary'
            : 'border-white',
          'absolute inset-3 border-8 transition-all [clip-path:polygon(100%_0,_100%_0,_91%_16%,_9%_84%,_0_100%,_0_100%,_0_100%,_9%_84%,_91%_16%,_100%_0)] group-hover:[clip-path:polygon(100%_0,_100%_32%,_91%_48%,_27%_84%,_18%_100%,_0_100%,_0_68%,_9%_52%,_71%_16%,_82%_0)]'
        )}
      />
    </Link>
  ) : (
    <pre>{JSON.stringify({ label, isExternal, theme, url })}</pre>
  );

export const FeatureHomeLinksSkeleton = () => (
  <div className='grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-3'>
    <div className='group relative aspect-video rounded-lg bg-gradient-to-br from-slate-300'>
      <div className='absolute inset-4 border-8 border-white transition-all [clip-path:polygon(100%_0,_100%_0,_91%_16%,_9%_84%,_0_100%,_0_100%,_0_100%,_9%_84%,_91%_16%,_100%_0)] group-hover:[clip-path:polygon(100%_0,_100%_32%,_91%_48%,_27%_84%,_18%_100%,_0_100%,_0_68%,_9%_52%,_71%_16%,_82%_0)]' />
    </div>
    <FeatureHomeLinkSkeleton />
    <FeatureHomeLinkSkeleton />
  </div>
);

const FeatureHomeLinkSkeleton = () => (
  <div className='flex flex-col gap-4'>
    <div className='relative aspect-video rounded-lg bg-gradient-to-br from-slate-300'></div>
  </div>
);

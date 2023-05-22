import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

export const FeedSecondaryArticle = () => (
  <Link href='/somewhere' className='group relative'>
    <div className='flex flex-col'>
      <div
        className={clsx(
          'relative grid grid-cols-[3fr,2fr] gap-4 overflow-hidden pr-2',
          'after:absolute after:right-0 after:top-0 after:h-full after:w-1 after:translate-y-[calc(-100%-1px)] after:bg-primary-500 after:transition-transform after:duration-300 after:ease-slide after:group-hover:translate-y-0'
        )}
      >
        <Image
          src='https://res.cloudinary.com/prod-f2f3/ar_16:9,c_fill,dpr_1.0,f_auto,g_auto,h_450,w_800/v1/f2/global/articles/2023/05_May/GettyImages-1398074999'
          alt='stolen'
          width={800}
          height={450}
        />

        <div className='flex flex-col space-y-1'>
          <p className='font-display text-sm uppercase text-primary-500'>TYPE</p>
          <h2 className='text-xl font-bold uppercase md:text-base lg:text-xl'>
            Title for the article
          </h2>
        </div>
      </div>
    </div>
  </Link>
);

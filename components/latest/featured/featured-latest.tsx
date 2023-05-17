import { container } from '@/components/tailwind';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

export const FeaturedLatest = () => (
  <section className='my-6 w-full'>
    <div className={clsx(container, 'p-8')}>
      <div className='grid gap-12 md:grid-cols-[3fr,2fr]'>
        <article className='pt-2' aria-label='Featured Story'>
          <Feature />
        </article>
        <aside className='flex flex-col gap-4' aria-label='News Feed'>
          <Article />
          <Article />
          <Article />
        </aside>
      </div>
      <Link
        href='/latest'
        className='self-start bg-primary-500 px-4 py-1 text-sm font-extrabold uppercase text-white'
      >
        see latest news <span className='-tracking-widest'>{'>>>'}</span>
      </Link>
    </div>
  </section>
);

const Feature = () => (
  <Link href='/somewhere' className='group relative'>
    <div
      className={clsx(
        'relative z-0',
        'after:absolute after:inset-0 after:transition-transform after:delay-0 after:duration-500 after:ease-slide after:group-hover:delay-0',
        'after:translate-x-2 after:translate-y-2',
        'after:group-hover:translate-x-0 after:group-hover:translate-y-1',
        'after:border-b-4  after:border-primary-500 after:will-change-transform',
        'after:bg-[url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABMSURBVHgB7c/LCQAwDALQ7D+dhOzTblAs5ANBz+JDMyIATnqvZJSN8O6ecOGtvTociMlHwlfg/oM7ORqpPeHLcH7UJx8JH8EhXPgTv6gINZx/6mnuAAAAAElFTkSuQmCC")]'
      )}
    >
      <div className='absolute bottom-0 left-0 right-0 z-20 overflow-hidden'>
        <div className='max-h-full translate-y-full bg-primary-500/50 px-8 py-4 text-white shadow-sm transition-transform ease-slide group-hover:translate-y-0 group-hover:delay-300'>
          <div className='line-clamp-3'>
            The standard Lorem Ipsum passage, used since the 1500s - Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum
          </div>
        </div>
      </div>
      <Image
        src='https://res.cloudinary.com/prod-f2f3/ar_16:9,c_fill,dpr_1.0,f_auto,g_auto,h_450,w_800/v1/f2/global/articles/2023/05_May/GettyImages-1398074999'
        alt='stolen'
        width={800}
        height={450}
        className='relative z-10 -translate-x-2 -translate-y-2 transition-transform duration-500 ease-slide will-change-transform group-hover:translate-x-0 group-hover:translate-y-0'
      />
    </div>
    <p className='inline-block border-b border-primary-500 pb-1.5 pt-8 font-display uppercase text-primary-500 group-hover:block'>
      TYPE
    </p>
    <h1 className='pb-4 pt-2.5 text-3xl font-bold uppercase'>Title for the article</h1>
  </Link>
);

const Article = () => (
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

import { Calendar } from '@/components/calendar/calendar';
import { LatestFeed } from '@/components/latest/feed/feed';
import { HomepageStandings } from '@/components/standings/homepage';
import { UpcomingEvent } from '@/components/upcoming-event/upcoming-event';
import { getCalendar } from '@/lib/strapi/homepage';
import { Suspense } from 'react';

export default async function Home() {
  const calendar = await getCalendar();

  return (
    <>
      {calendar && (
        <article>
          <UpcomingEvent calendar={calendar} />
        </article>
      )}

      <section className='w-full md:my-6'>
        <LatestFeed />
      </section>

      {calendar && (
        <section className='flex w-full flex-col items-center bg-primary'>
          <Suspense fallback={<div className='h-[302px] w-full bg-primary'></div>}>
            {/* @ts-expect-error Async Server Component */}
            <Calendar calendar={calendar} />
          </Suspense>
        </section>
      )}

      <section className='w-full bg-slate-100 pb-12'>
        <Suspense>
          {/* @ts-expect-error Async Server Component */}
          <HomepageStandings />
        </Suspense>
      </section>

      {/* -@ts-expect-error Async Server Component */}
      {/* <section className={clsx(container, 'mb-6 w-full')}>
        <Suspense fallback={<FeatureHomeLinksSkeleton />}>
          <FeatureHomeLinks />
        </Suspense>
      </section> */}
    </>
  );
}

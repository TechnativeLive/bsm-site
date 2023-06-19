import { CalendarCarousel } from '@/components/calendar/carousel/calendar-carousel';
import { LatestFeed } from '@/components/latest/feed/feed';
import { StandingsData } from '@/components/standings/standings-data';
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
        <section className='flex w-full flex-col items-center bg-primary-950'>
          <Suspense fallback={null}>
            {/* @ts-expect-error Async Server Component */}
            <CalendarCarousel calendar={calendar} />
          </Suspense>
        </section>
      )}

      <section className='w-full bg-slate-100 py-6'>
        <Suspense>
          {/* @ts-expect-error Async Server Component */}
          <StandingsData />
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

import { CalendarCarousel } from '@/components/calendar/carousel/calendar-carousel';
import {
  FeatureHomeLinks,
  FeatureHomeLinksSkeleton,
} from '@/components/latest/featured/home-links';
import { LatestFeed } from '@/components/latest/feed/feed';
import { StandingsData } from '@/components/standings/standings-data';
import { container } from '@/components/tailwind';
import { UpcomingEvent } from '@/components/upcoming-event/upcoming-event';
import { getCalendar } from '@/lib/strapi/homepage';
import clsx from 'clsx';
import { Suspense } from 'react';

export type EventStatus = 'inactive' | 'active' | 'upcoming';

// TODO: Refactor logic / props and move elsewhere - and only use Date.now() in client components
// eventStatus is used in the event countdown banner
// and in the calendar carousel to set scrollLeft on page load
export default async function Home() {
  const calendar = await getCalendar();

  const now = new Date();
  const futureEventIndex = calendar?.findIndex((event) => new Date(event.start) > now) ?? -1;

  let index: number | undefined = undefined;
  let status: EventStatus = 'active';

  if (futureEventIndex === 0) {
    index = 0;
    status = 'active';
  } else if (futureEventIndex > 0) {
    const maybeCurrentEvent = calendar?.[futureEventIndex - 1];
    if (maybeCurrentEvent && new Date(maybeCurrentEvent.end) > now) {
      status = 'active';
      index = futureEventIndex - 1;
    } else {
      status = 'upcoming';
      index = futureEventIndex;
    }
  }
  const eventStatus = { index, status };

  return (
    <>
      {calendar && (
        <article>
          <UpcomingEvent calendar={calendar} eventStatus={eventStatus} />
        </article>
      )}

      <section className='w-full md:my-6'>
        <LatestFeed />
      </section>

      <section className='flex w-full flex-col items-center bg-primary-950'>
        <Suspense fallback={null}>
          {/* @ts-expect-error Async Server Component */}
          <CalendarCarousel eventStatus={eventStatus} />
        </Suspense>
      </section>

      <section className='my-6 w-full bg-slate-100 pb-6'>
        <Suspense>
          {/* @ts-expect-error Async Server Component */}
          <StandingsData />
        </Suspense>
      </section>

      <section className={clsx(container, 'mb-6 w-full')}>
        <Suspense fallback={<FeatureHomeLinksSkeleton />}>
          {/* @ts-expect-error Async Server Component */}
          <FeatureHomeLinks />
        </Suspense>
      </section>
    </>
  );
}

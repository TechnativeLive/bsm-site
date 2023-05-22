import { CalendarCarousel } from '@/components/calendar/carousel/calendar-carousel';
import { FeaturedHomeLinks } from '@/components/latest/featured/home-links';
import { LatestFeed } from '@/components/latest/feed/feed';
import { Standings } from '@/components/standings/standings';
import { container } from '@/components/tailwind';
import { sampleEvents } from '@/components/upcoming-event/sample-data';
import { UpcomingEvent } from '@/components/upcoming-event/upcoming-event';
import clsx from 'clsx';
import { useMemo } from 'react';

export type EventStatus = 'inactive' | 'active' | 'upcoming';

// TODO: Refactor logic / props and move elsewhere
// eventStatus is used in the event countdown banner
// and in the calendar carousel to set scrollLeft on page load
export default function Home() {
  const eventStatus = useMemo(() => {
    const now = new Date();
    const futureEventIndex = sampleEvents.findIndex((event) => new Date(event.startDate) > now);

    let index: number | undefined = undefined;
    let status: EventStatus = 'active';

    if (futureEventIndex === 0) {
      index = 0;
      status = 'active';
    } else if (futureEventIndex > 0) {
      const maybeCurrentEvent = sampleEvents[futureEventIndex - 1];
      if (new Date(maybeCurrentEvent.endDate) > now) {
        status = 'active';
        index = futureEventIndex - 1;
      } else {
        status = 'upcoming';
        index = futureEventIndex;
      }
    }
    return { index, status };
  }, []);

  return (
    <>
      <article>
        <UpcomingEvent allEvents={sampleEvents} eventStatus={eventStatus} />
      </article>

      <section className='my-6 w-full'>
        <LatestFeed />
      </section>

      <section className='flex w-full flex-col items-center bg-primary-950'>
        <CalendarCarousel eventStatus={eventStatus} />
      </section>

      <section className='my-6 w-full bg-slate-100 pb-6'>
        <Standings />
      </section>

      <section className={clsx(container, 'my-8 w-full')}>
        <FeaturedHomeLinks />
      </section>
    </>
  );
}

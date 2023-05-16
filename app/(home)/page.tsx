import { CalendarCarousel } from '@/components/calendar/carousel/calendar-carousel';
import { FeaturedLatest } from '@/components/latest/featured/featured-latest';
import { container } from '@/components/tailwind';
import { sampleEvents } from '@/components/upcoming-event/sample-data';
import { UpcomingEvent } from '@/components/upcoming-event/upcoming-event';
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
  console.log({ eventStatus });
  return (
    <>
      <article>
        <UpcomingEvent allEvents={sampleEvents} eventStatus={eventStatus} />
      </article>
      <FeaturedLatest />
      <CalendarCarousel eventStatus={eventStatus} />
      <section className='my-6 w-full'>
        <div className={`${container} items-center`}>driver standings</div>
      </section>
      <section>featured long-standing articles</section>
    </>
  );
}

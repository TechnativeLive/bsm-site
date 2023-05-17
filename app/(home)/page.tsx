import { CalendarCarousel } from '@/components/calendar/carousel/calendar-carousel';
import { FeaturedLatest } from '@/components/latest/featured/featured-latest';
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
      <FeaturedLatest />
      <CalendarCarousel eventStatus={eventStatus} />
      <Standings />
      <section className={clsx(container, 'my-6 w-full')}>
        <div className='grid grid-cols-3 gap-x-8'>
          <div className='flex flex-col gap-4'>
            <div className='aspect-video rounded-lg bg-gradient-to-br from-slate-300'></div>
            <div className='flex flex-col gap-2 rounded-md bg-gradient-to-b from-slate-200 p-4 drop-shadow-sm'>
              <div className='text-lg font-normal uppercase tracking-widest'>
                Featured Article Title
              </div>
              <div>Description of article limitied to 3 lines maximum</div>
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            <div className='aspect-video rounded-lg bg-gradient-to-br from-slate-300'></div>
            <div className='flex flex-col gap-2 rounded-md bg-gradient-to-b from-slate-200 p-4 drop-shadow-sm'>
              <div className='text-lg font-normal uppercase tracking-widest'>
                Featured Article Title
              </div>
              <div>Description of article limitied to 3 lines maximum</div>
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            <div className='aspect-video rounded-lg bg-gradient-to-br from-slate-300'></div>
            <div className='flex flex-col gap-2 rounded-md bg-gradient-to-b from-slate-200 p-4 drop-shadow-sm'>
              <div className='text-lg font-normal uppercase tracking-widest'>
                Featured Article Title
              </div>
              <div>Description of article limitied to 3 lines maximum</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

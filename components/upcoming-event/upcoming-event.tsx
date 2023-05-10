import { containerRow } from '@/components/tailwind';
import { Countdown } from '@/components/upcoming-event/countdown';
import clsx from 'clsx';

type Event = {
  name: string; // round 4
  location: string; // teesside
  startDate: string; // Date string
  endDate: string; // Date string
};

export const UpcomingEvent = ({ allEvents }: { allEvents: Event[] }) => {
  const now = new Date();
  const futureEventIndex = allEvents.findIndex((event) => new Date(event.startDate) > now);

  if (futureEventIndex === -1) return null;

  if (futureEventIndex > 0) {
    const maybeCurrentEvent = allEvents[futureEventIndex - 1];
    if (new Date(maybeCurrentEvent.endDate) > now) {
      return <EventCountdown event={maybeCurrentEvent} />;
    }
  }

  return <EventCountdown event={allEvents[futureEventIndex]} />;
};

const EventCountdown = ({ event }: { event: Event }) => {
  const now = new Date();
  const startDate = new Date(event.startDate);
  const secondsTilStart = Math.floor((startDate.getTime() - now.getTime()) / 1000);

  return (
    <div className='w-full bg-primary font-semibold text-white'>
      <div className={clsx(containerRow, 'py-4')}>
        <div className='flex grow flex-col'>
          <div className='flex items-center justify-between'>
            <div className='rounded bg-secondary px-2 py-1 text-primary'>
              {startDate.toLocaleDateString()}
            </div>
            {/* <div>Time til thing:</div> */}
          </div>
          <div className='flex h-full items-center'>
            {event.location.toLocaleUpperCase()} {'//'} {event.name.toLocaleUpperCase()}
          </div>
        </div>
        {secondsTilStart <= 0 ? (
          <div className='flex items-center gap-4'>
            <div className='h-4 w-4 rounded-full bg-red-500' />
            <div className='font-display text-2xl'>LIVE NOW</div>
          </div>
        ) : (
          <Countdown secondsRemaining={secondsTilStart} />
        )}
      </div>
    </div>
  );
};

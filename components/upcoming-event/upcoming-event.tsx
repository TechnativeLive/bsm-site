import { EventStatus } from '@/app/(home)/page';
import { containerRow } from '@/components/tailwind';
import { Countdown } from '@/components/upcoming-event/countdown';
import clsx from 'clsx';
import Link from 'next/link';

type Event = {
  name: string; // round 4
  location: string; // teesside
  startDate: string; // Date string
  endDate: string; // Date string
};

export const UpcomingEvent = ({
  allEvents,
  eventStatus,
}: {
  allEvents: Event[];
  eventStatus: { index?: number; status: EventStatus };
}) => {
  if (!eventStatus.index) {
    return null;
  }

  return <EventCountdown event={allEvents[eventStatus.index!]} />;
};

const EventCountdown = ({ event }: { event: Event }) => {
  const now = new Date();
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);
  const secondsTilStart = Math.floor((startDate.getTime() - now.getTime()) / 1000);

  return (
    <div className='w-full bg-primary font-semibold text-white'>
      <div className={clsx(containerRow, 'py-4')}>
        <div className='flex grow flex-col'>
          <div className='flex items-center gap-4'>
            <div className='rounded bg-secondary px-2 py-1 text-primary'>
              {startDate.toLocaleDateString()}
            </div>
            {'-'}
            <div className='rounded bg-secondary px-2 py-1 text-primary'>
              {endDate.toLocaleDateString()}
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
            <Link href='https://www.youtube.com/c/technativelive' className='font-display text-2xl'>
              LIVE NOW
            </Link>
          </div>
        ) : (
          <Countdown secondsRemaining={secondsTilStart} />
        )}
      </div>
    </div>
  );
};

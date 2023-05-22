import { EventStatus } from '@/app/(home)/page';
import { containerRow } from '@/components/tailwind';
import { ordinalSuffix } from '@/utils/ordinal-suffix';
import clsx from 'clsx';
import dynamic from 'next/dynamic';

const EventClock = dynamic(() => import('./event-clock'), { ssr: false });

const fmtMonth = new Intl.DateTimeFormat('en-GB', { month: 'short' });

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
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);

  const startMonth = fmtMonth.format(startDate);
  const endMonth = fmtMonth.format(endDate);

  return (
    <div className='w-full border-b border-slate-300 bg-slate-100 font-semibold'>
      <div className={clsx(containerRow, 'py-4')}>
        <div className='flex grow flex-col'>
          <div className='flex items-center gap-4'>
            <div className='rounded bg-gradient-to-b from-slate-800 to-slate-600 px-2 py-1 font-normal text-white'>
              <DateString
                startDate={startDate.getDate()}
                startMonth={startMonth}
                endDate={endDate.getDate()}
                endMonth={endMonth}
                year={endDate.getFullYear()}
              />
            </div>
          </div>
          <div className='flex h-full items-center font-display text-2xl'>
            {event.location.toLocaleUpperCase()} {'//'} {event.name.toLocaleUpperCase()}
          </div>
        </div>
        <EventClock startTimeInMs={startDate.getTime()} />
      </div>
    </div>
  );
};

function DateString({
  startDate,
  startMonth,
  endDate,
  endMonth,
  year,
}: {
  startDate: number;
  endDate: number;
  startMonth: string;
  endMonth: string;
  year: number;
}) {
  return (
    <div className='uppercase'>
      <span>{startDate}</span>
      <span className='relative bottom-[0.1875rem] text-xs'>{ordinalSuffix(startDate)}</span>{' '}
      {startMonth !== endMonth && <span>{startMonth} </span>}
      <span>-</span> <span>{endDate}</span>
      <span className='relative bottom-[0.1875rem] text-xs'>{ordinalSuffix(endDate)}</span>{' '}
      <span>{endMonth}</span> <span>{year}</span>
    </div>
  );
}

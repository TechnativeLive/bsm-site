import { EventStatus } from '@/app/(home)/page';
import { containerRow } from '@/components/tailwind';
import { ordinalSuffix } from '@/utils/ordinal-suffix';
import { GetAttributesValues } from '@strapi/strapi';
import clsx from 'clsx';
import dynamic from 'next/dynamic';

const EventClock = dynamic(() => import('./event-clock'), { ssr: false });

const fmtMonth = new Intl.DateTimeFormat('en-GB', { month: 'short' });

export const UpcomingEvent = ({
  calendar,
  eventStatus,
}: {
  calendar: GetAttributesValues<'api::calendar-item.calendar-item'>[];
  eventStatus: { index?: number; status: EventStatus };
}) => {
  if (!eventStatus.index) {
    return null;
  }

  return <EventCountdown event={calendar[eventStatus.index!]} />;
};

const EventCountdown = ({
  event,
}: {
  event: GetAttributesValues<'api::calendar-item.calendar-item'>;
}) => {
  const startDate = new Date(event.start);
  const endDate = new Date(event.end);

  const startMonth = fmtMonth.format(startDate);
  const endMonth = fmtMonth.format(endDate);

  return (
    <div className='w-full border-b border-slate-300 bg-slate-100 font-semibold'>
      <div
        className={clsx(
          containerRow,
          'min-h-[10rem] flex-wrap gap-1 py-4 md:min-h-[6rem] md:flex-nowrap'
        )}
      >
        <div className='flex grow flex-col'>
          <div className='flex items-center gap-4'>
            <div className='rounded bg-gradient-to-b from-slate-800 to-slate-600 px-3 py-1 font-normal text-white'>
              <DateString
                startDate={startDate.getDate()}
                startMonth={startMonth}
                endDate={endDate.getDate()}
                endMonth={endMonth}
                year={endDate.getFullYear()}
              />
            </div>
          </div>
          <div className='flex h-full font-display text-2xl md:pr-6'>
            {event.track?.name.toLocaleUpperCase()} {'//'} {event.name.toLocaleUpperCase()}
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

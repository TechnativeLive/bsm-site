'use client';
import { DateString } from '@/components/date';
import { containerRow } from '@/components/tailwind';
import { useCurrentEvent } from '@/hooks/use-current-event';
import { GetAttributesValues } from '@strapi/strapi';
import clsx from 'clsx';
import dynamic from 'next/dynamic';

const EventClock = dynamic(() => import('./event-clock'), { ssr: false });

export const UpcomingEvent = ({
  calendar,
}: {
  calendar: GetAttributesValues<'api::calendar-item.calendar-item'>[];
}) => {
  const eventStatus = useCurrentEvent(calendar);

  if (!eventStatus.event) {
    return null;
  }

  return <EventCountdown event={eventStatus.event} />;
};

const EventCountdown = ({
  event,
}: {
  event: GetAttributesValues<'api::calendar-item.calendar-item'>;
}) => {
  const startDate = new Date(event.start);

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
            <div className='relative bg-slate-900 py-0.5 pl-3 pr-4 font-normal text-white after:corner-3 after:corner-slate-100'>
              {/* <DateString
                startDate={startDate.getDate()}
                startMonth={startMonth}
                endDate={endDate.getDate()}
                endMonth={endMonth}
                year={endDate.getFullYear()}
              /> */}
              <DateString event={event} />
            </div>
          </div>
          <div className='flex h-full items-end font-display text-2xl md:pr-6'>
            {event.track?.name.toLocaleUpperCase()} {'//'} {event.name.toLocaleUpperCase()}
          </div>
        </div>
        <EventClock startTimeInMs={startDate.getTime()} watchUrl={event.watchUrl} />
      </div>
    </div>
  );
};

// function DateString({
//   startDate,
//   startMonth,
//   endDate,
//   endMonth,
//   year,
// }: {
//   startDate: number;
//   endDate: number;
//   startMonth: string;
//   endMonth: string;
//   year: number;
// }) {
//   return (
//     <div className='uppercase'>
//       <span>{startDate}</span>
//       <span className='relative bottom-[0.1875rem] text-xs'>{ordinalSuffix(startDate)}</span>{' '}
//       {startMonth !== endMonth && <span>{startMonth} </span>}
//       <span>-</span> <span>{endDate}</span>
//       <span className='relative bottom-[0.1875rem] text-xs'>{ordinalSuffix(endDate)}</span>{' '}
//       <span>{endMonth}</span> <span>{year}</span>
//     </div>
//   );
// }

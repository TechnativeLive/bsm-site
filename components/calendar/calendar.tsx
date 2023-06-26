'use client';
import { CalendarItem } from '@/components/calendar/item';
import { useCurrentEvent } from '@/hooks/use-current-event';
import { GetAttributesValues } from '@strapi/strapi';

export const Calendar = async ({
  calendar,
}: {
  calendar: GetAttributesValues<'api::calendar-item.calendar-item'>[];
}) => {
  const eventStatus = useCurrentEvent(calendar);

  return (
    <div className='relative flex w-full flex-col flex-nowrap gap-3 overflow-x-auto px-12 py-6 scrollbar-thin scrollbar-track-slate-500/0 scrollbar-thumb-primary-700 max-md:max-h-[450px] md:max-w-max md:flex-row md:overflow-x-scroll'>
      {calendar.map((event, i) => (
        <CalendarItem
          key={i}
          item={event}
          index={i}
          status={
            i < eventStatus.index
              ? 'complete'
              : i === eventStatus.index
              ? eventStatus.status
              : 'incomplete'
          }
        />
      ))}
    </div>
  );
};

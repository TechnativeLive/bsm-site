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
    <div className='relative flex w-full flex-col flex-nowrap gap-3 overflow-x-scroll px-12 py-6 scrollbar-thin scrollbar-track-slate-500/0 scrollbar-thumb-primary-700 md:max-w-max md:flex-row'>
      {calendar.map((event, i) => (
        <CalendarItem
          key={i}
          item={event}
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

  // return (
  //   <>
  //     <div className='relative hidden w-full max-w-max flex-nowrap gap-3 overflow-x-scroll p-6 px-12 scrollbar-thin scrollbar-track-slate-500/0 scrollbar-thumb-primary-700 md:flex'>
  //       {calendar?.map((event, i) => (
  //         <CalendarCarouselItem
  //           key={i}
  //           item={event}
  //           status={i === eventStatus.index ? eventStatus.status : 'complete'}
  //         />
  //       ))}
  //     </div>
  //     <div className='max-h-[450px] w-full overflow-x-auto scrollbar-thin scrollbar-track-slate-500/0 scrollbar-thumb-primary-700 md:hidden'>
  //       <ul className='relative mx-auto grid max-w-max list-none grid-cols-1 items-center divide-y divide-primary-500/20 px-6 py-3 text-white sm:px-12'>
  //         {calendar?.map((item, i) => (
  //           <CalendarCarouselItemMobile key={i} item={item} />
  //         ))}
  //       </ul>
  //     </div>
  //   </>
  // );
};

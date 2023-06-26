'use client';
import { CalendarCarouselItem } from '@/components/calendar/carousel/carousel-item';
import { CalendarCarouselItemMobile } from '@/components/calendar/carousel/mobile-item';
import { useCurrentEvent } from '@/hooks/use-current-event';
import { GetAttributesValues } from '@strapi/strapi';

export const CalendarCarousel = async ({
  calendar,
}: {
  calendar: GetAttributesValues<'api::calendar-item.calendar-item'>[];
}) => {
  const eventStatus = useCurrentEvent(calendar);

  // TODO: remove gap in carousel
  return (
    <>
      <div className='relative hidden w-full max-w-max flex-nowrap gap-3 overflow-x-scroll p-6 px-12 scrollbar-thin scrollbar-track-slate-500/0 scrollbar-thumb-primary-700 md:flex'>
        {calendar?.map((event, i) => (
          <CalendarCarouselItem
            key={i}
            item={event}
            status={i === eventStatus.index ? eventStatus.status : 'complete'}
          />
        ))}
      </div>
      <div className='max-h-[450px] w-full overflow-x-auto scrollbar-thin scrollbar-track-slate-500/0 scrollbar-thumb-primary-700 md:hidden'>
        <ul className='relative mx-auto grid max-w-max list-none grid-cols-1 items-center divide-y divide-primary-500/20 px-6 py-3 text-white sm:px-12'>
          {calendar?.map((item, i) => (
            <CalendarCarouselItemMobile key={i} item={item} />
          ))}
        </ul>
      </div>
    </>
  );
};

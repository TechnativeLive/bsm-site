import { EventStatus } from '@/app/(home)/page';
import { CalendarCarouselItem } from '@/components/calendar/carousel/carousel-item';
import { CalendarCarouselItemMobile } from '@/components/calendar/carousel/mobile-item';
import { getCalendar } from '@/lib/strapi/homepage';

export const CalendarCarousel = async ({
  eventStatus,
}: {
  eventStatus: { index?: number; status: EventStatus };
}) => {
  const rounds = await getCalendar();

  // TODO: remove gap in carousel
  return (
    <>
      <div className='relative hidden w-full max-w-max flex-nowrap gap-3 overflow-x-scroll p-6 px-12 scrollbar-thin scrollbar-track-slate-500/0 scrollbar-thumb-primary-700 md:flex'>
        {rounds?.map((event, i) => (
          <CalendarCarouselItem
            key={i}
            item={event}
            status={i === eventStatus.index ? eventStatus.status : 'inactive'}
          />
        ))}
      </div>
      <div className='max-h-[450px] w-full overflow-x-auto scrollbar-thin scrollbar-track-slate-500/0 scrollbar-thumb-primary-700 md:hidden'>
        <ul className='relative mx-auto grid max-w-max list-none grid-cols-1 items-center gap-3 p-6 px-12 text-white'>
          {rounds?.map((event, i) => (
            <CalendarCarouselItemMobile key={i} event={event} />
          ))}
        </ul>
      </div>
    </>
  );
};

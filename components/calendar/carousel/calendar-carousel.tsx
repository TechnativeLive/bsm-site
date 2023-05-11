import { EventStatus } from '@/app/(home)/page';
import { CarouselCalendarNavButton } from '@/components/calendar/carousel/calendar-nav-button';
import { CalendarCarouselItem } from '@/components/calendar/carousel/carousel-item';
import { sampleEvents } from '@/components/upcoming-event/sample-data';

export const CalendarCarousel = ({
  eventStatus,
}: {
  eventStatus: { index?: number; status: EventStatus };
}) => {
  return (
    <div className='flex w-full flex-col items-center bg-primary-950 bg-gradient-to-b'>
      {/* <CarouselHeader /> */}
      <div className='flex w-full flex-nowrap gap-3 overflow-x-scroll p-6 px-12 scrollbar-thin scrollbar-track-slate-500/0 scrollbar-thumb-primary-700'>
        {sampleEvents.map((event, i) => (
          <CalendarCarouselItem
            key={i}
            event={event}
            status={i === eventStatus.index ? eventStatus.status : 'inactive'}
          />
        ))}
      </div>
    </div>
  );
};

// Below is a header with arrow buttons - implementation of focus control is awkward so ditching it
const CarouselHeader = () => (
  <div className='flex items-center gap-4 p-4 text-white'>
    <CarouselCalendarNavButton action={'prev'} />
    <h2 className='font-bold uppercase'>Calendar</h2>
    <CarouselCalendarNavButton action='next' />
  </div>
);

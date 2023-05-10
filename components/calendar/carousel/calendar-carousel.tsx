import { CalendarCarouselItem } from '@/components/calendar/carousel/carousel-item';
import { sampleEvents } from '@/components/upcoming-event/sample-data';

export const CalendarCarousel = () => {
  return (
    <div className='flex w-full flex-col items-center bg-primary-950 bg-gradient-to-b'>
      {/* Below is a header with arrow buttons - implementation is awkward so ditching it */}
      {/* <div className='flex items-center gap-4 p-4 text-white'>
        <CarouselCalendarNavButton action={'prev'} />
        <h2 className='font-bold uppercase'>Calendar</h2>
        <CarouselCalendarNavButton action='next' />
      </div> */}
      <div className='flex w-full flex-nowrap gap-3 overflow-auto p-6 px-12'>
        {sampleEvents.map((event, i) => (
          <CalendarCarouselItem key={i} event={event} />
        ))}
      </div>
    </div>
  );
};

import { CalendarCarouselItem } from '@/components/calendar/carousel/carousel-item';
import { sampleEvents } from '@/components/upcoming-event/sample-data';

export const CalendarCarousel = () => {
  return (
    <div className='flex w-full flex-col items-center bg-primary-950 bg-gradient-to-b'>
      <div className='flex items-center gap-4 p-4 text-white'>
        <button className='h-8 w-8 rounded-full bg-primary-200/20 font-black hover:bg-primary-200/30'>
          {'<'}
        </button>
        <h2 className='font-bold uppercase'>Calendar</h2>
        <button className='h-8 w-8 rounded-full bg-primary-200/20 font-black hover:bg-primary-200/30'>
          {'>'}
        </button>
      </div>
      <div className='flex w-full flex-nowrap gap-3 overflow-auto px-12 pb-6'>
        {sampleEvents.map((event, i) => (
          <CalendarCarouselItem key={i} event={event} />
        ))}
      </div>
    </div>
  );
};

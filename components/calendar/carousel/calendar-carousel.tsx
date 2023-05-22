import { EventStatus } from '@/app/(home)/page';
import { CalendarCarouselItem } from '@/components/calendar/carousel/carousel-item';
import { sampleEvents } from '@/components/upcoming-event/sample-data';
import Image from 'next/image';

export const CalendarCarousel = ({
  eventStatus,
}: {
  eventStatus: { index?: number; status: EventStatus };
}) => {
  return (
    <div className='relative flex w-full max-w-max flex-nowrap gap-3 overflow-x-scroll p-6 px-12 scrollbar-thin scrollbar-track-slate-500/0 scrollbar-thumb-primary-700'>
      {/* <Image
          src='/gradient.png'
          fill
          alt='Soft gradient background'
          className='absolute inset-0 opacity-50 blur-2xl'
        /> */}
      {sampleEvents.map((event, i) => (
        <CalendarCarouselItem
          key={i}
          event={event}
          status={i === eventStatus.index ? eventStatus.status : 'inactive'}
        />
      ))}
    </div>
  );
};

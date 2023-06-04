import { EventStatus } from '@/app/(home)/page';
import { CalendarCarouselItem } from '@/components/calendar/carousel/carousel-item';
import { getCalendar } from '@/lib/strapi/homepage';
import clsx from 'clsx';
import Image from 'next/image';
import { Fragment } from 'react';

const schedule = [
  { day: 'Sat', label: 'Gates open', time: '07:30' },
  { day: 'Sat', label: 'Free Practice 1', time: '09:00' },
  { day: 'Sat', label: 'Qualifying 1', time: '10:00' },
  { day: 'Sat', label: 'Free Practice 2', time: '10:30' },
  { day: 'Sat', label: 'Qualifying 2', time: '11:30' },
  {},
  { day: 'Sun', label: 'Gates open', time: '07:30' },
  { day: 'Sun', label: 'Warm up', time: '09:00' },
  { day: 'Sun', label: 'Race 1', time: '10:30' },
  { day: 'Sun', label: 'Race 2', time: '12:30' },
];

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
      <div className='max-h-96 w-full overflow-x-auto scrollbar-thin scrollbar-track-slate-500/0 scrollbar-thumb-primary-700 md:hidden'>
        <ul className='relative mx-auto grid max-w-max list-none grid-cols-1 items-center gap-3 p-6 px-12 text-white'>
          {rounds?.map((event, i) => (
            <li key={i}>
              <details className='group flex cursor-pointer list-none flex-col px-8'>
                <summary className='flex items-center gap-2'>
                  <div className='flex flex-col items-center justify-center pr-4'>
                    {event.name.toLowerCase().startsWith('round') && (
                      <>
                        <p className='font-semibold leading-5'>RD</p>
                        <p className='pr-1 text-2xl font-bold italic leading-5'>
                          {event.name.split(' ')[1].trim()}
                        </p>
                      </>
                    )}
                    <p
                      className={clsx(
                        'i-ic-baseline-keyboard-arrow-down transition-transform group-open:rotate-180',
                        !event.name.toLowerCase().startsWith('round') && 'text-2xl'
                      )}
                    />
                  </div>
                  <div className={'pointer-events-none relative h-24 w-32'}>
                    <Image
                      src={event.track?.layout.url}
                      alt={event.track?.name ?? 'Track layout'}
                      fill
                      className='select-none object-contain'
                    />
                  </div>
                  <div className='flex grow flex-col items-center'>
                    {event.track?.name && (
                      <p className='text-center uppercase'>{event.track.name}</p>
                    )}
                    {!event.name.toLowerCase().startsWith('round') && (
                      <p className='text-center'>{event.name}</p>
                    )}
                    <p className='text-center'>
                      {new Date(event.start).getDate()}
                      {' - '}
                      {new Date(event.end).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                    </p>
                  </div>
                </summary>
                <div className='grid cursor-auto grid-rows-[0fr] transition-[grid-template-rows] group-open:grid-rows-[1fr]'>
                  <p className='grid h-full min-w-[9rem] grid-cols-[auto,1fr,auto] content-center justify-items-start gap-x-2 overflow-hidden pl-6 text-sm uppercase'>
                    {schedule.map((scheduleItem, i) =>
                      scheduleItem.day ? (
                        <Fragment key={i}>
                          <div className='font-mono'>{scheduleItem.day}</div>
                          <div className='whitespace-nowrap font-semibold'>
                            {scheduleItem.label}
                          </div>
                          <div className='font-mono font-semibold'>{scheduleItem.time}</div>
                        </Fragment>
                      ) : (
                        <div className='col-span-3' key={i}>
                          &emsp;
                        </div>
                      )
                    )}
                  </p>
                </div>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

import { GetAttributesValues } from '@strapi/strapi';
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

export const CalendarCarouselItemMobile = ({
  event,
}: {
  event: GetAttributesValues<'api::calendar-item.calendar-item'>;
}) => (
  <li>
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
          {event.track?.name && <p className='text-center uppercase'>{event.track.name}</p>}
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
      <div className='grid h-full min-w-[9rem] cursor-auto grid-cols-[auto,1fr,auto] content-center justify-items-start gap-x-2 overflow-hidden pl-6 text-sm uppercase'>
        {schedule.map((scheduleItem, i) =>
          scheduleItem.day ? (
            <Fragment key={i}>
              <p className='font-mono'>{scheduleItem.day}</p>
              <p className='whitespace-nowrap font-semibold'>{scheduleItem.label}</p>
              <p className='font-mono font-semibold'>{scheduleItem.time}</p>
            </Fragment>
          ) : (
            <p className='col-span-3' key={i}>
              &emsp;
            </p>
          )
        )}
      </div>
    </details>
  </li>
);

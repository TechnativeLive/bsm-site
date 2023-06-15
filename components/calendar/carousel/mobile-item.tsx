import { EventStatus } from '@/app/(home)/page';
import { StrapiMedia } from '@/types/strapi';
import { GetAttributesValues } from '@strapi/strapi';
import clsx from 'clsx';
import Image from 'next/image';
import { Fragment } from 'react';

type Schedule = ({ day: string; label: string; time: string } | Record<never, never>)[];

export const CalendarCarouselItemMobile = ({
  item,
  status,
}: {
  item: GetAttributesValues<'api::calendar-item.calendar-item'>;
  status: EventStatus;
}) => {
  const schedule = item.schedule as Schedule | undefined;

  return (
    <li>
      <details className='group flex cursor-pointer list-none flex-col sm:px-2'>
        <summary className='flex items-center gap-2'>
          <div className='flex flex-col items-center justify-center pr-4'>
            {item.name.toLowerCase().startsWith('round') && (
              <>
                <p className='font-semibold leading-5'>RD</p>
                <p className='pr-1 text-2xl font-bold italic leading-5'>
                  {item.name.split(' ')[1].trim()}
                </p>
              </>
            )}
            <p
              className={clsx(
                'i-ic-baseline-keyboard-arrow-down transition-transform group-open:rotate-180',
                !item.name.toLowerCase().startsWith('round') && 'text-2xl'
              )}
            />
          </div>
          <div className={'pointer-events-none relative h-24 w-32'}>
            <Image
              src={item.track?.layout.url}
              alt={item.track?.name ?? 'Track layout'}
              fill
              className='select-none object-contain'
            />
          </div>
          <div className='flex grow flex-col items-center'>
            {item.track?.name && <p className='text-center uppercase'>{item.track.name}</p>}
            {!item.name.toLowerCase().startsWith('round') && (
              <p className='text-center'>{item.name}</p>
            )}
            <p className='text-center'>
              {new Date(item.start).getDate()}
              {' - '}
              {new Date(item.end).toLocaleDateString(undefined, { dateStyle: 'medium' })}
            </p>
          </div>
        </summary>
        <div className='grid h-full min-w-[9rem] cursor-auto grid-cols-[auto,1fr,auto] content-center justify-items-start gap-x-2 overflow-hidden pb-4 text-sm uppercase'>
          {schedule ? (
            schedule.map((scheduleItem, i) =>
              'day' in scheduleItem &&
              scheduleItem.day !== '' &&
              scheduleItem.label !== '' &&
              scheduleItem.time !== '' ? (
                <Fragment key={i}>
                  <p className='font-mono'>{scheduleItem.day}</p>
                  <p className='whitespace-nowrap font-semibold'>{scheduleItem.label}</p>
                  <p className='font-mono font-semibold'>{scheduleItem.time}</p>
                </Fragment>
              ) : (
                <div className='col-span-3' key={i}>
                  &emsp;
                </div>
              )
            )
          ) : (
            <div className='col-span-3 justify-self-center'>
              Schedule not
              <br /> yet available
            </div>
          )}
        </div>

        {item.schedulePDF && (
          <div className='mb-2 flex items-center justify-center gap-2'>
            {(item.schedulePDF as StrapiMedia[]).map((pdf) => (
              <a
                key={pdf.id}
                href={pdf.url}
                target='_blank'
                className='z-40 rounded-sm border border-primary-500 px-2.5 py-0.5 text-sm font-semibold uppercase transition-colors hover:border-secondary'
              >
                {pdf.caption ?? 'Schedule'}
              </a>
            ))}
          </div>
        )}

        <div className='mb-2 flex items-center justify-center gap-2'>
          {item.ticketUrl && (
            <a
              href={item.ticketUrl}
              target='_blank'
              className='z-40 mx-auto mb-4 w-fit bg-primary-500 px-3 py-1 text-sm font-semibold uppercase transition-colors hover:text-primary'
            >
              Book Tickets
            </a>
          )}

          {item.watchUrl && (
            <a
              href={item.watchUrl}
              target='_blank'
              className='z-40 bg-secondary-500 px-3 py-1 text-sm font-semibold uppercase text-primary transition-colors hover:bg-secondary-400'
            >
              Watch Live
            </a>
          )}
        </div>
      </details>
    </li>
  );
};

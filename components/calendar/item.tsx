'use client';
import { DateString } from '@/components/date';
import { EventStatus } from '@/hooks/use-current-event';
import { StrapiMedia } from '@/types/strapi';
import { GetAttributesValues } from '@strapi/strapi';
import clsx from 'clsx';
import Image from 'next/image';
import { FocusEventHandler, Fragment, MouseEventHandler, useEffect, useRef } from 'react';

const handleClick: MouseEventHandler<HTMLButtonElement> = (ev) => {
  ev.stopPropagation();
  if (ev.currentTarget) {
    ev.currentTarget.focus();
  }
};

const scrollIntoView = (currentTarget: EventTarget & HTMLButtonElement) =>
  currentTarget.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'center',
  });

const handleFocus: FocusEventHandler<HTMLButtonElement> = (ev) => {
  ev.stopPropagation();
  if (ev.currentTarget && ev.target.tagName.toLowerCase() !== 'a') {
    scrollIntoView(ev.currentTarget);
  }
};

const colors = {
  complete: ['bg-primary-800 text-slate-300', 'before:corner-primary-800'],
  incomplete: ['bg-primary-700 text-white', 'before:corner-primary-700'],
  next: ['bg-secondary text-white', 'before:corner-secondary'],
  active: ['bg-primary-500 text-white', 'before:corner-primary-500'],
};

export const CalendarItem = ({
  item,
  status,
}: {
  item: GetAttributesValues<'api::calendar-item.calendar-item'>;
  status: EventStatus;
}) => {
  const el = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const parent = el.current?.parentElement;
    if (el.current && parent && (status === 'active' || status === 'next')) {
      const midpoint = el.current.offsetLeft + el.current.offsetWidth / 2;
      parent.scrollTo({ left: midpoint - parent.offsetWidth / 2, behavior: 'smooth' });
    }
  }, [status]);

  if (!item || !item.track?.name) return null;

  const roundNumber = Number(item.name.toLowerCase().replace('round', ''));
  const isRound = !Number.isNaN(roundNumber);

  return (
    <button
      ref={el}
      onClick={handleClick}
      onFocus={handleFocus}
      className={clsx(
        'group relative flex shrink-0 select-text flex-col overflow-hidden p-3 focus:outline-none md:flex-row',
        'before:corner-3 before:corner-primary',
        colors[status][0]
      )}
    >
      <div
        className={clsx(
          'absolute inset-[3px] bg-primary before:corner-2.5 after:corner-1.5 after:corner-primary',
          colors[status][1]
        )}
      />
      <div className='absolute inset-0 bg-gradient-to-br from-white opacity-0 mix-blend-overlay transition-opacity group-hover:opacity-100 group-focus:opacity-100' />
      <div className='z-20 flex h-full items-center max-md:w-full max-md:justify-around md:flex-col'>
        {isRound && (
          <p className='md:-mb-2 md:ml-auto md:mr-2'>
            <span className='align-top text-sm font-semibold'>ROUND </span>
            <span className='text-3xl font-bold italic leading-[0.9]'>{roundNumber}</span>
          </p>
        )}
        <div className='relative h-24 w-32 md:mb-2'>
          <Image
            src={item.track?.layout.url}
            alt={item.track.name}
            fill
            className={clsx('select-none object-contain', status === 'complete' && 'opacity-80')}
          />
        </div>
        <div className='flex flex-col items-center md:grow'>
          <p className='mb-auto w-min font-semibold uppercase tracking-widest'>{item.track.name}</p>
          {!isRound && <p className='italic'>{item.name}</p>}
          <div className='mb-1 mt-2 max-w-fit text-sm font-semibold tracking-wider'>
            <DateString event={item} />
          </div>
        </div>
      </div>

      <div
        className={clsx(
          'wrapper',
          'grid transition-all duration-300 ease-slide max-md:grid-rows-[0fr] md:grid-cols-[0fr]',
          'max-md:group-focus-within:grid-rows-[1fr] md:group-focus-within:grid-cols-[1fr]',
          'z-20 w-full text-xs md:h-full'
        )}
      >
        <div className={clsx('inner', 'overflow-hidden')}>
          <div className='flex h-max flex-col items-center justify-center transition-transform duration-300 ease-slide group-focus-within:translate-x-0 group-focus-within:translate-y-0 max-md:translate-y-24 md:mx-auto md:inline-flex md:w-max md:translate-x-24 md:pl-6'>
            <Schedule files={item.files} schedule={item.schedule} />

            <div className='flex items-center justify-center gap-2'>
              {item.ticketUrl && status !== 'complete' && (
                <a
                  href={'item.ticketUrl'}
                  target='_blank'
                  className='z-40 rounded-sm border border-secondary-500 px-3 py-1 text-sm font-semibold uppercase transition-colors hover:bg-secondary-500 hover:text-primary    '
                >
                  Tickets
                </a>
              )}

              {item.watchUrl && (
                <a
                  href={item.watchUrl}
                  target='_blank'
                  className={clsx(
                    'z-40 rounded-sm border px-3 py-1 text-sm font-semibold uppercase transition-colors hover:text-primary',
                    status === 'active'
                      ? 'border-red-500 hover:bg-orange-500'
                      : 'border-orange-500 hover:bg-amber-500'
                  )}
                >
                  Watch{status === 'active' ? ' Live' : ''}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

const Schedule = ({
  schedule,
  files = [],
}: {
  schedule: GetAttributesValues<'utils.schedule'>[] | undefined;
  files?: any[];
}) => {
  if (!schedule) {
    return (
      <div className=''>
        Schedule not
        <br /> yet available
      </div>
    );
  }

  return (
    <div className='flex flex-col divide-primary-500/50 pb-3 max-md:w-full md:h-full md:min-w-[9rem] md:divide-y'>
      {files && (
        <div className='flex flex-wrap items-center justify-center gap-x-3 pb-1 font-display text-sm uppercase'>
          {files.map((file) => (
            <a
              key={file.id}
              href={file.url}
              className='flex items-center text-primary-500 hover:underline'
            >
              {file.caption}
              <span className='i-ic-baseline-launch ml-1 inline-block' />
            </a>
          ))}
        </div>
      )}
      <div className='flex justify-center divide-primary-500/50 max-md:divide-x md:flex-col md:divide-y'>
        {schedule.length > 0 ? (
          schedule.map((day, i) => {
            return (
              <div
                key={i}
                className='flex flex-col text-slate-100 first:pl-0 last:pr-0 max-md:px-4 md:pt-2'
              >
                <div className='mb-1 flex justify-between font-display text-sm uppercase'>
                  <p className='pr-4'>{day.title}</p>
                  {day.file && (
                    <a
                      className='flex items-center text-primary-500 hover:underline'
                      href={day.file.url}
                    >
                      Schedule
                      <span className='i-ic-baseline-launch ml-1 inline-block' />
                    </a>
                  )}
                </div>
                <div className='flex flex-col md:pb-2'>
                  {day.items?.map((item, index) => (
                    <div key={index} className='flex items-center justify-between'>
                      <div className='font-semibold uppercase tracking-wider'>{item.label}</div>
                      {(item.start || item.end) && (
                        <div className='font-mono'>
                          {item.start && <span>{item.start}</span>}
                          {item.start && item.end && <span> - </span>}
                          {item.end && <span>{item.end}</span>}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <div className='flex h-full items-center justify-center text-base font-light italic tracking-wide'>
            Schedule not
            <br /> yet available
          </div>
        )}
      </div>
    </div>
  );
};

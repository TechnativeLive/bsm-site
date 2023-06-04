'use client';
import { EventStatus } from '@/app/(home)/page';
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
  if (ev.currentTarget) {
    scrollIntoView(ev.currentTarget);
  }
};

export const CalendarCarouselItem = ({
  item,
  status,
}: {
  item: GetAttributesValues<'api::calendar-item.calendar-item'>;
  status: EventStatus;
}) => {
  const el = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (el.current && el.current.parentElement && status !== 'inactive') {
      const midpoint = el.current.offsetLeft + el.current.offsetWidth / 2;
      el.current.parentElement.scrollLeft = midpoint - el.current.parentElement.offsetWidth / 2;
    }
  }, [status]);

  if (!item || !item.track?.name) return null;

  // const schedule: { day: string, label: string; time: string }[] = Array.isArray(item.schedule)
  //   ? item.schedule
  //   : [];

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

  return (
    <button
      ref={el}
      onClick={handleClick}
      onFocus={handleFocus}
      className={clsx(
        'group relative flex shrink-0 select-text overflow-hidden p-4 text-white focus:outline-none',
        'bg-gradient-to-br to-85%',
        'rounded-md first:rounded-l-2xl last:rounded-r-2xl',
        'before:absolute before:inset-0.5 before:z-0 before:bg-primary',
        'before:rounded first:before:rounded-l-[0.875rem] last:before:rounded-r-[0.875rem]',
        'after:z-10 after:rounded-sm first:after:rounded-l-xl last:after:rounded-r-xl',
        'after:absolute after:inset-1 after:bg-gradient-to-b after:from-primary-300/30 after:to-75%',
        'after:opacity-0 after:transition-opacity hover:after:opacity-100 focus:after:opacity-100',
        status === 'upcoming'
          ? 'from-secondary'
          : status === 'active'
          ? 'from-red-500'
          : 'from-primary-500/40'
      )}
    >
      <div className='z-20 flex flex-col items-center gap-2'>
        <div className={'relative h-24 w-32 text-white'}>
          <Image
            src={item.track?.layout.url}
            alt={item.track.name}
            fill
            className='select-none object-contain'
          />
        </div>
        <h3 className='uppercase'>{item.track.name}</h3>
        <h4>{item.name}</h4>
        <h4>
          {/* TODO: fix this mess */}
          {new Date(item.start).getDate()}
          {' - '}
          {new Date(item.end).toLocaleDateString(undefined, { dateStyle: 'medium' })}
        </h4>
      </div>
      <div
        className={clsx(
          'z-20 h-full w-0 text-xs uppercase transition-all ease-slide group-focus:w-60'
        )}
      >
        <div className='h-full translate-x-24 transition-transform duration-300 ease-slide group-focus:translate-x-0'>
          {/* {status !== 'inactive' && (
            <p className='min-w-[9rem] pl-6 text-sm font-normal uppercase tracking-widest'>
              {status}
            </p>
          )} */}
          <p className='grid h-full min-w-[9rem] grid-cols-[auto,1fr,auto] content-center justify-items-start gap-x-2 pl-6'>
            {schedule.map((scheduleItem, i) =>
              scheduleItem.day ? (
                <Fragment key={i}>
                  <div className='font-mono'>{scheduleItem.day}</div>
                  <div className='whitespace-nowrap font-semibold'>{scheduleItem.label}</div>
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
      </div>
    </button>
  );
};

// clsx(
//   'group relative flex shrink-0 select-text overflow-hidden p-4 text-white focus:outline-none',
//   'before:absolute before:inset-0 before:z-0 before:border before:border-slate-100 before:bg-slate-100/40 before:mix-blend-overlay',
//   'before:rounded-md first-of-type:before:rounded-l-2xl last-of-type:before:rounded-r-2xl',
//   status === 'upcoming'
//     ? 'from-secondary-700'
//     : status === 'active'
//     ? 'from-red-700'
//     : 'from-primary-700/40'
// )

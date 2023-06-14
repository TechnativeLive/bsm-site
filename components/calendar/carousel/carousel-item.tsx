'use client';
import { EventStatus } from '@/app/(home)/page';
import { GetAttributesValues } from '@strapi/strapi';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
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

type Schedule = ({ day: string; label: string; time: string } | Record<never, never>)[];

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
      console.log({ scrollLeft: midpoint - el.current.parentElement.offsetWidth / 2 });
    }
  }, [status]);

  if (!item || !item.track?.name) return null;

  const schedule = item.schedule as Schedule | undefined;

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
        <p className='font-semibold uppercase'>{item.track.name}</p>
        <p>{item.name}</p>
        <p className='font-light'>
          {/* TODO: fix this mess */}
          {new Date(item.start).getDate()}
          {' - '}
          {new Date(item.end).toLocaleDateString(undefined, { dateStyle: 'medium' })}
        </p>
      </div>
      <div
        className={clsx(
          'z-20 h-full w-0 text-xs uppercase transition-all ease-slide group-focus-within:w-60'
        )}
      >
        <div className='flex h-full w-60 translate-x-24 flex-col items-center justify-center pl-6 transition-transform duration-300 ease-slide group-focus-within:translate-x-0'>
          {/* {status !== 'inactive' && (
            <p className='min-w-[9rem] pl-6 text-sm font-normal uppercase tracking-widest'>
              {status}
            </p>
          )} */}

          <div className='grid h-full min-w-[9rem] grid-cols-[auto,1fr,auto] content-center justify-items-start gap-x-2 pb-3'>
            {schedule ? (
              schedule.map((scheduleItem, i) =>
                'day' in scheduleItem &&
                scheduleItem.day !== '' &&
                scheduleItem.label !== '' &&
                scheduleItem.time !== '' ? (
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
              )
            ) : (
              <div className='col-span-3 justify-self-center'>
                Schedule not
                <br /> yet available
              </div>
            )}
          </div>

          <div className='flex flex-col justify-center gap-2'>
            {item.ticketUrl && (
              <a
                href={item.ticketUrl}
                target='_blank'
                className='z-40 bg-primary-500 px-3 py-1 text-sm font-semibold uppercase transition-colors hover:text-primary'
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
                Watch
              </a>
            )}
          </div>
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

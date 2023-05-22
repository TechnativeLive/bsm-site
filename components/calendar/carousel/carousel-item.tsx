'use client';
import { EventStatus } from '@/app/(home)/page';
import { sampleEvents } from '@/components/upcoming-event/sample-data';
import clsx from 'clsx';
import Image from 'next/image';
import { FocusEventHandler, MouseEventHandler, useEffect, useRef } from 'react';

type Event = (typeof sampleEvents)[number];

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

export const CalendarCarouselItem = ({ event, status }: { event: Event; status: EventStatus }) => {
  const el = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (el.current && el.current.parentElement && status !== 'inactive') {
      const midpoint = el.current.offsetLeft + el.current.offsetWidth / 2;
      el.current.parentElement.scrollLeft = midpoint - el.current.parentElement.offsetWidth / 2;
    }
  }, [status]);
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
          <Image src={event.trackImage} alt={event.location} fill />
        </div>
        <h3 className='uppercase'>{event.location}</h3>
        <h4>{event.name}</h4>
        <h4>
          {/* TODO: fix this mess */}
          {new Date(event.startDate).getDate()}
          {' - '}
          {new Date(event.endDate).toLocaleDateString(undefined, { dateStyle: 'medium' })}
        </h4>
      </div>
      <div className={clsx('z-20 h-full w-0 transition-all ease-slide group-focus:w-36')}>
        {status !== 'inactive' && <p className='min-w-[9rem] pl-6 uppercase underline'>{status}</p>}
        <p className='min-w-[9rem] pl-6'>Schedule info</p>
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

'use client';
import { sampleEvents } from '@/components/upcoming-event/sample-data';
import clsx from 'clsx';
import Image from 'next/image';
import { FocusEventHandler, MouseEventHandler, useCallback } from 'react';

type Event = (typeof sampleEvents)[number];

export const CalendarCarouselItem = ({ event }: { event: Event }) => {
  const onClick = useCallback<MouseEventHandler<HTMLButtonElement>>((ev) => {
    ev.stopPropagation();
    if (ev.currentTarget) {
      ev.currentTarget.focus();
    }
  }, []);

  const onFocus = useCallback<FocusEventHandler<HTMLButtonElement>>((ev) => {
    ev.stopPropagation();
    if (ev.currentTarget) {
      ev.currentTarget.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, []);

  return (
    <button
      onClick={onClick}
      onFocus={onFocus}
      className={clsx(
        'group relative flex shrink-0 overflow-hidden border border-neutral p-4 text-white focus:outline-none',
        'rounded-md first:rounded-l-2xl last:rounded-r-2xl',
        'after:rounded first:after:rounded-l-xl last:after:rounded-r-xl',
        'after:absolute after:inset-1 after:bg-gradient-to-b after:from-primary-300/30 after:to-75%',
        'after:opacity-0 after:transition-opacity hover:after:opacity-100 focus:after:opacity-100'
      )}
    >
      <div className='flex flex-col items-center gap-2'>
        <div className={'relative h-24 w-32'}>
          <Image src={event.trackImage} alt={event.location} fill />
        </div>
        <h3>{event.location}</h3>
        <h4>{event.name}</h4>
        <h4>
          {/* TODO: fix this mess */}
          {new Date(event.startDate).getDate()}
          {' - '}
          {new Date(event.endDate).toLocaleDateString(undefined, { dateStyle: 'medium' })}
        </h4>
      </div>
      <div className={clsx('h-full w-0 transition-all ease-slide group-focus:w-36')}>
        <p className='min-w-[9rem] pl-6'>some info</p>
      </div>
    </button>
  );
};

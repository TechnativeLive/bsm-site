'use client';

import { useInterval } from '@/hooks/use-interval';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';

const EventClock = ({ startTimeInMs }: { startTimeInMs: number }) => {
  const [secondsRemaining, setSecondsRemaining] = useState(() =>
    Math.floor((startTimeInMs - Date.now()) / 1000)
  );

  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      }
    },
    // passing null stops the interval
    secondsRemaining > 0 ? 1000 : null
  );

  return (
    <div className='flex w-full shrink-0 animate-appear items-center md:w-auto'>
      {secondsRemaining <= 0 ? (
        <div className='flex items-center gap-4'>
          <div className='h-4 w-4 rounded-full bg-red-500' />
          <a
            href='https://www.youtube.com/c/technativelive'
            target='_blank'
            className='font-display text-2xl'
          >
            LIVE NOW
          </a>
        </div>
      ) : (
        <Countdown secondsRemaining={secondsRemaining} />
      )}
    </div>
  );
};

export const Countdown = ({ secondsRemaining }: { secondsRemaining: number }) => {
  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;
  const hoursRemaining = (minutesRemaining - minutesToDisplay) / 60;
  const hoursToDisplay = hoursRemaining % 24;
  const daysRemaining = (hoursRemaining - hoursToDisplay) / 24;

  return (
    <div className='grid w-full grid-cols-4 justify-stretch gap-1 overflow-hidden rounded-md font-light md:w-auto'>
      <CountdownGridItem>DAYS</CountdownGridItem>
      <CountdownGridItem>HOURS</CountdownGridItem>
      <CountdownGridItem>MINS</CountdownGridItem>
      <CountdownGridItem>SECS</CountdownGridItem>
      <CountdownGridItem className='font-display text-2xl font-medium'>
        {daysRemaining.toString().padStart(2, '0')}
      </CountdownGridItem>
      <CountdownGridItem className='font-display text-2xl font-medium'>
        {hoursToDisplay.toString().padStart(2, '0')}
      </CountdownGridItem>
      <CountdownGridItem className='font-display text-2xl font-medium'>
        {minutesToDisplay.toString().padStart(2, '0')}
      </CountdownGridItem>
      <CountdownGridItem className='font-display text-2xl font-medium'>
        {secondsToDisplay.toString().padStart(2, '0')}
      </CountdownGridItem>
    </div>
  );
};

const CountdownGridItem = ({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div
    className={clsx(
      className,
      'flex w-full items-center justify-center rounded-sm bg-gradient-to-b from-slate-800 to-slate-600 px-1 text-slate-200'
    )}
  >
    {children}
  </div>
);

export default EventClock;

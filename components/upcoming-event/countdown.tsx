'use client';
import { useInterval } from '@/hooks/use-interval';
import clsx from 'clsx';
import { useState } from 'react';

export const Countdown = ({
  secondsRemaining: initialSecondsRemaining,
}: {
  secondsRemaining: number;
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(initialSecondsRemaining);

  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;
  const hoursRemaining = (minutesRemaining - minutesToDisplay) / 60;
  const hoursToDisplay = hoursRemaining % 24;
  const daysRemaining = (hoursRemaining - hoursToDisplay) / 24;

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
    <div className='grid grid-cols-4 justify-stretch gap-1 overflow-hidden rounded-md'>
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

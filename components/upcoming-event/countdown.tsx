'use client';
import { useInterval } from '@/hooks/use-interval';
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
    <div className="grid grid-cols-4 grid-rows-2 place-items-center">
      <div>DAYS</div>
      <div>HOURS</div>
      <div>MINS</div>
      <div>SECS</div>
      <div className="font-display text-2xl">{daysRemaining}</div>
      <div className="font-display text-2xl">{hoursToDisplay}</div>
      <div className="font-display text-2xl">{minutesToDisplay}</div>
      <div className="font-display text-2xl">{secondsToDisplay}</div>
    </div>
  );
};

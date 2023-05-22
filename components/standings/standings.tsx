'use client';

import { StandingsTable } from '@/components/standings/standings-table';
import { container } from '@/components/tailwind';
import * as Tabs from '@radix-ui/react-tabs';
import clsx from 'clsx';

const tabTrigger = clsx(
  'px-6 py-3 font-display text-2xl relative overflow-hidden hover:bg-slate-50 uppercase',
  'after:absolute after:left-2 after:right-2 after:top-full after:h-1 after:scale-0 after:bg-primary-500 after:rounded-t-full',
  'after:transition-transform after:ease-slide',
  'hover:after:-translate-y-full hover:after:scale-100',
  'radix-state-active:after:-translate-y-full radix-state-active:after:scale-100'
);

export const Standings = () => {
  return (
    <Tabs.Root defaultValue='drivers' className='mx-auto'>
      <Tabs.List
        aria-label='tabs example'
        className='flex justify-center border-y border-slate-300'
      >
        <Tabs.Trigger value='drivers' className={tabTrigger}>
          Drivers
        </Tabs.Trigger>
        <Tabs.Trigger value='teams' className={clsx(tabTrigger, 'border-x border-slate-300')}>
          Teams
        </Tabs.Trigger>
        <Tabs.Trigger value='last-race' className={tabTrigger}>
          Last Race
        </Tabs.Trigger>
      </Tabs.List>
      <div className='h-24' />
      <div className={clsx(container, 'max-w-5xl')}>
        <Tabs.Content value='drivers'>
          <StandingsTable key={1} />
        </Tabs.Content>
        <Tabs.Content value='teams'>
          <StandingsTable key={2} />
        </Tabs.Content>
        <Tabs.Content value='last-race'>
          <StandingsTable key={3} />
        </Tabs.Content>
      </div>
    </Tabs.Root>
  );
};

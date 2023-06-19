'use client';

import { StandingsTable } from '@/components/standings/standings-table';
import { container } from '@/components/tailwind';
import { Standings as TStandings } from '@/lib/strapi/standings';
import * as Tabs from '@radix-ui/react-tabs';
import { GetAttributesValues } from '@strapi/strapi';
import clsx from 'clsx';

const tabTrigger = clsx(
  'px-6 py-3 font-display text-2xl relative overflow-hidden hover:bg-slate-50 uppercase border border-slate-300 -mt-px -ml-px',
  'after:absolute after:left-2 after:right-2 after:top-full after:h-1 after:scale-0 after:bg-primary-500 after:rounded-t-full',
  'after:transition-transform after:ease-slide',
  'hover:after:-translate-y-full hover:after:scale-100',
  'radix-state-active:after:-translate-y-full radix-state-active:after:scale-100'
);

type StandingsProps = {
  standings: GetAttributesValues<'scores.standings-table'>[];
  fullView?: boolean;
};

export const Standings = ({ standings, fullView }: StandingsProps) => {
  if (!standings || standings.length === 0) {
    return null;
  }

  return (
    <Tabs.Root defaultValue={standings[0].slug} className='mx-auto'>
      <Tabs.List
        aria-label='tabs example'
        className='relative flex flex-wrap justify-center border-t border-slate-300 before:absolute before:inset-0 before:border-b before:border-slate-300'
      >
        {standings.map((table) => (
          <Tabs.Trigger key={table.slug} value={table.slug} className={tabTrigger}>
            {table.name}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <div className={clsx(container, 'max-w-5xl')}>
        {standings.map((table) => {
          const tableStandings = table.standings as TStandings | undefined;
          const standingsSlice = fullView ? tableStandings : tableStandings?.slice(0, 10);

          return (
            <Tabs.Content key={table.slug} value={table.slug}>
              <StandingsTable key={table.slug} standings={standingsSlice} fullView={fullView} />
            </Tabs.Content>
          );
        })}
      </div>
    </Tabs.Root>
  );
};

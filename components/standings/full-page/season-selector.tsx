'use client';

import { Standings } from '@/components/standings/standings';
import { GetAttributesValues } from '@strapi/strapi';
import clsx from 'clsx';
import { ChangeEventHandler, useCallback, useState } from 'react';

type Championship = GetAttributesValues<'api::season.season'>['championship'];

const championshipColors = {
  'British Supermoto': 'bg-primary text-white',
  'National Supermoto': 'bg-[#de2621] text-white',
} satisfies Record<Championship, string>;

export const SeasonSelector = ({
  seasons,
}: {
  seasons: GetAttributesValues<'api::season.season'>[];
}) => {
  const [championship, setChampionship] = useState<Championship>('British Supermoto');
  const [seasonIndex, setSeasonIndex] = useState(0);
  const [key, setKey] = useState(0);
  const forceRemount = useCallback(() => setKey((k) => k + 1), [setKey]);

  const championships = Array.from(new Set(seasons.map((ssn) => ssn.championship))).sort((a, b) =>
    a.localeCompare(b)
  );

  const championshipSeasons = seasons.filter((seas) => seas.championship === championship);
  const season = championshipSeasons[seasonIndex];

  const selectChampionship = useCallback<ChangeEventHandler<HTMLSelectElement>>((ev) => {
    const champ = ev.currentTarget.value as Championship;
    setChampionship(champ);
    setSeasonIndex(0);
  }, []);

  const selectSeasonIndex = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    (ev) => setSeasonIndex(Number(ev.currentTarget.value)),
    []
  );

  return (
    <>
      <div
        className={clsx(
          'relative transition-colors duration-300 ease-slide',
          championshipColors[championship]
        )}
      >
        {/* <div className={clsx('absolute inset-0', championshipColors[championship])} /> */}
        <div className='relative z-20 mx-auto flex max-w-5xl flex-wrap justify-center gap-6 px-8 pt-8 lg:justify-start'>
          <div className='flex flex-col'>
            {/* <label htmlFor='championship-select mb-2 text-sm font-medium text-slate-900'>
              Championship
            </label> */}
            <select
              onChange={selectChampionship}
              id='championship-select'
              className={clsx(
                'w-max rounded border border-gray-300 bg-gray-50 px-2.5 py-1.5 text-sm text-gray-900',
                'focus:border-primary-500 focus:ring-primary-500'
              )}
            >
              {championships.map((title) => (
                <option key={title} value={title} className='py-1'>
                  {title}
                </option>
              ))}
            </select>
          </div>
          <select
            onChange={selectSeasonIndex}
            id='season-select'
            className={clsx(
              'w-max rounded border border-gray-300 bg-gray-50 px-2.5 py-1.5 text-sm text-gray-900',
              'focus:border-primary-500 focus:ring-primary-500'
            )}
          >
            {championshipSeasons.map((ssn, index) => (
              <option key={ssn.slug ?? ssn.name} value={index}>
                {ssn.name}
              </option>
            ))}
          </select>
        </div>
        <h3
          className={clsx(
            'relative mx-auto block px-8 pb-12 pt-8',
            'text-center font-display text-xl uppercase sm:text-2xl md:text-3xl'
          )}
        >
          {season.championship} Championship Standings
        </h3>
      </div>
      <Standings standings={season.category} fullView key={key} />
      <div className='mx-auto flex max-w-5xl justify-end px-8 py-2'>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className='rounded bg-slate-300 px-2 py-1 text-sm font-semibold uppercase tracking-tight text-slate-600 shadow-sm hover:text-slate-900 hover:shadow'
        >
          back to top
        </button>
      </div>
    </>
  );
};

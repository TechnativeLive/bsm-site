import { StandingsData } from '@/components/standings/sample-data';
import { sampleStandings } from '@/components/standings/sample-data';
import { ordinalSuffix } from '@/utils/ordinal-suffix';
import clsx from 'clsx';
import Link from 'next/link';

const standings = [...sampleStandings].sort((a, b) => b.points - a.points).slice(0, 10);

export const StandingsTable = () => (
  <div className='-m-1 flex flex-col p-1'>
    <div className='mx-16 flex h-16 grid-flow-col grid-cols-3 grid-rows-[1fr,1fr,3fr] gap-x-4 md:grid'>
      <Podium entrant={{ ...standings[0], position: 1 }} />
      <Podium entrant={{ ...standings[1], position: 2 }} />
      <Podium entrant={{ ...standings[2], position: 3 }} />
    </div>
    <div className='flex flex-col'>
      {standings.map((entrant, i) => (
        <Row key={entrant.name} entrant={{ ...entrant, position: i + 1 }} />
      ))}
    </div>
    <Link
      href='/standings'
      className='text-emboss/50 rounded-md bg-slate-300 p-1 text-center text-sm font-bold uppercase drop-shadow-sm transition-all hover:bg-slate-200 hover:text-primary-700 hover:drop-shadow'
    >
      See full standings {'>>>'}
    </Link>
  </div>
);

function Podium({ entrant }: { entrant: StandingsData & { position: number } }) {
  return (
    <div
      className={clsx(
        entrant.position !== 1 && 'hidden md:flex',
        'relative after:absolute after:inset-0 after:top-full after:h-12 after:bg-slate-500',
        'transform-gpu transition-transform duration-200 ease-slide hover:-translate-y-12',
        'flex grow items-start justify-between rounded-t-md bg-slate-500 px-6 py-1 text-xl font-extralight uppercase text-white md:text-sm lg:text-xl'
      )}
      style={{
        gridColumnStart: (entrant.position % 3) + 1,
        gridRow: `${entrant.position} / 4`,
      }}
    >
      <div className='tracking-wider'>{entrant.name}</div>
      <div className='flex items-start text-xl font-semibold italic'>
        <span>{entrant.position}</span>
        <span className='pl-0.5 pt-[3px] text-sm'>{ordinalSuffix(entrant.position)}</span>
      </div>
    </div>
  );
}

function Row({ entrant }: { entrant: StandingsData & { position: number } }) {
  return (
    <div className='group py-1 drop-shadow-sm first:pt-0 last:mb-2 last:pb-0'>
      <div
        className={clsx(
          'flex items-center gap-3 rounded-md bg-slate-50 px-8 py-3 transition-colors duration-300 group-hover:bg-slate-200 group-hover:duration-150',
          'relative overflow-hidden',
          'after:absolute after:bottom-0 after:right-0 after:h-full after:w-1 after:-translate-y-full after:bg-primary-800 after:transition-transform after:duration-300 after:ease-slide after:group-hover:translate-y-0',
          'before:absolute before:bottom-0 before:left-0 before:h-full before:w-1 before:-translate-y-full before:bg-primary-800 before:transition-transform before:duration-300 before:ease-slide before:group-hover:translate-y-0'
        )}
      >
        <div className='font-bold'>{entrant.position}</div>
        <div className='uppercase'>
          <span>{entrant.name.split(' ')[0]}</span>{' '}
          <span className='font-bold'>{entrant.name.split(' ')[1]}</span>
        </div>
        <div className='grow text-xs font-medium'>{entrant.team}</div>
        <div className='-my-4 -mr-8 w-32 bg-gradient-to-l from-slate-300 p-4 text-right'>
          <div className='text-emboss bg-clip-text font-extrabold text-slate-600'>
            {entrant.points} PTS
          </div>
        </div>
      </div>
    </div>
  );
}

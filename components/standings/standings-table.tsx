import { Standings } from '@/lib/strapi/standings';
import { ordinalSuffix } from '@/utils/ordinal-suffix';
import clsx from 'clsx';
import Link from 'next/link';

export const StandingsTable = ({
  standings,
  fullView,
}: {
  standings?: Standings;
  fullView?: boolean;
}) => {
  if (!standings) {
    return null;
  }
  return (
    <div className='-m-1 flex flex-col p-1'>
      <div className='overflow-hidden pt-16'>
        <div className='mx-16 flex grid-flow-col grid-cols-3 grid-rows-[1fr,1fr,3fr] gap-x-4 md:grid'>
          <Podium entrant={{ ...standings[0], rank: 1 }} />
          <Podium entrant={{ ...standings[1], rank: 2 }} />
          <Podium entrant={{ ...standings[2], rank: 3 }} />
        </div>
      </div>
      <div className='flex flex-col'>
        {standings.map((entrant, i) => (
          <Row key={entrant.name} entrant={entrant} />
        ))}
      </div>
      {!fullView && (
        <Link
          href='/results'
          className='text-emboss/50 rounded-md bg-slate-300 p-1 text-center text-sm font-bold uppercase drop-shadow-sm transition-all hover:bg-slate-200 hover:text-primary-700 hover:drop-shadow'
        >
          See full standings {'>>>'}
        </Link>
      )}
    </div>
  );
};

function Podium({ entrant }: { entrant: Standings[number] & { rank: number } }) {
  return (
    <div
      className={clsx(
        entrant.rank === 1 ? 'flex font-semibold italic' : 'hidden md:flex',
        'relative after:absolute after:inset-0 after:top-full after:h-6 after:bg-slate-500',
        'transform-gpu transition-transform duration-200 ease-slide hover:-translate-y-6',
        'grow flex-col items-stretch rounded-t-md bg-slate-500 px-4 py-1 text-xl font-extralight uppercase text-white md:text-base lg:text-xl'
      )}
      style={{
        gridColumnStart: (entrant.rank % 3) + 1,
        gridRow: `${entrant.rank} / 4`,
      }}
    >
      <div className='flex flex-nowrap items-center gap-3'>
        <div className='grow leading-5 tracking-wider'>{entrant.name}</div>
        <div className='flex shrink-0 items-start text-xl font-semibold italic'>
          <span>{entrant.rank}</span>
          <span className='pl-0.5 pt-[3px] text-sm'>{ordinalSuffix(entrant.rank)}</span>
        </div>
      </div>
      {entrant.team && <div className='text-sm font-semibold italic'>{entrant.team}</div>}
    </div>
  );
}

function Row({ entrant }: { entrant: Standings[number] }) {
  const [firstname, lastname] = entrant.name?.split(' ') ?? ['', ''];
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
        <div className='font-bold'>{entrant.rank}</div>
        <div className='uppercase'>
          <span>{firstname}</span> <span className='font-bold'>{lastname}</span>
        </div>
        <div className='grow text-xs font-medium'>{entrant.team}</div>
        <div className='-my-4 -mr-8 w-32 bg-gradient-to-l from-slate-300 p-4 text-right'>
          <div className='text-emboss bg-clip-text font-extrabold text-slate-600'>
            {entrant.total} PTS
          </div>
        </div>
      </div>
    </div>
  );
}

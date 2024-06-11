import { Headshot } from '@/components/standings/headshot';
import { Standings } from '@/lib/strapi/standings';
import { ordinalSuffix } from '@/utils/ordinal-suffix';
import clsx from 'clsx';
import Image from 'next/image';
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
        <div className='mx-16 mt-48 flex grid-flow-col grid-cols-3 grid-rows-[1fr,1fr,3fr] gap-x-4 max-md:justify-center md:grid'>
          <Podium entrant={{ ...standings[0], rank: 1 }} />
          <Podium entrant={{ ...standings[1], rank: 2 }} />
          <Podium entrant={{ ...standings[2], rank: 3 }} />
        </div>
      </div>
      <div className='flex flex-col'>
        {standings.map((entrant, i) => (
          <Row key={`${entrant.name}-${i}`} entrant={entrant} />
        ))}
      </div>
      {/* <div className='flex flex-wrap items-center justify-end gap-6 px-8 py-4'>
        <div className='text-slate-500'>Joker: </div>
        <div className='flex items-center gap-1.5'>
          <Joker state='active' />
          Active
        </div>
        <div className='flex items-center gap-1.5'>
          <Joker state='available' />
          Available
        </div>
        <div className='flex items-center gap-1.5'>
          <Joker state='used' />
          Used
        </div>
      </div> */}
      {!fullView && (
        <Link
          href='/standings'
          className='text-emboss/50 mt-2 flex items-center justify-center gap-2 rounded-md bg-slate-300 p-1 text-center text-sm font-bold uppercase drop-shadow-sm transition-all hover:bg-slate-200 hover:text-primary-700 hover:drop-shadow'
        >
          See full standings
        </Link>
      )}
    </div>
  );
};

function Podium({ entrant }: { entrant: Standings[number] & { rank: number } }) {
  return (
    <Link
      href={`/riders/${entrant.driverNumber}`}
      className='group relative'
      style={{
        gridColumnStart: (entrant.rank % 3) + 1,
        gridRow: `${entrant.rank} / 4`,
      }}
    >
      <div className='absolute bottom-full left-2 right-2 flex h-56 items-center justify-center'>
        <Headshot entrant={entrant} />
      </div>
      <div
        className={clsx(
          entrant.rank === 1 ? 'flex font-semibold italic' : 'hidden md:flex',
          'relative h-full after:absolute after:inset-0 after:top-full after:h-6 after:bg-slate-500',
          'transform-gpu transition-transform duration-200 ease-slide will-change-transform group-hover:-translate-y-6',
          'grow flex-col items-stretch rounded-t-md bg-slate-500 px-4 py-1 text-xl font-extralight uppercase text-white md:text-base lg:text-xl'
        )}
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
    </Link>
  );
}

function Row({ entrant }: { entrant: Standings[number] }) {
  const [firstname, lastname] = entrant.name?.split(' ') ?? ['', ''];

  return (
    // TODO: Add link to rider page
    <MaybeLink
      href={`/riders/${entrant.driverNumber}`}
      className='group py-1 drop-shadow-sm first:pt-0 last:mb-2 last:pb-0'
    >
      <div
        className={clsx(
          'flex gap-x-1 rounded-md bg-slate-50 pl-3 transition-colors duration-300 group-hover:bg-slate-200 group-hover:duration-150 sm:pl-8',
          'relative overflow-hidden',
          'after:absolute after:bottom-0 after:right-0 after:h-full after:w-1 after:-translate-y-full after:bg-primary-800 after:transition-transform after:duration-300 after:ease-slide after:group-hover:translate-y-0',
          'before:absolute before:bottom-0 before:left-0 before:h-full before:w-1 before:-translate-y-full before:bg-primary-800 before:transition-transform before:duration-300 before:ease-slide before:group-hover:translate-y-0'
        )}
      >
        <div className='flex w-[2.5ch] items-center font-bold'>{entrant.rank}</div>
        <div className='flex min-h-[2.5rem] grow flex-wrap items-center gap-x-1 py-1'>
          {/* Rank */}
          <div className='flex items-center'>
            <span className='uppercase'>{firstname}</span>
          </div>

          {/* Name */}
          <div className='pr-1 uppercase'>
            <span className='font-bold'>{lastname}</span>
          </div>

          {/* Rider number */}
          {entrant.driverNumber && (
            <div className='flex items-center justify-end'>
              <div className='font-bold italic opacity-60'>
                <span className='pr-0.5 text-xs'>#</span>
                {entrant.driverNumber}
              </div>
            </div>
          )}

          {/* Team */}
          {entrant.team && <div className='grow pr-1 text-xs font-medium'>{entrant.team}</div>}
        </div>

        {/* Points */}
        <div className='flex items-center'>
          {/* Joker */}
          {entrant.joker && <Joker state={entrant.joker} tooltip />}

          <div
            className={clsx(
              'relative flex w-28 items-center justify-end self-stretch py-3 pr-3 text-right sm:pr-6',
              'after:absolute after:right-0 after:top-0 after:z-0 after:h-full after:w-28 after:bg-gradient-to-l after:from-slate-300'
            )}
          >
            <div className='text-emboss z-10 font-extrabold text-slate-600'>
              {entrant.total} <span className='text-xs'>PTS</span>
            </div>
          </div>
        </div>
      </div>
    </MaybeLink>
  );
}

function MaybeLink({
  href,
  ...props
}: {
  href?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return href ? <Link href={href} {...props} /> : <div {...props} />;
}

function Joker({
  state,
  tooltip = false,
}: {
  state: 'active' | 'used' | 'available';
  tooltip?: boolean;
}) {
  return (
    <div
      className={clsx(
        'group/joker relative ml-auto h-7 w-7 transition-colors',
        // state === 'available' && 'text-slate-400/60 group-hover:text-slate-600',
        // state === 'used' && 'text-slate-300/60 group-hover:text-slate-400',
        // state === 'active' && 'text-slate-700 group-hover:text-slate-900'
        state === 'available' ? 'opacity-0' : 'text-slate-400/60 group-hover:text-slate-600'
      )}
    >
      <svg
        className='p-1'
        height='100%'
        viewBox='0 0 260 210'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g fill='currentColor'>
          <path d='M59 182H177V204C177 206.761 174.761 209 172 209H64C61.2386 209 59 206.761 59 204V182Z' />
          <path d='M34.4974 110.5C54.4974 110.5 59.164 151.5 58.9974 172H177C177 142.8 187.5 120 208.5 120C233 120 241 133 246 128C253 121 230 71 192 70.5C169.602 70.2053 154.333 83.1667 149.5 89.5C146 86 137 80.5 137 66C137 51.5 146.752 44.2133 155 39.5C167 32.6429 179.062 42 182.5 36.5C186.439 30.1968 168 2 139 2C89 2 79.1646 55.3333 80.4969 82.5C75 77 66 67 46.4974 67C9.49888 67 0.50232 128 10.9998 128C18.9993 128 16.9969 110.5 34.4974 110.5Z' />
          <circle cx='12' cy='141' r='11' />
          <circle cx='247' cy='141' r='11' />
          <circle cx='193' cy='44' r='11' />
        </g>
      </svg>
      {tooltip && (
        <div className='absolute right-full top-1/2 mr-3 flex -translate-y-1/2 items-center whitespace-nowrap rounded bg-slate-600 px-2 py-0.5 text-xs uppercase text-slate-300 opacity-0 transition-opacity duration-300 group-hover/joker:opacity-100'>
          <span className='pr-1'>Joker </span>
          <span>{state === 'available' ? 'available' : 'used'}</span>
        </div>
      )}
      {/* <div className={clsx('absolute inset-1', state === 'used' ? 'opacity-100' : 'opacity-0')}>
        <svg width='100%' height='100%' viewBox='0 0 100 100' preserveAspectRatio='none'>
          <path d='M0 100 100 0' stroke='currentColor' strokeWidth={10} />
        </svg>
      </div> */}
    </div>
  );
}

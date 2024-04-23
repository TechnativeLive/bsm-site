import { getImage } from '@/utils/cms';
import { GetAttributesValues } from '@strapi/strapi';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

export type Rider = Omit<
  Strapi.Response<GetAttributesValues<'api::rider.rider'>[]>['data'][number],
  'team'
> & { id: number };

export function RiderCard({ rider, team }: { rider: Rider; team?: string }) {
  const headshot = getImage(rider.headshot, 'small');
  let dob = rider.dob ? new Date(rider.dob) : undefined;
  let dateStarted = rider.startedCompeting ? new Date(rider.startedCompeting) : undefined;
  const now = new Date().getTime();

  if (dob) {
    dob = new Date(dob.getTime() - now);
  }

  if (dateStarted) {
    dateStarted = new Date(dateStarted.getTime() - now);
  }

  return (
    <Link
      href={`/riders/${rider.id}`}
      className={clsx(
        // headshot ? 'bg-gradient-to-bl from-slate-950 to-blue-200' : 'bg-slate-800',
        'bg-slate-800 text-slate-300',
        team ? ' min-h-[10rem]' : ' min-h-[8.5rem]',
        'relative flex flex-col overflow-hidden pt-4 before:z-30 before:corner-tl-4 before:corner-slate-200 after:corner-4 after:corner-slate-200'
      )}
    >
      {headshot && (
        <div className='relative mt-6 flex h-full'>
          <p
            className={clsx(
              rider.bib.length > 3 ? 'text-[3rem] sm:text-[5rem]' : 'text-[5rem] sm:text-[7rem]',
              'absolute -top-2 right-0 pr-8 font-display leading-[0.8] text-slate-400'
            )}
            style={{
              WebkitTextStroke: '2px rgb(178, 183, 204)',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {rider.bib}
          </p>
          <Image
            className='relative max-h-72 w-full self-end object-contain'
            src={headshot.url}
            alt={`${rider.firstname} ${rider.lastname} profile image`}
            width={headshot.width}
            height={headshot.height}
          />
        </div>
      )}
      {!headshot && rider.bib && (
        <p
          className={clsx(
            rider.bib.length > 3 ? '' : '',
            'pr-8 text-right font-display text-[4rem] leading-[0.8] text-slate-400 sm:text-[7rem]'
          )}
          style={{
            WebkitTextStroke: '2px rgb(178, 183, 204)',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {rider.bib}
        </p>
      )}
      <div className='absolute bottom-0 left-0 right-0 flex flex-col bg-gradient-to-t from-slate-950/70 from-40% to-transparent to-90% px-6 pb-4 pt-12'>
        {rider.bike && (
          <div className='flex items-center justify-between gap-2.5 drop-shadow'>
            <p className='text-sm uppercase opacity-70'>Bike</p>
            <p className='tracking-wider'>{rider.bike}</p>
          </div>
        )}
        {rider.tyres && (
          <div className='flex items-center justify-between gap-2.5 drop-shadow'>
            <p className='text-sm uppercase opacity-70'>Tyres</p>
            <p className='tracking-wider'>{rider.tyres}</p>
          </div>
        )}
        {dob && (
          <div className='flex items-center justify-between gap-2.5 drop-shadow'>
            <p className='text-sm uppercase opacity-70'>Age</p>
            <p className='tracking-wider'>{Math.abs(dob.getUTCFullYear() - 1970)}</p>
          </div>
        )}
        {dateStarted && (
          <div className='flex items-center justify-between gap-2.5 drop-shadow'>
            <p className='text-sm uppercase opacity-70'>Years Competing</p>
            <p className='tracking-wider'>{Math.abs(dateStarted.getUTCFullYear() - 1970)}</p>
          </div>
        )}
        <h3 className='text-2xl font-semibold uppercase tracking-wide text-slate-300 drop-shadow'>
          {rider.firstname} {rider.lastname}
        </h3>
        {team && (
          <h4 className='capitalize italic tracking-widest opacity-80 drop-shadow'>
            {team.toLowerCase().startsWith('team') ? team : `Team ${team}`}
          </h4>
        )}
      </div>
    </Link>
  );
}

import { GetAttributesValues } from '@strapi/strapi';
import { cms, getImage } from '@/utils/cms';
import { getRiderById } from '@/lib/strapi';
import { getMetadata } from '@/lib/meta';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { container } from '@/components/tailwind';

type PageParams = { params: { id: string } };

export default async function Page({ params: { id } }: PageParams) {
  const rider = await getRiderById(Number(id));

  if (!rider.data) {
    notFound();
  }

  return <RiderPage rider={rider.data} />;
}

const dynamicParams = false;
export { dynamicParams };

export async function generateStaticParams() {
  const riders: Strapi.Response<GetAttributesValues<'api::rider.rider'>[]> = await fetch(
    cms('riders')
  ).then((res) => res.json());

  return riders.data.map((rider) => ({
    id: rider.id.toString(),
  }));
}

export async function generateMetadata({ params: { id } }: PageParams) {
  const rider = await getRiderById(Number(id));

  return {
    title: `${rider.data.firstname} ${rider.data.lastname} - BSM Rider${
      rider.data.team?.name ? ` for ${rider.data.team.name}` : ''
    }`,
    description: `Learn more about ${rider.data.firstname} ${rider.data.lastname}`,
  };
}

type Rider = Omit<
  Strapi.Response<GetAttributesValues<'api::rider.rider'>[]>['data'][number],
  'team'
> & { id: number };

function RiderPage({ rider }: { rider: Rider }) {
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
    <div className={clsx(container, 'mt-8 w-full max-w-7xl')}>
      <div className='flex flex-col md:flex-row'>
        <Image
          className='relative z-10 max-h-72 w-full grow basis-0 self-center object-contain'
          src={headshot?.url ?? '/not-found.svg'}
          alt={`${rider.firstname} ${rider.lastname} profile image`}
          width={headshot.width}
          height={headshot.height}
        />
        <div className='flex grow basis-0 flex-col'>
          {(rider.bike || rider.tyres || dob || dateStarted) && (
            <div className='mt-4 flex flex-col'>
              {rider.bike && (
                <div className='flex items-center justify-between gap-2.5'>
                  <p className='text-sm uppercase opacity-70'>Bike</p>
                  <p className='font-semibold tracking-wider'>{rider.bike}</p>
                </div>
              )}
              {rider.tyres && (
                <div className='flex items-center justify-between gap-2.5'>
                  <p className='text-sm uppercase opacity-70'>Tyres</p>
                  <p className='font-semibold tracking-wider'>{rider.tyres}</p>
                </div>
              )}
              {dob && (
                <div className='flex items-center justify-between gap-2.5'>
                  <p className='text-sm uppercase opacity-70'>Age</p>
                  <p className='font-semibold tracking-wider'>
                    {Math.abs(dob.getUTCFullYear() - 1970)}
                  </p>
                </div>
              )}
              {dateStarted && (
                <div className='flex items-center justify-between gap-2.5'>
                  <p className='text-sm uppercase opacity-70'>Years Competing</p>
                  <p className='font-semibold tracking-wider'>
                    {Math.abs(dateStarted.getUTCFullYear() - 1970)}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div
        className={clsx(
          // headshot ? 'bg-gradient-to-bl from-slate-950 to-blue-200' : 'bg-slate-800',
          'bg-slate-800 text-slate-300',
          'relative flex flex-col p-4 before:corner-tl-4 before:corner-slate-200 after:corner-4 after:corner-slate-200'
        )}
      >
        <h3 className='text-2xl font-semibold uppercase tracking-wide text-slate-300'>
          {rider.firstname} {rider.lastname}
        </h3>
        {headshot && (
          <div className='relative mt-6'>
            <p
              className={clsx(
                rider.bib.length > 3 ? 'text-[3rem] sm:text-[5rem]' : 'text-[5rem] sm:text-[7rem]',
                'absolute -top-2 right-0 font-display leading-[0.8] text-slate-400'
              )}
              style={{
                WebkitTextStroke: '2px rgb(178, 183, 204)',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {rider.bib}
            </p>
            <Image
              className='relative z-10 max-h-72 w-full self-center object-contain'
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
              'text-right font-display text-[4rem] leading-[0.8] text-slate-400 sm:text-[7rem]'
            )}
            style={{
              WebkitTextStroke: '2px rgb(178, 183, 204)',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {rider.bib}
          </p>
        )}
      </div>
    </div>
  );
}

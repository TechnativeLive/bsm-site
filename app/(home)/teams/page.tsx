import clsx from 'clsx';
import { GetAttributesValues } from '@strapi/strapi';
import { Metadata } from 'next';
import { cms, getImage } from '@/utils/cms';
import { container } from '@/components/tailwind';
import { CallToAction } from '@/components/strapi/cta';
import Image from 'next/image';
import { StrapiMedia } from '@/types/strapi';
import Link from 'next/link';

type Rider = Omit<
  Strapi.Response<GetAttributesValues<'api::rider.rider'>[]>['data'][number],
  'team'
> & { id: number };

export default async function Page() {
  const ridersQuery = cms('riders', {
    populate: {
      team: { populate: { sponsors: { populate: { logos: { populate: '*' } } } } },
      headshot: { populate: '*' },
    },
  });
  const allRiders: Strapi.Response<GetAttributesValues<'api::rider.rider'>[]> = await fetch(
    ridersQuery
  ).then((res) => res.json());
  const riders = allRiders.data;

  const teams = riders.reduce((acc, rider) => {
    if (!rider.team) {
      return acc;
    }

    const { team, ...riderInfo } = rider;

    const accTeam = acc.find((t) => t.team.name === team?.name);
    if (accTeam) {
      accTeam.riders.push(riderInfo);
    } else {
      acc.push({ team, riders: [riderInfo] });
    }

    return acc;
  }, [] as { team: GetAttributesValues<'api::team.team'>; riders: Rider[] }[]);

  return (
    <>
      <header className='grid w-full place-items-center border-b border-slate-300 bg-slate-100'>
        <h1 className='text-emboss py-14 font-display text-3xl uppercase'>Teams & Riders</h1>
      </header>
      <section className={clsx(container, 'my-6 w-full items-start gap-4')}>
        {teams.map(({ team, riders }) => {
          const sponsor = team.sponsors?.[0];
          const logo =
            sponsor?.logos?.find((l) => l.kind === 'dark') ??
            sponsor?.logos?.find((l) => l.kind === 'base');

          const sponsorLogo = logo?.image.formats.thumbnail;

          return (
            <div
              key={team.name}
              className='relative flex w-full flex-col bg-slate-200 before:corner-tl-4 after:corner-4'
            >
              <div
                className='my-4 grid gap-4 px-4'
                style={{
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(20rem, 100%), 1fr))',
                }}
              >
                <div className='bg-pattern flex flex-col'>
                  <h2 className='pt-4 text-center font-display text-2xl uppercase'>
                    Team {team.name}
                  </h2>
                  <div className='grid grow place-content-center'>
                    <Image
                      src={sponsorLogo.url ?? '/no-image.svg'}
                      alt={`${team.name} logo`}
                      width={sponsorLogo.width ?? 200}
                      height={sponsorLogo.height ?? 100}
                    />
                  </div>
                </div>
                {riders.map((rider) => (
                  <RiderCard key={rider.id} rider={rider} />
                ))}
              </div>
              {/* {team.sponsors && team.sponsors?.length > 1 && (
                <div
                  className='grid gap-x-8 gap-y-4 bg-slate-400 p-4'
                  style={{
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(8rem, 100%), 1fr))',
                  }}
                >
                  {team.sponsors.map((sponsor) => {
                    return <div key={sponsor.name}>{sponsor.name}</div>;
                  })}
                </div>
              )} */}
            </div>
          );
        })}
      </section>
    </>
  );
}

function RiderCard({ rider }: { rider: Rider }) {
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
      <div className='absolute inset-0 bg-[#74aeb0] opacity-0 mix-blend-overlay transition-opacity hover:opacity-60' />
    </Link>
  );
}

export const metadata: Metadata = {
  title: 'Riders & Teams',
  description: 'Meet the competitors and their teams',
};

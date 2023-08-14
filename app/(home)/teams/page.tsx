import clsx from 'clsx';
import { GetAttributesValues } from '@strapi/strapi';
import { Metadata } from 'next';
import { cms } from '@/utils/cms';
import { container } from '@/components/tailwind';
import Image from 'next/image';
import { Rider, RiderCard } from '@/components/rider-card';
import Link from 'next/link';
import { MainNavLink } from '@/components/nav/nav';

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
        <h1 className='text-emboss flex items-center py-14 font-display text-3xl uppercase'>
          <MainNavLink href='/teams' className='hover:text-primary-500'>
            Teams
          </MainNavLink>{' '}
          /{' '}
          <MainNavLink href='/riders' className='hover:text-primary-500'>
            Riders
          </MainNavLink>
        </h1>
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
              className='relative flex w-full flex-col bg-slate-200 before:corner-tl-6 after:corner-6'
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

export const metadata: Metadata = {
  title: 'Riders & Teams',
  description: 'Meet the competitors and their teams',
};

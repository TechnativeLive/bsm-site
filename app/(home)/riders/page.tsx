import clsx from 'clsx';
import { GetAttributesValues } from '@strapi/strapi';
import { Metadata } from 'next';
import { cms } from '@/utils/cms';
import { container } from '@/components/tailwind';
import { RiderCard } from '@/components/rider-card';
import { MainNavLink } from '@/components/nav/client';

export default async function Page() {
  const ridersQuery = cms('riders', {
    populate: {
      team: 'name',
      headshot: { populate: '*' },
    },
    sort: ['lastname'],
  });
  const riders: Strapi.Response<GetAttributesValues<'api::rider.rider'>[]> = await fetch(
    ridersQuery
  ).then((res) => res.json());

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
      <section className={clsx(container, 'relative my-6 w-full items-start gap-4')}>
        <div className='relative flex w-full flex-col bg-slate-200 before:corner-tl-6 after:corner-6'>
          <div
            className='my-4 grid gap-4 px-4'
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(20rem, 100%), 1fr))',
            }}
          >
            {riders.data.map((rider) => (
              <RiderCard key={rider.id} rider={rider} team={rider.team?.name} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export const metadata: Metadata = {
  title: 'Riders & Teams',
  description: 'Meet the competitors and their teams',
};

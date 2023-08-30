import { GetAttributesValues } from '@strapi/strapi';
import { cms, getImage } from '@/utils/cms';
import { getRiderById } from '@/lib/strapi';
import clsx from 'clsx';
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

type Rider = Strapi.Response<GetAttributesValues<'api::rider.rider'>[]>['data'][number] & {
  id: number;
};

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
    <div className='w-full'>
      <div className={'w-full bg-slate-800 text-lg text-slate-300'}>
        <div
          className={clsx(
            container,
            'relative flex w-full max-w-7xl flex-col justify-end overflow-hidden md:flex-row'
          )}
        >
          <div className='mt-8 flex min-h-[24rem] grow-[2] basis-0 flex-col pb-8'>
            <p className='font-display text-5xl'>{rider.bib}</p>
            <h1 className='mb-8 text-2xl font-semibold uppercase tracking-wide text-slate-100'>
              {rider.firstname} {rider.lastname}
            </h1>

            {rider.team?.name && (
              <>
                <p className='text-sm uppercase opacity-70 max-md:leading-none'>Team</p>
                <p className='mb-4 font-semibold tracking-wider max-md:leading-none md:mb-6'>
                  {rider.team.name}
                </p>
              </>
            )}

            {rider.bike && (
              <>
                <p className='text-sm uppercase opacity-70 max-md:leading-none'>Bike</p>
                <p className='mb-4 font-semibold tracking-wider max-md:leading-none md:mb-6'>
                  {rider.bike}
                </p>
              </>
            )}

            {rider.tyres && (
              <>
                <p className='text-sm uppercase opacity-70 max-md:leading-none'>Tyres</p>
                <p className='mb-4 font-semibold tracking-wider max-md:leading-none md:mb-6'>
                  {rider.tyres}
                </p>
              </>
            )}

            {dob && (
              <>
                <p className='text-sm uppercase opacity-70 max-md:leading-none'>Age</p>
                <p className='mb-4 font-semibold tracking-wider max-md:leading-none md:mb-6'>
                  {Math.abs(dob.getUTCFullYear() - 1970)}
                </p>
              </>
            )}

            {dateStarted && (
              <>
                <p className='text-sm uppercase opacity-70 max-md:leading-none'>Years Competing</p>
                <p className='mb-4 font-semibold tracking-wider max-md:leading-none md:mb-6'>
                  {Math.abs(dateStarted.getUTCFullYear() - 1970)}
                </p>
              </>
            )}
          </div>

          {headshot?.url && (
            <Image
              className='h-96 w-full grow-[3] basis-0 self-end object-contain object-bottom max-md:absolute max-md:bottom-0 max-md:left-1/4 max-md:right-0 md:relative'
              src={headshot.url}
              alt={`${rider.firstname} ${rider.lastname} profile image`}
              width={headshot?.width ?? 220}
              height={headshot?.height ?? 114}
            />
          )}
        </div>
      </div>
      {rider.bio && (
        <div className={clsx(container, 'w-full max-w-7xl py-8')}>
          <h2 className='mb-4 font-display text-3xl tracking-wide'>Biography</h2>
          <p className='whitespace-pre-wrap'>{rider.bio}</p>
        </div>
      )}
    </div>
  );
}

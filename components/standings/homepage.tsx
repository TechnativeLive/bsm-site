import { Standings } from '@/components/standings/standings';
import { getHomepageSeason } from '@/lib/strapi/standings';
import clsx from 'clsx';

export const HomepageStandings = async () => {
  const season = await getHomepageSeason();

  return season?.category ? (
    <>
      <div className='before:bg-pattern relative before:absolute before:inset-0 before:opacity-40'>
        <h3
          className={clsx(
            'relative mx-auto block px-8 py-12 opacity-80',
            'text-center font-display text-xl uppercase sm:text-2xl md:text-3xl'
          )}
        >
          {season.championship} Championship Standings
        </h3>
      </div>
      <Standings standings={season.category} />
    </>
  ) : null;
};

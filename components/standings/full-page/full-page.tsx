import { SeasonSelector } from '@/components/standings/full-page/season-selector';
import { getSeasons } from '@/lib/strapi/standings';

export const FullPageStandings = async () => {
  const seasons = await getSeasons();

  return <SeasonSelector seasons={seasons.data} />;
};

import { StrapiQuery, cms } from '@/utils/cms';
import { GetAttributesValues } from '@strapi/strapi';

type Entrant = {
  joker?: 'used' | 'available' | 'active';
  rank?: number;
  driverNumber?: string;
  name?: string;
  total?: number;
  team?: string;
};

export type Standings = Entrant[];

export async function getSeasons(query?: StrapiQuery) {
  const seasonQuery = cms('seasons', { populate: '*', ...query });
  // console.log({ seasonQuery });

  const seasons: Strapi.Response<GetAttributesValues<'api::season.season'>[]> = await fetch(
    seasonQuery
  ).then((res) => res.json());

  return seasons;
}

export async function getHomepageSeason() {
  const seasons = await getSeasons();
  const homepageStandings = seasons.data.find((ssn) => ssn.championship === 'British Supermoto');

  return homepageStandings;
}

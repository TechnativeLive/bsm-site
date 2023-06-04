import { StrapiQuery, cms } from '@/utils/cms';
import { GetAttributesValues } from '@strapi/strapi';

type Entrant = {
  rank?: number;
  driverNumber?: string;
  name?: string;
  total?: number;
  team?: string;
};

export type Standings = Entrant[];

export async function getStandings(query?: StrapiQuery) {
  const seasonQuery = cms('season', { populate: '*', ...query });
  console.log({ seasonQuery });

  const season: Strapi.Response<GetAttributesValues<'api::season.season'>> = await fetch(
    seasonQuery,
    { next: { revalidate: Infinity } }
  ).then((res) => res.json());

  const standings = season.data.category;
  return standings;
}

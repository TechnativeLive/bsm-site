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
  const seasonQuery = cms('seasons', { populate: '*', ...query });
  // console.log({ seasonQuery });

  const season: Strapi.Response<GetAttributesValues<'api::season.season'>[]> = await fetch(
    seasonQuery
  ).then((res) => res.json());

  const standings = season.data.find((ssn) => ssn.active)!.category;
  return standings;
}

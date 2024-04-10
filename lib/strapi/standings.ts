import { getSeasonsGSheetData } from '@/lib/gsheets/standings';
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
  const seasonQuery = cms('seasons', { populate: '*', sort: ['start:desc'], ...query });
  // console.log({ seasonQuery });

  const seasons: Strapi.Response<GetAttributesValues<'api::season.season'>[]> = await fetch(
    seasonQuery
  ).then((res) => res.json());

  return seasons;

  // const gsheetsData = await getSeasonsGSheetData(seasons.data.map(season => season.name))
  // if (!gsheetsData) {
  //   console.warn('No gsheets data found')
  //   return seasons
  // }

  //   const response: typeof seasons = {
  //     ...seasons,
  //     data: seasons.data.map((season, index) => {
  //       if (season.start.getFullYear() < 2024) return season

  //       const gsheetsSeason = gsheetsData[index]
  //       if (!gsheetsSeason) return season

  //       return {
  //         ...season,
  //         category: season.category.map((cat, i) => (cat.standings || gsheetsSeason[i]) as GetAttributesValues<"scores.standings-table">)
  //       }
  //     })
  //   }

  // return response
}

export async function getHomepageSeason() {
  const seasons = await getSeasons();
  const homepageStandings = seasons.data.find((ssn) => ssn.championship === 'British Supermoto');

  return homepageStandings;
}

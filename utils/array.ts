import { GetAttributesValues } from '@strapi/strapi';

// function groupBy<T, R extends string | number>(items: T[], condition: (value: T) => R) {
//   return items.reduce((acc, item) => {
//     const group = condition(item);
//     group in acc ? acc[group].push(item) : (acc[group] = [item]);
//     return acc;
//   }, {} as Record<R, T[]>);
// }

export function groupSponsors(sponsors: GetAttributesValues<'api::sponsor.sponsor'>[]) {
  return sponsors.reduce((acc, sponsor) => {
    const index = sponsor.tier - 1;
    acc[index]?.length ? acc[index].push(sponsor) : (acc[index] = [sponsor]);
    return acc;
  }, [] as GetAttributesValues<'api::sponsor.sponsor'>[][]);
}

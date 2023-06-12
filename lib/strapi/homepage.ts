import { cms } from '@/utils/cms';
import { GetAttributesValues } from '@strapi/strapi';

export async function getFeatureLinks() {
  const homepageQuery = cms('homepage', { populate: { featureLinks: { populate: '*' } } });
  // console.log({ homepageQuery });

  const homepage: Strapi.Response<GetAttributesValues<'api::homepage.homepage'>> = await fetch(
    homepageQuery,
    { next: { revalidate: Infinity } }
  ).then((res) => res.json());

  const featureLinks = homepage.data.featureLinks;
  return featureLinks;
}

export async function getFooterLinks() {
  const homepageQuery = cms('homepage', { populate: 'footerLinks' });
  // console.log({ homepageQuery });

  const homepage: Strapi.Response<GetAttributesValues<'api::homepage.homepage'>> = await fetch(
    homepageQuery,
    { next: { revalidate: Infinity } }
  ).then((res) => res.json());

  const footerLinks = homepage.data.footerLinks;
  return footerLinks;
}

export async function getSocials() {
  const homepageQuery = cms('homepage', { populate: 'socials' });
  // console.log({ homepageQuery });

  const homepage: Strapi.Response<GetAttributesValues<'api::homepage.homepage'>> = await fetch(
    homepageQuery,
    { next: { revalidate: Infinity } }
  ).then((res) => res.json());

  const socials = homepage.data.socials;
  return socials;
}

export async function getSponsors() {
  const homepageQuery = cms('homepage', {
    populate: { sponsors: { populate: { logos: { populate: '*' } } } },
  });
  // console.log({ homepageQuery });

  const homepage: Strapi.Response<GetAttributesValues<'api::homepage.homepage'>> = await fetch(
    homepageQuery,
    { next: { revalidate: Infinity } }
  ).then((res) => res.json());

  const sponsors = homepage.data.sponsors;
  return sponsors;
}

export async function getCalendar() {
  const calendarQuery = cms('calendar', {
    populate: {
      current: {
        populate: { track: { populate: ['name', 'layout'] } },
      },
    },
  });
  // console.log({ calendarQuery });

  try {
    const res = await fetch(calendarQuery, { next: { revalidate: Infinity } });

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch calendar data');
    }

    const json = (await res.json()) as Strapi.Response<
      GetAttributesValues<'api::calendar.calendar'>
    >;
    const currentCalendar = json.data.current;

    return currentCalendar;
  } catch (e) {
    console.log(e);
    throw new Error('Failed to fetch calendar data');
  }
}

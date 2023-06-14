import { cms } from '@/utils/cms';
import { GetAttributesValues } from '@strapi/strapi';

export async function getFeatureLinks() {
  const homepageQuery = cms('homepage', { populate: { featureLinks: { populate: '*' } } });
  // console.log({ homepageQuery });

  const homepage: Strapi.Response<GetAttributesValues<'api::homepage.homepage'>> = await fetch(
    homepageQuery
  ).then((res) => res.json());

  const featureLinks = homepage.data.featureLinks;
  return featureLinks;
}

export async function getFooterLinks() {
  const homepageQuery = cms('homepage', { populate: 'footerLinks' });
  // console.log({ homepageQuery });

  const homepage: Strapi.Response<GetAttributesValues<'api::homepage.homepage'>> = await fetch(
    homepageQuery
  ).then((res) => res.json());

  const footerLinks = homepage.data.footerLinks;
  return footerLinks;
}

export async function getSocials() {
  const homepageQuery = cms('homepage', { populate: 'socials' });
  // console.log({ homepageQuery });

  const homepage: Strapi.Response<GetAttributesValues<'api::homepage.homepage'>> = await fetch(
    homepageQuery
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
    homepageQuery
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

  const calendar: Strapi.Response<GetAttributesValues<'api::calendar.calendar'>> = await fetch(
    calendarQuery
  ).then((res) => res.json());

  const currentCalendar = calendar.data.current;
  return currentCalendar;
}

import { cms } from '@/utils/cms';
import { GetAttributesValues } from '@strapi/strapi';

export async function getNoraEventLink() {
  const homepageQuery = cms('homepage', {
    populate: ['footerLinks'],
  });

  const homepage: Strapi.Response<GetAttributesValues<'api::homepage.homepage'>> = await fetch(
    homepageQuery
  ).then((res) => res.json());

  const footerLinks = homepage.data.footerLinks;
  const noraLink = footerLinks?.find((link) => link.url?.startsWith('https://nora92.com'));

  return noraLink?.url ?? 'https://nora92.com/events/';
}

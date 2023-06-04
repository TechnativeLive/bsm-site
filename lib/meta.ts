import { GetAttributesValues } from '@strapi/strapi';

export function getMetadata(seo?: GetAttributesValues<'seo.seo'>) {
  if (!seo) return {};

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    ...(seo.meta && Object.fromEntries(seo.meta?.map((entry) => [entry.name, entry.content]))),
  };
}

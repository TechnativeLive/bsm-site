import { GetAttributesValues } from '@strapi/strapi';

type __Props = GetAttributesValues<'blocks.cta'>;

export function __(props: __Props) {
  return <pre>{JSON.stringify(props)}</pre>;
}

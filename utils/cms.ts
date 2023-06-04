import { IStringifyOptions, stringify } from 'qs';

type QueryKeys =
  | 'sort'
  | 'filters'
  | 'populate'
  | 'fields'
  | 'pagination'
  | 'publicationState'
  | 'locale';

export type StrapiQuery = Partial<Record<QueryKeys, unknown>>; // & Record<string, unknown>;

export function cms(path: string, query?: StrapiQuery, queryOpts?: IStringifyOptions) {
  const base = process.env.STRAPI_URL;

  if (!query) {
    return `${base}/api/${path}`;
  }

  const q = stringify(query, queryOpts ?? { encodeValuesOnly: true });
  return `${base}/api/${path}?${q}`;
}

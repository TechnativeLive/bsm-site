import { IStringifyOptions, stringify } from 'qs';

export function cms(path: string, query?: Record<string, unknown>, queryOpts?: IStringifyOptions) {
  const base = process.env.STRAPI_URL;

  if (!query) {
    return `${base}/api/${path}`;
  }

  const q = stringify(query, queryOpts ?? { encodeValuesOnly: true });
  return `${base}/api/${path}?${q}`;
}

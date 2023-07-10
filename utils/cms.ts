import { GetAttributesValues } from '@strapi/strapi';
import { RequestInit } from 'next/dist/server/web/spec-extension/request';
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

  if (!query && process.env.NODE_ENV === 'production') {
    return `${base}/api/${path}`;
  }

  const q =
    process.env.NODE_ENV === 'development'
      ? {
          publicationState: 'preview',
          ...query,
        }
      : query;

  const qs = stringify(q, queryOpts ?? { encodeValuesOnly: true });
  return `${base}/api/${path}?${qs}`;
}

// type ArrayExtract<T> = T extends (unknown[] | readonly unknown[]) ? T[number] : T

// // type Filter = Record<string,

// type Q<S extends keyof Strapi.Schemas | keyof Strapi.Schemas[]> = {
//   sort: string[];
//   // filters:
// };

// const defaultFetchOpts: RequestInit = {
//   next: { revalidate: process.env.NODE_ENV === 'production' ? Infinity : 1 },
// };

// const routes = {
//   user: 'plugin::users-permissions.user',
//   users: ['plugin::users-permissions.user'],
//   calendar: 'api::calendar.calendar'
// } as const satisfies Record<string, keyof Strapi.Schemas | readonly [keyof Strapi.Schemas]>

// type BaseRoutes = typeof routes

// type Routes = BaseRoutes & {
//   [K in keyof BaseRoutes as `${K}/${string}`]: false
// }

// export async function cmsQuery<BasePath extends keyof BaseRoutes, Path extends BasePath | `${BasePath}/${string}`, Schema extends ArrayExtract<BaseRoutes[BasePath]>>(
//   path: Path,
//   query?: Q<Schema>,
//   fetchOpts = defaultFetchOpts
//   ) {
//   const url = cms(path, query);
//   console.log(`CMS [${path}}: ${url}`);

//   type Return = Path extends `${BasePath}/${string}` ? [] : string

//   const result: Return = await fetch(url, fetchOpts).then((res) => res.json());

//   return result
// }
// // const a = await cmsQuery({path: 'users', schema: 'api::article.article'})
// const a = await cmsQuery('users')
// //    ^?
// type SR<S extends keyof Strapi.Schemas> = S extends 'plugin::users-permissions.user' ? StrapiDataResponse<S> : StrapiMetaResponse<S>

// type StrapiDataResponse<S extends keyof Strapi.Schemas> = GetAttributesValues<S> & { id: number }

// type StrapiMetaResponse<S extends keyof Strapi.Schemas> = {
//   data: StrapiDataResponse<S>
//   meta?: Record<string, unknown>;
//   error?: {
//     status: string; // HTTP status
//     name: string; // Strapi error name ('ApplicationError' or 'ValidationError')
//     message: string; // A human readable error message
//     details: unknown;
//   }
// }

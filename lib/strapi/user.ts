import { cms } from '@/utils/cms';
import { GetAttributesValues } from '@strapi/strapi';

export async function getUser(username: string) {
  const userQuery = cms('users', {
    fields: ['firstname', 'lastname', 'jobTitle'],
    filters: { username: { $eq: username } },
  });
  console.log({ userQuery });

  const user: Strapi.Response<GetAttributesValues<'plugin::users-permissions.user'>[]>['data'] =
    await fetch(userQuery, {
      next: { revalidate: Infinity },
    }).then((res) => res.json());

  return user?.[0];
}

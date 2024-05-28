import { cms } from '@/utils/cms';

export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
  try {
    const ridersQuery = cms('riders', {
      fields: ['firstname', 'lastname', 'bib', 'hometown'],
      populate: { team: { fields: ['name'] } },
      pagination: { pageLimit: 1000 },
    });
    const riders = await fetch(ridersQuery).then((res) => res.json());

    const riderData = riders.data.map((rider: any) => ({
      ...rider,
      id: `_${rider.bib.toUpperCase()}_${rider.lastname.toUpperCase()}`,
      title: `${rider.firstname} ${rider.lastname}, ${rider.bib}`,
    }));

    return new Response(JSON.stringify(riderData), {
      headers: { 'content-type': 'application/json' },
    });
  } catch (error) {
    // @ts-ignore
    const message = error?.message || 'An error occurred';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}

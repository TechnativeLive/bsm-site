import { cms } from '@/utils/cms';
import { writeFile } from 'fs/promises';
import path from 'path';

(async () => {
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

    const riderDataDirectory = path.join(process.cwd(), 'public', 'data', 'riders.json');
    await writeFile(riderDataDirectory, JSON.stringify(riderData), {
      encoding: 'utf-8',
      flag: 'w',
    });
    console.log(`Rider data written to ${riderDataDirectory}`);
  } catch (e) {
    console.warn(e);
  }
})();

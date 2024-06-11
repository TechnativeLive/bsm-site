import { cms } from '@/utils/cms';
import { put } from '@vercel/blob';
// import { writeFile } from 'fs/promises'; 
// import path from 'path';

(async () => {
  try {
    const ridersQuery = cms('riders', {
      fields: ['firstname', 'lastname', 'bib', 'hometown'],
      populate: { team: { fields: ['name'] } },
      pagination: { pageLimit: 1000 },
    });
    const riders = await fetch(ridersQuery).then((res) => res.json());

    const riderData = riders.data
      .map((rider: any) => ({
        ...rider,
        id: `_${rider.bib.toUpperCase()}_${rider.lastname.toUpperCase()}`,
        title: `${rider.bib} - ${rider.lastname}, ${rider.firstname}`,
      }))
      .sort((a: { bib: string }, b: { bib: string }) => {
        const aNum = Number(a.bib);
        const bNum = Number(b.bib);
        const aIsNaN = Number.isNaN(aNum);
        const bIsNaN = Number.isNaN(bNum);

        if (aIsNaN && bIsNaN) {
          return a.bib.localeCompare(b.bib);
        }

        if (aIsNaN && !bIsNaN) {
          return 1;
        }

        if (!aIsNaN && bIsNaN) {
          return -1;
        }

        return aNum - bNum;
      });

    // const riderDataDirectory = path.join(process.cwd(), 'public', 'data', 'riders.json');
    // await writeFile(riderDataDirectory, JSON.stringify(riderData), {
    //   encoding: 'utf-8',
    //   flag: 'w',
    // });

    const { url } = await put('riders.json', JSON.stringify(riderData), {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
      cacheControlMaxAge: 0,
    });
    console.log(`Rider data written to ${url}`);
  } catch (e) {
    console.warn(e);
  }
})();

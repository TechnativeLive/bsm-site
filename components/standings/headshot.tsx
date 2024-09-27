'use client';

import { Standings } from '@/lib/strapi/standings';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function Headshot({ entrant }: { entrant: Standings[number] }) {
  console.log(entrant);
  const [src, setSrc] = useState(
    `https://dinxiwhaebootclzzzmr.supabase.co/storage/v1/object/public/motorsport/headshots/_${
      entrant.driverNumber
    }_${(entrant.name?.split(' ') || ['', ''])[1].toUpperCase()}.png`
  );

  useEffect(() => {
    setSrc(
      `https://dinxiwhaebootclzzzmr.supabase.co/storage/v1/object/public/motorsport/headshots/_${
        entrant.driverNumber
      }_${(entrant.name?.split(' ') || ['', ''])[1].toUpperCase()}.png`
    );
  }, [entrant.driverNumber, entrant.name]);

  return (
    <Image
      src={src}
      height={224}
      width={251}
      style={{ objectFit: 'contain', objectPosition: 'bottom', maxHeight: '224px' }}
      alt={entrant.name || `Rank ${entrant.rank} headshot`}
      onError={() => setSrc('/img/missing-rider.png')}
    />
  );
}

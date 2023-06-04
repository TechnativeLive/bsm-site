import { Standings } from '@/components/standings/standings';
import { getStandings } from '@/lib/strapi/standings';

export const StandingsData = async ({ fullView }: { fullView?: boolean }) => {
  const standings = await getStandings();

  return <Standings standings={standings} fullView={fullView} />;
};

import { StandingsData } from '@/components/standings/standings-data';

export default async function Page() {
  return (
    <section className='-mt-px w-full bg-slate-100 pb-8'>
      {/* @ts-expect-error Async Server Component */}
      <StandingsData fullView />
    </section>
  );
}

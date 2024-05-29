import { FullPageStandings } from '@/components/standings/full-page/full-page';

export const metadata = {
  title: 'Results',
  description: 'View the official results for BSM 2024.'
}

export default async function Page() {
  return (
    <section className='relative -mt-px w-full bg-slate-100 pb-8 after:absolute after:bottom-0 after:-z-40 after:h-24 after:w-full after:translate-y-24 after:bg-gradient-to-b after:from-slate-100'>
      {/* @ts-expect-error Async Server Component */}
      <FullPageStandings />
    </section>
  );
}

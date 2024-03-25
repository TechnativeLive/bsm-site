import { RulesPageClientComponent } from '@/app/(home)/rules/client';
import { CallToAction } from '@/components/strapi/cta';
import { container } from '@/components/tailwind';
import { getNoraEventLink } from '@/lib/strapi/nora-event-link';
import clsx from 'clsx';

// grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]
export default async function Page() {
  const noraEventLink = await getNoraEventLink();

  return (
    <section className={clsx(container, 'mb-16 w-full justify-center')}>
      <h1 className='mb-16 mt-24 flex justify-center text-4xl font-bold'>Rules & Regulations</h1>
      <div className='mx-auto mb-8'>
        <CallToAction
          link={{
            label: 'Sign up to ride in the next event',
            isExternal: true,
            url: noraEventLink,
            theme: 'primary',
          }}
        />
      </div>
      <RulesPageClientComponent />
    </section>
  );
}

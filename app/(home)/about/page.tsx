import { CallToAction } from '@/components/strapi/cta';
import { container } from '@/components/tailwind';
import clsx from 'clsx';

export default async function Page() {
  return (
    <section className={clsx(container, 'my-24')}>
      <article className='prose prose-slate lg:prose-lg'>
        <h1>Welcome To BSM</h1>
        <p>
          Welcome to the exciting new era of supermoto racing! The 2023 British Supermoto
          Championship (BSSC) is finally here, and it promises to be the most thrilling season yet.
        </p>

        <h2>The 2023 BSSC Season</h2>
        <p>
          The BSSC will feature some of the best supermoto riders in the UK, as they compete across
          multiple rounds in various locations throughout the country. From the winding roads of
          Rowrah to the fast-paced corners of Three Sisters, these riders will be pushed to their
          limits as they battle it out for the coveted BSSC title.
        </p>
        <p>
          But it&apos;s not just about the riders. The BSSC also showcases some of the most
          cutting-edge supermoto bikes in the world, with the latest technology and designs pushing
          the boundaries of what&apos;s possible in this high-octane sport.
        </p>
        <p>
          And let&apos;s not forget about the fans. With a passionate and dedicated following, the
          BSSC offers an unforgettable experience for anyone who loves the thrill of supermoto
          racing. From the roar of the engines to the adrenaline-pumping action on the track, the
          BSSC is the ultimate spectator sport.
        </p>
        <p>
          So what are you waiting for? Get ready to witness the speed, skill, and excitement of the
          2023 British Supermoto Championship. This is one event you won&apos;t want to miss!
        </p>
        <CallToAction
          link={{
            label: 'Sign up to ride in the next event',
            isExternal: true,
            url: 'https://nora92.com/event/norasport-bssc-championship-234/',
          }}
        />
      </article>
    </section>
  );
}

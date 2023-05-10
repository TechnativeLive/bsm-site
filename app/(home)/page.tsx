import { CalendarCarousel } from '@/components/calendar/carousel/calendar-carousel';
import { FeaturedLatest } from '@/components/latest/featured/featured-latest';
import { sampleEvents } from '@/components/upcoming-event/sample-data';
import { UpcomingEvent } from '@/components/upcoming-event/upcoming-event';

export default function Home() {
  return (
    <>
      <article>
        <UpcomingEvent allEvents={sampleEvents} />
      </article>
      <section>
        <FeaturedLatest />
      </section>
      <section>
        <CalendarCarousel />
      </section>
      <section>latest standings - drivers / teams</section>
      <section>featured long-standing articles</section>
    </>
  );
}

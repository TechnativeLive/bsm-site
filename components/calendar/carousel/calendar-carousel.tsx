import { EventStatus } from '@/app/(home)/page';
import { CalendarCarouselItem } from '@/components/calendar/carousel/carousel-item';
import { cms } from '@/utils/cms';
import { GetAttributesValues, GetRelationAttributeValue } from '@strapi/strapi';

export type CalendarItem = GetAttributesValues<'api::calendar-item.calendar-item'>;

async function getCalendar() {
  const query = cms('calendar', {
    populate: {
      current: {
        populate: { track: { populate: ['name', 'layout'] } },
      },
    },
  });
  console.log({ query });

  try {
    const res = await fetch(query, { next: { revalidate: Infinity } });

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch calendar data');
    }

    const json = (await res.json()) as Strapi.Response<
      GetAttributesValues<'api::calendar.calendar'>
    >;
    const currentCalendar = json.data.current;

    return currentCalendar;
  } catch (e) {
    console.log(e);
    throw new Error('Failed to fetch calendar data');
  }
}

export const CalendarCarousel = async ({
  eventStatus,
}: {
  eventStatus: { index?: number; status: EventStatus };
}) => {
  // console.log(cms('calendar', { populate: '*' }));
  const rounds = await getCalendar();

  return (
    <div className='relative flex w-full max-w-max flex-nowrap gap-3 overflow-x-scroll p-6 px-12 scrollbar-thin scrollbar-track-slate-500/0 scrollbar-thumb-primary-700'>
      {/* <Image
          src='/gradient.png'
          fill
          alt='Soft gradient background'
          className='absolute inset-0 opacity-50 blur-2xl'
        /> */}
      {rounds?.map((event, i) => (
        <CalendarCarouselItem
          key={i}
          item={event}
          status={i === eventStatus.index ? eventStatus.status : 'inactive'}
        />
      ))}
    </div>
  );
};

'use client';
import { GetAttributesValues } from '@strapi/strapi';

export type EventStatus = 'inactive' | 'active' | 'upcoming';

export function useCurrentEvent(
  calendar: GetAttributesValues<'api::calendar-item.calendar-item'>[] | undefined
) {
  let index: number = -1;
  let status: EventStatus = 'active';
  if (!calendar) {
    return { index, status, event: undefined };
  }

  const now = new Date();
  const futureEventIndex = calendar.findIndex((event) => new Date(event.start) > now) ?? -1;

  if (futureEventIndex === 0) {
    index = 0;
    status = 'active';
  } else if (futureEventIndex > 0) {
    const maybeCurrentEvent = calendar?.[futureEventIndex - 1];
    if (maybeCurrentEvent && new Date(maybeCurrentEvent.end) > now) {
      status = 'active';
      index = futureEventIndex - 1;
    } else {
      status = 'upcoming';
      index = futureEventIndex;
    }
  }

  const event = index && index < calendar.length ? calendar[index] : undefined;
  return { index, status, event };
}

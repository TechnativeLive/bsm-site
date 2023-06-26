import { ordinalSuffix } from '@/utils/ordinal-suffix';
import { GetAttributesValues } from '@strapi/strapi';

const fmtMonth = new Intl.DateTimeFormat('en-GB', { month: 'short' });

export const DateString = ({
  event,
  year,
}: {
  event: GetAttributesValues<'api::calendar-item.calendar-item'>;
  year?: boolean;
}) => {
  const startDate = new Date(event.start);
  const endDate = new Date(event.end);

  const startMonth = fmtMonth.format(startDate);
  const endMonth = fmtMonth.format(endDate);

  const startDay = startDate.getDate();
  const endDay = endDate.getDate();

  return (
    <div className='uppercase'>
      <span>{startDay}</span>
      <span className='align-top text-[0.75em] leading-[1.75em]'>
        {ordinalSuffix(startDay)}
      </span>{' '}
      {startMonth !== endMonth && <span>{startMonth} </span>}
      <span>-</span> <span>{endDay}</span>
      <span className='align-top text-[0.75em] leading-[1.75em]'>{ordinalSuffix(endDay)}</span>{' '}
      <span>{endMonth}</span>
      {year && <span> {endDate.getFullYear()}</span>}
    </div>
  );
};

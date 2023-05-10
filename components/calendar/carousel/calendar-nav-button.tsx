'use client';

export const CarouselCalendarNavButton = ({ action }: { action: 'prev' | 'next' }) => (
  <button
    onMouseDown={(ev) => {
      const items = ev.currentTarget.parentNode?.parentNode?.childNodes?.[1];
      console.log('has', items?.contains(document.activeElement));
    }}
    onClick={(ev) => {
      const items = ev.currentTarget.parentNode?.parentNode?.childNodes?.[1];
      console.log('has', items?.contains(document.activeElement));
    }}
    className='h-8 w-8 rounded-full bg-primary-200/20 font-black hover:bg-primary-200/30'
  >
    {action === 'prev' ? '<' : '>'}
  </button>
);

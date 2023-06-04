import { container } from '@/components/tailwind';
import clsx from 'clsx';
import { Url } from 'next/dist/shared/lib/router/router';
import Link from 'next/link';

type CardProps = { title: string; href: Url; description?: string };

const cards: CardProps[] = [
  {
    title: 'Championship Conditions',
    href: 'https://img1.wsimg.com/blobby/go/3449325a-acf2-4fa2-ae3e-aea42871b152/1-2023_BSSC_Champ_Conditions-99517e2.pdf',
    description: '2023 British Supermoto Championship Conditions',
  },
  {
    title: 'Standing Regulations',
    href: 'https://img1.wsimg.com/blobby/go/3449325a-acf2-4fa2-ae3e-aea42871b152/2-2023_BSSC_Supermoto_Standing_Regs-4771134.pdf',
    description: '2023 British Supermoto Standing Regulations',
  },
  {
    title: 'Sporting Code',
    href: 'https://img1.wsimg.com/blobby/go/3449325a-acf2-4fa2-ae3e-aea42871b152/3-2023_BSSC_Sporting_Code-12308ce.pdf',
    description: '2023 British Supermoto Sporting Code',
  },
  {
    title: 'Technical Regulations',
    href: 'https://img1.wsimg.com/blobby/go/3449325a-acf2-4fa2-ae3e-aea42871b152/4-2023_BSSC_Solo_Technical%20_Regs-092e7d0.pdf',
    description: '2023 British Supermoto Technical Regulations',
  },
];

// grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]
export default async function Page() {
  return (
    <section className={clsx(container, 'mb-16 w-full justify-center')}>
      <h1 className='my-24 flex justify-center text-4xl font-bold'>Rules & Regulations</h1>
      <div className='mx-auto grid w-full max-w-4xl grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2'>
        {cards.map((card, i) => (
          <Card key={i} {...card} />
        ))}
      </div>
    </section>
  );
}

function Card({ title, href, description }: { title: string; href: Url; description?: string }) {
  return (
    <div className='relative flex flex-col justify-end bg-slate-50 px-5 pb-4 pt-8 text-center ring-1 ring-slate-700/10 transition-colors hover:bg-slate-50/40'>
      <h2 className='grow text-2xl font-bold'>{title}</h2>
      <Link
        href={href}
        target='_blank'
        className={clsx(
          'mb-4 mt-6 bg-slate-900 px-3 py-2 font-semibold text-white hover:bg-primary-900',
          'relative transition-colors after:absolute after:uppercase after:corner-4 after:corner-slate-50 after:hover:corner-slate-50'
        )}
      >
        PDF Download
      </Link>
      {description && <p className='text-sm leading-6 text-slate-500'>{description}</p>}
    </div>
  );
}

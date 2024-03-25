'use client';

import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { useCallback, useRef, useState } from 'react';

const year = 2024;
const pdfConditions = `https://dinxiwhaebootclzzzmr.supabase.co/storage/v1/object/public/motorsport/bsm/rules-and-regs/1-${year}_Championship_Conditions.pdf`;
const pdfStanding = `https://dinxiwhaebootclzzzmr.supabase.co/storage/v1/object/public/motorsport/bsm/rules-and-regs/2-${year}_Standing_Regulations.pdf`;
const pdfSporting = `https://dinxiwhaebootclzzzmr.supabase.co/storage/v1/object/public/motorsport/bsm/rules-and-regs/3-${year}_Sporting_Code.pdf`;
const pdfTechnical = `https://dinxiwhaebootclzzzmr.supabase.co/storage/v1/object/public/motorsport/bsm/rules-and-regs/4-${year}_Solo_Technical_Regulations.pdf`;

type CardProps = { title: string; href: string; description?: string };

const cards: CardProps[] = [
  {
    title: 'Championship Conditions',
    href: pdfConditions,
    description: `${year} British Supermoto Championship Conditions`,
  },
  {
    title: 'Standing Regulations',
    href: pdfStanding,
    description: `${year} British Supermoto Standing Regulations`,
  },
  {
    title: 'Sporting Code',
    href: pdfSporting,
    description: `${year} British Supermoto Sporting Code`,
  },
  {
    title: 'Technical Regulations',
    href: pdfTechnical,
    description: `${year} British Supermoto Technical Regulations`,
  },
];

const PdfViewer = dynamic(() => import('@/components/pdf-viewer/viewer'), {
  ssr: false,
});

export function RulesPageClientComponent() {
  const [shownPdf, setShownPdf] = useState<string | undefined>(undefined);

  const pdfContainerRef = useRef<HTMLDivElement>(null);

  const setShownPdfAndScroll = useCallback(
    (href: string) => {
      setShownPdf(href);
      pdfContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
    },
    [pdfContainerRef, setShownPdf]
  );

  return (
    <>
      <div className='mx-auto my-12 grid w-full max-w-4xl grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2'>
        {cards.map((card, i) => (
          <Card key={i} {...card} setShownPdf={setShownPdfAndScroll} />
        ))}
      </div>

      <div
        ref={pdfContainerRef}
        className={clsx(
          'grid transition-all duration-500 ease-in-out',
          shownPdf ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className='overflow-hidden'>
          <PdfViewer file={shownPdf || ''} />
        </div>
      </div>
    </>
  );
}

function Card({
  title,
  href,
  description,
  setShownPdf,
}: {
  title: string;
  href: string;
  description?: string;
  setShownPdf: (href: string) => void;
}) {
  return (
    <div className='relative flex flex-col justify-end bg-slate-50 px-5 pb-4 pt-8 text-center ring-1 ring-slate-700/10 transition-colors hover:bg-slate-50/40'>
      <h2 className='grow cursor-pointer text-2xl font-bold'>{title}</h2>
      <a
        href={href}
        target='_blank'
        download={title}
        className={clsx(
          'mb-4 mt-6 bg-slate-900 px-3 py-2 font-semibold text-white hover:bg-primary-900',
          'relative transition-colors after:absolute after:uppercase after:corner-4 after:corner-slate-50 after:hover:corner-slate-50'
        )}
      >
        PDF Download
      </a>
      {description && <p className='mb-4 text-sm leading-6 text-slate-500'>{description}</p>}

      <button className='text-primary-600' onClick={() => setShownPdf(href)}>
        Click to view PDF below
      </button>
    </div>
  );
}

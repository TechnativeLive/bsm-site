'use client';

import { ErrorComponent } from '@/components/error';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body className='flex min-h-screen flex-col items-center justify-center bg-slate-100'>
        <ErrorComponent error={error} reset={reset} />
      </body>
    </html>
  );
}

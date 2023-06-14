'use client';

export function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className='flex min-h-screen grow flex-col items-center justify-center bg-slate-100'>
      <h2 className='mb-6 text-lg text-slate-600'>Something went wrong!</h2>
      <button
        className='relative rounded border-2 border-slate-400 px-3 py-1 font-medium'
        onClick={() => reset()}
      >
        Try Again
      </button>
    </div>
  );
}

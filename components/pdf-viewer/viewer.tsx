'use client';

import { memo, useEffect, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

function PdfViewer({ file }: { file: string }) {
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const { width } = useWindowSize({ debounceDelay: 100 });

  const pageWidth = Math.min(565, width - 50);
  const pageHeight = pageWidth * (800 / 565);

  useEffect(() => {
    setCurrentPage(1);
  }, [file]);

  return (
    <div className='flex flex-col items-center gap-4'>
      <div
        style={{ width: pageWidth, height: pageHeight }}
        className='grid place-content-center overflow-hidden border shadow-lg'
      >
        <Document
          file={file}
          onLoadSuccess={({ numPages }) => setPageCount(numPages)}
          loading='Loading file...'
          noData='File missing. Please try the download link'
        >
          <Page
            pageNumber={currentPage}
            width={pageWidth}
            height={pageHeight}
            devicePixelRatio={Math.min(
              2,
              typeof window !== 'undefined' ? window.devicePixelRatio : 1
            )}
          />
        </Document>
      </div>

      <div className='flex items-center justify-center gap-4'>
        <button
          className='rounded-lg bg-gray-200 p-2 enabled:hover:bg-gray-300 disabled:opacity-50'
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <p className='w-28 text-center'>
          Page {currentPage} of {pageCount}
        </p>
        <button
          className='rounded-lg bg-gray-200 p-2 enabled:hover:bg-gray-300 disabled:opacity-50'
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === pageCount}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default memo(PdfViewer);

'use client';

import { memo } from 'react';
import { Document, Page, PageProps, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { OnDocumentLoadSuccess } from 'react-pdf/dist/cjs/shared/types';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

function PdfViewerInternals({
  file,
  onLoadSuccess,
  currentPage,
  width,
  height,
}: {
  file: string;
  onLoadSuccess: OnDocumentLoadSuccess;
  currentPage: PageProps['pageNumber'];
  width: PageProps['width'];
  height: PageProps['height'];
}) {
  return (
    <Document
      file={file}
      onLoadSuccess={onLoadSuccess}
      loading='Loading file...'
      noData='File missing. Please try the download link'
    >
      <Page pageNumber={currentPage} width={width} height={height} />
    </Document>
  );
}

export default memo(PdfViewerInternals);

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import * as pdfjsLib from 'pdfjs-dist';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Important: set the worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = "../../node_modules/pdfjs-dist/build/pdf.worker.min.js";

function BlogPage() {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    setError(null);
  }

  function onDocumentLoadError(error: Error): void {
    console.error('PDF load error:', error);
    setError(`Failed to load PDF: ${error.message}`);
  }

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <Document
            file={'../assets/magic.pdf'}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading="Loading PDF..."
          >
            <Page pageNumber={pageNumber} />
          </Document>
          {numPages > 0 && (
            <p>Page {pageNumber} of {numPages}</p>
          )}
        </>
      )}
    </div>
  );
};

export default BlogPage;
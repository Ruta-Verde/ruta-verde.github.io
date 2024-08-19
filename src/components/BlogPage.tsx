import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Import the PDF file
import pdfFile from '../assets/magic.pdf';

// Important: set the worker source
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      {error ? (
        <p style={{ color: 'red', fontWeight: 'bold' }}>Error: {error}</p>
      ) : (
        <>
          <Document
            file={pdfFile}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={<p>Loading PDF...</p>}
          >
            <Page pageNumber={pageNumber} width={600} />
          </Document>
          {numPages > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '10px' }}>
              <button onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))} disabled={pageNumber <= 1}>
                Previous
              </button>
              <p>Page {pageNumber} of {numPages}</p>
              <button onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages))} disabled={pageNumber >= numPages}>
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default BlogPage;

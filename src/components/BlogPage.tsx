import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Import the PDF file
import pdfFile from '../assets/magic.pdf';

// Important: set the worker source
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.js`;

const containerStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  padding: '20px',
  maxWidth: '800px',
  margin: '0 auto'
};

const errorStyle = {
  color: 'red',
  fontWeight: 'bold'
};

const navigationStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  marginTop: '10px'
};

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
    <main style={containerStyle}>
      {error ? (
        <p style={errorStyle}>Error: {error}</p>
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
            <nav style={navigationStyle}>
              <button 
                onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))} 
                disabled={pageNumber <= 1}
                aria-label="Previous page"
              >
                Previous
              </button>
              <p>Page {pageNumber} of {numPages}</p>
              <button 
                onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages))} 
                disabled={pageNumber >= numPages}
                aria-label="Next page"
              >
                Next
              </button>
            </nav>
          )}
        </>
      )}
    </main>
  );
}

export default BlogPage;

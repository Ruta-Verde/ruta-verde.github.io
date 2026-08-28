import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Box, HStack, Text, Avatar, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Derive the worker URL from the version react-pdf's own pdfjs export reports,
// rather than hardcoding a version or relying on local module resolution
// (this repo has multiple pdfjs-dist copies installed, so `import.meta.url`
// resolution can pick the wrong one and mismatch the bundled API version).
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

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

interface BlogPdfViewerProps {
  fileUrl: string;
  author: string;
  date: Date;
}

export default function BlogPdfViewer({ fileUrl, author, date }: BlogPdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [matches, setMatches] = useState(window.matchMedia("(min-width: 800px)").matches)

  useEffect(() => {
    window
    .matchMedia("(min-width: 800px)")
    .addEventListener('change', e => setMatches( e.matches ));
  }, []);

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
          <Box outline='1px solid black' w={['300px', null, null, '1000px']}>
              <Document
                file={fileUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={
                <Box padding='6' boxShadow='lg' bg='white'>
                  <SkeletonCircle size='10' />
                  <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
                </Box>
                }
              >
                <HStack ml={['20px', null, null, '130px']} mt={['10px', null, null, '50px']}>
                  <Avatar size={['xs', null, null, 'sm']} name={author} />
                  <Text fontSize={['xs', null, null, 'sm']}>
                    {author}
                  </Text>
                  <Text fontSize={['xs', null, null, 'sm']}>
                    {date.toLocaleDateString('default', {month: "short" }) + ' '}
                    {date.toLocaleDateString('default', {day: "2-digit" }) + ', '}
                    {date.toLocaleDateString('default', {year: "numeric" })}
                  </Text>
                </HStack>
                {[...Array(numPages)]
                .map((_, i)=>i+1)
                .map(page => <Page className='pages' pageNumber={page} width={matches ? 1000 : 300}/>)}
              </Document>
          </Box>
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

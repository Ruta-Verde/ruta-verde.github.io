import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Document, Page } from 'react-pdf';
import { Box, HStack, Text, Avatar } from '@chakra-ui/react';
import { pdfjs } from 'react-pdf';
import { blogList } from '../blog_data/blogs.ts';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Important: set the worker source
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.mjs`;

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
  const { slug } = useParams();
  const blogPost = blogList.filter(blog => blog.slug === slug)[0];
  
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
          <Box outline='1px solid black'>
            <HStack ml='130px' mt='50px'>
              <Avatar size='sm' name='Joao Soto' />
              <Text fontSize='sm'>
                {blogPost.author}
              </Text>
              <Text fontSize='sm'>
                {blogPost.date.toLocaleDateString('default', {month: "short" }) + ' '}
                {blogPost.date.toLocaleDateString('default', {day: "2-digit" }) + ', '}
                {blogPost.date.toLocaleDateString('default', {year: "numeric" })}
              </Text>
              <Text fontSize='sm'>
                9 min read
              </Text>
            </HStack>
              <Document
                file={blogPost.src}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={<p>Loading PDF...</p>}
              >
                {Array.apply(null, Array(numPages))
                .map((_, i)=>i+1)
                .map(page => <Page pageNumber={page} width={1000}/>)}
                {/* <Page pageNumber={pageNumber} width={600} /> */}
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

export default BlogPage;

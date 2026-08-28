import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import BlogPdfViewer from '../../components/BlogPdfViewer';
import { fetchBlogPostBySlug } from '../../lib/dashboardBlog';
import type { DashboardBlogPost } from '../../types/DashboardBlogPost';

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

export default function BlogPostPreview() {
  const { title } = useParams();
  const [blogPost, setBlogPost] = useState<DashboardBlogPost | null>(null);
  const [loadingPost, setLoadingPost] = useState(true);

  useEffect(() => {
    if (!title) {
      setLoadingPost(false);
      return;
    }
    fetchBlogPostBySlug(title)
      .then(setBlogPost)
      .finally(() => setLoadingPost(false));
  }, [title]);

  if (loadingPost) {
    return (
      <main style={containerStyle}>
        <Box padding='6' boxShadow='lg' bg='white'>
          <SkeletonCircle size='10' />
          <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
        </Box>
      </main>
    );
  }

  if (!blogPost) {
    return (
      <main style={containerStyle}>
        <p style={errorStyle}>Error: Post not found</p>
      </main>
    );
  }

  return <BlogPdfViewer fileUrl={blogPost.fileUrl} author={blogPost.author} date={new Date(blogPost.date)} />;
}

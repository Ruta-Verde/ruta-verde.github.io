// import React from 'react';
import '../styles/testimonials.css';
import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';

function Testimonials() {
  return (
    <Box id="testimonials" py={10} bg="gray.50">
      <Heading as="h2" size="xl" mb={6}>
        Testimonials
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Box bg="white" p={5} shadow="md" borderRadius="md">
          <Text>"Great app!" - User A</Text>
        </Box>
        <Box bg="white" p={5} shadow="md" borderRadius="md">
          <Text>"Really useful." - User B</Text>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default Testimonials;

// import React from 'react';
import '../styles/featureSection.css';
import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';

function FeatureSection() {
  return (
    <Box id="features" py={10}>
      <Heading as="h2" size="xl" mb={6}>
        Features
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Box bg="gray.100" p={5} borderRadius="md">
          <Text>Feature 1</Text>
        </Box>
        <Box bg="gray.100" p={5} borderRadius="md">
          <Text>Feature 2</Text>
        </Box>
        <Box bg="gray.100" p={5} borderRadius="md">
          <Text>Feature 3</Text>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default FeatureSection;

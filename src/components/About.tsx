import {
  Box,
  Heading,
  Text,
  VStack,
  Image,
  Flex,
  SimpleGrid,
  Icon,
} from '@chakra-ui/react';
import { FaLightbulb, FaHandshake, FaRocket } from 'react-icons/fa';
import { filler } from './constants/constants.tsx'

function About() {
  return (
    <Box py={16} maxW="90vw" mx={4}>
      <VStack spacing={12} position='relative' align="center">
        <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="space-between">
          <Box flex={1} pr={{ base: 0, md: 8 }}>
            <Heading as="h1" size="2xl" mb={4}>
              About Ruta Verde
            </Heading>
            <Text fontSize="xl" color="gray.600">
              We do some stuff I think
          </Text>
          </Box>
          <Box flex={1} mt={{ base: 8, md: 0 }}>
            <Image 
              src="https://static.vecteezy.com/system/resources/previews/002/098/203/non_2x/silver-tabby-cat-sitting-on-green-background-free-photo.jpg" 
              alt="Team" 
              borderRadius="md" 
              boxShadow="lg"
            />
          </Box>
        </Flex>
        
        <Box>
          <Heading as="h2" size="xl" mb={4}>
            Our Story
          </Heading>
          <Text fontSize="lg" color="gray.600">
            {filler}
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="xl" mb={8} textAlign="center">
            Our Values
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            {[
              { icon: FaLightbulb, title: 'Filler title', description: 'Filler text Filler text Filler text Filler text.' },
              { icon: FaHandshake, title: 'Filler title', description: 'Filler text Filler text Filler text Filler text.' },
              { icon: FaRocket, title: 'Filler title', description: 'Filler text Filler text Filler text Filler text.' },
            ].map((value, index) => (
              <VStack key={index} align="center" p={6} bg="gray.50" borderRadius="md">
                <Icon as={value.icon} w={10} h={10} color="blue.500" />
                <Heading as="h3" size="md" mb={2}>
                  {value.title}
                </Heading>
                <Text textAlign="center" color="gray.600">
                  {value.description}
                </Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Box>

        <Box>
          <Heading as="h2" size="xl" mb={8} textAlign="center">
            Meet the Team
          </Heading>
          <SimpleGrid columns={[1, 2, 3]} spacing='30px'>
            {[
              { name: "John Doe", role: "CEO", image: "https://via.placeholder.com/150" },
              { name: "Jane Smith", role: "CTO", image: "https://via.placeholder.com/150" },
              { name: "Mike Johnson", role: "CFO", image: "https://via.placeholder.com/150" },
              { name: "Emily Brown", role: "Marketing Director", image: "https://via.placeholder.com/150" },
              { name: "David Lee", role: "Lead Developer", image: "https://via.placeholder.com/150" },
              { name: "Sarah Wilson", role: "UX Designer", image: "https://via.placeholder.com/150" },
              { name: "Tom Harris", role: "Sales Manager", image: "https://via.placeholder.com/150" },
              { name: "Lisa Chen", role: "Product Manager", image: "https://via.placeholder.com/150" },
              { name: "Alex Taylor", role: "Customer Support Lead", image: "https://via.placeholder.com/150" },
            ].map((member, index) => (
              <VStack key={index} align="center" p={4} bg="gray.50" borderRadius="md" boxShadow="sm">
                <Image src={member.image} alt={member.name} borderRadius="full" boxSize="150px" objectFit="cover" />
                <Heading as="h3" size="md" mt={2}>
                  {member.name}
                </Heading>
                <Text color="gray.600" fontWeight="medium">
                  {member.role}
                </Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Box>
      </VStack>
    </Box>
  );
};

export default About;

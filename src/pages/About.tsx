import {
  Box,
  Heading,
  Text,
  VStack,
  Image,
  Flex,
  SimpleGrid,
  Icon,
  Show,
} from '@chakra-ui/react';
import { FaHandshake, FaGlobe, FaHeart } from 'react-icons/fa';
import ProfileCard from '../components/ProfileCard.tsx';
import { ourStory, ourStory2 } from '../components/constants/constants.tsx';

// Switch to dynamic loading.
// https://stackoverflow.com/questions/72509290/how-to-dynamically-point-to-a-static-asset-leveraging-the-path-lookup-in-vite-vu
import joaoProfilePic from '../assets/profiles/joao.jpg';
import derekProfilePic from '../assets/profiles/derek.png';
import willProfilePic from '../assets/profiles/will.png';
import markProfilePic from '../assets/profiles/mark.jpg';
import thomasProfilePic from '../assets/profiles/thomas.jpg';
import ericProfilePic from '../assets/profiles/eric.png';
import sarahProfilePic from '../assets/profiles/sarah.jpg';
import colinProfilePic from '../assets/profiles/colin.jpg';
import saherProfilePic from '../assets/profiles/saher.jpg';

import aboutPic from '../assets/about2.jpg'

function About() {
  return (
    <Box py={16} maxW="90vw" mx={4}>
      <VStack spacing={12} position='relative' align="center">
        <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="space-between">
          <Box flex={1} pr={{ base: 0, md: 8 }}>
            <Heading as="h1" size="2xl" mb={4}>
              Who we are 
            </Heading>
            <Text as="b" fontSize="xl" color="gray.600" maxW={"80%"} margin={"auto"}>
              A group of environmental activists helping the planet!
            </Text>
            <Text pt={8} fontSize="lg" color="gray.600" align={"left"} maxW={"80%"} margin={"auto"}>
              {ourStory}
            </Text>
            <Show above='md'>
              <Text pt={4} fontSize="lg" color="gray.600" align={"left"} maxW={"80%"} margin={"auto"}>
                {ourStory2}
              </Text>
            </Show>
          </Box>
          <Box flex={1} mt={{ base: 8, md: 0 }}>
            <Image 
              src={aboutPic}
              alt="Team" 
              borderRadius="md" 
              boxShadow="lg"
            />
          </Box>
        </Flex>

        <Box>
          <Heading as="h2" size="xl" mb={8} textAlign="center">
           Our Values 
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            {[
              { icon: FaGlobe, title: 'The Planet', description: 'We strive to leave the planet in a better place than how we found it.' },
              { icon: FaHandshake, title: 'Community', description: 'We work directly with the local communities to learn how to help.' },
              { icon: FaHeart, title: 'Kindness', description: 'Everything comes from a place of kindness and love.' },
            ].map((value, index) => (
              <VStack key={index} align="center" p={6} bg="gray.50" borderRadius="md">
                <Icon as={value.icon} w={10} h={10} color="blue.500" />
                <Heading as="h3" size="md" mb={2}>
                  {value.title}
                </Heading>
                <Text textAlign="center" color="gray.600" maxW={"70%"}>
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
              { name: "Joao Vilca Soto", role: "CEO & Board Member", image: joaoProfilePic},
              { name: "Derek Salinas", role: "Board Member", image: derekProfilePic },
              { name: "William Ceriale", role: "CTO & Board Member", image: willProfilePic },
              { name: "Mark Matsui", role: "Board Member", image: markProfilePic },
              { name: "Thomas Deiner", role: "Board Member", image: thomasProfilePic},
              { name: "Eric Lee", role: "CFO & Board Member", image: ericProfilePic},
              { name: "Sarah McDonald", role: "Board Member", image: sarahProfilePic},
              { name: "Colin Edwards", role: "Board Member", image: colinProfilePic },
              { name: "Saher Ishaq", role: "Project Manager", image: saherProfilePic },
            ].map((member, index) => (
              <VStack key={index} align="center" p={4} bg="gray.50" borderRadius="md" boxShadow="sm">
                <ProfileCard {...member}></ProfileCard>
              </VStack>
            ))}
          </SimpleGrid>
        </Box>
      </VStack>
    </Box>
  );
};

export default About;

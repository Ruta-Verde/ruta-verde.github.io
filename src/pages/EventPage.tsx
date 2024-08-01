
import {
  Box,
  Heading,
  Text,
  HStack,
  VStack,
  Image,
  Flex,
  SimpleGrid,
  Icon,
  Card,
  CardBody,
} from '@chakra-ui/react';
import { FaLightbulb, FaHandshake, FaRocket } from 'react-icons/fa';
import { filler } from '../components/constants/constants.tsx';
import { useParams } from 'react-router-dom';
import { eventList } from '../events_data/events.ts';

function EventPage() {
const { slug } = useParams();
const event = eventList.filter(event => event.slug === slug)[0];
// If event doesn't exist show 404.
  return (
    <Box py={16} maxW="90vw" mx={4}>
        <>
        <Heading as="h1" size="2xl" mb={4}>
            {event.title}
        </Heading>
        <VStack spacing={12} position='relative' align="center">
        <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="space-between">
            <Box flex={1} pr={{ base: 0, md: 8 }}>
            <Image 
                src="https://static.vecteezy.com/system/resources/previews/002/098/203/non_2x/silver-tabby-cat-sitting-on-green-background-free-photo.jpg" 
                alt="Team" 
                borderRadius="md" 
                boxShadow="lg"
            />
            </Box>
            <Box flex={1} mt={{ base: 8, md: 0 }}>
                    <HStack flex={2}>
                        <VStack alignItems={"start"}>
                            <Text as={"b"}>EVENT</Text>
                            <Text>{event.title}</Text>
                        </VStack>
                        <VStack alignItems={"start"}>
                            <Text as={"b"}>DATE</Text>
                            <Text>{event.date.toLocaleDateString()}</Text>
                        </VStack>
                    </HStack>
                    <VStack alignItems={"start"}>
                        <Text as={"b"}>ABOUT</Text>
                        <Text>{event.about}</Text>
                    </VStack>
{/*                 <Box>
                    <Box>
                        <Text></Text>
                        <Text></Text>
                    </Box>
                    <Box>
                        <Text></Text>
                        <Text></Text>
                    </Box>
                </Box>
                <Box>
                    <Text></Text>
                    <Text></Text>
                </Box> */}
            </Box>
        </Flex>
        </VStack>
        </>
    </Box>
  );
};

export default EventPage;

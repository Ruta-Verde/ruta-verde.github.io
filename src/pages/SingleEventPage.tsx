import blogheader from '../assets/blogheader.jpg';
import {
  Box,
  Heading,
  Text,
  VStack,
  Image,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import {useParams} from 'react-router-dom';
import { eventList } from '../events_data/events.ts';
import { useLayoutEffect } from 'react';
import Linkify from 'linkify-react';

function SingleEventPage() {
const { slug } = useParams();
const event = eventList.filter(event => event.slug === slug)[0];

  const dateOptions: Intl.DateTimeFormatOptions = { 
    month: 'long',
    day: '2-digit',
    year: 'numeric',
    timeZone: 'UTC'
  }
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  });

// If event doesn't exist show 404.
  return (
    <Box w='100%'>
      <>
            <Box h='100px' position='relative'>
            <Image position='absolute' src={blogheader} h='100px' w='100%' objectFit='cover' zIndex='0'/>
            <Box position='relative' h='100px' w='100%' bgGradient='linear(to-r, rgba(47, 71, 53, 0.8), rgba(7, 19, 25, 0))' />
            <Text position='absolute' left='0' right='0' top='50px' bottom='0' m='auto' w='100%' h='100px' textColor='white' fontSize='3xl' fontWeight='bold'>Event</Text>
            </Box>
    <Linkify>
    <Box py={16} margin="auto">
        <>
      <VStack spacing={12} position='relative' align="center">
        <Heading as="h1" size="2xl" mb={4}>
            {event.title}
        </Heading>
        <Flex direction={{ base: 'column', md: 'row' }}  justifyContent="center" maxW={"80%"}>
            <Box pr={{ base: 0, md: 8 }} maxW={{md: "35%", base: "100%"}}>
                <Image 
                    src={event.image}
                    alt="Team" 
                    borderRadius="md" 
                    boxShadow="lg"
                    margin="auto"
                />
            </Box>
            <Box textAlign="left" mt={{ base: 8, md: 0 }} maxW={{md: "35%", base: "100%"}}>
                    <Flex flex={1} >
                        <Flex direction={'column'} alignItems={"start"}>
                            <Text as={"b"}>WHERE</Text>
                            <Text>{event.location.toString()}</Text> 
                        </Flex>
                        <Spacer />
                        <Flex direction={'column'} alignItems={"start"}>
                            <Text as={"b"}>DATE</Text>
                            <Text>{event.date.toLocaleDateString('default', dateOptions)}</Text>
                            {event.endDate ? 
                            <Text>- {event.endDate.toLocaleDateString('default', dateOptions)}</Text>
                            : <></>}
                        </Flex>
                    </Flex>
                    <Flex flex={1} mt="8">
                        <Flex direction={'column'} alignItems={"start"}>
                            <Text as={"b"}>ABOUT</Text>
                            <Text>{event.about}</Text>
                        </Flex>
                    </Flex>
            </Box>
        </Flex>
        </VStack>
        </>
    </Box>
    </Linkify>
    </>
    </Box>
  );
}

export default SingleEventPage;

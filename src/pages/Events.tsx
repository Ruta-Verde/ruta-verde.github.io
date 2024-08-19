// Likely want to do something with an image at the top, the author, then a preview of the post, then a click for more button at the bottom
import {
    Box,
    Flex,
    Text,
    Heading,
    Spacer,
    Image,
    LinkBox
  } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom';
import EventsCarousel from '../components/EventsCarousel.tsx'
import { eventList } from '../events_data/events.ts';
import yellowRightArrow from '../assets/YellowRightArrow.svg';

function Events() {
    return (
        <Box w='100vw'>
            <Box
            w='100%' h={{base: '100px', sm: '150px'}} 
            bg='#385C40' 
            textAlign='center' 
            fontSize={{base: '35px', sm: '50px'}}
            textColor='white'
            fontWeight='600'
            alignContent='center'
            fontFamily='josefinSans'>
                Upcoming Events
            </Box>
            <EventsCarousel />
            <Flex 
            id='past-events'
            w='100vw'
            justifyContent='center'
            bg='#143343'
            >
                <Flex
                flexDir='column'
                w='850px'
                marginTop='60px'
                marginBottom='90px'
                marginX='30px'
                alignItems='center'
                textColor='white'
                >
                    <Heading
                    color='white'
                    fontSize='53px'
                    fontWeight='800'
                    marginBottom='30px'
                    textTransform='uppercase'>
                        Past Events
                    </Heading>
                    <Flex flexDir='column' w='100%'>
                    {eventList.map( event =>
                        <Flex 
                        id='event-row'
                        flexDir='column'
                        w='100%'
                        >
                            <Box h='2px' w='100%' bg='white'></Box>
                            <Flex paddingY='22px'>
                                <Box w='10px' h='100%' bg='yellow'> </Box>
                                <Flex w='min(80px, 5%)'></Flex>
                                <Flex
                                id='event-date'
                                flexDir='column'
                                justifyContent='center'
                                alignItems='center'
                                >
                                    <Text fontSize={{base: '23px', sm: '30px'}} fontWeight='700'>
                                        {event.date.toLocaleDateString('default', {month: "short" })}
                                    </Text>
                                    <Text marginTop='-15px' fontSize={{base: '45px', sm: '60px'}} fontWeight='700'>
                                        {event.date.toLocaleDateString('default', {day: "2-digit" })}
                                    </Text>
                                </Flex>
                                <Flex w='min(150px, 10%)'></Flex>

                                <Flex
                                id='event-info'
                                flexDirection='column'
                                alignItems='flex-start'
                                marginY='15px'
                                >
                                    <Text textAlign='left' lineHeight='30px' fontSize={{base: '30px', sm:'40px'}}>{event.title}</Text> 
                                    <Spacer/>
                                    <Text textAlign='left' fontSize={{base: '18px', sm: '24px'}}>{event.location}</Text>
                                </Flex>
                                <Spacer/>
                                <LinkBox
                                as={RouterLink}
                                to={'/events/' + event.slug} 
                                display='flex' alignItems='center'>
                                    <Image
                                    h='50%'
                                    src={yellowRightArrow}
                                    />
                                </LinkBox>
                            </Flex>
                        </Flex>
                    )}
                </Flex>
                </Flex>    

            </Flex>
        </Box>
    )
}

export default Events;
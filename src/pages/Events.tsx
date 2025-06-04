// Likely want to do something with an image at the top, the author, then a preview of the post, then a click for more button at the bottom
import {
    Box,
    Flex,
    Text,
    Heading,
    Spacer,
    Image,
    LinkBox,
  } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom';
import EventsCarousel from '../components/EventsCarousel.tsx'
import { eventList } from '../events_data/events.ts';
import { VolunteerEvent as Event } from '../events_data/events.ts';
import yellowRightArrow from '../assets/YellowRightArrow.svg';
import { useLayoutEffect } from 'react';
import blogheader from '../assets/blogheader.jpg';

function isBeforeToday(targetDate: Date): boolean {
    const now = new Date();
    
    // Zero out the time components
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const compareDate = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
    
    return compareDate < today;
  }

// Events that happen sooner should be first.
function compareDate(a:Event,b:Event) {
  if (a.date < b.date)
     return 1;
  if (a.date > b.date)
    return -1;
  return 0;
}


export function Events() {
    useLayoutEffect(() => {
        window.scrollTo(0, 0)
    });

    const pastEventList: Event[] = eventList
        .filter(event => isBeforeToday(event.date))
        .sort(compareDate)
        .slice(-5);
    
    const upcomingEventList = eventList
        .filter(event => !isBeforeToday(event.date))
        .sort(compareDate)
        .reverse();

    return (
            <Box w='100vw'>
                    <Box h='100px' position='relative'>
                    <Image position='absolute' src={blogheader} h='100px' w='100%' objectFit='cover' zIndex='0'/>
                    <Box position='relative' h='100px' w='100%' bgGradient='linear(to-r, rgba(47, 71, 53, 0.8), rgba(7, 19, 25, 0))' />
                    <Text position='absolute' left='0' right='0' top='50px' bottom='0' m='auto' w='100%' h='100px' textColor='white' fontSize='3xl' fontWeight='bold'>Upcoming Events</Text>
                    </Box>
                <EventsCarousel events={upcomingEventList} />
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
                        {pastEventList.length === 0 ? (
                            <Box w='100%'>
                                <Box h='2px' w='100%' bg='white'></Box>
                                <Text mt='40px'>
                                    No events
                                </Text>
                            </Box>
                        ) : (
                            <Flex flexDir='column' w='100%'>
                                {pastEventList.map( event =>
                                    <LinkBox
                                    as={RouterLink}
                                    to={'/events/' + event.slug} 
                                    display='flex'
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
                                                    {event.date.toLocaleDateString('default', {month: "short", timeZone: 'UTC'})}
                                                </Text>
                                                <Text marginTop='-15px' fontSize={{base: '45px', sm: '60px'}} fontWeight='700'>
                                                    {event.date.toLocaleDateString('default', {day: "2-digit", timeZone: 'UTC'})}
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
                                            <Flex
                                            alignItems='center'>
                                                <Image
                                                h='50%'
                                                src={yellowRightArrow}
                                                />
                                            </Flex>
                                        </Flex>
                                    </LinkBox>
                                )}
                            </Flex>
                        )}
                    </Flex>    
                </Flex>
            </Box>
    )
}

export default Events;
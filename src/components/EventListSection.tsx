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
import type { PublicEvent } from '../types/PublicEvent.ts';
import yellowRightArrow from '../assets/YellowRightArrow.svg';

export interface EventListSectionProps {
    id: string;
    title: string;
    events: PublicEvent[];
    emptyMessage: string;
    marginTop?: string;
    marginBottom?: string;
}

function EventListSection({ id, title, events, emptyMessage, marginTop = '30px', marginBottom = '0px' }: EventListSectionProps) {
    return (
        <Flex
        id={id}
        w='100vw'
        justifyContent='center'
        bg='#143343'
        >
            <Flex
            flexDir='column'
            w='850px'
            marginTop={marginTop}
            marginBottom={marginBottom}
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
                    {title}
                </Heading>
                {events.length === 0 ? (
                    <Box w='100%'>
                        <Box h='2px' w='100%' bg='white'></Box>
                        <Text mt='40px'>
                            {emptyMessage}
                        </Text>
                    </Box>
                ) : (
                    <Flex flexDir='column' w='100%'>
                        {events.map( event => {
                            const eventDate = new Date(event.date);
                            return (
                            <LinkBox
                            as={RouterLink}
                            to={'/events/' + event.id}
                            display='flex'
                            id='event-row'
                            flexDir='column'
                            w='100%'
                            key={event.id}
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
                                            {eventDate.toLocaleDateString('default', {month: "short", timeZone: 'UTC'})}
                                        </Text>
                                        <Text marginTop='-15px' fontSize={{base: '45px', sm: '60px'}} fontWeight='700'>
                                            {eventDate.toLocaleDateString('default', {day: "2-digit", timeZone: 'UTC'})}
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
                            );
                        })}
                    </Flex>
                )}
            </Flex>
        </Flex>
    )
}

export default EventListSection;

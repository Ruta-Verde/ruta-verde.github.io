// Likely want to do something with an image at the top, the author, then a preview of the post, then a click for more button at the bottom
import {
    Box,
    Text,
    Image,
  } from '@chakra-ui/react'
import EventListSection from '../components/EventListSection.tsx'
import { usePublicEvents } from '../hooks/usePublicEvents.ts';
import type { PublicEvent } from '../types/PublicEvent.ts';
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
function compareDate(a:PublicEvent,b:PublicEvent) {
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

    const { events, loading, error } = usePublicEvents();

    const pastEventList: PublicEvent[] = events
        .filter(event => isBeforeToday(new Date(event.date)))
        .sort(compareDate)
        .slice(0, 10);

    const upcomingEventList = events
        .filter(event => !isBeforeToday(new Date(event.date)))
        .sort(compareDate)
        .reverse();

    return (
            <Box w='100vw'>
                    <Box h='100px' position='relative'>
                    <Image position='absolute' src={blogheader} h='100px' w='100%' objectFit='cover' zIndex='0'/>
                    <Box position='relative' h='100px' w='100%' bgGradient='linear(to-r, rgba(47, 71, 53, 0.8), rgba(7, 19, 25, 0))' />
                    <Text position='absolute' left='0' right='0' top='50px' bottom='0' m='auto' w='100%' h='100px' textColor='white' fontSize='3xl' fontWeight='bold'>Events</Text>
                    </Box>
                {error && (
                    <Text textAlign='center' color='red.600' py={4}>Couldn't load events: {error}</Text>
                )}
                {loading ? (
                    <Text textAlign='center' py={8}>Loading events…</Text>
                ) : (
                    <EventListSection
                        id='upcoming-events'
                        title='Upcoming Events'
                        events={upcomingEventList}
                        emptyMessage='No upcoming events'
                        marginTop='30px'
                        marginBottom='0px'
                    />
                )}
                <EventListSection
                    id='past-events'
                    title='Past Events'
                    events={pastEventList}
                    emptyMessage='No events'
                    marginTop='20px'
                    marginBottom='45px'
                />
            </Box>
    )
}

export default Events;

// Likely want to do something with an image at the top, the author, then a preview of the post, then a click for more button at the bottom
import {
    Box,
  } from '@chakra-ui/react'
import EventsCarousel from '../components/EventsCarousel.tsx'

function Events() {
    return (
        <Box w='100vw'>
            <EventsCarousel />
        </Box>
    )
}

export default Events;
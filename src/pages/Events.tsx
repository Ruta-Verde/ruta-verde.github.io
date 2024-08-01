// Likely want to do something with an image at the top, the author, then a preview of the post, then a click for more button at the bottom
import {
    Link,
    ListItem,
    UnorderedList,
  } from '@chakra-ui/react'

import { eventList } from '../events_data/events.ts';

function Events() {
    return (
        <UnorderedList textAlign={"left"}>
            {eventList.map(event => 
                 <ListItem key={event.slug}><Link href={'/#/events/' + event.slug}>{event.title}</Link></ListItem>
        )}
        </UnorderedList>
    )
}

export default Events;
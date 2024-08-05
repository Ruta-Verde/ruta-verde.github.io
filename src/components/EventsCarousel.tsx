// Likely want to do something with an image at the top, the author, then a preview of the post, then a click for more button at the bottom
import {
    Flex,
    Text,
    Card,
    HStack,
    Heading,
    Image,
    Link,
    Button,
  } from '@chakra-ui/react'

import { eventList } from '../events_data/events.ts';
import pic from '../assets/research.png';

const dateOptions: Intl.DateTimeFormatOptions = { 
    weekday: "long",
    month: 'long',
    day: '2-digit',
    year: 'numeric'
}

function EventsCarousel() {
    return (
        <Flex 
        height='700px' w='100%' 
        alignItems='center' justifyContent='center' 
        bg='#F0F0F0'
        >
            {/* extra container to hide scrollbar */}
            <Flex 
            height='100%' w='100%' 
            justifyContent='center' alignItems='center' 
            overflow='hidden'
            >
                <HStack 
                height='110%' 
                width='70%'
                spacing='60px' 
                overflow='auto' 
                overscrollBehaviorX='contain'
                scrollSnapType='x mandatory'
                > 
                {eventList.map( event => 
                    <Card
                    h='500px' w='250px' 
                    scrollSnapAlign='center' 
                    borderRadius='15px'
                    bg='#FFF'
                    flexShrink='0' 
                    boxShadow='0px 4px 10px 0px rgba(0, 0, 0, 0.15)'
                    overflow='hidden'
                    >
                        <Flex
                        w='100%' h='200px'
                        >
                            <Flex 
                            flexDirection='column'
                            padding='5px'
                            position='absolute'
                            w='70px' h='70px'
                            bg='#E9D523'
                            left='0'
                            top='0'
                            borderRadius='15px 0px 15px 0px'
                            >
                                <Text fontSize='15px' fontWeight='700'>
                                    {event.date.toLocaleDateString('default', {month: "short" })}
                                </Text>
                                <Text marginTop='-15px' fontSize='40px' fontWeight='700'>
                                    {event.date.toLocaleDateString('default', {day: "2-digit" })}
                                </Text>
                            </Flex>
                            <Image
                            objectFit='cover'
                            minW='100%'
                            alt="event"
                            src={pic}/>
                        </Flex>

                        {/* card header and body text */}
                        <Flex
                        padding='20px'
                        flexDirection='column' 
                        flexGrow='1'
                        alignItems='left' 
                        textAlign='left' 
                        overflowY='hidden'>
                            <Flex
                            marginBottom='20px'
                            >
                                <Heading 
                                color='#385C40'
                                fontSize='30px' 
                                fontWeight='700' 
                                >
                                    {event.title} 
                                </Heading>
                            </Flex>

                            <Flex>
                                <Text 
                                color='#385C40'
                                fontSize='15px'
                                fontWeight='700'
                                >
                                    {event.date.toLocaleDateString('default', dateOptions)}
                                </Text>
                            </Flex>
                            <Flex marginBottom='20px'>
                                <Text 
                                color='#385C40'
                                fontSize='15px'
                                fontWeight='400'
                                textTransform='uppercase'
                                >
                                    {event.location}
                                </Text>
                            </Flex>
                            <Flex flexGrow='1' overflow='hidden'>
                                <Text 
                                fontSize='12px'
                                >
                                    {event.about}
                                </Text>
                            </Flex>

                            <Button 
                                minHeight='40px' w='100%'
                                marginTop='15px'
                                borderRadius='15px'
                                alignItems='center'
                                justifyContent='center'
                                bg='#E9D523'
                                >
                                    <Link 
                                    href={'/#/events/' + event.slug} 
                                    fontSize='15px' 
                                    fontWeight='600'
                                    _hover='none'>
                                        More Information
                                    </Link>
                            </Button>
                        </Flex>
                    </Card>
        )}
                </HStack>
            </Flex>
        </Flex>
    )
}

export default EventsCarousel;
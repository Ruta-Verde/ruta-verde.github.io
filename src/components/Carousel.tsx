import {
    Flex,
    Text,
    Card,
    HStack,
    Heading,
    Image,
    Link,
    Button,
    IconButton,
  } from '@chakra-ui/react'

import arrowLeftImg from '../assets/ArrowL.svg';
import arrowRightImg from '../assets/ArrowR.svg';

function scrollLeft(id: string) {
    let element = document.getElementById(id);
    if (element) {
        element.scrollBy({left: -element.clientWidth, 
            behavior: "smooth"})
    }
}

function scrollRight(id: string) {
    let element = document.getElementById(id);
    if (element) {
        element.scrollBy({left: element.clientWidth, 
            behavior: "smooth"})
    }
}

const Carousel = ({children}) => {
    return (
            <Flex 
            flexDir='row'
            height='100%' w='100%' 
            justifyContent='center' alignItems='center' 
            overflow='hidden'
            >
                <IconButton
                    mr='5%'
                    icon={<Image src={arrowLeftImg}/>}
                    onClick={() => scrollLeft('carousel')}
                >
                </IconButton>
                <HStack 
                id='carousel'
                height='110%' 
                width='70%'
                spacing='60px' 
                overflow='auto' 
                overscrollBehaviorX='contain'
                scrollSnapType='x mandatory'
                > 
                    {children}
                </HStack>
                <IconButton
                    ml='5%'
                    icon={<Image src={arrowRightImg}/>}
                    onClick={() => scrollRight('carousel')}
                ></IconButton>
            </Flex>
    )
}

 export default Carousel; 
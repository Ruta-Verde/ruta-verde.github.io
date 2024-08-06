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
                    onClick={() => document.getElementById('carousel')
                        .scrollBy({left: -document.getElementById('carousel').clientWidth, 
                            behavior: "smooth"})}
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
                    onClick={() => document.getElementById('carousel')
                        .scrollBy({left: document.getElementById('carousel').clientWidth, 
                            behavior: "smooth"})}
                ></IconButton>
            </Flex>
    )
}

 export default Carousel; 
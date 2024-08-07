import {
    Flex,
    HStack,
    Image,
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

const Carousel = ({viewWidth, children}) => {
    return (
            <Flex 
            flexDir='row'
            height='100%' w='100%' 
            justifyContent='center' alignItems='center' 
            overflow='hidden'
            >
                <IconButton
                    mr={{base: '0', sm: '60px'}}
                    opacity={{base: '50%', sm: '100%'}}
                    position={{base: 'absolute', sm:'relative'}}
                    left='0'
                    zIndex='1'
                    icon={<Image src={arrowLeftImg}/>}
                    onClick={() => scrollLeft('carousel')}
                >
                </IconButton>
                <HStack 
                id='carousel'
                height='110%' 
                width={viewWidth}
                spacing='60px' 
                padding='40px'
                overflow='auto' 
                overscrollBehaviorX='contain'
                scrollSnapType='x mandatory'
                > 
                    {children}
                </HStack>
                <IconButton
                    ml={{base: '0', sm: '40px'}}
                    opacity={{base: '50%', sm: '100%'}}
                    position={{base: 'absolute', sm: 'relative'}}
                    right='0'
                    icon={<Image src={arrowRightImg}/>}
                    onClick={() => scrollRight('carousel')}
                ></IconButton>
            </Flex>
    )
}

 export default Carousel; 
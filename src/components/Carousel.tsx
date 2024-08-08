import {
    Flex,
    HStack,
    Image,
    IconButton,
  } from '@chakra-ui/react'

import { useState, useEffect } from 'react';
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

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const matchQueryList = window.matchMedia(query);
    function handleChange(e) {
      setMatches(e.matches);
    }

    setMatches(matchQueryList.matches);

    matchQueryList.addEventListener("change", handleChange);
    return () => {
      matchQueryList.removeEventListener("change", handleChange);
    };
  }, [query]);
  return matches;
}

// be sure to apply "flexShrink: 0" and "scrollSnapAlign: center" to cards inside the carousel
function Carousel({children, cardWidthPx, numCards, cardSpacingPx = 60}) {
    let fitsNumCards;
    let spaceNeeded;
    if (cardWidthPx && numCards) {
        spaceNeeded = cardWidthPx * numCards + cardSpacingPx * numCards;

        // add 100 to account for 100px taken up by arrows and margins on sides
        fitsNumCards = useMediaQuery('(min-width:' + (spaceNeeded + 100) + 'px)');
    }

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
                    icon={<Image w='40px' src={arrowLeftImg}/>}
                    onClick={() => scrollLeft('carousel')}
                >
                </IconButton>
                <HStack 
                id='carousel'
                height='110%' 
                width={fitsNumCards ? spaceNeeded : cardWidthPx}
                spacing={cardSpacingPx + 'px'}
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
                    icon={<Image w='40px' src={arrowRightImg}/>}
                    onClick={() => scrollRight('carousel')}
                ></IconButton>
            </Flex>
    )
}

 export default Carousel; 
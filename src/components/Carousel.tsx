import {
    Flex,
    HStack,
    Image,
    IconButton,
  } from '@chakra-ui/react'

import {ReactNode, useState, useEffect } from 'react';
import arrowLeftImg from '../assets/ArrowL.svg';
import arrowRightImg from '../assets/ArrowR.svg';
import { useFetcher } from 'react-router-dom';

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

function useMediaQuery(query:string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const matchQueryList = window.matchMedia(query);
    function handleChange(e:MediaQueryListEvent) {
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

export interface CarouselProps {
    numCards?: number,
    cardWidthPx?: number,
    cardSpacingPx: number
    viewWidth?: string
}

// Be sure to apply "flexShrink: 0" and "scrollSnapAlign: center" to cards inside the carousel

// If viewWidth is defined, then the size of the viewing window will be set to viewWidth.
// In order to view a numCards amount in the carousel view window, 
// numCards and cardWidthPx must be included in carouselProps, 
// and viewWidth should NOT be defined. 
export function Carousel( {carouselProps, children} : { carouselProps: CarouselProps, children: ReactNode}) {
    let cardWidthPx = carouselProps.cardWidthPx;
    let numCards = carouselProps.numCards;
    let cardSpacingPx = carouselProps.cardSpacingPx;
    let viewWidth = carouselProps.viewWidth;

    let fitsNumCards;
    let spaceNeeded;
    if (cardWidthPx && numCards) {
        spaceNeeded = cardWidthPx * numCards + cardSpacingPx * numCards;

        // add 100 to account for 120px taken up by arrows and margins on sides
        fitsNumCards = useMediaQuery('(min-width:' + (spaceNeeded + 120) + 'px)');
    }

    return (
            <Flex 
            flexDir='row'
            height='100%' w='100%' 
            justifyContent='center' alignItems='center' 
            overflow='hidden'
            >
                <IconButton
                    aria-label='Left Scroll Button'
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
                width={viewWidth? viewWidth : (fitsNumCards ? spaceNeeded : cardWidthPx)}
                spacing={cardSpacingPx + 'px'}
                padding='40px'
                overflow='auto' 
                overscrollBehaviorX='contain'
                scrollSnapType='x mandatory'
                > 
                    {children}
                </HStack>
                <IconButton
                    aria-label='Right Scroll Button'
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

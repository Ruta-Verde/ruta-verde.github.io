import {
    Flex,
    HStack,
    Image,
    IconButton,
  } from '@chakra-ui/react'

import {ReactNode, useState, useEffect} from 'react';
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

function getMaxScrollLeft(id: string) {
    let element = document.getElementById(id);
    if (element) {
        return element.scrollWidth - element.clientWidth; 
    } else {
        return -1;
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
    cardWidth: string,
    cardSpacing?: string,
    viewWidth?: string,
    align?: string
}

// Be sure to apply "flexShrink: 0" and "scrollSnapAlign: center" to cards inside the carousel

// If viewWidth is defined, then the size of the viewing window will be set to viewWidth.
// In order to view a numCards amount in the carousel view window, 
// numCards and cardWidth must be included in carouselProps, 
// and viewWidth should NOT be defined. 
export function Carousel( {carouselProps, children} : { carouselProps: CarouselProps, children: ReactNode}) {
    let cardWidth = carouselProps.cardWidth;
    let numCards = carouselProps.numCards;
    let cardSpacing = carouselProps.cardSpacing? carouselProps.cardSpacing : 0;
    let viewWidth = carouselProps.viewWidth;

    let fitsNumCards;
    let widthNeeded;
    let totalArrowWidth = '160px' // total width of arrows and margin for arrows
    if (cardWidth && numCards) {
        widthNeeded = `calc(${cardWidth} * ${numCards} + ${cardSpacing} * ${numCards})`;

        fitsNumCards = useMediaQuery(`(min-width: calc(${widthNeeded} + ${totalArrowWidth}))`)
    }
    let aboveOneCardWidth = useMediaQuery(`(min-width: calc(${cardWidth} + ${totalArrowWidth}) )`);

    const [scrollLeftPosition, setScrollLeftPosition] = useState(0);
    useEffect(() => {
        const carousel = document.getElementById('carousel');
        if (carousel) {
            const handleScroll = () => {
                setScrollLeftPosition(carousel.scrollLeft);
            };
            carousel.addEventListener("scroll", handleScroll);
            return () => {
                carousel.removeEventListener("scroll", handleScroll);
            };
        }
    }, []);

    let carouselMaxScrollLeft = getMaxScrollLeft('carousel');
    let carouselPaddingPx = 40;

    return (
            <Flex 
            flexDir='row'
            height='100%' w='100%' 
            justifyContent='center' alignItems='center' 
            overflow='hidden'
            >
                <IconButton
                aria-label='Left Scroll Button'
                backgroundColor='transparent'
                mr={aboveOneCardWidth ? '40px' : '0'}
                opacity={aboveOneCardWidth ? '100%': '50%'}
                position={aboveOneCardWidth ? 'relative' : 'absolute'}
                left='0'
                zIndex='1'
                _focus={{outline: "none", }}
                _hover={{borderWidth: "0"}}
                icon={
                    <Image 
                    w='40px' 
                    src={arrowLeftImg}
                    style={scrollLeftPosition <= carouselPaddingPx + 10? 
                        {filter: "grayscale(100%)", opacity: "0"} :
                        {}
                    }
                    />
                }
                isDisabled={scrollLeftPosition <= carouselPaddingPx + 10}
                onClick={() => scrollLeft('carousel')}
                >
                </IconButton>
                <HStack 
                id='carousel'
                width={viewWidth? viewWidth : (fitsNumCards ? widthNeeded : cardWidth)}
                spacing={cardSpacing}
                paddingX={carouselPaddingPx + 'px'}
                paddingY='100%'
                overflowX='auto' 
                overscrollBehaviorX='auto'
                scrollSnapType='x mandatory'
                boxSizing='border-box'
                align={carouselProps.align ? carouselProps.align : 'center'}
                > 
                    {children}
                </HStack>
                <IconButton
                aria-label='Right Scroll Button'
                backgroundColor='transparent'
                ml={aboveOneCardWidth ? '40px' : '0'}
                opacity={aboveOneCardWidth ? '100%': '50%'}
                position={aboveOneCardWidth ? 'relative' : 'absolute'}
                right='0'
                _focus={{outline: "none", }}
                _hover={{borderWidth: "0"}}
                icon={
                    <Image 
                    w='40px' 
                    src={arrowRightImg}
                    style={scrollLeftPosition >= carouselMaxScrollLeft - carouselPaddingPx - 10? 
                        {filter: "grayscale(100%)", opacity: "0"} :
                        {}
                    }
                    />
                }
                isDisabled={scrollLeftPosition >= carouselMaxScrollLeft - carouselPaddingPx - 10}
                onClick={() => scrollRight('carousel')}
                ></IconButton>
            </Flex>
    )
}

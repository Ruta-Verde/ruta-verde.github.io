import { useState, useEffect, useRef } from 'react';
import { Box, Image, Button, ButtonGroup, Flex, Text } from '@chakra-ui/react';
import '../styles/slideshow.css';

interface SlideProps {
  slides: {
    title: string;
    text: string;
    image: string;
  }[];
}

function Slideshow({ slides }: SlideProps) {
  const [scrollLeftPos, setScrollLeftPos] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const scrollRef = useRef(null);

  let imageScrollLeftPosition = Array(slides.length);
  if (scrollRef.current) {
    const {clientWidth} = scrollRef.current;
    imageScrollLeftPosition = (Array.from(Array(slides.length).keys()))
      .map((element) => element * clientWidth);
  }
  
  // Update scrollLeft variable on scroll
  const handleScroll = () => {
    if (scrollRef.current) {
      const {scrollLeft} = scrollRef.current;
      setScrollLeftPos(scrollLeft);
    }
  }

  // Scroll specific element to scrollLeft value
  const scrollLeftTo = (scrollLeft: number, id: string) => {
    let element = document.getElementById(id);
    if (element) {
      element.scrollTo({left: scrollLeft, behavior: 'smooth'});
    }
    setScrollLeftPos(scrollLeft);
  }

  // Function to handle dot clicks
  const handleDotClick = (index: number) => {
    let newScrollLeft:number = imageScrollLeftPosition[index];
    setScrollLeftPos(newScrollLeft);
    scrollLeftTo(newScrollLeft, 'scroller');
  };

  // Effect to automatically change slides
  useEffect(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    
    const timer = setInterval(() => {
      if (scrollRef.current) {
        const {clientWidth, scrollWidth} = scrollRef.current;
        let newScrollLeft = scrollLeftPos + clientWidth >= scrollWidth ? 
          0 
          : scrollLeftPos + clientWidth
        setScrollLeftPos(newScrollLeft);
        scrollLeftTo(newScrollLeft, 'scroller');
        }

    }, 5000);

    setIntervalId(timer);

    return () => clearInterval(timer); // Cleanup on unmount
  }, [scrollLeftPos]);

  return (
    <Flex position='relative'  w='100%'
    >
    {/* Display current image */}
      <Flex w='100%' h='100%' 
      overflow='auto' ref={scrollRef} id='scroller'
      scrollSnapType='x mandatory'
      onScroll={handleScroll}
      style={{scrollbarWidth: 'none'}}
      >
        {slides.map( (slide) => (
          <Box className='slider' 
          style={{filter: 'brightness(90%)'}}
          scrollSnapAlign='center'
          >
            <Image key={slide.image} src={slide.image} className='slider' w='100%' h={['350px', null, null, '500px', '600px', '700px']} objectFit='cover'/>
            <Box position='absolute' top='30%' left={['50px', null, null, '76px', '166px']} textColor='white' textAlign='left'>
              <Text fontSize={['xl', '2xl', '3xl', '4xl', '5xl']} as='b' textShadow={'1px 1px #000000'}>
                {slide.title}
              </Text>
              <Text fontSize={['xs', 'sm', 'md', 'lg', 'xl']} mt={4} width='20rem' textShadow={'1px 1px #000000'}>
                {slide.text}
              </Text>
            </Box>
          </Box>
        ))}
      </Flex>
      {/* Navigation dots */}
      <ButtonGroup spacing={1} 
      mt='10' 
      position='absolute' 
      bottom='30px' 
      left='50%' 
      transform='translate(-50%)' 
      zIndex={3}
      >
        {imageScrollLeftPosition.map((_, index) => (
          scrollLeftPos >= imageScrollLeftPosition[index] 
          && (scrollLeftPos < imageScrollLeftPosition[index + 1] 
          || index === imageScrollLeftPosition.length - 1) ? 
          <Button
            key={index}
            onClick={() => handleDotClick(index)}
            size='xs'
            bg='white'
            colorScheme='gray'
            borderRadius='full'
            border='1px solid'
            opacity='100%'
          /> :
          <Button
            key={index}
            onClick={() => handleDotClick(index)}
            size='xs'
            bg='white'
            colorScheme='gray'
            borderRadius='50%'
            border='1px solid'
            opacity='70%'
            _hover={{ opacity: '100%' }}
          />
        ))}
      </ButtonGroup>
  </Flex>
  );
};

export default Slideshow;

import { useState, useEffect } from 'react';
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
  const [imageIndex, setCurrentImageIndex] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  // Function to handle dot clicks
  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);

    if (intervalId) {
      clearInterval(intervalId);
    }

    const newIntervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex == slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    setIntervalId(newIntervalId);
  };

  // Effect to automatically change slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    setIntervalId(timer);

    return () => clearInterval(timer); // Cleanup on unmount
  }, [slides]);

  return (
    <Box position='relative' w='100%'>
    {/* Display current image */}
      <Flex w='100%' h='100%' overflow='hidden'>
        {slides.map( (slide) => (
          <Box className='slider' style={{
            translate: `${-100 * imageIndex}%`, filter: 'brightness(90%)'}}>
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
      <ButtonGroup spacing={1} mt='10' position='absolute' bottom='30px' left='50%' transform='translate(-50%)' zIndex={3}>
        {slides.map((_, index) => (
          index === imageIndex ? 
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
  </Box>
  );
};

export default Slideshow;

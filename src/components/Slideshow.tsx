import { useState, useEffect } from 'react';
import { Box, Image, Button, Flex, Text } from '@chakra-ui/react';
import '../styles/slideshow.css';

interface SlideProps {
  images: string[];
  previews: {
    title: string;
    text: string;
  }[];
}

function Slideshow({ images, previews }: SlideProps) {
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
        prevIndex == images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    setIntervalId(newIntervalId);
  };

  // Effect to automatically change slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    setIntervalId(timer);

    return () => clearInterval(timer); // Cleanup on unmount
  }, [images]);

  return (
    <Box position='relative' w='100%'>
    {/* Display current image */}
      <Flex w='100%' h='100%' overflow='hidden'>
        {images.map( url => (
          <Image key={url} src={url} className='slider' style={{
            translate: `${-100 * imageIndex}%`}} />
        ))}
        <Box position='absolute' top='50%' left='50%' transform='translate(-50%, -50%);' textColor='white' textAlign='left'>
          <Text fontSize='5xl' as='b'>
            {previews[imageIndex].title}
          </Text>
          <Text fontSize='lg' mt={4} width='20rem'>
            {previews[imageIndex].text}
          </Text>
        </Box>
      </Flex>
      {/* Navigation dots */}
      <Flex justify='center' mt='10' position='absolute' bottom='30px' left='50%' transform='translate(-50%)' zIndex={3}>
        {images.map((_, index) => (
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
            m={1}
          /> :
          <Button
            key={index}
            onClick={() => handleDotClick(index)}
            size='xs'
            bg='white'
            colorScheme='gray'
            borderRadius='full'
            border='1px solid'
            opacity='70%'
            _hover={{ opacity: '100%' }}
            m={1}
          />
        ))}
      </Flex>
  </Box>
  );
};

export default Slideshow;

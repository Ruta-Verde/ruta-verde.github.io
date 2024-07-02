import { useState, useEffect } from 'react';
import { Box, Image, Button, Flex, Circle } from '@chakra-ui/react';
import '../styles/slideshow.css';

interface SlideProps {
  images: string[];
}

function Slideshow({ images }: SlideProps) {
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
        <Image
          src={images[imageIndex]}
          alt={`Slide ${imageIndex}`}
          className='slider'
        />
      </Flex>
      {/* Navigation dots */}
      <Flex justify='center' mt='10' position='absolute' bottom='30px' left='50%' transform='translate(-50%)' zIndex={3}>
        {images.map((_, index) => (
          // <button
          //   key={index}
          //   className='slider-btn'
          //   onClick={() => handleDotClick(index)}
          // >
          //   {index === imageIndex ? <Circle _hover={{ opacity: '100%'}} /> : <Circle />}
          // </button>
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

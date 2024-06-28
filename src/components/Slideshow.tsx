import { useState, useEffect } from 'react';
import { Box, Image, Button, Flex } from '@chakra-ui/react';
import '../styles/slideshow.css';

interface SlideProps {
  images: string[];
}

function Slideshow({ images }: SlideProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to handle dot clicks
  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Effect to automatically change slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer); // Cleanup on unmount
  }, [images]);

  return (
    <Box position='relative' w='100%'>
    {/* Display current image */}
      <Flex w='100%' h='100%' overflow='hidden'>
        {images.map( url => (
          <Image key={url} src={url} className='slider' style={{
            translate: `${-100 * currentImageIndex}%`}} />
        ))}
        <Image
          src={images[currentImageIndex]}
          alt={`Slide ${currentImageIndex}`}
          className='slider'
        />
      </Flex>
      {/* Navigation dots */}
      <Flex justify='center' mt='10' position='absolute' bottom='30px' left='50%' transform='translateX(-50%)' p='0px'>
        {images.map((_, index) => (
          <Button
            key={index}
            onClick={() => handleDotClick(index)}
            size='xs'
            bg='white'
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

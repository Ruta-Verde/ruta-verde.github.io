import { useState, useEffect } from 'react';
import { Box, Image, Button, Flex, Fade } from '@chakra-ui/react';

interface SlideProps {
  images: string[];
}

function Slideshow({ images }: SlideProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  // Function to handle dot clicks
  const handleDotClick = (index: number) => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentImageIndex(index);
      setFadeIn(true);
    }, 600);
  };

  // Effect to automatically change slides
  useEffect(() => {
    const timer = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === images.length - 1? 0 : prevIndex + 1
        );
        setFadeIn(true);
      }, 600);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer); // Cleanup on unmount
  }, [images]);

  return (
    <Box position='relative' w='100%'>
    {/* Display current image */}
    <Fade in={fadeIn}>
      <Image
        src={images[currentImageIndex]}
        alt={`Slide ${currentImageIndex}`}
        objectFit='cover'
        w='100%'
      />
    </Fade>

    {/* Navigation dots */}
    <Flex justify='center' mt='10' position='absolute' bottom='30px' left='50%' transform='translateX(-50%)'>
      {images.map((_, index) => (
        <Button
          key={index} onClick={() => handleDotClick(index)}
          size='xs'
          bg='white'
          colorScheme='gray'
          borderRadius='full'
          border='1px solid'
          opacity='70%'
          _hover={{ opacity: '100%' }}
          m={1} />
      ))}
    </Flex>
  </Box>
  );
};

export default Slideshow;

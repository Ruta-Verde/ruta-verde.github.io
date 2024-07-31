import { useState, useEffect } from 'react';
import { Box, Flex, ButtonGroup, Button } from '@chakra-ui/react';
import Preview from './Preview.tsx';
import { PreviewProps } from './constants/constants.tsx';

function PreviewSlide({ previews }: { previews: PreviewProps[]}) {
  const [previewIndex, setCurrentPreviewIndex] = useState(0);
  const [interval, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  // Function to handle dot clicks
  const handleDotClick = (index: number) => {
    setCurrentPreviewIndex(index);

    if (interval) {
      clearInterval(interval);
    }

    const newIntervalId = setInterval(() => {
      setCurrentPreviewIndex((prevIndex) =>
        prevIndex == previews.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    setIntervalId(newIntervalId);
  };

  // Effect to automatically change slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPreviewIndex((prevIndex) =>
        prevIndex === previews.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    setIntervalId(timer);

    return () => clearInterval(timer); // Cleanup on unmount
  }, [previews]);

  return (
    <Box position='relative' w='100%'>
    {/* Display current image */}
      <Flex w='100%' h='100%' overflow='hidden'>
        {previews.map( (preview) => (
          <Box className='slider' style={{
            translate: `${-100 * previewIndex}%`, filter: 'brightness(90%)'}}>
            <Preview title={preview.title} text={preview.text} img={preview.img} />
          </Box>
        ))}
      </Flex>
      {/* Navigation dots */}
      <ButtonGroup spacing={3} mt='10' position='absolute' bottom='-30px' left='50%' transform='translate(-50%)' zIndex={3}>
        {previews.map((_, index) => (
          index === previewIndex ? 
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
  )
}

export default PreviewSlide
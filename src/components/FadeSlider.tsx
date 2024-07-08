import { useState } from 'react';
import { Box, Flex, Fade, Center, Button, HStack } from '@chakra-ui/react';
import Preview from './Preview.tsx';
import { filler } from './constants/constants.tsx'

// Not actually to be used, just to fix errors
const previews = [
  { title: 'Who We Are', text: filler},
  { title: 'Environmental Action', text: filler},
  { title: 'Research', text: filler},
  { title: 'Ways to Help', text: filler},
  { title: 'Reciprocity', text: filler},
];

function fadeslider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  const handleNext = () => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % previews.length);
      setFadeIn(true);
    }, 600);
  };

  const handlePrev = () => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + previews.length) % previews.length);
      setFadeIn(true);
    }, 600);
  };

  const currentPreview = previews[currentIndex];

  return (
    <Box className='main-content'>
      <HStack>
        <Button variant='link' onClick={handlePrev} mr={2}>
          {'<'}
        </Button>
        <Button variant='link' onClick={handleNext}>
          {'>'}
        </Button>
      </HStack>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align='center'
        justify='center'
      >
        <Center>
          <Fade in={fadeIn}>
            <Preview title={currentPreview.title} text={currentPreview.text}/>
          </Fade>
        </Center>
      </Flex>
  </Box>
  );
}

export default fadeslider;
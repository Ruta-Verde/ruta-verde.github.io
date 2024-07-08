import { useState } from 'react';
import '../styles/home.css';
import Preview from './Preview.tsx';
import Slideshow from './Slideshow.tsx';
import { Box, Flex, Fade, Center, Button } from '@chakra-ui/react';
import { filler } from './constants/constants.tsx'

const previews = [
  { title: 'Who We Are', text: filler},
  { title: 'Environmental Action', text: filler},
  { title: 'Research', text: filler},
  { title: 'Ways to Help', text: filler},
  { title: 'Reciprocity', text: filler},
];

const images = [
  'https://creature-companions.in/wp-content/uploads/2024/02/Exploring-the-Fascinating-World-of-Cat-Breeds_-A-Guide-for-Indian-Cat-Lovers-1080x400.png',
  'https://creature-companions.in/wp-content/uploads/2024/03/Purrfect-Pals-for-Indian-Homes_-Top-Cat-Breeds-That-Thrive-in-Our-Climate-1080x400.png',
  'https://www.valleyvet.com/library/article-si_cat_vaccine.jpg',
  'https://www.valleyvet.com/library/article-cat-flea-tick-control-comparison.jpg',
  'https://www.farmforum.net/gcdn/media/2021/04/26/FarmForum/882912dd9fbadaedfba8b9cc9dec197a.jpg?width=1200&disable=upscale&format=pjpg&auto=webp',
];

function Home() {
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
    <Box>
      {/* Content Section */}
      <Box>
        <Slideshow images={images} previews={previews}/>
      </Box>
      <Box className='main-content'>
        <Button variant='link' onClick={handlePrev} mr={2}>
          {'<'}
        </Button>
        <Button variant='link' onClick={handleNext}>
          {'>'}
        </Button>
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
    </Box>
  );
};

export default Home;

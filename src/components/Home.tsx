import { useState } from 'react';
import '../styles/home.css';
import Preview from './Preview.tsx';
// import Slideshow from './Slideshow.tsx';
import { Box, Flex, Fade, Center, Button } from '@chakra-ui/react';
import { filler } from './constants/constants.tsx'

const previews = [
  { title: 'Who We Are', text: filler},
  { title: 'Environmental Action', text: filler},
  { title: 'Research', text: filler},
  { title: 'Ways to Help', text: filler},
  { title: 'Reciprocity', text: filler},
];

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  // const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  // const images = [
  //   'https://creature-companions.in/wp-content/uploads/2024/02/Exploring-the-Fascinating-World-of-Cat-Breeds_-A-Guide-for-Indian-Cat-Lovers-1080x400.png',
  //   'https://creature-companions.in/wp-content/uploads/2024/03/Purrfect-Pals-for-Indian-Homes_-Top-Cat-Breeds-That-Thrive-in-Our-Climate-1080x400.png',
  //   'https://www.valleyvet.com/library/article-si_cat_vaccine.jpg',
  // ];

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setFadeIn(false);
  //     setTimeout(() => {
  //       setCurrentIndex((prevIndex) => (prevIndex + 1) % previews.length);
  //       setFadeIn(true);
  //     }, 600); // Fade for .8 seconds
  //   }, 5000); // Change preview every 5 seconds

  //   return () => clearInterval(intervalId); // Cleanup interval on component unmount
  // }, []);

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
      {/* <Slideshow images={images} /> */}
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
  );
};

export default Home;

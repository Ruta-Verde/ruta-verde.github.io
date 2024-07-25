import '../styles/home.css';
import Slideshow from '../components/Slideshow.tsx';
import Preview from '../components/Preview.tsx';
import {
  Box,
  Image,
  Text,
  // Button,
  SimpleGrid,
  // Card,
  // CardHeader,
  // CardBody,
  // CardFooter,
  // Heading,
  // HStack
} from '@chakra-ui/react';
import { filler } from '../components/constants/constants.tsx';
import sec2 from '../assets/sec2.png';
import { previews } from '../components/constants/constants.tsx';

const slides = [
  { title: 'Who We Are', text: filler, image: 'https://creature-companions.in/wp-content/uploads/2024/02/Exploring-the-Fascinating-World-of-Cat-Breeds_-A-Guide-for-Indian-Cat-Lovers-1080x400.png'},
  { title: 'Environmental Action', text: filler, image: 'https://creature-companions.in/wp-content/uploads/2024/03/Purrfect-Pals-for-Indian-Homes_-Top-Cat-Breeds-That-Thrive-in-Our-Climate-1080x400.png'},
  { title: 'Research', text: filler, image: 'https://www.valleyvet.com/library/article-si_cat_vaccine.jpg'},
  { title: 'Ways to Help', text: filler, image: 'https://www.valleyvet.com/library/article-cat-flea-tick-control-comparison.jpg'},
  { title: 'Reciprocity', text: filler, image: 'https://www.farmforum.net/gcdn/media/2021/04/26/FarmForum/882912dd9fbadaedfba8b9cc9dec197a.jpg?width=1200&disable=upscale&format=pjpg&auto=webp'},
];

function Home() {
  return (
    <Box>
      <Box>
        <Slideshow slides={slides}/>
      </Box>
      <Box position='relative'>
        <Image src={sec2} w='100vw' h='auto' opacity='35%' />
        <Text
          position='absolute'
          top='25%'
          left='50%'
          ml='-40%'
          width='80%'
          fontSize={['10px', null, '15px', '20px', '30px', '40px']}
          lineHeight={'50px'}
          textAlign={'center'}
          fontWeight='bold'
        >
          Founded in 2020, Ruta Verde has been supporting Environmental Action and Research for a Greener Future. 
          From building community forests to urban plantings to sponsoring events, we know that to build a greener 
          future we must act together!
        </Text>
      </Box>
      <SimpleGrid columns={[1, null, null, 3]} spacing='10px' px='8rem' py='5rem'>
        {previews.map( (preview) => (
          <Preview title={preview.title} text={preview.text} img={preview.img} />
        ))}
      </SimpleGrid>
    </Box>
    
  );
};

export default Home;

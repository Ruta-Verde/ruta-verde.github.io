import '../styles/home.css';
import Slideshow from '../components/Slideshow.tsx';
import Preview from '../components/Preview.tsx';
import {
  Box,
  Image,
  Text,
  Button,
  SimpleGrid,
  Heading,
  HStack,
  VStack
} from '@chakra-ui/react';
import { filler } from '../components/constants/constants.tsx';
import sec2 from '../assets/sec2.png';
import { previews } from '../components/constants/constants.tsx';
import fade1 from '../assets/fade1.png'

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
        <Image src={sec2} w='100vw' opacity='35%' />
        <Text
        position='absolute'
        top='25%'
        left='50%'
        ml='-40%'
        w='80%'
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
      <HStack position='relative' h='400px'>
        <Box
        w='100%'
        height='100%'
        zIndex='2'
        bgGradient='linear(to-r, rgba(56, 92, 64, 1) 60%, rgba(56, 92, 64, 0))'
        position='relative'
        >
          <VStack position='absolute' textAlign='left' align='left' textColor='white' w='30%' top='10%' left='15%' h='80%' spacing='30px'>
            <Heading fontSize='6xl'>
              Join Us
            </Heading>
            <Text fontSize='2xl'>
              We can stop the climate crisis. But we must act now, together, to save our home, our world. Join our cause today!
            </Text>
            <Button w='50%' h='18%' borderRadius='25px' fontWeight='bold' bgColor='#E9D523'>Get Involved</Button>
          </VStack>
        </Box>
        <Image src={fade1} position='absolute' left='60%' w='40%' h='100%' transform='scaleX(-1)' zIndex='0' overflow='hidden' />
      </HStack>
    </Box>
    
  );
};

export default Home;

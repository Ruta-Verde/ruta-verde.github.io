import '../styles/home.css';
import Slideshow from '../components/Slideshow.tsx';
import Preview from '../components/Preview.tsx';
import {
  Box,
  Flex,
  Image,
  Text,
  Button,
  SimpleGrid,
  Heading,
  HStack,
  VStack,
  FormControl,
  Input
} from '@chakra-ui/react';
import { filler } from '../components/constants/constants.tsx';
import { previews } from '../components/constants/constants.tsx';
import sec2 from '../assets/sec2.png';
import fade1 from '../assets/fade1.png';
import fade2 from '../assets/fade2.png';
import joao from '../assets/joao.png';

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
      <HStack position='relative' h='500px'>
        <Box
        w='100%'
        height='100%'
        zIndex='2'
        bgGradient='linear(to-r, rgba(56, 92, 64, 1) 60%, rgba(56, 92, 64, 0))'
        position='relative'
        >
          <VStack
          position='absolute'
          textAlign='left'
          align='left'
          textColor='white' 
          w='30%'
          top='20%'
          left='15%'
          h='80%'
          spacing='30px'
          >
            <ButtonPreview
            title='Join Us'
            text='We can stop the climate crisis. But we must act now, together, to save our home, our world. Join our cause today!'
            btntext='Get Involved'
            />
          </VStack>
        </Box>
        <Image src={fade1} position='absolute' left='60%' w='40%' h='100%' transform='scaleX(-1)' zIndex='0' overflow='hidden' />
      </HStack>
      <Box h='500px'>
        <HStack position='relative' h='80%' top='10%' spacing='100px'>
          <Image src={joao} ml='25%' w='auto' h='100%' borderRadius='50px'/>
          <VStack
          w='30%'
          h='100%'
          spacing='40px'
          textAlign='left'
          align='left'
          >
            <Heading fontSize='4xl'>
              Meet Joao Vilca Soto
            </Heading>
            <Text fontSize='2xl' w='80%'>
            Joao founded Ruta Verde after noticing a lack of green jobs in the area. Along with graduates from Cascadia college, he started building an organization that could help sustainable solutions come to life.
            </Text>
            <Button w='50%' h='17%' borderRadius='25px' fontWeight='bold' bgColor='#E9D523'>
              Our Story
            </Button>
          </VStack>
        </HStack>
      </Box>
      <HStack position='relative' h='500px'>
        <Image src={fade2} position='absolute' left='0%' w='40%' h='100%' transform='scaleX(-1)' zIndex='0' overflow='hidden' />
        <Box
        w='100%'
        height='100%'
        zIndex='2'
        bgGradient='linear(to-l, rgba(20, 51, 67, 1) 60%, rgba(20, 51, 67, 0))'
        position='relative'
        >
          <VStack
          position='absolute'
          textAlign='left'
          align='left'
          textColor='white' 
          w='30%'
          top='20%'
          left='60%'
          h='80%'
          spacing='30px'
          >
            <ButtonPreview
            title='Local Events'
            text='Interested in attending Ruta Verde’s next event? Check out our Events Page to see what’s happening in your area.'
            btntext='Events'
            />
          </VStack>
        </Box>
      </HStack>
      <Flex height='550px' bgColor='#ADB9B8' justifyContent='center' alignItems='center'>
        <VStack
        // mt='5%'
        w='30%'
        spacing='10px'
        textColor='#385C40'
        >
          <Heading fontSize='9xl'>
            $10,000
          </Heading>
          <Heading fontSize='3xl'>
            Dollars Raised and Donated
          </Heading>
          <Text fontSize='lg'>
            Thanks to generous donors like you, Ruta Verde has been able to donate over $10,000 to other sustainability non-profits.
          </Text>
          <Button w='40%' h='50px' borderRadius='25px' fontWeight='bold' bgColor='#E9D523'>
            Donate Now
          </Button>
        </VStack>
      </Flex>
      <Flex bgColor='#385C40' h='400px' textColor='white' justifyContent='center' alignItems='center'>
        <VStack w='80%'>
          <Heading fontSize='6xl' justifyContent='center'>
            Stay Updated With Ruta Verde
          </Heading>
          <Text fontSize='3xl'>
            Sign up to receive information about sustainability and events
          </Text>
          <Flex pt='75px' alignItems='center'>
            <FormControl w='500px' mr='2rem'>
              <Input bgColor='white' placeholder='Name' />
            </FormControl>
            <FormControl w='500px' mr='2rem'>
              <Input bgColor='white' placeholder='Email' />
            </FormControl>
            <Button w='300px' h='40px' borderRadius='10px' fontWeight='bold' bgColor='#E9D523'>
              Sign Up
            </Button>
          </Flex>
        </VStack>
      </Flex>
    </Box>
    
  );
};

function ButtonPreview( {title, text, btntext}: {title: string, text: string, btntext: string} ) {
  return(
    <>
      <Heading fontSize='6xl'>
        {title}
      </Heading>
      <Text fontSize='2xl' w='90%'>
        {text}
      </Text>
      <Button w='50%' h='17%' borderRadius='25px' fontWeight='bold' bgColor='#E9D523'>
        {btntext}
      </Button>
    </>
  )
}

export default Home;

import '../styles/home.css';
import {Carousel} from '../components/Carousel.tsx'
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
} from '@chakra-ui/react';
import Slideshow from '../components/Slideshow.tsx';
import Preview from '../components/Preview.tsx';
import { action, filler, previews, whoWeAre } from '../components/constants/constants.tsx';
import sec2 from '../assets/sec2.png';
import fade1 from '../assets/fade1.png';
import fade2 from '../assets/fade2.png';
import joao from '../assets/joao.png';
import trees from '../assets/trees.jpg';
import squad from '../assets/squad.jpg';
import carrying from '../assets/carrying.jpg';
import painting from '../assets/painting.jpg';

const slides = [
  { title: 'Environmental Action', text: action, image: carrying},
  { title: 'Who We Are', text: whoWeAre, image: squad},
  { title: 'Reciprocity', text: filler, image: trees},
  { title: 'Research', text: filler, image: painting},
  { title: 'Ways to Help', text: filler, image: fade1},
];

function Home() {
  return (
    <Box w='100vw'>
      <Box>
        <Slideshow slides={slides}/>
      </Box>
      <Box className='sec2' position='relative' h={['350px', null, null, '400px']}>
        <Image src={sec2} w='100%' h={['350px', null, null, '400px']} opacity='35%' />
        <Text
        position='absolute'
        top={['17%', null, '20%', '25%']}
        left={['10%', null, null, null, '10.6%']}
        w={['80%', null, null, null, '78.8%']}
        fontSize={['14px', null, '20px', '25px', '30px', '38px']}
        lineHeight={['40px', '45px', '50px']}
        textAlign={['center', null, null, 'center']}
        fontWeight='bold'
        >
          Founded in 2020, Ruta Verde has been supporting Environmental Action and Research for a Greener Future. 
          From building community forests to urban plantings to sponsoring events, we know that to build a greener 
          future we must act together!
        </Text>
      </Box>
      <Flex id='action-preview-cards'
      alignItems='center' justifyContent='center'
      height='800px' 
      >
        <Flex 
        className='wide-prev' 
        alignItems='center' justifyContent='center'
        >
          <SimpleGrid verticalAlign='top' columns={3} spacing='70px' py='5rem'>
            {previews.map( (preview) => (
              <Preview title={preview.title} text={preview.text} img={preview.img} />
            ))}
          </SimpleGrid>

        </Flex>
        <Flex className='mobile-prev' 
        alignItems='center' justifyContent='center'
        overflow='hidden'
        height='80%'
        >
          <Carousel carouselProps={{cardSpacing:'50px', numCards: 1, cardWidth: '320px', align: 'top'}}>
            {previews.map( (preview) => (
              <Preview title={preview.title} text={preview.text} img={preview.img} />
            ))}
          </Carousel>
        </Flex>
      </Flex>
      <HStack position='relative' h={['550px', null, '500px']}>
        <Image src={fade2} position='absolute' left='0%' w={[null, null, null, '74%', '53%']} h='100%' transform='scaleX(-1)' zIndex='0' overflow='hidden' />
        <Box
        w='100%'
        height='100%'
        zIndex='2'
        bgGradient={['linear(to-l, rgba(20, 51, 67, 0.95) 100%, rgba(20, 51, 67, 0))', null, null, 'linear(to-l, rgba(20, 51, 67, 1) 60%, rgba(20, 51, 67, 0))']}
        position='relative'
        >
          <VStack
          position='absolute'
          textAlign='left'
          align={['left', null, null, null, 'right']}
          textColor='white' 
          w={['70%', null, null, '40%', '30%']}
          top={['10%', null, null, '13%', '16%']}
          right={['17%', null, null, '76px', '166px']}
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
      <Box h={['770px', null, '650px', '500px']}>
        <HStack className='wide-prev' position='relative' h='80%' top='10%' spacing='100px'>
          <Image src={joao} ml={['25%', null, null, '10%', '20%']} w='auto' h='100%' borderRadius='50px'/>
          <VStack
          w={['30%', null, null, '40%', '30%']}
          h='100%'
          spacing='40px'
          textAlign='left'
          align='left'
          >
            <Heading fontSize='4xl'>
              Meet Joao Vilca Soto
            </Heading>
            <Text fontSize={['2xl', null, null, 'xl']} w='80%'>
              Joao founded Ruta Verde after noticing a lack of green jobs in the area. Along with graduates from Cascadia college, he started building an organization that could help sustainable solutions come to life.
            </Text>
            <Button fontSize='xl' w='50%' h='17%' borderRadius='25px' fontWeight='bold' bgColor='#E9D523'>
              Our Story
            </Button>
          </VStack>
        </HStack>
        <VStack className='mobile-prev' position='relative' h='90%' top='5%' spacing='20px'>
          <Image src={joao} w='auto' h='300px' borderRadius='50px'/>
          <Heading fontSize='3xl'>
            Meet Joao Vilca Soto
          </Heading>
          <Text fontSize='xl' w='80%'>
          Joao founded Ruta Verde after noticing a lack of green jobs in the area. Along with graduates from Cascadia college, he started building an organization that could help sustainable solutions come to life.
          </Text>
          <Button fontSize='xl' w={['70%', null, '35%']} h={['10%', null, '12%']} borderRadius='25px' fontWeight='bold' bgColor='#E9D523'>
            Our Story
          </Button>
        </VStack>
      </Box>
      <HStack position='relative' h={['550px', null, '500px']}>
        <Box
        w='100%'
        height='100%'
        zIndex='2'
        bgGradient={['linear(to-r, rgba(56, 92, 64, 0.95) 100%, rgba(56, 92, 64, 0))', null, null, 'linear(to-r, rgba(56, 92, 64, 1) 60%, rgba(56, 92, 64, 0))']}
        position='relative'
        >
          <VStack
          position='absolute'
          textAlign='left'
          align='left'
          textColor='white' 
          w={['70%', null, null, '50%', '30%']}
          top={['13%', null, null, null, '16%']}
          left={['17%', null, null, '76px', '166px']}
          h='80%'
          spacing='40px'
          >
            <ButtonPreview
            title='Join Us'
            text='We can stop the climate crisis. But we must act now, together, to save our home, our world. Join our cause today!'
            btntext='Get Involved'
            />
          </VStack>
        </Box>
        <Image src={fade1} position='absolute' left={[null, null, null, '25%', '50%']} w={[null, null, null, '75%', '50%']} h='100%' transform='scaleX(-1)' zIndex='0' overflow='hidden'/>
      </HStack>
      <Flex className='wide-prev' height='550px' bgColor='#ADB9B8' justifyContent='center' alignItems='center'>
        <VStack
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
          <Button w='45%' h='65px' borderRadius='25px' fontWeight='bold' bgColor='#E9D523'>
            Donate Now
          </Button>
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
      <Text fontSize={['xl', null, '2xl']} w='90%'>
        {text}
      </Text>
      <Button fontSize={'xl'} w={['90%', null, '50%']} h={['15%', null, '17%']} borderRadius='25px' fontWeight='bold' bgColor='#E9D523'>
        {btntext}
      </Button>
    </>
  )
}

export default Home;

import '../styles/home.css';
import { useState } from 'react'
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
  FormErrorMessage,
  Input
} from '@chakra-ui/react';
import Slideshow from '../components/Slideshow.tsx';
import Preview from '../components/Preview.tsx';
import PreviewSlide from '../components/PreviewSlides.tsx';
import { filler } from '../components/constants/constants.tsx';
import { previews } from '../components/constants/constants.tsx';
import { createClient } from "@supabase/supabase-js";
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

const supabase = createClient('https://qsgwjthppqjynzrggfxe.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzZ3dqdGhwcHFqeW56cmdnZnhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI4OTIzNzcsImV4cCI6MjAzODQ2ODM3N30.MIO_xSERAO5gZRyM9HnvDAAAkCBbb-xHdq04qm8DA_c')

function Home() {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [nameError, setNameError] = useState<boolean>(false)
  const [emailError, setEmailError] = useState<boolean>(false)

  const handleNameChange = (name: React.ChangeEvent<HTMLInputElement>) => setName(name.target.value)
  const handleEmailChange = (email: React.ChangeEvent<HTMLInputElement>) => setEmail(email.target.value)

  const validateEmail = (email: string) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  async function handleClick(name: string, email: string) {
    if (name === '') {
      setNameError(true)
    }
    if (email === '' || !validateEmail(email)) {
      setEmailError(true)
    }

    let { data, error } = await supabase.rpc('add_email', {name: name, email: email})
    
    if (error) {
      alert("here")
      // alert("there was an error sending your information. Please try again in a bit.")
      alert(data.statusText)
    }
    setName('')
    setNameError(false)
    setEmail('')
    setEmailError(false)
  }

  return (
    <Box>
      <Box>
        <Slideshow slides={slides}/>
      </Box>
      <Box className='sec2' position='relative' h={['350px', null, null, '400px']}>
        <Image src={sec2} w='100%' h={['350px', null, null, '400px']} opacity='35%' />
        <Text
        position='absolute'
        top={['17%', null, '20%', '25%']}
        left='50%'
        ml='-40%'
        w='80%'
        fontSize={['14px', null, '20px', '25px', '30px', '40px']}
        lineHeight={['40px', '45px', '50px']}
        textAlign={'center'}
        fontWeight='bold'
        >
          Founded in 2020, Ruta Verde has been supporting Environmental Action and Research for a Greener Future. 
          From building community forests to urban plantings to sponsoring events, we know that to build a greener 
          future we must act together!
        </Text>
      </Box>
      <SimpleGrid className='wide-prev' columns={[1, null, null, 3]} spacing='10px' px={['1rem', null, '8rem']} py='5rem'>
        {previews.map( (preview) => (
          <Preview title={preview.title} text={preview.text} img={preview.img} />
        ))}
      </SimpleGrid>
      <Box className='mobile-prev' h='670px' py='50px'>
        <PreviewSlide previews={previews}/>
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
          w={['70%', null, null, '30%']}
          top={['13%', null, '16%']}
          left={['17%', null, null, '15%']}
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
        <Image src={fade1} position='absolute' left={[null, null, null, '60%']} w={[null, null, null, '40%']} h='100%' transform='scaleX(-1)' zIndex='0' overflow='hidden'/>
      </HStack>
      <Box h={['770px', null, '650px', '500px']}>
        <HStack className='wide-prev' position='relative' h='80%' top='10%' spacing='100px'>
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
        <Image src={fade2} position='absolute' left='0%' w={[null, null, null, '40%']} h='100%' transform='scaleX(-1)' zIndex='0' overflow='hidden' />
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
          align='left'
          textColor='white' 
          w={['70%', null, null, '30%']}
          top={['9%', null, '16%']}
          left={['17%', null, null, '60%']}
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
      <Flex bgColor='#385C40' h={['500px', null, '400px']} textColor='white' justifyContent='center' alignItems={['stretch', null, null, 'center']}>
        <VStack w={['85%', null, '80%']} spacing={['15px', null, '20px']} mt={['40px', null, null, '0px']}>
          <Heading fontSize={['4xl', null, '6xl']} justifyContent='center'>
            Stay Updated With Ruta Verde
          </Heading>
          <Text fontSize={['xl', null, '3xl']}>
            Sign up to receive information about sustainability and events
          </Text>
          <Box display={['inline', null, 'flex']} pt={['10px', null, null, '30px']} justifyContent='center' alignItems='center' w='100%'>
            <FormControl w={['100%', null, null, '500px']} mr={['0px', null, '10px', '50px']} isInvalid={nameError}>
              <Input type='name' bgColor='white' textColor='black' placeholder='Name' value={name} onChange={handleNameChange} />
              {nameError &&
                <FormErrorMessage>Please input a name</FormErrorMessage> 
              } 
            </FormControl>
            <FormControl w={['100%', null, null, '500px']} mr={['0px', null, '10px', '50px']} mt={['10px', null, '0px']} isInvalid={emailError}>
              <Input type='email' bgColor='white' textColor='black' placeholder='Email' value={email} onChange={handleEmailChange} />
              {emailError &&
                <FormErrorMessage zIndex='3'>Please input a valid email</FormErrorMessage> 
              }
            </FormControl>
            <Button w={['60%', null, null, '300px']} h='40px' borderRadius='10px' fontWeight='bold' bgColor='#E9D523' mt={['50px', null, '0px']} onClick={() => handleClick(name, email)}>
              Sign Up
            </Button>
          </Box>
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

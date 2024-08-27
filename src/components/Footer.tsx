import '../styles/footer.css';
import { Flex, Image, Text, Link, VStack, Heading, Box, FormControl, Input, FormErrorMessage, Button} from '@chakra-ui/react';
import footerlogo from '../assets/footerlogo.svg';
import { useState } from 'react'
import { createClient } from "@supabase/supabase-js";

const supabase = createClient('https://qsgwjthppqjynzrggfxe.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzZ3dqdGhwcHFqeW56cmdnZnhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI4OTIzNzcsImV4cCI6MjAzODQ2ODM3N30.MIO_xSERAO5gZRyM9HnvDAAAkCBbb-xHdq04qm8DA_c')

function Footer() {
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
    if (name === '' || !validateEmail(email)) {
      setNameError(name === '')
      setEmailError(!validateEmail(email))
      return
    }

    let response = await supabase.rpc('new_email', {p_name: name, p_email: email})
    
    if (response.error != null) {
      // alert("there was an error sending your information. Please try again in a bit.")
      alert(JSON.stringify(response.error))
    }
    setName('')
    setNameError(false)
    setEmail('')
    setEmailError(false)
  }

  return (
    <Flex as="footer" flexDirection={['column', null, null, 'row-reverse']} h={['850px', null, '750px', '650px']} bg="#143343" color="white" textAlign="center" justifyContent='center' alignItems='center' px={['10px', null, null, '60px', '150px']}>
      <Flex h={['500px', null, '400px', '500px']} w={['100%', null, null, '50%']} textColor='white' justifyContent='center' alignItems={['stretch', null, null, 'center']}>
        <VStack w={['85%', null, '80%', '90%']} h='80%' spacing={['15px', null, '20px']} mt={['40px', null, null, '0px']}>
          <Heading fontSize={['4xl', null, '6xl']} justifyContent='center'>
            Stay Updated
          </Heading>
          <Text fontSize={['xl', null, '3xl']}>
            Sign up to receive information about sustainability and events
          </Text>
          <Box display={['inline', null, 'flex', 'inline-block']} flexDirection={[null, null, 'row', 'column']} pt={['10px', null, null, '0px']} justifyContent='center' w='100%'>
            <FormControl w={['100%', null, null, '80%']} display='inline-block' isInvalid={nameError} h={['75px']}>
              <Input type='name' bgColor='white' textColor='black' placeholder='Name'value={name} onChange={handleNameChange} />
              {nameError &&
                <FormErrorMessage>Please input a name</FormErrorMessage> 
              } 
            </FormControl>
            <FormControl w={['100%', null, null, '80%']} display='inline-block' mt={['10px', null, '0px']} isInvalid={emailError} h={['75px']}>
              <Input type='email' bgColor='white' textColor='black' placeholder='Email' value={email} onChange={handleEmailChange} />
              {emailError &&
                <FormErrorMessage zIndex='3'>Please input a valid email</FormErrorMessage> 
              }
            </FormControl>
            <Button w={['60%', null, null, '60%']} h='40px' borderRadius='10px' fontWeight='bold' bgColor='#E9D523' mt={['10px', null, '0px']} onClick={() => handleClick(name, email)}>
              Sign Up
            </Button>
          </Box>
        </VStack>
      </Flex>
      <Flex flexDirection='column' justifyContent='center' alignItems='center' h={['500px', null, '400px', '500px']} w={['100%', null, null, '50%']}>
        <VStack alignContent='space-around' spacing='4' fontSize='xl' mt={['-75px', null, null, '0px']} justifyContent='center' w='100%' h='80%'> 
          <Image src={footerlogo} w={['275px', null, null, '300px', '400px']} mb='6' h='60%' />
          <Link>info@rutaverde.org</Link>
          <Text>425-577-3312</Text>
          <Text>Chelan, WA</Text>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default Footer;

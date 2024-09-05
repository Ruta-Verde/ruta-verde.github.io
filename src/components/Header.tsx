import '../styles/header.css';
import {
  Box,
  Flex,
  Text,
  Spacer,
  Image,
  VStack,
  HStack,
  Link,
  LinkBox,
  Button,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure 
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons';
import React from 'react';
import Logo from '../assets/rutalogo.svg';

// testing

function Header() {
  return (
    <Flex className='header' height={['80px', null, '100px', null, '130px']} px={['10px', null, null, '60px', '150px']} alignItems='center' justifyContent='center'>
      <LinkBox
      display='flex'
      as={RouterLink}
      to="/"
      w={['90px', '100px', null, null, '119px']}
      h='100%'
      alignItems='center'
      >
        <Image display='flex' objectFit='contain' src={Logo} h='60%' />
      </LinkBox>
      <LinkBox
      as={RouterLink}
      to="/"
      w={['230px', null, null, null, '296px']}
      height='100%'
      fontFamily='josefinSans'
      alignContent='center'
      textTransform='uppercase'
      >
        <Text fontSize={['20px', null, '27px', null, '37px']} color='#385C40' fontWeight='600' letterSpacing='3.33px'>
          Ruta Verde</Text>
        <Text fontSize={['8px', null, '10.5px', null, '15px']} marginTop='-10px' fontWeight='600px' letterSpacing='2px' color='#72C15B'> 
          Sustainability Nonprofit</Text>
      </LinkBox>
      <Spacer/>
      <Flex className='navbar' h='100%' alignItems='center' justifyContent='center' right='50px'>
        <NavBar />
      </Flex>
    </Flex>
  );
};

function NavBar() {
  return(
    <>
      <Box className='non-phone' alignContent='center' height='50px'>
        <HStack spacing='40px' height='100%'>
          <Link as={RouterLink} to="/events" 
          color='#385C40'
          _hover={{filter: 'brightness(1.5)'}}
          _focus={{fontWeight: 'bold'}}>
              Events
          </Link>
          <Link as={RouterLink} to="/blog"
          color='#385C40'
          _hover={{filter: 'brightness(1.5)'}}
          _focus={{fontWeight: 'bold'}}>
              Blog
          </Link>
          <Link as={RouterLink} to="/about"
          color='#385C40'
          _hover={{filter: 'brightness(1.5)'}}
          _focus={{fontWeight: 'bold'}}>
              About
          </Link>
          <Link as={RouterLink} to="/donate"
          color='#385C40'
          _hover={{filter: 'brightness(1.5)'}}
          _focus={{fontWeight: 'bold'}}>
            Donate 
          </Link>
          <Link as={RouterLink} to="/getinvolved" h='100%'>
            <Button 
            height='100%' 
            _focus={{outline: 'none',}} 
            variant='solid' 
            bg='#E9D523' 
            borderRadius='20px'>
              Get Involved
            </Button>
          </Link>
        </HStack>
      </Box>
      <Box className='phone-nav' h='100%'>
        <SideNav/>
      </Box>
    </>
  )
}

function SideNav() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef(null)

  return (
    <>
      <Flex alignItems='center'>
        <IconButton aria-label='sidedrawer' ref={btnRef} mr='20px' colorScheme='white' onClick={onOpen}
        size={['lg']} color='black' fontSize={['25px', '30px']} icon={<HamburgerIcon/>} />
      </Flex>
      <Drawer
      isOpen={isOpen}
      placement='right'
      onClose={onClose}
      finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
        <DrawerCloseButton />
        <DrawerBody>
          <VStack>
            <Link as={RouterLink} to="/events" p={2} borderBottom='1px solid black' width='100%'>
              Events
            </Link>
            <Link as={RouterLink} to="/blog" p={2} borderBottom='1px solid black' width='100%'>
              Blog
            </Link>
            <Link as={RouterLink} to="/about" p={2} borderBottom='1px solid black' width='100%'>
              About
            </Link>
            <Link as={RouterLink} to="/donate" p={2} borderBottom='1px solid black' width='100%'>
              Donate
            </Link>
            <Link as={RouterLink} to="/getinvolved" p={2} borderBottom='1px solid black' width='100%' textColor={'#E9D523'}>
              Get Involved
            </Link>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
    </>
  )
}

export default Header;

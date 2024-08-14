import '../styles/header.css';
import {
  Box,
  Flex,
  Text,
  Spacer,
  Image,
  VStack,
  Link,
  LinkBox,
  Button,
  IconButton,
  ButtonGroup,
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
        <ButtonGroup spacing='40px'>
        <Link as={RouterLink} to="/about">
          <Button variant='link' color='#385C40' height='100%'>
            About
          </Button>
        </Link>
        <Link as={RouterLink} to="/action">
          <Button variant='link' color='#385C40' height='100%'>
            Action
          </Button>
        </Link>
        <Link as={RouterLink} to="/blog">
          <Button variant='link' color='#385C40' height='100%'>
            Blog
          </Button>
        </Link>
        <Link as={RouterLink} to="/events">
          <Button variant='link' color='#385C40' height='100%'>
            Events
          </Button>
        </Link>
        <Link as={RouterLink} to="/donate">
          <Button height='100%' variant='solid' bg='#E9D523' borderRadius='20px'>
            Donate
          </Button>
        </Link>
        </ButtonGroup>
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
            <Link as={RouterLink} to="/about" p={2} borderBottom='1px solid black' width='100%'>
              About
            </Link>
            <Link as={RouterLink} to="/action" p={2} borderBottom='1px solid black' width='100%'>
              Action
            </Link>
            <Link as={RouterLink} to="/blog" p={2} borderBottom='1px solid black' width='100%'>
              Blog
            </Link>
            <Link as={RouterLink} to="/events" p={2} borderBottom='1px solid black' width='100%'>
              Events
            </Link>
            <Link as={RouterLink} to="/donate" p={2} borderBottom='1px solid black' width='100%'>
              Donate
            </Link>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
    </>
  )
}

export default Header;

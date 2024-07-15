import '../styles/header.css';
import { Box, HStack, Heading, Image } from '@chakra-ui/react';
import NavBar from './NavBar.tsx';
import logo from '../assets/ruta-logo.svg';

function Header() {
  return (
    <HStack className='header' as="header">
      <Box pl='8px' width='4%' height='auto' >
        <Image src={logo} />
      </Box>
      <Heading as="h1" size="md" pl={2} pr={2}>
        Ruta Verde
      </Heading>
      <Box className='navbar' position='absolute' right='0'>
        <NavBar />
      </Box>
    </HStack>
  );
};

export default Header;

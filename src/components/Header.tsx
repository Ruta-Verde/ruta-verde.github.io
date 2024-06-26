import '../styles/header.css';
import { Box, Heading } from '@chakra-ui/react';
import NavBar from './NavBar.tsx';

function Header() {
  return (
    <Box as="header" bg="black" color="white" p={4} w='100vw'>
      <Heading as="h1" size="lg" pl='16px'>
        Ruta Verde Sustainability Nonprofit
      </Heading>
      <NavBar />
    </Box>
  );
};

export default Header;

import { Box, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import '../styles/navbar.css';
import SideNav from './SideNav.tsx';

function NavBar() {
  return(
    <Box textAlign='left' bg="grey.500" color="black">
      <nav className='non-phone'>
        <Link as={RouterLink} to="/" p={4}>
          Home
        </Link>
        <Link as={RouterLink} to="/about" p={4}>
          About
        </Link>
        <Link as={RouterLink} to="/donate" p={4}>
          Donate
        </Link>
      </nav>
      <nav className='phone-nav'>
        <SideNav/>
      </nav>
    </Box>
  )
}

export default NavBar;
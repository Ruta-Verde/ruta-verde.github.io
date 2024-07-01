import { Box, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

function NavBar() {
    return(
        <Box textAlign='left' bg="grey.500" color="black">
          <nav>
              <Link as={RouterLink} to="/" mr={4} p={4}>
                Home
              </Link>
              <Link as={RouterLink} to="/about">
                About
              </Link>
          </nav>
        </Box>
    )
}

export default NavBar
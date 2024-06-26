import '../styles/footer.css';
import { Box, Text, Link } from '@chakra-ui/react';

function Footer() {
  return (
    <Box as="footer" bg="teal.500" color="white" textAlign="center">
      <Box p={4}> 
        <Text>Ruta Verde Sustainability Nonprofit</Text>
      </Box>
      <Box pb={4}>
        <Link>info@rutaverde.org</Link>
        <Text>425-577-3312</Text>
      </Box>
    </Box>
  );
};

export default Footer;

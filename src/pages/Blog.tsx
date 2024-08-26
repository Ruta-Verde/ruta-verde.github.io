import blogheader from '../assets/blogheader.jpg';
import {Box, Image, Text} from '@chakra-ui/react';

function Blog() {
  return (
    <Box w='100%'>
      <Box>
        <Image position='absolute' src={blogheader} h='100px' w='100%' objectFit='cover' zIndex='0'/>
        <Box position='relative' h='100px' w='100%' bgGradient='linear(to-r, rgba(47, 71, 53, 0.8), rgba(7, 19, 25, 0))' />
        <Text position='absolute' mt={['-20%']} ml='30%' textColor='white' fontSize='xl' fontWeight='bold' textAlign='center'>Ruta Verde Blog</Text>
      </Box>
      {/* <Heading /> */}
    </Box>
  )
}

export default Blog;
import blogheader from '../assets/blogheader.jpg';
import {
  Box,
  Flex,
  Image,
  Text,
  Heading,
  // Card,
  // CardBody,
  // CardFooter
} from '@chakra-ui/react';

function Blog() {
  return (
    <Box w='100%'>
      <Box h='100px' position='relative'>
        <Image position='absolute' src={blogheader} h='100px' w='100%' objectFit='cover' zIndex='0'/>
        <Box position='relative' h='100px' w='100%' bgGradient='linear(to-r, rgba(47, 71, 53, 0.8), rgba(7, 19, 25, 0))' />
        <Text position='absolute' left='0' right='0' top='50px' bottom='0' m='auto' w='100%' h='100px' textColor='white' fontSize='3xl' fontWeight='bold'>Ruta Verde Blog</Text>
      </Box>
      <Flex h='80px' alignItems='center' justifyContent='center'>
        <Heading position='relative' textColor='#E9D523' fontSize='2xl' fontWeight='bold'>Latest From Ruta Verde</Heading>
      </Flex>
    </Box>
  )
}

// function BlogCard() {

// }

// function MainCard() {
//   return(
//     <>
//       <Card direction='row' overflow='hidden'>

//       </Card>
//     </>
//   ) 
// }

export default Blog;
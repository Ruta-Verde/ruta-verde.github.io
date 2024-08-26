import blogheader from '../assets/blogheader.jpg';
import redwood from '../assets/redwood.png';
import { BlogInfo } from '../blog_data/blogs.ts';
import {
  Box,
  Flex,
  Image,
  Text,
  Heading,
  Card,
  CardBody,
  Stack,
  Link,
  Divider
} from '@chakra-ui/react';
import { blogList } from '../blog_data/blogs.ts';

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
      <Flex w='100%' h='400px' pb='50px' alignItems='center' justifyContent='center'>
        <MainCard post={blogList[0]}/>
      </Flex>
    </Box>
  )
}

// function BlogCard() {

// }

function MainCard( {post} : {post: BlogInfo} ) {

  function dateToString(date: Date) {
    return date.toLocaleDateString('default', {month: "short" }) + ' '
      + date.toLocaleDateString('default', {day: "2-digit" }) + ' '
      + date.toLocaleDateString('default', {year: "numeric" })
  }

  return(
    <Flex w='80%'>
      <Link href={'/#/blog/' + post.slug}>
        <Card direction='row' h='300px' overflow='hidden' variant='filled' bgColor='#385C40'>
          <Image w='50%' objectFit='cover' src={redwood} alt='Image'></Image>
          <Stack textColor='white' spacing='10'>
            <CardBody textAlign='left'>
              <Text>
                {dateToString(post.date)}
              </Text>
              <Heading>
                {post.title}
              </Heading>
              <Divider size='20' />
              <Text>
                {post.summary}
              </Text>
            </CardBody>
          </Stack>
        </Card>
      </Link>
    </Flex>
  ) 
}

export default Blog;
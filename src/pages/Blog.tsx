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
  Link
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
      <Flex h='80px' alignItems='center' justifyContent='center' pt='15px' px={['10px', null, null, '60px', '150px']}>
        <Heading textColor='#E9D523' fontSize='2xl' fontWeight='bold'>Latest From Ruta Verde</Heading>
      </Flex>
      <Flex w='100%' h={['400px', null, null, '500px']} pb='50px' alignItems='center' justifyContent='center' px={['10px', null, null, '60px', '150px']}>
        <MainCard post={blogList[0]}/>
      </Flex>
      <Flex bgColor='#F0F0F0' w='100%' h={['500px', null, '800px']} pb='50px' alignItems='center' justifyContent='center' px={['10px', null, null, '60px', '150px']}>
        <BlogCard post={blogList[0]}/>
      </Flex>
    </Box>
  )
}

function dateToString(date: Date) {
  return date.toLocaleDateString('default', {month: "short" }) + ' '
    + date.toLocaleDateString('default', {day: "2-digit" }) + ' '
    + date.toLocaleDateString('default', {year: "numeric" })
}

function BlogCard( {post} : {post: BlogInfo} ) {
  return (
    <Flex>
      <Link href={'/#/blog/' + post.slug} _hover='text-decoration: none' w={['300px', null, '225px']} h={['100px', null, '350px']} borderRadius={'10px'}>
        <Card direction='column' overflow='hidden' borderRadius={'10px'}>
          <Image h={['0px', null, '206.25px']} objectFit='cover' src={redwood} alt='Image'/>
          <Stack textColor='#385C40' h='125px' w='100%'>
            <CardBody textAlign='left'>
              <Text>
                {dateToString(post.date)}
              </Text>
              <Heading size='lg' textOverflow='ellipsis'>
                {post.title}
              </Heading>
              <Text>
                {post.author}
              </Text>
            </CardBody>
          </Stack>
        </Card>
      </Link>
    </Flex>
  )
}

function MainCard( {post} : {post: BlogInfo} ) {
  return(
    <Flex w={['80%', null, null, '70%']}>
      <Link href={'/#/blog/' + post.slug} _hover='text-decoration: none' w='100%' borderRadius={'10px'}>
        <Card direction='row' h={['300px', null, null, '400px']} overflow='hidden' variant='filled' bgColor='#385C40' borderRadius={'10px'}>
          <Image w={['0', null, '50%']} objectFit='cover' src={redwood} alt='Image'/>
          <Stack textColor='white' spacing='10' w='100%'>
            <CardBody textAlign='left'>
              <Text>
                {dateToString(post.date)}
              </Text>
              <Heading py='10px' pb='20px'>
                {post.title}
              </Heading>
              <Box h='5px' w={['100%', null, '50%']} borderBottom='5px solid #E9D523' />
              <Text py='20px' w={['100%', null, '50%']}>
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
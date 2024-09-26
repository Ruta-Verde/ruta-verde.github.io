import blogheader from '../assets/blogheader.jpg';
import { BlogInfo } from '../blog_data/blogs.ts';
import { useState, useEffect, useLayoutEffect } from 'react';
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
  SimpleGrid,
  Button,
  useBoolean
} from '@chakra-ui/react';
import { blogList } from '../blog_data/blogs.ts';

function Blog() {
  const [show, setShow] = useBoolean(false);
  const [hiddenHeight, setHiddenHeight] = useState(0)
  const [visibleHeight, setVisibleHeight] = useState(0)
  const [mVisibleHeight, setmVisibleHeight] = useState(0)
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  )

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  });

  useEffect(() => {
    window
    .matchMedia("(min-width: 768px)")
    .addEventListener('change', e => setMatches( e.matches ));
    let height = 0
    if (matches) {
      height = ((800 - 20) / 2)
      let rows = Math.max(Math.floor((blogList.length - 7) / 3), 1)
      setHiddenHeight(height * rows)
    } else {
      height = ((500 - 20) / 3) * (blogList.length - 4)
      setHiddenHeight(height)
    }
    if (blogList.length < 2) {
      setmVisibleHeight(0)
      setVisibleHeight(0)
    } else if (blogList.length < 5) {
      setmVisibleHeight(500)
      setVisibleHeight(400)
    } else {
      setmVisibleHeight(500)
      setVisibleHeight(800)
    }
  }, []);

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
      {blogList.length > 0 ? 
        <Flex w='100%' h={['400px', null, null, '500px']} pb='50px' alignItems='center' justifyContent='center' px={['10px', null, null, '60px', '150px']}>
          {<MainCard post={blogList[0]}/>}
        </Flex> :
        <Text fontSize={'3xl'} fontWeight='bold'> Nothing yet, stay tuned!</Text>
      }
      {blogList.length > 1 && <Heading bgColor='#F0F0F0' textColor='#143343' fontSize='4xl' fontWeight='bold' alignSelf='center' pt='50px'>Read More</Heading>}
      <SimpleGrid bgColor='#F0F0F0' w='100%' h={[mVisibleHeight, null, visibleHeight]} pb={[null, null,'50px', '0px']} pt='20px' columns={[1, null, 3]} px={['10px', null, null, '60px', '150px']}>
        {matches ?
        blogList.filter((_, index) => index >= 1 && index <= 6).map((card) => <BlogCard post={card}/>) :
        blogList.filter((_, index) => index >= 1 && index <= 3).map((card) => <BlogCard post={card}/>)
        }
      </SimpleGrid>
      {show && 
      <SimpleGrid bgColor='#F0F0F0' columns={[1, null, 3]} h={hiddenHeight} px={['10px', null, null, '60px', '150px']}>
        {matches ?
        blogList.filter((_, index) => index > 6).map((card) => <BlogCard post={card}/>) :
        blogList.filter((_, index) => index > 3).map((card) => <BlogCard post={card}/>)
        }
      </SimpleGrid>
      }
      {<Flex justifyContent='center' bgColor='#F0F0F0' p='20px'>
        <Button onClick={setShow.toggle} bgColor='#E9D523'>
          {show ? "Collapse" : "Show more"}
        </Button>
      </Flex> && blogList.length > 7}
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
    <Flex justifySelf={'center'} alignSelf={'center'}>
      <Link href={'/#/blog/' + post.slug} _hover='text-decoration: none' w={['300px', null, '225px', null, '300px']} h={['100px', null, '350px']} borderRadius={'10px'}>
        <Card direction='column' overflow='hidden' borderRadius={'10px'}>
          <Image h={['0px', null, '206.25px', '225px']} objectFit='cover' src={post.img} alt='Image'/>
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
          <Image w={['0', null, '50%']} objectFit='cover' src={post.img} alt='Image'/>
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
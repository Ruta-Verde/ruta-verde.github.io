import '../styles/home.css';
import Slideshow from '../components/Slideshow.tsx';
import { Box, Button, SimpleGrid, Card, CardHeader, CardBody, CardFooter, Heading, Text, HStack } from '@chakra-ui/react';
import { filler } from '../components/constants/constants.tsx'

const previews = [
  { title: 'Who We Are', text: filler},
  { title: 'Environmental Action', text: filler},
  { title: 'Research', text: filler},
  { title: 'Ways to Help', text: filler},
  { title: 'Reciprocity', text: filler},
];

const images = [
  'https://creature-companions.in/wp-content/uploads/2024/02/Exploring-the-Fascinating-World-of-Cat-Breeds_-A-Guide-for-Indian-Cat-Lovers-1080x400.png',
  'https://creature-companions.in/wp-content/uploads/2024/03/Purrfect-Pals-for-Indian-Homes_-Top-Cat-Breeds-That-Thrive-in-Our-Climate-1080x400.png',
  'https://www.valleyvet.com/library/article-si_cat_vaccine.jpg',
  'https://www.valleyvet.com/library/article-cat-flea-tick-control-comparison.jpg',
  'https://www.farmforum.net/gcdn/media/2021/04/26/FarmForum/882912dd9fbadaedfba8b9cc9dec197a.jpg?width=1200&disable=upscale&format=pjpg&auto=webp',
];

function Home() {
  return (
    <Box>
      {/* Content Section */}
      <Box mb={4}>
        <Slideshow images={images} previews={previews}/>
      </Box>
      {/* I want a grid-like structure here that provides links/descriptions to content */}
      <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
        <Card>
          <CardHeader>
            <Heading size='md'> Some Company </Heading>
          </CardHeader>
          <CardBody>
            <Text>View a summary of all your customers over the last month.</Text>
          </CardBody>
          <CardFooter>
            <Button>View here</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Heading size='md'> Customer dashboard</Heading>
          </CardHeader>
          <CardBody>
            <Text>View a summary of all your customers over the last month.</Text>
          </CardBody>
          <CardFooter>
            <Button>View here</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Heading size='md'> Customer dashboard</Heading>
          </CardHeader>
          <CardBody>
            <Text>View a summary of all your customers over the last month.</Text>
          </CardBody>
          <CardFooter>
            <Button>View here</Button>
          </CardFooter>
        </Card>
      </SimpleGrid>
      <Card size='md'>
        <HStack>
          <CardHeader>
            <Heading size='md'>Contact Us</Heading>
          </CardHeader>
          <CardBody>
            <Text> Stay up to date with our upcoming events! </Text>
          </CardBody>
        </HStack>    
      </Card>
    </Box>
    
  );
};

export default Home;

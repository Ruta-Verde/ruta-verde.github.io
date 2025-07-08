import blogheader from '../assets/blogheader.jpg';
import { Box, Image, Text, SimpleGrid } from '@chakra-ui/react';
import GetInvolvedCard from '../components/GetInvolvedCard';
import { GetInvolvedInfo } from '../components/GetInvolvedCard';
import { getInvolvedDonate, getInvolvedEvents, getInvolvedInternships, getInvolvedMmerch, donateLink } from '../components/constants/constants';
import research from '../assets/research.png';
import will from '../assets/profiles/will.png';
import incamerch from '../assets/incamerch.png';
import trees from '../assets/redwood.png';
import { useLayoutEffect } from 'react';


const cards:GetInvolvedInfo[] = [
  {header: 'Events', 
   text: getInvolvedEvents,
   imageUrl: will, 
   buttonUrl: '/events',
  },
  {header: 'Donate', 
   text: getInvolvedDonate,
   imageUrl: trees,
   buttonUrl: donateLink,
   isButtonExternal: true,
  },
  {header: 'Internships', 
   text: getInvolvedInternships,
   imageUrl: research,
   buttonUrl: '/internships',
  },
  {header: 'Buy Merchandise', 
  text: getInvolvedMmerch,
   imageUrl: incamerch,
   buttonUrl: 'https://www.incamerch.com/',
   isButtonExternal: true,
  },
]

function GetInvolved() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  });

  return (
    <Box w='100%'>
      <>
            <Box h='100px' position='relative'>
            <Image position='absolute' src={blogheader} h='100px' w='100%' objectFit='cover' zIndex='0'/>
            <Box position='relative' h='100px' w='100%' bgGradient='linear(to-r, rgba(47, 71, 53, 0.8), rgba(7, 19, 25, 0))' />
            <Text position='absolute' left='0' right='0' top='50px' bottom='0' m='auto' w='100%' h='100px' textColor='white' fontSize='3xl' fontWeight='bold'>Get Involved</Text>
            </Box>
      <SimpleGrid px={['10px', null, null, '60px', '150px']} columns={[1, null, 2]} spacing={5} my={12}>
        {cards.map((card) => 
          <GetInvolvedCard {...card} key={card.header}></GetInvolvedCard>
        )}
      </SimpleGrid>
      </>
    </Box>
  );
}

export default GetInvolved;
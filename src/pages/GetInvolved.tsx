import {SimpleGrid } from '@chakra-ui/react';
import GetInvolvedCard from '../components/GetInvolvedCard';
import { GetInvolvedInfo } from '../components/GetInvolvedCard';
import { getInvolvedDonate, getInvolvedEvents, getInvolvedInternships, getInvolvedMmerch } from '../components/constants/constants';
import research from '../assets/research.png';
import will from '../assets/profiles/will.png';
import incamerch from '../assets/incamerch.png';


const cards:GetInvolvedInfo[] = [
  {header: 'Events', 
   text: getInvolvedEvents,
   imageUrl: will, 
   buttonUrl: '/events',
  },
  {header: 'Donate', 
   text: getInvolvedDonate,
   imageUrl: 'https://www.lismore.nsw.gov.au/files/assets/public/v/1/1.-households/4.-pets-amp-animals/images/kitten.jpg?dimension=pageimage&w=480', 
   buttonUrl: 'https://www.iatspayments.com/saaura/PA9ACE27D2159C5D04?fbclid=IwAR20hCOzgY97-Gg5nX5oTeQT62TfWgwECUHjDR6wVAgixHHwxQR898UdPZY',
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
  return (
      <SimpleGrid px={['10px', null, null, '60px', '150px']} columns={[1, null, 2]} spacing={5} my={12}>
        {cards.map((card) => 
          <GetInvolvedCard {...card} key={card.header}></GetInvolvedCard>
        )}
      </SimpleGrid>
  );
};

export default GetInvolved;
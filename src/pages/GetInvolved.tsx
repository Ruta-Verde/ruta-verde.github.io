import {SimpleGrid } from '@chakra-ui/react';
import GetInvolvedCard from '../components/GetInvolvedCard';
import { GetInvolvedInfo } from '../components/GetInvolvedCard';

const cards:GetInvolvedInfo[] = [
  {header: 'Donate', 
  text:
  'We are a 501(c)(3) nonprofit and your donation will be tax-deductible.', 
  imageUrl: 'https://www.lismore.nsw.gov.au/files/assets/public/v/1/1.-households/4.-pets-amp-animals/images/kitten.jpg?dimension=pageimage&w=480', 
   buttonUrl: 'https://www.iatspayments.com/saaura/PA9ACE27D2159C5D04?fbclid=IwAR20hCOzgY97-Gg5nX5oTeQT62TfWgwECUHjDR6wVAgixHHwxQR898UdPZY',
   isButtonExternal: true,
  },
  {header: 'Events', 
   text: 'Volunteer at one of our events!',
   imageUrl: 'https://www.lismore.nsw.gov.au/files/assets/public/v/1/1.-households/4.-pets-amp-animals/images/kitten.jpg?dimension=pageimage&w=480', 
   buttonUrl: '/events',
  },
  {header: 'Internships', 
  text:
  'Want to volunteer long-term? Check out our internships.', 
  imageUrl: 'https://www.lismore.nsw.gov.au/files/assets/public/v/1/1.-households/4.-pets-amp-animals/images/kitten.jpg?dimension=pageimage&w=480', 
   buttonUrl: '/internships',
  },
  {header: 'Buy Merchandise', 
  text:
  'Buy merchandise from one of our partners. 50% of all profits go straight to Ruta Verde!',
  imageUrl: 'https://www.lismore.nsw.gov.au/files/assets/public/v/1/1.-households/4.-pets-amp-animals/images/kitten.jpg?dimension=pageimage&w=480', 
   buttonUrl: '/',
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
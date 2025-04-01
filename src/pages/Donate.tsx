import { Box, Heading, Text, Button, Link, Card, Image, Stack, CardBody, CardFooter } from '@chakra-ui/react';

import trees from '../assets/redwood.png';

function Donate() {
  return (
    <Box margin='auto'>
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
        width='60vw'
        m={12}
      >
        <Image
          objectFit='cover'
          maxW={{ base: '100%', sm: '200px' }}
          src={trees}
          alt='Trees Img'
        />
  
        <Stack>
          <CardBody width='80%'>
            <Heading size='md'>Donate</Heading>
    
            <Text py='2' align='left'>
            Every dollar donated helps us tremendously as we grow. We are a 501(c)(3) nonprofit and 
            your donation will be tax-deductible. If you require a donation receipt, please email us 
            at info@rutaverde.org and we will get you one. You can make a donation through our processor 
            Stripe with the button below:
            </Text>
          </CardBody>
    
          <CardFooter>
            <Button variant='solid' colorScheme='teal'>
            <Link href='https://donate.stripe.com/bIYcNY7yY9whe2I4gg' isExternal>
              Click Here
            </Link>
            </Button>
          </CardFooter>
        </Stack>
      </Card>
    </Box>
  );
}

export default Donate;
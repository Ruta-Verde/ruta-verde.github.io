import { Box, Heading, Text, Button, Link, Card, Image, Stack, CardBody, CardFooter } from '@chakra-ui/react';

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
          src='https://www.lismore.nsw.gov.au/files/assets/public/v/1/1.-households/4.-pets-amp-animals/images/kitten.jpg?dimension=pageimage&w=480'
          alt='Cat Img'
        />
  
        <Stack>
          <CardBody width='80%'>
            <Heading size='md'>Donate</Heading>
    
            <Text py='2' align='left'>
            Every dollar donated helps us tremendously as we grow. We are a 501(c)(3) nonprofit and 
            your donation will be tax-deductible. If you require a donation receipt, please email us 
            at info@rutaverde.org and we will get you one. You can make a donation through our processor 
            iATS payments with the button below:
            </Text>
          </CardBody>
    
          <CardFooter>
            <Button variant='solid' colorScheme='teal'>
            <Link href='https://www.iatspayments.com/saaura/PA9ACE27D2159C5D04?fbclid=IwAR20hCOzgY97-Gg5nX5oTeQT62TfWgwECUHjDR6wVAgixHHwxQR898UdPZY' isExternal>
              Click Here
            </Link>
            </Button>
          </CardFooter>
        </Stack>
      </Card>
    </Box>
  );
};

export default Donate;
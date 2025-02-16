
import { Image, Card, CardBody, Heading, Text, Stack, CardFooter, Link, Button} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export interface GetInvolvedInfo {
    header: string;
    text: string;
    imageUrl: string;
    buttonUrl: string;
    isButtonExternal?: boolean
}

function GetInvolvedCard({header, text, imageUrl, buttonUrl, isButtonExternal=false}: GetInvolvedInfo) {
  return (
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
      >
            <Image
            objectFit='cover'
            width={{ base: '400px', sm: '200px' }}
            height={{ base: '533px', sm: '266px' }}
            src={imageUrl}
            alt='Get Involved Image'
            />
        <Stack>
          <CardBody width='80%'>
            <Heading size='md'>{header}</Heading>
            <Text py='2' align='left'>
                {text}
            </Text>
          </CardBody>
          <CardFooter>
                    {isButtonExternal ? 
                    <Link href={buttonUrl} isExternal>
                        <Button variant='solid' colorScheme='teal'>
                            Click Here
                        </Button>
                    </Link>
                    : 
                    <Link as={RouterLink} to={buttonUrl}>
                        <Button variant='solid' colorScheme='teal'>
                            Click Here
                        </Button>
                    </Link>
                    }
            </CardFooter> 
        </Stack>
      </Card>
  );
}

export default GetInvolvedCard;
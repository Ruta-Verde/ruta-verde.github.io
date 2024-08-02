import { Image, Card, CardBody, Heading, Text} from '@chakra-ui/react';

interface ProfileInfo {
  name: string;
  role:string;
  image: string;
}

function ProfileCard({name, role, image}: ProfileInfo) {

  
  return (
      <Card>
        <CardBody>
          <Image src={image} alt={name} borderRadius="full" boxSize="150px" objectFit="cover" />
        <Heading as="h3" size="md" mt={2}>
          {name}
        </Heading>
        <Text color="gray.600" fontWeight="medium">
          {role}
        </Text>
        </CardBody>
      </Card>
  );
}

export default ProfileCard;
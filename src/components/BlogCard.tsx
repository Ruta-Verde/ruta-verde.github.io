import { Image, Card, CardHeader, CardBody, CardFooter, Heading, Text, Divider, Button } from '@chakra-ui/react';

interface BlogInfo {
  data: {
    title: string;
    text: string;
    author:string;
    image: string;
  };
}

function BlogCard( { data }: BlogInfo) {
  return (
    <Card direction={'column'}>
      <Image src={data.image} />
      <CardHeader>
        <Heading>{data.title}</Heading>
        <Text>{data.author}</Text>
      </CardHeader>
      <CardBody>
        <Text noOfLines={5}>{data.text}</Text>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button>Read More</Button>
      </CardFooter>
    </Card>
  );
}

export default BlogCard;
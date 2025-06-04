import { useParams } from 'react-router-dom';
import { Text } from '@chakra-ui/react';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

function SingleProjectPage() {
  const { slug } = useParams();
  

  return (
    <Text> Coming Soon {slug} </Text>
  );
}

export default SingleProjectPage;

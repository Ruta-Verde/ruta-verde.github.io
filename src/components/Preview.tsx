import { Text, Image, Flex } from '@chakra-ui/react';
import { PreviewProps } from './constants/constants.tsx';

function Preview({ title, text, img }: PreviewProps) {
  return (
    <Flex flexDirection='column' flexShrink='0' 
        scrollSnapAlign='center' 
        width='320px'
        alignItems='center'
    >
      <Image 
        width='275px' height='350px' 
        objectFit='cover'
        src={img} alt="Your Image" 
        borderRadius="50px" 
        overflow='hidden' 
        />
      <>
      <Flex 
        flexDirection='column'
        alignItems='center' 
      >
        <Text fontSize="xl" fontWeight="bold">
          {title}
        </Text>
        <Text fontSize='lg' w='55%'>
          {text}
        </Text>
      </Flex>
      </>
    </Flex>
  );
};

export default Preview
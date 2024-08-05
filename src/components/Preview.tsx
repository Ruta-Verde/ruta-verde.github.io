import { Text, Image, VStack } from '@chakra-ui/react';
import { PreviewProps } from './constants/constants.tsx';

function Preview({ title, text, img }: PreviewProps) {
  return (
    <VStack width='70%' spacing='20px'>
      <Image width='275px' height='350px' src={img} alt="Your Image" borderRadius="50px" overflow='hidden' />
      <>
        <Text fontSize="xl" fontWeight="bold">
          {title}
        </Text>
        <Text fontSize='lg' w='55%'>
          {text}
        </Text>
      </>
    </VStack>
  );
};

export default Preview
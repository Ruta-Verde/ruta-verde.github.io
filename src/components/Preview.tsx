import { Box, Text, Image, VStack } from '@chakra-ui/react';
import { PreviewProps } from './constants/constants.tsx';

function Preview({ title, text, img }: PreviewProps) {
  return (
    <Box>
      <VStack width='70%' margin='auto' spacing='20px'>
        <Image width='360px' height='415px' src={img} alt="Your Image" borderRadius="50px" overflow='hidden' />
        <Box margin='auto'>
          <Text fontSize="xl" fontWeight="bold">
            {title}
          </Text>
          <Text fontSize='lg'>
            {text}
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default Preview
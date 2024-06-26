import { Box, Text, Image, HStack } from '@chakra-ui/react';

type PreviewProps = {
    title: string,
    text: string,
};

function Preview({ title, text }: PreviewProps) {
  return (
    <Box>
      <HStack width='80%' margin='auto'>
        <Box width='50%' margin='auto'>
          <Text fontSize="2xl" fontWeight="bold">
            {title}
          </Text>
          <Text mt={4}>
            {text}
          </Text>
        </Box>
        <Box p={8}>
          <Image src='https://www.adorama.com/alc/wp-content/uploads/2021/12/Nature-Camera-Settings-2-825x465.jpeg' alt="Your Image" borderRadius="50px" />
        </Box>
      </HStack>
    </Box>
  );
};

export default Preview
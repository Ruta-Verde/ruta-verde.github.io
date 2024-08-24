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
        width='100%' height='375px' 
        objectFit='cover'
        src={img} alt="Your Image" 
        borderRadius="50px" 
        overflow='hidden' 
        />
      <>
      <Flex 
        flexDirection='column'
        alignItems='center' 
        w='100%'
      >
        <Text 
        fontSize="30px" 
        fontWeight="bold"
        fontFamily='josefinSans'
        color='#385C40'
        mt='15px'
        >
          {title}
        </Text>
        <Text 
        fontSize='20px' 
        mt='10px'
        w='100%'>
          {text}
        </Text>
      </Flex>
      </>
    </Flex>
  );
};

export default Preview
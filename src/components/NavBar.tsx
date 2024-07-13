import { Box,
  Link,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import '../styles/navbar.css';
import React from 'react';

function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef(null)

  return(
    <Box textAlign='left' bg="grey.500" color="black">
      <nav className='non-phone'>
        <Link as={RouterLink} to="/" mr={4} p={4}>
          Home
        </Link>
        <Link as={RouterLink} to="/about">
          About
        </Link>
      </nav>
      <nav className='phone-nav'>
        <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
          <HamburgerIcon />
        </Button>
        <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            Placeholder content
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      </nav>
    </Box>
  )
}

export default NavBar
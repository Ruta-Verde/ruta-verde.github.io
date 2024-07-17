import {
  Button,
  Link,
  VStack,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import '../styles/navbar.css';
import React from 'react';

function SideNav() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef(null)

  return (
    <>
      <Button ref={btnRef} colorScheme='white' onClick={onOpen}>
        <HamburgerIcon color='black' />
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
        <DrawerBody>
          <VStack>
            <Link as={RouterLink} to="/" mt={10} p={2} borderY='1px solid black' width='100%'>
              Home
            </Link>
            <Link as={RouterLink} to="/about" p={2} borderBottom='1px solid black' width='100%'>
              About
            </Link>
            <Link as={RouterLink} to="/donate" p={2} borderBottom='1px solid black' width='100%'>
              Donate
            </Link>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
    </>
  )
}

export default SideNav;
import {
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
    </>
  )
}

export default SideNav;
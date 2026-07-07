import {
  Avatar, Box, Divider, HStack, Text, VStack, useColorModeValue,
} from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { dashboardNavConfig } from '../../../config/dashboardNav.config'
import SidebarNavItem from './SidebarNavItem'

const BRAND = '#385C40'

export default function Sidebar() {
  const { profile, availableRoles, activeRole } = useAuth()
  const location = useLocation()

  const sidebarBg = useColorModeValue('gray.50', 'gray.900')
  const activeBg = useColorModeValue('green.50', 'green.900')
  const hoverBg = useColorModeValue('gray.100', 'gray.800')

  const visibleNav = dashboardNavConfig.filter(item =>
    item.roles.length === 0 || item.roles.some(r => availableRoles.includes(r))
  )

  return (
    <Box
      as="nav"
      w={{ base: '64px', md: '220px' }}
      bg={sidebarBg}
      borderRightWidth="1px"
      borderColor="gray.200"
      py={6}
      px={{ base: 2, md: 4 }}
      display="flex"
      flexDirection="column"
      position="sticky"
      top="0"
      h="calc(100vh - 80px)"
      overflowY="auto"
    >
      <HStack spacing={3} px={2} mb={6}>
        <Avatar size="sm" name={profile?.username} bg={BRAND} color="white" />
        <Box display={{ base: 'none', md: 'block' }}>
          <Text
            fontSize="sm"
            fontWeight="600"
            color={BRAND}
            fontFamily="'Josefin Sans', sans-serif"
            noOfLines={1}
          >
            {profile?.username}
          </Text>
          <Text fontSize="xs" color="gray.500" textTransform="capitalize">
            {activeRole}
          </Text>
        </Box>
      </HStack>

      <Divider mb={4} />

      <VStack spacing={1} align="stretch" flex={1}>
        {visibleNav.map(item => (
          <SidebarNavItem
            key={item.to}
            item={item}
            isActive={location.pathname === item.to}
            brand={BRAND}
            activeBg={activeBg}
            hoverBg={hoverBg}
          />
        ))}
      </VStack>
    </Box>
  )
}
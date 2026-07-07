import { Box, Icon, Text, Tooltip } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import type { NavItem } from '../../../types/NavItem'

interface SidebarNavItemProps {
  item: NavItem
  isActive: boolean
  brand: string
  activeBg: string
  hoverBg: string
}

export default function SidebarNavItem({ item, isActive, brand, activeBg, hoverBg }: SidebarNavItemProps) {
  return (
    <Tooltip
      label={item.label}
      placement="right"
      hasArrow
      isDisabled={false}
      display={{ base: 'block', md: 'none' }}
    >
      <Box
        as={NavLink}
        to={item.to}
        display="flex"
        alignItems="center"
        gap={3}
        px={3}
        py={2.5}
        borderRadius="lg"
        bg={isActive ? activeBg : 'transparent'}
        color={isActive ? brand : 'gray.600'}
        fontWeight={isActive ? '600' : '400'}
        fontSize="sm"
        fontFamily="'Josefin Sans', sans-serif"
        transition="all 0.15s"
        _hover={{ bg: isActive ? activeBg : hoverBg, color: brand, textDecoration: 'none' }}
        borderLeft={isActive ? `3px solid ${brand}` : '3px solid transparent'}
      >
        <Icon as={item.icon} boxSize={5} flexShrink={0} />
        <Text display={{ base: 'none', md: 'block' }} noOfLines={1}>
          {item.label}
        </Text>
      </Box>
    </Tooltip>
  )
}
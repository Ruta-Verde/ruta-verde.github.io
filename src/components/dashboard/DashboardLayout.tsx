import { Box, Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar/Sidebar'

export default function DashboardLayout() {
  return (
    <Flex minH="calc(100vh - 80px)" w="100%">
      <Sidebar />
      <Box flex={1} minW={0} p={{ base: 4, md: 8 }} overflowY="auto" overflowX="hidden">
        <Outlet />
      </Box>
    </Flex>
  )
}
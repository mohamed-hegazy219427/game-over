import { Box, Text } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import BackToTop from '../ui/BackToTop'

export default function Layout() {
  return (
    <Box minH="100vh" className="bg-surface text-text-primary">
      <Navbar />
      <Outlet />

      {/* Footer */}
      <Box as="footer" py={8} mt={16} className="border-t border-border-subtle">
        <Box maxW="7xl" mx="auto" px={4} display="flex" flexDir={{ base: 'column', md: 'row' }} alignItems="center" justifyContent="space-between" gap={4}>
          <Text fontSize="sm" className="text-text-dim">
            © {new Date().getFullYear()} Game Over. All rights reserved.
          </Text>
          <Text fontSize="xs" className="text-text-dim">
            Powered by FreeToGame API
          </Text>
        </Box>
      </Box>

      <BackToTop />
    </Box>
  )
}

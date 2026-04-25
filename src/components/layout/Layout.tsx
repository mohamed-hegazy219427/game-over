import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import BackToTop from '../ui/BackToTop'

export default function Layout() {
  return (
    <Box minH="100vh" bg="gray.950" color="gray.100">
      <Navbar />
      <Outlet />
      <BackToTop />
    </Box>
  )
}

import { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Box, Flex, HStack, Text, Button, IconButton, Separator,
} from '@chakra-ui/react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Menu as MenuIcon, X } from 'lucide-react'
import logo from '../../assets/logo.png'

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()

  useGSAP(() => {
    gsap.from(navRef.current, { y: -60, opacity: 0, duration: 0.5, ease: 'power2.out' })
  }, { scope: navRef })
  const isHome = pathname === '/home' || pathname === '/'
  const isGames = pathname.startsWith('/game') && !pathname.includes('gameDetails')

  const NavLink = ({ to, label, active }: { to: string; label: string; active: boolean }) => (
    <Link to={to} onClick={() => setMobileOpen(false)}>
      <Box position="relative" px={1}>
        <Button
          variant="ghost"
          size="sm"
          className={`transition-all duration-300 ${
            active
              ? 'text-accent-glow! bg-accent/10!'
              : 'text-text-secondary hover:text-accent-glow hover:bg-accent/5'
          }`}
        >
          {label}
        </Button>
        {active && (
          <Box
            position="absolute"
            bottom="-4px"
            left="50%"
            transform="translateX(-50%)"
            w="40%"
            h="2px"
            bg="accent-glow"
            borderRadius="full"
            boxShadow="0 0 10px var(--color-accent-glow)"
            className="animate-fade-in"
          />
        )}
      </Box>
    </Link>
  )

  return (
    <Box
      as="nav"
      ref={navRef}
      position="sticky"
      top={0}
      zIndex={100}
      px={6}
      py={3}
      className="glass-nav"
    >
      <Flex align="center" justify="space-between" maxW="7xl" mx="auto">
        <Link to="/home">
          <HStack gap={2}>
            <img src={logo} alt="logo" style={{ height: '2rem' }} />
            <Text id="title" fontWeight="bold" fontSize="lg" letterSpacing="wider" className="text-dark-cyan-600">
              GAME-OVER
            </Text>
          </HStack>
        </Link>

        {/* Desktop Nav */}
        <HStack gap={1} display={{ base: 'none', md: 'flex' }}>
          <NavLink to="/home" label="Home" active={isHome} />
          <NavLink to="/game/all" label="Games" active={isGames} />
        </HStack>

        {/* Mobile Toggle */}
        <IconButton
          aria-label="Toggle menu"
          variant="ghost"
          display={{ base: 'flex', md: 'none' }}
          className="text-text-secondary hover:text-accent-glow"
          onClick={() => setMobileOpen(o => !o)}
        >
          {mobileOpen ? <X size={20} /> : <MenuIcon size={20} />}
        </IconButton>
      </Flex>

      {/* Mobile Nav */}
      {mobileOpen && (
        <Box display={{ md: 'none' }} pb={4} pt={2} className="animate-fade-in">
          <Separator mb={3} className="border-border-subtle" />
          <Box display="flex" flexDir="column" gap={2}>
            <NavLink to="/home" label="Home" active={isHome} />
            <NavLink to="/game/all" label="Browse Games" active={isGames} />
          </Box>
        </Box>
      )}
    </Box>
  )
}

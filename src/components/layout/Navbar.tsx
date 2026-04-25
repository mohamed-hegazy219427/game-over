import { useRef, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  Box, Flex, HStack, Text, Button, IconButton,
  Menu, Portal, Separator,
} from '@chakra-ui/react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ChevronDown, Menu as MenuIcon, X, Gamepad2 } from 'lucide-react'
import logo from '../../assets/logo.png'

const categories = [
  'mmorpg', 'shooter', 'strategy', 'moba', 'racing', 'sports',
  'social', 'sandbox', 'open-world', 'survival', 'pvp', 'pve',
  'pixel', 'voxel', 'zombie', 'turn-based', 'first-person',
  'battle-royale', 'action-rpg', 'action', 'military',
  'martial-arts', 'flight', 'low-spec', 'anime', 'fantasy',
  'sci-fi', 'fighting', 'card', 'tower-defense',
]

const platforms = ['pc', 'browser', 'all']
const sortOptions = ['relevance', 'popularity', 'release-date', 'alphabetical']

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useGSAP(() => {
    gsap.from(navRef.current, { y: -60, opacity: 0, duration: 0.5, ease: 'power2.out' })
  }, { scope: navRef })

  const isAll = pathname === '/game/all'
  const isCategory = pathname.startsWith('/game/category/')
  const isPlatform = pathname.startsWith('/game/platform/')
  const isSort = pathname.startsWith('/game/sort-by/')

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

        <HStack gap={2} display={{ base: 'none', md: 'flex' }}>
          <Link to="/game/all">
            <Button
              variant="ghost"
              size="sm"
              borderRadius={0}
              className={`border-b-2 transition-colors ${
                isAll
                  ? 'border-accent-glow text-accent-glow'
                  : 'border-transparent text-text-secondary hover:text-accent-glow'
              }`}
            >
              All Games
            </Button>
          </Link>

          <NavDropdown label="Category" items={categories} active={isCategory} onSelect={v => navigate(`/game/category/${v}`)} />
          <NavDropdown label="Platform" items={platforms} active={isPlatform} onSelect={v => navigate(`/game/platform/${v}`)} />
          <NavDropdown label="Sort" items={sortOptions} active={isSort} onSelect={v => navigate(`/game/sort-by/${v}`)} />
        </HStack>

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

      {mobileOpen && (
        <Box display={{ md: 'none' }} pb={4} pt={2} className="animate-fade-in">
          <Separator mb={3} className="border-border-subtle" />
          <Box display="flex" flexDir="column" gap={2}>
            <Link to="/game/all" onClick={() => setMobileOpen(false)}>
              <Button
                variant="ghost"
                w="full"
                justifyContent="flex-start"
                className={isAll ? 'text-accent-glow' : 'text-text-secondary'}
              >
                All Games
              </Button>
            </Link>
            <MobileSection title="Category" items={categories} prefix="category" active={isCategory} onNavigate={() => setMobileOpen(false)} />
            <MobileSection title="Platform" items={platforms} prefix="platform" active={isPlatform} onNavigate={() => setMobileOpen(false)} />
            <MobileSection title="Sort" items={sortOptions} prefix="sort-by" active={isSort} onNavigate={() => setMobileOpen(false)} />
          </Box>
        </Box>
      )}
    </Box>
  )
}

function NavDropdown({ label, items, active, onSelect }: { label: string; items: string[]; active: boolean; onSelect: (v: string) => void }) {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button
          variant="ghost"
          size="sm"
          borderRadius={0}
          className={`border-b-2 transition-colors ${
            active
              ? 'border-accent-glow text-accent-glow'
              : 'border-transparent text-text-secondary hover:text-accent-glow'
          }`}
        >
          {label} <ChevronDown size={14} />
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content
            maxH="60"
            overflowY="auto"
            minW="44"
            zIndex={200}
            className="bg-surface-raised/95! backdrop-blur-xl border-border-subtle! shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          >
            {items.map(item => (
              <Menu.Item
                key={item}
                value={item}
                textTransform="capitalize"
                cursor="pointer"
                className="text-text-secondary! hover:bg-accent/15! hover:text-accent-glow! transition-all duration-150"
                onClick={() => onSelect(item)}
              >
                <Gamepad2 size={14} />
                {item.replace(/-/g, ' ')}
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

function MobileSection({ title, items, prefix, active, onNavigate }: { title: string; items: string[]; prefix: string; active: boolean; onNavigate: () => void }) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  return (
    <Box>
      <Button
        variant="ghost"
        w="full"
        justifyContent="space-between"
        className={active ? 'text-accent-glow' : 'text-text-secondary'}
        onClick={() => setOpen(o => !o)}
      >
        {title}
        <ChevronDown size={14} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </Button>
      {open && (
        <Box pl={4} display="flex" flexDir="column" gap={1} mt={1} className="animate-fade-in">
          {items.map(item => (
            <Button
              key={item}
              variant="ghost"
              size="sm"
              justifyContent="flex-start"
              textTransform="capitalize"
              className="text-text-dim hover:text-accent-glow"
              onClick={() => { navigate(`/game/${prefix}/${item}`); onNavigate() }}
            >
              {item.replace(/-/g, ' ')}
            </Button>
          ))}
        </Box>
      )}
    </Box>
  )
}

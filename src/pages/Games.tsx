import { useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Box, Container, Grid, Heading, HStack, Text, Button, Flex, VStack, Separator
} from '@chakra-ui/react'
import { Gamepad2, Laptop, Globe, X, ListFilter } from 'lucide-react'
import { fetchGamesByParams } from '../services/api'
import { categories, platforms, sortOptions } from '../constants/filters'
import GameCard from '../components/ui/GameCard'
import GameCardSkeleton from '../components/ui/GameCardSkeleton'
import ErrorState from '../components/ui/ErrorState'
import FilterDropdown from '../components/ui/FilterDropdown'

export default function Games() {
  const [searchParams, setSearchParams] = useSearchParams()
  const gridRef = useRef<HTMLDivElement>(null)

  const { data: games, isSuccess, isError, refetch, isFetching } = useQuery({
    queryKey: ['games', searchParams.toString()],
    queryFn: () => fetchGamesByParams(searchParams),
  })

  useGSAP(() => {
    if (!isSuccess) return
    ScrollTrigger.batch('.game-card', {
      onEnter: els =>
        gsap.from(els, { y: 50, opacity: 0, duration: 0.45, stagger: 0.05, ease: 'power2.out' }),
      once: true,
      start: 'top 90%',
    })
  }, { scope: gridRef, dependencies: [isSuccess, searchParams.toString()] })

  const updateParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams)
    if (value === 'all') {
      newParams.delete(key)
    } else {
      newParams.set(key, value)
    }
    setSearchParams(newParams)
  }

  const clearFilters = () => {
    setSearchParams(new URLSearchParams())
  }

  const currentSort = searchParams.get('sort-by') || 'relevance'
  const currentCategory = searchParams.get('category') || 'all'
  const currentPlatform = searchParams.get('platform') || 'all'

  return (
    <Container maxW="7xl" px={4} py={10}>
      <Box mb={10}>
        <VStack align="flex-start" gap={6} mb={8}>
          <Box>
            <Heading as="h1" size="2xl" mb={2} className="text-text-primary">
              Explore Games
            </Heading>
            <Text className="text-text-dim">
              Discover your next favorite free-to-play experience
            </Text>
          </Box>

          <Flex 
            w="full" 
            direction={{ base: 'column', lg: 'row' }} 
            gap={4} 
            p={4} 
            className="glass-card border-border-subtle/50!"
            align={{ lg: 'center' }}
          >
            <HStack gap={4} flex={1} wrap="wrap">
              <FilterDropdown 
                label="Category" 
                icon={<Gamepad2 size={16} />}
                value={currentCategory}
                options={['all', ...categories]}
                onSelect={(v) => updateParam('category', v)}
              />

              <FilterDropdown 
                label="Platform" 
                icon={currentPlatform === 'pc' ? <Laptop size={16} /> : <Globe size={16} />}
                value={currentPlatform}
                options={platforms.map(p => p.value)}
                labels={platforms.reduce((acc, p) => ({ ...acc, [p.value]: p.label }), {})}
                onSelect={(v) => updateParam('platform', v)}
              />

              <FilterDropdown 
                label="Sort By" 
                icon={<ListFilter size={16} />}
                value={currentSort}
                options={sortOptions.map(o => o.value)}
                labels={sortOptions.reduce((acc, o) => ({ ...acc, [o.value]: o.label }), {})}
                onSelect={(v) => updateParam('sort-by', v)}
              />

              {(currentCategory !== 'all' || currentPlatform !== 'all' || currentSort !== 'relevance') && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="text-oxidized-iron-600 hover:bg-oxidized-iron/10"
                >
                  <X size={14} /> Clear
                </Button>
              )}
            </HStack>

            {games && (
              <Text fontSize="sm" fontWeight="medium" className="text-text-dim">
                Showing {games.length} results
              </Text>
            )}
          </Flex>
        </VStack>
      </Box>

      <Separator mb={10} className="opacity-10" />

      {isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : (
        <Grid
          ref={gridRef}
          templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }}
          gap={6}
          opacity={isFetching ? 0.6 : 1}
          transition="opacity 0.2s"
        >
          {games
            ? games.map(game => (
                <Box key={game.id} className="game-card">
                  <GameCard game={game} />
                </Box>
              ))
            : Array.from({ length: 12 }).map((_, i) => <GameCardSkeleton key={i} />)}
        </Grid>
      )}
    </Container>
  )
}

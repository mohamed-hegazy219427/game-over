import { useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Box, Container, Grid, Heading, HStack, Text, Button, Flex, VStack, Separator
} from '@chakra-ui/react'
import { Gamepad2, Laptop, Globe, X, ListFilter, Sparkles } from 'lucide-react'
import { fetchGamesByParams } from '../services/api'
import { categories, platforms, sortOptions } from '../constants/filters'
import GameCard from '../components/ui/GameCard'
import GameCardSkeleton from '../components/ui/GameCardSkeleton'
import ErrorState from '../components/ui/ErrorState'
import FilterDropdown from '../components/ui/FilterDropdown'

export default function Games() {
  const [searchParams, setSearchParams] = useSearchParams()
  const gridRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { data: games, isSuccess, isError, refetch, isFetching } = useQuery({
    queryKey: ['games', searchParams.toString()],
    queryFn: () => fetchGamesByParams(searchParams),
  })

  useGSAP(() => {
    if (!isSuccess) return
    
    // Batch animation for cards with a more "premium" feel
    ScrollTrigger.batch('.game-card', {
      onEnter: els =>
        gsap.from(els, { 
          y: 60, 
          opacity: 0, 
          scale: 0.95,
          duration: 0.6, 
          stagger: 0.08, 
          ease: 'expo.out',
          clearProps: 'all'
        }),
      once: true,
      start: 'top 92%',
    })

    // Header animation
    gsap.from('.games-header', { 
      y: -30, 
      opacity: 0, 
      duration: 0.8, 
      ease: 'power3.out' 
    })
  }, { scope: containerRef, dependencies: [isSuccess, searchParams.toString()] })

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
    <Box ref={containerRef} minH="100vh" className="relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-dark-cyan/5 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-[10%] left-[-5%] w-[30%] h-[30%] bg-golden-orange/5 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <Container maxW="7xl" px={4} py={12} position="relative" zIndex={1}>
        {/* Header & Filters Section */}
        <Box mb={12} className="games-header">
          <VStack align="flex-start" gap={8} mb={10}>
            <Box>
              <HStack gap={3} mb={2}>
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20">
                  <Gamepad2 size={24} className="text-accent-glow" />
                </div>
                <Heading as="h1" size="2xl" className="text-text-primary tracking-tight">
                  Explore Library
                </Heading>
              </HStack>
              <Text className="text-text-dim max-w-lg">
                Browse through hundreds of high-quality free-to-play titles. Use the filters below to find exactly what you're looking for.
              </Text>
            </Box>

            <Flex 
              w="full" 
              direction={{ base: 'column', lg: 'row' }} 
              gap={6} 
              p={6} 
              className="glass-card border-border-subtle/50! shadow-xl!"
              align={{ lg: 'flex-end' }}
            >
              <HStack gap={6} flex={1} wrap="wrap" align="flex-end">
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
                  <Box pb={1}>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearFilters}
                      className="text-oxidized-iron-600! hover:bg-oxidized-iron/10! font-bold"
                    >
                      <X size={14} /> Reset Filters
                    </Button>
                  </Box>
                )}
              </HStack>

              <Box 
                px={4} 
                py={2} 
                borderRadius="full" 
                className="bg-surface/50 border border-border-subtle/30"
              >
                <HStack gap={2}>
                  <Sparkles size={14} className="text-accent-glow" />
                  <Text fontSize="sm" fontWeight="bold" className="text-text-secondary">
                    {games ? games.length : '0'} Games Found
                  </Text>
                </HStack>
              </Box>
            </Flex>
          </VStack>
        </Box>

        <Separator mb={12} className="opacity-10" />

        {isError ? (
          <ErrorState onRetry={() => refetch()} />
        ) : (
          <Grid
            ref={gridRef}
            templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }}
            gap={6}
            opacity={isFetching ? 0.6 : 1}
            transition="opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          >
            {games
              ? games.map(game => (
                  <Box key={game.id} className="game-card group/card">
                    <GameCard game={game} />
                  </Box>
                ))
              : Array.from({ length: 12 }).map((_, i) => <GameCardSkeleton key={i} />)}
          </Grid>
        )}
      </Container>
    </Box>
  )
}

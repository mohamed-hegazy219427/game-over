import { useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import axios from 'axios'
import { Box, Container, Grid, Heading, HStack } from '@chakra-ui/react'
import type { Game } from '../types'
import GameCard from '../components/ui/GameCard'
import GameCardSkeleton from '../components/ui/GameCardSkeleton'
import ErrorState from '../components/ui/ErrorState'

const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY as string
const API_HOST = import.meta.env.VITE_RAPIDAPI_HOST as string

async function fetchGames(filter?: string, value?: string): Promise<Game[]> {
  const params: Record<string, string | undefined> = {}
  if (filter === 'category') params.category = value
  else if (filter === 'platform') params.platform = value
  else if (filter === 'sort-by') params['sort-by'] = value

  const { data } = await axios.get(`https://${API_HOST}/api/games`, {
    headers: { 'X-RapidAPI-Key': API_KEY, 'X-RapidAPI-Host': API_HOST },
    params,
  })
  return data
}

function pageTitle(filter?: string, value?: string) {
  if (!filter || !value) return 'All Games'
  const labels: Record<string, string> = {
    category: 'Category',
    platform: 'Platform',
    'sort-by': 'Sorted by',
  }
  return `${labels[filter] ?? filter}: ${value.replace(/-/g, ' ')}`
}

export default function Games() {
  const { filter, value } = useParams<{ filter?: string; value?: string }>()
  const gridRef = useRef<HTMLDivElement>(null)

  const { data: games, isSuccess, isError, refetch } = useQuery({
    queryKey: ['games', filter, value],
    queryFn: () => fetchGames(filter, value),
  })

  useGSAP(() => {
    if (!isSuccess) return
    ScrollTrigger.batch('.game-card', {
      onEnter: els =>
        gsap.from(els, { y: 50, opacity: 0, duration: 0.45, stagger: 0.05, ease: 'power2.out' }),
      once: true,
      start: 'top 90%',
    })
  }, { scope: gridRef, dependencies: [isSuccess, filter, value] })

  return (
    <Container maxW="7xl" px={4} py={10}>
      <HStack gap={3} mb={8} align="center">
        <Heading as="h2" size="xl" textTransform="capitalize" className="text-text-primary">
          {pageTitle(filter, value)}
        </Heading>
        {games && (
          <span className="badge">
            {games.length} games
          </span>
        )}
      </HStack>

      {isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : (
        <Grid
          ref={gridRef}
          templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }}
          gap={5}
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

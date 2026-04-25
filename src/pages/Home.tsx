import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import axios from 'axios'
import { Box, Container, Grid, Heading, Text, Button, Badge, HStack } from '@chakra-ui/react'
import { Bot } from 'lucide-react'
import type { Game } from '../types'
import GameCard from '../components/ui/GameCard'
import GameCardSkeleton from '../components/ui/GameCardSkeleton'
import ErrorState from '../components/ui/ErrorState'

const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY as string
const API_HOST = import.meta.env.VITE_RAPIDAPI_HOST as string

async function fetchPopular(): Promise<Game[]> {
  const { data } = await axios.get(`https://${API_HOST}/api/games`, {
    headers: { 'X-RapidAPI-Key': API_KEY, 'X-RapidAPI-Host': API_HOST },
    params: { 'sort-by': 'popularity' },
  })
  return data
}

export default function Home() {
  const { data: games, isSuccess, isError, refetch } = useQuery({ queryKey: ['games', 'popularity'], queryFn: fetchPopular })
  const heroRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.timeline()
      .from('.hero-heading', { y: -40, opacity: 0, duration: 0.7, ease: 'power3.out' })
      .from('.hero-sub', { y: -20, opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
      .from('.hero-btn', { scale: 0.85, opacity: 0, duration: 0.4, ease: 'back.out(1.7)' }, '-=0.2')
  }, { scope: heroRef })

  useGSAP(() => {
    if (!isSuccess) return
    gsap.from('.rec-card', { y: 50, opacity: 0, duration: 0.5, stagger: 0.15, ease: 'power2.out' })
  }, { scope: cardsRef, dependencies: [isSuccess] })

  return (
    <Box>
      <Box
        ref={heroRef}
        textAlign="center"
        py={24}
        borderBottomWidth="1px"
        borderColor="gray.800"
        bgGradient="to-b"
        gradientFrom="gray.950"
        gradientTo="gray.900"
      >
        <Container maxW="3xl" px={4}>
          <Heading className="hero-heading" as="h1" size="4xl" mb={4} lineHeight="tight" color="white">
            Find &amp; track the best{' '}
            <Text as="span" color="cyan.400">free-to-play</Text>{' '}
            games!
          </Heading>
          <Text className="hero-sub" fontSize="xl" color="gray.500" mb={8}>
            Track what you&apos;ve played and search for what to play next!
          </Text>
          <Link to="/game/all">
            <Button className="hero-btn" variant="outline" colorPalette="cyan" size="lg" px={8}>
              Browse Games
            </Button>
          </Link>
        </Container>
      </Box>

      <Container maxW="7xl" px={4} py={16}>
        <HStack gap={3} mb={8}>
          <HStack gap={2} color="gray.500">
            <Bot size={22} />
            <Heading as="h3" size="lg" color="gray.500">
              Personalized Recommendations
            </Heading>
          </HStack>
          <Badge colorPalette="cyan" variant="subtle" borderRadius="full">Popular</Badge>
        </HStack>

        {isError ? (
          <ErrorState onRetry={() => refetch()} />
        ) : (
          <Grid ref={cardsRef} templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
            {games
              ? games.slice(0, 3).map(game => (
                  <Box key={game.id} className="rec-card"><GameCard game={game} /></Box>
                ))
              : Array.from({ length: 3 }).map((_, i) => <GameCardSkeleton key={i} />)}
          </Grid>
        )}
      </Container>
    </Box>
  )
}

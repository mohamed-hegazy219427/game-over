import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Box, Container, Grid, Heading, Text, HStack } from '@chakra-ui/react'
import { Bot, Sparkles } from 'lucide-react'
import { fetchPopularGames } from '../services/api'
import GameCard from '../components/ui/GameCard'
import GameCardSkeleton from '../components/ui/GameCardSkeleton'
import ErrorState from '../components/ui/ErrorState'

export default function Home() {
  const { data: games, isSuccess, isError, refetch } = useQuery({ 
    queryKey: ['games', 'relevance'], 
    queryFn: fetchPopularGames 
  })
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
      {/* Hero Section */}
      <Box
        ref={heroRef}
        textAlign="center"
        py={24}
        position="relative"
        overflow="hidden"
        className="border-b border-border-subtle"
      >
        {/* Grid background pattern */}
        <div className="absolute inset-0 bg-grid opacity-60" />
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-dark-teal-200)_0%,transparent_70%)]" />

        <Container maxW="3xl" px={4} position="relative" zIndex={10}>
          <Heading
            className="hero-heading text-text-primary"
            as="h1"
            size="4xl"
            mb={4}
            lineHeight="tight"
          >
            Find &amp; track the best{' '}
            <Text as="span" className="text-gradient">free-to-play</Text>{' '}
            games!
          </Heading>
          <Text className="hero-sub text-text-dim" fontSize="xl" mb={8}>
            Track what you&apos;ve played and search for what to play next!
          </Text>
          <Link to="/game/all">
            <button className="hero-btn btn btn-primary text-base px-10 py-3 animate-pulse-glow">
              <Sparkles size={18} />
              Browse Games
            </button>
          </Link>
        </Container>
      </Box>

      {/* Recommendations Section */}
      <Container maxW="7xl" px={4} py={16}>
        <HStack gap={3} mb={8}>
          <HStack gap={2} className="text-text-dim">
            <Bot size={22} />
            <Heading as="h3" size="lg" className="text-text-secondary">
              Personalized Recommendations
            </Heading>
          </HStack>
          <span className="badge badge-warm">
            <Sparkles size={12} />
            Popular
          </span>
          <Link to="/game/all" className="ml-auto text-sm text-accent-glow hover:underline">
            See All →
          </Link>
        </HStack>

        {isError ? (
          <ErrorState onRetry={() => refetch()} />
        ) : (
          <Grid ref={cardsRef} templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6}>
            {games
              ? games.slice(0, 4).map(game => (
                  <Box key={game.id} className="rec-card"><GameCard game={game} /></Box>
                ))
              : Array.from({ length: 4 }).map((_, i) => <GameCardSkeleton key={i} />)}
          </Grid>
        )}
      </Container>
    </Box>
  )
}

import { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import {
  Box, Grid, Heading, Text, Image,
  Skeleton, SkeletonText,
} from '@chakra-ui/react'
import { ExternalLink } from 'lucide-react'
import { fetchGameById } from '../services/api'
import ScreenShotsSlider from '../components/ui/ScreenShotsSlider'

function GameDetailSkeleton() {
  return (
    <Box maxW="7xl" mx="auto" px={4} py={10}>
      <Grid templateColumns={{ base: '1fr', md: '5fr 7fr' }} gap={8}>
        <Box>
          <Skeleton h="64" borderRadius="lg" />
          <Box display="flex" gap={3} mt={3}>
            <Skeleton h="9" w="16" borderRadius="md" />
            <Skeleton h="9" flex={1} borderRadius="md" />
          </Box>
        </Box>
        <Box>
          <Skeleton h="8" w="3/4" mb={3} />
          <Skeleton h="5" w="1/2" mb={4} />
          <SkeletonText noOfLines={4} gap={2} />
        </Box>
      </Grid>
    </Box>
  )
}

export default function GameDetails() {
  const { id } = useParams<{ id: string }>()
  const contentRef = useRef<HTMLDivElement>(null)

  const { data: game, isSuccess } = useQuery({
    queryKey: ['game', id],
    queryFn: () => fetchGameById(id!),
    enabled: !!id,
  })

  useGSAP(() => {
    if (!isSuccess) return
    gsap.from('.img-col', { x: -60, opacity: 0, duration: 0.6, ease: 'power2.out' })
    gsap.from('.info-col', { x: 60, opacity: 0, duration: 0.6, ease: 'power2.out', delay: 0.1 })
  }, { scope: contentRef, dependencies: [isSuccess] })

  if (!game) return <GameDetailSkeleton />

  return (
    <Box
      minH="100vh"
      style={{
        backgroundImage: `url(${game.thumbnail})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <Box minH="100vh" py={10} className="bg-surface/95 backdrop-blur-sm">
        <Grid
          ref={contentRef}
          templateColumns={{ base: '1fr', md: '5fr 7fr' }}
          gap={8}
          maxW="7xl"
          mx="auto"
          px={4}
        >
          {/* Left — Image & Actions */}
          <Box className="img-col">
            <Image src={game.thumbnail} alt={game.title} w="full" borderRadius="xl" className="shadow-xl" />
            <Box display="flex" gap={3} mt={4}>
              <span className="badge badge-warm text-sm py-1.5 px-4">Free</span>
              <Link to={game.freetogame_profile_url} target="_blank" style={{ flex: 1 }}>
                <button className="btn btn-primary w-full">
                  <ExternalLink size={16} />
                  Play Now
                </button>
              </Link>
            </Box>
          </Box>

          {/* Right — Info */}
          <Box className="info-col">
            <Heading as="h1" size="2xl" mb={2} className="text-text-primary">{game.title}</Heading>
            <Heading as="h2" size="md" mb={4} fontWeight="normal" className="text-text-dim">
              About {game.title}
            </Heading>
            <Text fontSize="sm" lineHeight="2" mb={6} className="text-text-secondary">
              {game.description}
            </Text>

            {/* System Requirements */}
            {game.minimum_system_requirements && (
              <Box mb={6} p={5} className="glass-card">
                <Heading as="h3" size="md" mb={3} className="text-text-primary">
                  Minimum System Requirements
                </Heading>
                <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)' }} gap={3}>
                  {Object.entries(game.minimum_system_requirements).map(([k, v]) => (
                    <Box key={k}>
                      <Text fontSize="xs" mb={1} textTransform="capitalize" letterSpacing="wide" fontWeight="medium" className="text-text-dim uppercase">
                        {k}
                      </Text>
                      <Text fontSize="sm" className="text-text-secondary">
                        {v}
                      </Text>
                    </Box>
                  ))}
                </Grid>
              </Box>
            )}

            {/* Screenshots */}
            <Box mb={6}>
              <Heading as="h3" size="md" mb={3} className="text-text-primary">
                {game.title} Screenshots
              </Heading>
              <ScreenShotsSlider src={game.screenshots} />
            </Box>

            {/* Additional Info */}
            <Box p={5} className="glass-card">
              <Heading as="h3" size="md" mb={4} className="text-text-primary">
                Additional Information
              </Heading>
              <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} gap={4}>
                {([
                  ['Title', game.title], ['Developer', game.developer],
                  ['Publisher', game.publisher], ['Release Date', game.release_date],
                  ['Genre', game.genre], ['Platform', game.platform],
                ] as [string, string][]).map(([label, val]) => (
                  <Box key={label}>
                    <Text fontSize="xs" mb={1} className="text-text-dim">{label}</Text>
                    <Text fontSize="sm" className="text-text-secondary">{val}</Text>
                  </Box>
                ))}
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Box>
    </Box>
  )
}

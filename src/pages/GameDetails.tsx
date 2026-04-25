import { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import axios from 'axios'
import {
  Box, Grid, Heading, Text, Badge, Button, Image,
  Skeleton, SkeletonText,
} from '@chakra-ui/react'
import type { GameDetail } from '../types'
import ScreenShotsSlider from '../components/ui/ScreenShotsSlider'

const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY as string
const API_HOST = import.meta.env.VITE_RAPIDAPI_HOST as string

async function fetchGame(id: string): Promise<GameDetail> {
  const { data } = await axios.get(`https://${API_HOST}/api/game`, {
    headers: { 'X-RapidAPI-Key': API_KEY, 'X-RapidAPI-Host': API_HOST },
    params: { id },
  })
  return data
}

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
    queryFn: () => fetchGame(id!),
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
      <Box minH="100vh" bg="blackAlpha.900" py={10}>
        <Grid
          ref={contentRef}
          templateColumns={{ base: '1fr', md: '5fr 7fr' }}
          gap={8}
          maxW="7xl"
          mx="auto"
          px={4}
        >
          <Box className="img-col">
            <Image src={game.thumbnail} alt={game.title} w="full" borderRadius="lg" />
            <Box display="flex" gap={3} mt={3}>
              <Badge colorPalette="blue" variant="solid" px={3} py={1.5} fontSize="sm">
                Free
              </Badge>
              <Link to={game.freetogame_profile_url} target="_blank" style={{ flex: 1 }}>
                <Button colorPalette="blue" w="full">
                  Play Now
                </Button>
              </Link>
            </Box>
          </Box>

          <Box className="info-col" color="gray.300">
            <Heading as="h1" size="2xl" color="white" mb={2}>{game.title}</Heading>
            <Heading as="h2" size="md" color="gray.500" mb={4} fontWeight="normal">
              About {game.title}
            </Heading>
            <Text fontSize="sm" lineHeight="2" color="gray.400" mb={6}>
              {game.description}
            </Text>

            {game.minimum_system_requirements && (
              <Box mb={6}>
                <Heading as="h3" size="md" color="gray.200" mb={3}>
                  Minimum System Requirements
                </Heading>
                {Object.entries(game.minimum_system_requirements).map(([k, v]) => (
                  <Text key={k} fontSize="sm" color="gray.400" mb={1}>
                    <Text as="span" fontWeight="semibold" color="gray.300" textTransform="capitalize">
                      {k}:{' '}
                    </Text>
                    {v}
                  </Text>
                ))}
              </Box>
            )}

            <Box mb={6}>
              <Heading as="h3" size="md" color="gray.200" mb={3}>
                {game.title} Screenshots
              </Heading>
              <ScreenShotsSlider src={game.screenshots} />
            </Box>

            <Box>
              <Heading as="h3" size="md" color="gray.200" mb={4}>
                Additional Information
              </Heading>
              <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} gap={4}>
                {(
                  [
                    ['Title', game.title], ['Developer', game.developer],
                    ['Publisher', game.publisher], ['Release Date', game.release_date],
                    ['Genre', game.genre], ['Platform', game.platform],
                  ] as [string, string][]
                ).map(([label, val]) => (
                  <Box key={label}>
                    <Text fontSize="xs" color="gray.600" mb={1}>{label}</Text>
                    <Text fontSize="sm" color="gray.300">{val}</Text>
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

import { Link } from 'react-router-dom'
import { Box, Badge, Text, Image } from '@chakra-ui/react'
import { Monitor, Globe } from 'lucide-react'
import type { Game } from '../../types'

export default function GameCard({ game }: { game: Game }) {
  return (
    <Link to={`/game/gameDetails/${game.id}`}>
      <Box
        bg="gray.900"
        borderRadius="lg"
        overflow="hidden"
        borderWidth="1px"
        borderColor="gray.800"
        _hover={{ borderColor: 'cyan.600', transform: 'translateY(-2px)', shadow: 'lg' }}
        transition="all 0.2s"
        cursor="pointer"
        h="full"
        display="flex"
        flexDir="column"
      >
        <Image src={game.thumbnail} alt={game.title} w="full" h="44" objectFit="cover" />

        <Box p={4} flex={1} display="flex" flexDir="column" gap={2}>
          <Text fontWeight="semibold" color="gray.100" fontSize="sm" lineClamp={1}>
            {game.title}
          </Text>
          <Text color="gray.500" fontSize="xs" lineClamp={2} flex={1}>
            {game.short_description}
          </Text>

          <Box display="flex" alignItems="center" justifyContent="space-between" mt="auto">
            <Badge colorPalette="cyan" variant="subtle" fontSize="xs" textTransform="capitalize">
              {game.genre}
            </Badge>
            <Box color="gray.500" display="flex" alignItems="center" gap={1}>
              {game.platform.toLowerCase().includes('pc') ? (
                <Monitor size={13} />
              ) : (
                <Globe size={13} />
              )}
              <Text fontSize="xs">{game.platform}</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Link>
  )
}

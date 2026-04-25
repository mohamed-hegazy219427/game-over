import { Link } from 'react-router-dom'
import { Box, Text, Image } from '@chakra-ui/react'
import { Monitor, Globe } from 'lucide-react'
import type { Game } from '../../types'

/** Maps genre names to badge CSS class variants */
function genreBadgeClass(genre: string): string {
  const g = genre.toLowerCase()
  const map: Record<string, string> = {
    shooter: 'badge-shooter',
    mmorpg: 'badge-mmorpg',
    strategy: 'badge-strategy',
    moba: 'badge-moba',
    racing: 'badge-racing',
    sports: 'badge-sports',
    action: 'badge-action',
    'action rpg': 'badge-rpg',
    fantasy: 'badge-fantasy',
    'sci-fi': 'badge-sci-fi',
    card: 'badge-card',
    social: 'badge-social',
    fighting: 'badge-fighting',
    survival: 'badge-survival',
  }
  return map[g] ?? ''
}

export default function GameCard({ game }: { game: Game }) {
  return (
    <Link to={`/game/gameDetails/${game.id}`}>
      <Box
        borderRadius="lg"
        overflow="hidden"
        cursor="pointer"
        h="full"
        display="flex"
        flexDir="column"
        className="card group"
      >
        {/* Image with hover overlay */}
        <Box position="relative" overflow="hidden">
          <Image
            src={game.thumbnail}
            alt={game.title}
            w="full"
            h="44"
            objectFit="cover"
            className="transition-transform duration-500 group-hover:scale-110"
          />
          <Box
            position="absolute"
            inset={0}
            display="flex"
            alignItems="flex-end"
            justifyContent="center"
            pb={3}
            className="bg-linear-to-t from-surface-raised/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <Text fontSize="xs" fontWeight="medium" letterSpacing="wide" textTransform="uppercase" className="text-accent-glow">
              View Details →
            </Text>
          </Box>
        </Box>

        {/* Content */}
        <Box p={4} flex={1} display="flex" flexDir="column" gap={2}>
          <Text fontWeight="semibold" fontSize="sm" lineClamp={1} className="text-text-primary">
            {game.title}
          </Text>
          <Text fontSize="xs" lineClamp={2} flex={1} className="text-text-dim">
            {game.short_description}
          </Text>

          <Box display="flex" alignItems="center" justifyContent="space-between" mt="auto" pt={2} className="border-t border-border-subtle/50">
            <span className={`badge px-4 text-xs ${genreBadgeClass(game.genre)}`}>
              {game.genre}
            </span>
            <Box display="flex" alignItems="center" gap={1} fontSize="xs" className="text-text-dim">
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

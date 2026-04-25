import { Link } from "react-router-dom";
import { Box, Text, Image, HStack } from "@chakra-ui/react";
import { Monitor, Globe, ChevronRight } from "lucide-react";
import type { Game } from "../../types";

/** Maps genre names to badge CSS class variants */
function genreBadgeClass(genre: string): string {
  const g = genre.toLowerCase();
  const map: Record<string, string> = {
    shooter: "badge-shooter",
    mmorpg: "badge-mmorpg",
    strategy: "badge-strategy",
    moba: "badge-moba",
    racing: "badge-racing",
    sports: "badge-sports",
    action: "badge-action",
    "action rpg": "badge-rpg",
    fantasy: "badge-fantasy",
    "sci-fi": "badge-sci-fi",
    card: "badge-card",
    social: "badge-social",
    fighting: "badge-fighting",
    survival: "badge-survival",
    "battle royale": "badge-battle-royale",
    anime: "badge-anime",
    military: "badge-military",
    zombie: "badge-zombie",
    pixel: "badge-pixel",
    flight: "badge-flight",
    "open world": "badge-open-world",
    sandbox: "badge-sandbox",
    pvp: "badge-pvp",
    pve: "badge-pve",
    "martial arts": "badge-martial-arts",
    "tower defense": "badge-tower-defense",
    "turn based": "badge-turn-based",
  };
  return map[g] ?? "";
}

export default function GameCard({ game }: { game: Game }) {
  return (
    <Link to={`/game/gameDetails/${game.id}`}>
      <Box
        borderRadius="2xl"
        overflow="hidden"
        cursor="pointer"
        h="full"
        display="flex"
        flexDir="column"
        className="card group/card relative transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-border-subtle/30 hover:border-accent/40"
      >
        {/* Shine effect overlay */}
        <div className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-size-[200%_100%] animate-shimmer" />

        {/* Image with hover scale */}
        <Box position="relative" overflow="hidden" h="48">
          <Image
            src={game.thumbnail}
            alt={game.title}
            w="full"
            h="full"
            objectFit="cover"
            className="transition-transform duration-700 ease-out group-hover/card:scale-110"
          />

          {/* Genre Badge overlay */}
          <Box position="absolute" top={3} left={3} zIndex={5}>
            <span
              className={`badge px-3 py-1 text-[10px] uppercase tracking-tighter font-bold ${genreBadgeClass(game.genre)}`}
            >
              {game.genre}
            </span>
          </Box>

          <Box
            position="absolute"
            inset={0}
            display="flex"
            alignItems="center"
            justifyContent="center"
            className="bg-accent/20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]"
          >
            <Box
              px={4}
              py={2}
              borderRadius="full"
              className="bg-white text-black font-bold text-xs flex items-center gap-1 translate-y-4 group-hover/card:translate-y-0 transition-transform duration-500"
            >
              Play Free <ChevronRight size={14} />
            </Box>
          </Box>
        </Box>

        {/* Content */}
        <Box
          p={5}
          flex={1}
          display="flex"
          flexDir="column"
          gap={3}
          className="bg-linear-to-b from-transparent to-surface-raised/30"
        >
          <Box>
            <Text
              fontWeight="bold"
              fontSize="md"
              lineClamp={1}
              className="text-text-primary group-hover/card:text-accent-glow transition-colors duration-300"
            >
              {game.title}
            </Text>
            <Box
              display="flex"
              alignItems="center"
              gap={1.5}
              mt={1}
              fontSize="10px"
              className="text-text-dim uppercase tracking-widest font-medium"
            >
              {game.platform.toLowerCase().includes("pc") ? (
                <Monitor size={10} />
              ) : (
                <Globe size={10} />
              )}
              {game.platform}
            </Box>
          </Box>

          <Text
            fontSize="xs"
            lineHeight="tall"
            lineClamp={2}
            flex={1}
            className="text-text-dim/80"
          >
            {game.short_description}
          </Text>

          <Box pt={3} className="border-t border-border-subtle/30">
            <HStack justify="space-between" align="center">
              <Text
                fontSize="10px"
                fontWeight="bold"
                className="text-accent-glow/60 tracking-widest uppercase"
              >
                Details
              </Text>
              <div className="w-6 h-6 rounded-full bg-accent/5 flex items-center justify-center border border-accent/10 group-hover/card:bg-accent/20 group-hover/card:border-accent/30 transition-all duration-300">
                <ChevronRight
                  size={14}
                  className="text-text-dim group-hover/card:text-accent-glow"
                />
              </div>
            </HStack>
          </Box>
        </Box>
      </Box>
    </Link>
  );
}

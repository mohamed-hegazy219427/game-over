import { Box, Skeleton, SkeletonText } from '@chakra-ui/react'

export default function GameCardSkeleton() {
  return (
    <Box
      borderRadius="lg"
      overflow="hidden"
      className="bg-surface-raised border border-border-subtle"
    >
      <Skeleton h="44" />
      <Box p={4} display="flex" flexDir="column" gap={3}>
        <Skeleton h="4" w="3/4" />
        <SkeletonText noOfLines={2} gap={2} />
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Skeleton h="5" w="16" borderRadius="full" />
          <Skeleton h="4" w="10" />
        </Box>
      </Box>
    </Box>
  )
}

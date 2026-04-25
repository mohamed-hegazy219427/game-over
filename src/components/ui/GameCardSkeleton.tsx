import { Box, Skeleton, SkeletonText } from '@chakra-ui/react'

export default function GameCardSkeleton() {
  return (
    <Box
      bg="gray.900"
      borderRadius="lg"
      overflow="hidden"
      borderWidth="1px"
      borderColor="gray.800"
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

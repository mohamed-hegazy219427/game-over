import { Center, Text } from '@chakra-ui/react'

export default function Loading() {
  return (
    <Center minH="60vh" flexDir="column" gap={4}>
      <div className="spinner" />
      <Text fontSize="sm" className="text-text-dim animate-pulse">Loading...</Text>
    </Center>
  )
}

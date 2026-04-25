import { Center, VStack, Text, Button } from '@chakra-ui/react'
import { AlertTriangle } from 'lucide-react'

export default function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <Center minH="60vh">
      <VStack gap={4} textAlign="center">
        <AlertTriangle size={48} color="var(--chakra-colors-red-400)" />
        <Text fontSize="lg" color="gray.400">Something went wrong. Check your connection or API key.</Text>
        <Button colorPalette="cyan" variant="outline" onClick={onRetry}>
          Try Again
        </Button>
      </VStack>
    </Center>
  )
}

import { Center, VStack, Text, Button } from '@chakra-ui/react'
import { AlertTriangle } from 'lucide-react'

export default function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <Center minH="60vh">
      <VStack gap={4} textAlign="center" p={8} maxW="md" className="glass-card">
        <div className="w-16 h-16 rounded-full bg-oxidized-iron/15 flex items-center justify-center">
          <AlertTriangle size={32} className="text-oxidized-iron-600" />
        </div>
        <Text fontSize="lg" fontWeight="medium" className="text-text-secondary">
          Something went wrong
        </Text>
        <Text fontSize="sm" className="text-text-dim">
          Check your connection or API key and try again.
        </Text>
        <Button variant="outline" onClick={onRetry} className="border-accent! text-accent-light! hover:bg-accent/15!">
          Try Again
        </Button>
      </VStack>
    </Center>
  )
}

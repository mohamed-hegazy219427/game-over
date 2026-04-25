import { useState, useEffect } from 'react'
import { Box, Image, IconButton } from '@chakra-ui/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
  src: Array<{ id: number; image: string }>
}

export default function ScreenShotsSlider({ src }: Props) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (src.length < 2) return
    const id = setInterval(() => setCurrent(i => (i + 1) % src.length), 2500)
    return () => clearInterval(id)
  }, [src.length])

  if (!src.length) return null

  const prev = () => setCurrent(i => (i - 1 + src.length) % src.length)
  const next = () => setCurrent(i => (i + 1) % src.length)

  return (
    <Box position="relative" borderRadius="md" overflow="hidden" bg="gray.900">
      <Image
        src={src[current].image}
        alt={`screenshot-${current}`}
        w="full"
        h="48"
        objectFit="cover"
        transition="opacity 0.3s"
      />

      {src.length > 1 && (
        <>
          <IconButton
            aria-label="Previous"
            position="absolute"
            left={1}
            top="50%"
            transform="translateY(-50%)"
            size="sm"
            variant="subtle"
            bg="blackAlpha.600"
            color="white"
            _hover={{ bg: 'blackAlpha.800' }}
            onClick={prev}
          >
            <ChevronLeft size={16} />
          </IconButton>
          <IconButton
            aria-label="Next"
            position="absolute"
            right={1}
            top="50%"
            transform="translateY(-50%)"
            size="sm"
            variant="subtle"
            bg="blackAlpha.600"
            color="white"
            _hover={{ bg: 'blackAlpha.800' }}
            onClick={next}
          >
            <ChevronRight size={16} />
          </IconButton>

          <Box
            position="absolute"
            bottom={2}
            left="50%"
            transform="translateX(-50%)"
            display="flex"
            gap={1}
          >
            {src.map((_, i) => (
              <Box
                key={i}
                as="button"
                w={i === current ? '4' : '2'}
                h="2"
                borderRadius="full"
                bg={i === current ? 'cyan.400' : 'whiteAlpha.400'}
                transition="all 0.2s"
                onClick={() => setCurrent(i)}
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  )
}

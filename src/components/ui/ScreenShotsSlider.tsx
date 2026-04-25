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
    <Box position="relative" borderRadius="md" overflow="hidden" className="bg-surface-raised group">
      <Image
        src={src[current].image}
        alt={`screenshot-${current}`}
        w="full"
        h="48"
        objectFit="cover"
        className="transition-opacity duration-300"
      />

      {src.length > 1 && (
        <>
          <IconButton
            aria-label="Previous"
            position="absolute"
            left={2}
            top="50%"
            transform="translateY(-50%)"
            size="sm"
            variant="subtle"
            borderRadius="full"
            onClick={prev}
            className="bg-surface/60! backdrop-blur-sm! hover:bg-surface/80! text-text-primary! rounded-full! opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <ChevronLeft size={16} />
          </IconButton>
          <IconButton
            aria-label="Next"
            position="absolute"
            right={2}
            top="50%"
            transform="translateY(-50%)"
            size="sm"
            variant="subtle"
            borderRadius="full"
            onClick={next}
            className="bg-surface/60! backdrop-blur-sm! hover:bg-surface/80! text-text-primary! rounded-full! opacity-0 group-hover:opacity-100 transition-opacity duration-200"
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
                h="1.5"
                borderRadius="full"
                onClick={() => setCurrent(i)}
                className={`transition-all duration-300 ${
                  i === current
                    ? 'w-5 bg-accent-glow'
                    : 'w-1.5 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  )
}

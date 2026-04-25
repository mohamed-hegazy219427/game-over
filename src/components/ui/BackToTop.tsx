import { useState, useEffect } from 'react'
import { IconButton } from '@chakra-ui/react'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <IconButton
      aria-label="Back to top"
      position="fixed"
      bottom={8}
      right={8}
      zIndex={50}
      colorPalette="cyan"
      borderRadius="full"
      shadow="xl"
      size="lg"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <ArrowUp size={18} />
    </IconButton>
  )
}

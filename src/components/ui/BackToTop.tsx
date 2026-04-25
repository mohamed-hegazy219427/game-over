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

  return (
    <IconButton
      aria-label="Back to top"
      position="fixed"
      bottom={8}
      right={8}
      zIndex={50}
      borderRadius="full"
      shadow="xl"
      size="lg"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`bg-accent! hover:bg-accent-glow! text-surface! transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <ArrowUp size={18} />
    </IconButton>
  )
}

import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Center, VStack, Image, Heading, Text, Button } from '@chakra-ui/react'
import logo from '../assets/logo.png'

export default function NotFound() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from('.nf-item', { y: 30, opacity: 0, duration: 0.5, stagger: 0.15, ease: 'power2.out' })
  }, { scope: ref })

  return (
    <Center minH="80vh" px={4}>
      <VStack ref={ref} gap={6} textAlign="center">
        <Image className="nf-item animate-float" src={logo} alt="404" h="20" mx="auto" />
        <Heading className="nf-item text-gradient" size="4xl">
          404
        </Heading>
        <Text className="nf-item text-text-dim" fontSize="lg">
          The page you&apos;re looking for doesn&apos;t exist.
        </Text>
        <Link to="/home">
          <Button
            className="nf-item border-accent! text-accent-light! hover:bg-accent/15!"
            variant="outline"
            size="lg"
            px={6}
          >
            Go Back Home
          </Button>
        </Link>
      </VStack>
    </Center>
  )
}

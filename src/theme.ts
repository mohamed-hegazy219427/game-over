import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  globalCss: {
    'html, body': {
      bg: 'gray.950',
      color: 'white',
      colorScheme: 'dark',
    },
  },
})

export const system = createSystem(defaultConfig, config)

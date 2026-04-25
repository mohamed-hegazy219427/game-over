import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  globalCss: {
    'html, body': {
      colorScheme: 'dark',
    },
  },
})

export const system = createSystem(defaultConfig, config)

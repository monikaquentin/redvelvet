import react from '@vitejs/plugin-react'
import proxy from 'vite-plugin-http2-proxy'

import { fileURLToPath } from 'url'
import { defineConfig, loadEnv } from 'vite'

const commonProxy = {
  '/api/': {
    target: 'https://rest-api.redvelvet.me',
    changeOrigin: true,
    secure: false,
    ws: false
  }
}

export default defineConfig(({ mode }) => {
  //
  // eslint-disable-next-line
  const env = loadEnv(mode, process.cwd(), '')
  const production = env.VITE_APP_ENV === 'production'

  return {
    define: {
      'process.env': env
    },
    base: production ? '/__vite_base__/' : '/',
    plugins: [react(), proxy(commonProxy)],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: fileURLToPath(new URL('./src', import.meta.url))
        }
      ]
    },
    server: {
      host: env.VITE_APP_HOST,
      port: parseInt(env.VITE_APP_PORT)
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/setupTests.ts'],
      coverage: {
        all: true,
        enabled: true,
        reporter: ['text', 'html']
      }
    }
  }
})

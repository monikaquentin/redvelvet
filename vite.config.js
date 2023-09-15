import path from 'path'
import react from '@vitejs/plugin-react'

import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig, loadEnv } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))
const proxyTarget = 'https://api.redvelvet.me'
const commonProxy = {
  '/api/': {
    target: proxyTarget,
    changeOrigin: true
  }
}

function resolve(dir) {
  return path.join(__dirname, dir)
}

export default defineConfig(({ mode }) => {
  //
  // eslint-disable-next-line
  const env = loadEnv(mode, process.cwd(), '')
  const noMock = env.APP_ENV === 'development' && env.VITE_NOMOCK === 'true'
  const prod = env.APP_ENV === 'production'

  return {
    base: prod ? '/__vite_base__/' : '/',
    plugins: [react()],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: fileURLToPath(new URL('./src', import.meta.url))
        },
        {
          find: '@api-mock',
          replacement: noMock || prod ? resolve('src/empty') : resolve('src/mocks')
        }
      ]
    },
    server: {
      host: env.APP_HOST,
      port: parseInt(env.APP_PORT),
      proxy: noMock ? commonProxy : null
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/setupTests.ts'],
      coverage: {
        reporter: ['text', 'html']
      }
    }
  }
})

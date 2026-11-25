import { env } from 'node:process'
import { defineConfig } from '@playwright/test'

const baseURL = 'http://127.0.0.1:4179'

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL,
    browserName: 'chromium',
    launchOptions: {
      executablePath: env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
      args: ['--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream'],
    },
  },
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 4179 --strictPort',
    url: baseURL,
    reuseExistingServer: !env.CI,
  },
})

import { defineConfig, devices } from '@playwright/test';

// BASE_URL lets the same tests run against another server, for example the Worker from `wrangler dev`
// (BASE_URL=http://localhost:8787) or the live site after deploying (BASE_URL=https://jeyinsights.com).
const BASE_URL = process.env.BASE_URL;

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  reporter: [['list']],
  use: { baseURL: BASE_URL ?? 'http://localhost:4321', trace: 'retain-on-failure' },
  webServer: BASE_URL ? undefined : {
    command: 'npx astro preview --port 4321',
    url: 'http://localhost:4321/learnai/',
    reuseExistingServer: true,
    timeout: 60_000,
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 900 } } },
    { name: 'phone', use: { ...devices['Pixel 7'] } },
  ],
});

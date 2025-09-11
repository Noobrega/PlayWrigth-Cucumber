import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: './e2e/Tests',
  timeout: 90 * 1000,
  expect: {
    timeout: 10 * 1000,
  },
  globalTimeout: 180000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    actionTimeout: 40000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: { width: 1280, height: 720 },
    baseURL: process.env.BASE_URL || 'https://meu-sistema.com',
    headless: true,
    navigationTimeout: 180000
  },
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'WebKit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});

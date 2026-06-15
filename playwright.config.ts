import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Automatically loads variables from your .env file
dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 0,
  workers: 2,
  reporter: [
  ['html', { outputDir: './playwright-report' }],
  ['json', { outputFile: './playwright-report/report.json' }],
  ],

  projects: [
    //  Project 1 — UI Tests
    {
      name: 'UI Tests',
      testMatch: '**/ui/**/*.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        // Explicitly casting process to fix the TypeScript 'Cannot find name process' error
        baseURL: (process as any).env.UI_BASE_URL ?? 'https://storedemo.testdino.com',
        headless: true,
        screenshot: 'only-on-failure',
        trace: 'on-first-retry',
      },
    },

    {
      name: 'UI Tests - Firefox',
      testMatch: '**/ui/**/*.spec.ts',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: (process as any).env.UI_BASE_URL ?? 'https://storedemo.testdino.com',
        headless: true,
        screenshot: 'only-on-failure',
        trace: 'on-first-retry',
      },
    },

     {
      name: 'UI Tests - WebKit',
      testMatch: '**/ui/**/*.spec.ts',
      use: {
        ...devices['Desktop Webkit'],
        baseURL: (process as any).env.UI_BASE_URL ?? 'https://storedemo.testdino.com',
        headless: true,
        screenshot: 'only-on-failure',
        trace: 'on-first-retry',
      },
    },

    //  Project 2 — API Tests
    {
      name: 'API Tests',
      testMatch: '**/api/**/*.spec.ts',
      use: {
        // Explicitly casting process to fix the TypeScript 'Cannot find name process' error
        baseURL: (process as any).env.API_BASE_URL ?? 'https://storedemo-api.testdino.com',
        extraHTTPHeaders: {
          'content-type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.9',
        },
      },
    },
  ],
});

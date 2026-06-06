import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({

  testDir: './tests',
  fullyParallel: true,
  retries: 0,
  workers: 2,
  reporter: 'html',

  projects: [

    // ✅ Project 1 — UI Tests
    {
      name: 'UI Tests',
      testMatch: '**/ui/**/*.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.UI_BASE_URL ?? 'https://storedemo.testdino.com',
        headless: true,
        screenshot: 'only-on-failure',
        trace: 'on-first-retry',
      },
    },

    // ✅ Project 2 — API Tests
    {
      name: 'API Tests',
      testMatch: '**/api/**/*.spec.ts',
      use: {
        baseURL: process.env.API_BASE_URL ?? 'https://fakestoreapi.com',
        extraHTTPHeaders: {
          'content-type': 'application/json'
        },
      },
    },

  ],
});
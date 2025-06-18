import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:8000',
    extraHTTPHeaders: {
      'Content-Type': 'application/json'
    }
  },
  retries: 1,
  reporter: [['html', { open: 'never' }]],
  testDir: './tests'
});

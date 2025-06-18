import { test, expect } from '@playwright/test';
import { validBook, invalidBook } from './utils/testData';

test('Create Book - Valid', async ({ request }) => {
  const response = await request.post('/books', { data: validBook });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.title).toBe(validBook.title);
});

test('Create Book - Invalid (Missing Title)', async ({ request }) => {
  const response = await request.post('/books', { data: invalidBook });
  expect(response.status()).toBe(422);
});
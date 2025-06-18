import { test, expect } from '@playwright/test';
import { validBook } from './utils/testData';

test('Get Book by ID - Valid', async ({ request }) => {
  const create = await request.post('/books', { data: validBook });
  const book = await create.json();
  const get = await request.get(`/books/${book.id}`);
  expect(get.status()).toBe(200);
  const data = await get.json();
  expect(data.id).toBe(book.id);
});

test('Get Book by ID - Invalid', async ({ request }) => {
  const get = await request.get('/books/99999');
  expect(get.status()).toBe(404);
});
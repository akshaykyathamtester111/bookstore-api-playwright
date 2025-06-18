import { test, expect } from '@playwright/test';
import { validBook } from './utils/testData';

test('Delete Book - Valid', async ({ request }) => {
  const create = await request.post('/books', { data: validBook });
  const book = await create.json();
  const del = await request.delete(`/books/${book.id}`);
  expect(del.status()).toBe(200);
});

test('Delete Book - Invalid ID', async ({ request }) => {
  const response = await request.delete('/books/99999');
  expect(response.status()).toBe(404);
});
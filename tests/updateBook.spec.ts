import { test, expect } from '@playwright/test';
import { validBook } from './utils/testData';

test('Update Book - Valid', async ({ request }) => {
  const create = await request.post('/books', { data: validBook });
  const book = await create.json();
  const update = await request.put(`/books/${book.id}`, {
    data: { title: 'Updated', author: 'Updated Author', price: 10.5 }
  });
  expect(update.status()).toBe(200);
});

test('Update Book - Invalid ID', async ({ request }) => {
  const response = await request.put('/books/99999', {
    data: { title: 'Fail', author: 'Fail', price: 5 }
  });
  expect(response.status()).toBe(404);
});
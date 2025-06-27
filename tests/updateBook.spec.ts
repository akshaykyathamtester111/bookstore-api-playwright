import { test, expect, request } from '@playwright/test';
import { validBook } from './utils/testData';
import { signUpUser, getAccessToken } from './utils/authHelper';

test.describe('Update Book API Tests', () => {
  let token: string;
  let bookId: number;
  const email = `updateuser${Date.now()}@example.com`;
  const password = 'UpdateBook123!';
  let baseURL: string;

  const updatedBook = {
    title: 'Updated Title',
    author: 'Updated Author',
    description: 'Updated Description',
    price: 45.5
  };

  test.beforeAll(async ({ baseURL: url }) => {
    baseURL = url!;
    await signUpUser(email, password, baseURL);
    token = await getAccessToken(email, password, baseURL);
  });

  test('Update Book - Valid Flow', async ({ request }) => {
    const context = await request.newContext({
      baseURL,
      extraHTTPHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    // Step 1: Create book
    const create = await context.post('/books', { data: validBook });
    expect(create.status()).toBe(201);
    const book = await create.json();
    bookId = book.id;

    // Step 2: Update book
    const update = await context.put(`/books/${bookId}`, { data: updatedBook });
    expect(update.status()).toBe(200);
    const updated = await update.json();
    expect(updated.title).toBe(updatedBook.title);
    expect(updated.author).toBe(updatedBook.author);
  });

  test('Update Book - Invalid ID', async ({ request }) => {
    const context = await request.newContext({
      baseURL,
      extraHTTPHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const response = await context.put('/books/99999', {
      data: updatedBook
    });

    expect(response.status()).toBe(404);
  });

  test('Update Book - No Auth Token', async ({ request }) => {
    const response = await request.put(`/books/${bookId}`, {
      data: updatedBook
    });

    expect([401, 403]).toContain(response.status());
  });
});

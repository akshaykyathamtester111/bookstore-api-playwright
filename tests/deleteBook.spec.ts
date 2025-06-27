import { test, expect, request } from '@playwright/test';
import { validBook } from './utils/testData';
import { signUpUser, getAccessToken } from './utils/authHelper';

test.describe('Delete Book API Tests', () => {
  let token: string;
  let bookId: number;
  const email = `deleteuser${Date.now()}@example.com`;
  const password = 'DeleteMe123!';
  let baseURL: string;

  test.beforeAll(async ({ baseURL: url }) => {
    baseURL = url!;
    await signUpUser(email, password, baseURL);
    token = await getAccessToken(email, password, baseURL);
  });

  test('Delete Book - Valid Flow', async ({ request }) => {
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

    // Step 2: Delete book
    const del = await context.delete(`/books/${bookId}`);
    expect(del.status()).toBe(200);
  });

  test('Delete Book - Already Deleted', async ({ request }) => {
    const context = await request.newContext({
      baseURL,
      extraHTTPHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    // Try deleting again
    const response = await context.delete(`/books/${bookId}`);
    expect(response.status()).toBe(404); // Not Found
  });

  test('Delete Book - Invalid ID', async ({ request }) => {
    const context = await request.newContext({
      baseURL,
      extraHTTPHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const response = await context.delete('/books/99999');
    expect(response.status()).toBe(404);
  });

  test('Delete Book - No Token', async ({ request }) => {
    const response = await request.delete(`/books/${bookId}`);
    expect([401, 403]).toContain(response.status());
  });
});

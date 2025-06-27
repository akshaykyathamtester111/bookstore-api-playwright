import { test, expect, request } from '@playwright/test';
import { validBook } from './utils/testData';
import { signUpUser, getAccessToken } from './utils/authHelper';

test.describe('Get Book API Tests', () => {
  let token: string;
  let bookId: number;
  const email = `getuser${Date.now()}@example.com`;
  const password = 'GetBook123!';
  let baseURL: string;

  test.beforeAll(async ({ baseURL: url }) => {
    baseURL = url!;
    await signUpUser(email, password, baseURL);
    token = await getAccessToken(email, password, baseURL);
  });

  test('Get Book by ID - Valid', async ({ request }) => {
    const context = await request.newContext({
      baseURL,
      extraHTTPHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    // Create a book first
    const create = await context.post('/books', { data: validBook });
    expect(create.status()).toBe(201);
    const book = await create.json();
    bookId = book.id;

    // Now get the book by ID
    const get = await context.get(`/books/${bookId}`);
    expect(get.status()).toBe(200);
    const data = await get.json();
    expect(data).toHaveProperty('id', bookId);
    expect(data).toHaveProperty('title', validBook.title);
    expect(data).toHaveProperty('author', validBook.author);
  });

  test('Get Book by ID - Invalid ID', async ({ request }) => {
    const context = await request.newContext({
      baseURL,
      extraHTTPHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const response = await context.get('/books/999999');
    expect(response.status()).toBe(404);
  });

  test('Get Book - No Token', async ({ request }) => {
    const response = await request.get(`/books/${bookId}`);
    expect([401, 403]).toContain(response.status());
  });
});

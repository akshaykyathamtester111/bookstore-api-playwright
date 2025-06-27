import { test, expect, request } from '@playwright/test';
import { validBook, invalidBook, anotherInvalidBook } from './utils/testData';

test.describe('Create Book API Tests', () => {
  let token = '';
  const user = {
    email: `bookuser${Date.now()}@test.com`,
    password: 'Test@1234'
  };

  test.beforeAll(async () => {
    const context = await request.newContext({ baseURL: 'http://localhost:8000' });

    // Signup
    await context.post('/signup', { data: user });

    // Login
    const loginRes = await context.post('/login', { data: user });
    const loginData = await loginRes.json();
    token = loginData.access_token;
  });

  test('Create Book - Valid Payload', async ({ request }) => {
    const response = await request.post('/books', {
      data: validBook,
      headers: { Authorization: `Bearer ${token}` }
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body.title).toBe(validBook.title);
    expect(body.author).toBe(validBook.author);
  });

  test('Create Book - Missing Title', async ({ request }) => {
    const response = await request.post('/books', {
      data: invalidBook,
      headers: { Authorization: `Bearer ${token}` }
    });

    expect(response.status()).toBe(422);
  });

  test('Create Book - Bad Price Type', async ({ request }) => {
    const response = await request.post('/books', {
      data: anotherInvalidBook,
      headers: { Authorization: `Bearer ${token}` }
    });

    expect(response.status()).toBe(422);
  });

  test('Create Book - Without Auth Token', async ({ request }) => {
    const response = await request.post('/books', { data: validBook });
    expect([401, 403]).toContain(response.status());
  });
});

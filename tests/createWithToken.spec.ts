import { test, expect, request } from '@playwright/test';
import { getAccessToken, signUpUser } from './utils/authHelper';
import { validBook } from './utils/testData';

test.describe('Authenticated Book Creation', () => {
  let token = '';
  const email = `tokenuser${Date.now()}@example.com`;
  const password = 'SecurePass123!';
  let baseURL: string;

  test.beforeAll(async ({ baseURL: url }) => {
    baseURL = url!;
    await signUpUser(email, password, baseURL);
    token = await getAccessToken(email, password, baseURL);
  });

  test('Create Book With Valid Token', async ({ request }) => {
    const authContext = await request.newContext({
      baseURL,
      extraHTTPHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const response = await authContext.post('/books', { data: validBook });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('title', validBook.title);
    expect(body).toHaveProperty('author', validBook.author);
  });
});

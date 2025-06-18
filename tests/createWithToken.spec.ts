import { test, expect, request } from '@playwright/test';
import { getAccessToken } from './utils/authHelper';
import { validBook } from './utils/testData';

test('Create Book - With Auth Token', async ({ baseURL }) => {
  const username = `tokenuser${Date.now()}@example.com`;
  const password = 'SecurePass123!';

  const context = await request.newContext({ baseURL });
  await context.post('/signup', { data: { username, password } });
  const token = await getAccessToken(username, password, baseURL!);

  const authContext = await request.newContext({
    baseURL,
    extraHTTPHeaders: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  const response = await authContext.post('/books', { data: validBook });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body).toHaveProperty('title', validBook.title);
});

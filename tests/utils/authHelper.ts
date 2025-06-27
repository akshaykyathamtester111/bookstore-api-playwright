import { request } from '@playwright/test';

/**
 * Signs up a new user at the given baseURL
 */
export async function signUpUser(email: string, password: string, baseURL: string): Promise<void> {
  const context = await request.newContext({ baseURL });
  const signupRes = await context.post('/signup', {
    data: { email, password }
  });

  if (![200, 201].includes(signupRes.status())) {
    const body = await signupRes.text();
    console.error('Signup failed:', signupRes.status(), body);
    throw new Error('Signup failed');
  }
}

/**
 * Logs in and retrieves access token for a user
 */
export async function getAccessToken(email: string, password: string, baseURL: string): Promise<string> {
  const context = await request.newContext({ baseURL });
  const loginRes = await context.post('/login', {
    data: { email, password }
  });

  if (loginRes.status() !== 200) {
    const body = await loginRes.text();
    console.error('Login failed:', loginRes.status(), body);
    throw new Error('Login failed');
  }

  const body = await loginRes.json();
  if (!body.access_token || !body.access_token.match(/^[\w-]+\.[\w-]+\.[\w-]+$/)) {
    throw new Error('Invalid access token format');
  }

  return body.access_token;
}

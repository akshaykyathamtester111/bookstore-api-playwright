import { APIRequestContext, request } from '@playwright/test';

export async function getAccessToken(username: string, password: string, baseURL: string): Promise<string> {
  const context = await request.newContext({ baseURL });
  const loginResp = await context.post('/login', {
    data: { username, password }
  });
  const body = await loginResp.json();
  return body.access_token;
}

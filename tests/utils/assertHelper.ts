import { expect, APIResponse } from '@playwright/test';

export async function expectJsonField(response: APIResponse, field: string) {
  const body = await response.json();
  expect(body).toHaveProperty(field);
}

export async function expectStatus(response: APIResponse, code: number) {
  expect(response.status()).toBe(code);
}

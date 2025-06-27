import { expect, APIResponse } from '@playwright/test';

/**
 * Assert that the response has the expected status code.
 */
export async function expectStatus(response: APIResponse, code: number) {
  const actual = response.status();
  expect(actual, `Expected status ${code}, but got ${actual}`).toBe(code);
}

/**
 * Assert that a response JSON has a specific field.
 */
export async function expectJsonField(response: APIResponse, field: string) {
  const body = await response.json();
  expect(body, `Expected field "${field}" to exist`).toHaveProperty(field);
}

/**
 * Assert that a response JSON has a field with a specific value.
 */
export async function expectJsonFieldValue(response: APIResponse, field: string, expectedValue: any) {
  const body = await response.json();
  expect(body[field], `Expected ${field} to be ${expectedValue}, but got ${body[field]}`).toBe(expectedValue);
}

/**
 * Assert that response body contains multiple required fields.
 */
export async function expectJsonFields(response: APIResponse, fields: string[]) {
  const body = await response.json();
  for (const field of fields) {
    expect(body, `Expected field "${field}" to exist`).toHaveProperty(field);
  }
}

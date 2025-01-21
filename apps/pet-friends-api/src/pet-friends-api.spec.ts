import { test, expect } from 'vitest';

import { app } from './pet-friends-api';

test('app exists', () => {
  expect(app).toBeDefined();
});

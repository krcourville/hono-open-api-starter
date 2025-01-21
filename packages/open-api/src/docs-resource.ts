import { Hono } from 'hono';
import { apiReference } from '@scalar/hono-api-reference';

export const docsResource = new Hono();

docsResource.get(
  '/docs',
  apiReference({
    spec: { url: '/openapi' },
  }),
);

import { OpenAPIHono } from '@hono/zod-openapi';
import { apiReference } from '@scalar/hono-api-reference';

export const docsResource = new OpenAPIHono();

docsResource.get(
  '/docs',
  apiReference({
    spec: { url: '/openapi' },
  }),
);

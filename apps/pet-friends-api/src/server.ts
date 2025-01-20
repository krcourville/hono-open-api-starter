import { serve } from '@hono/node-server';
import { OpenAPIHono } from '@hono/zod-openapi';

import { utilityResource } from './resource/utility/utility-resource';

export const app = new OpenAPIHono();

app.get('/', (c) => {
  return c.text('Pet Friends API 1.0.0.  See /doc for more information');
});

app.route('/', utilityResource);

app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Pet Friends API',
  },
});

serve(app);

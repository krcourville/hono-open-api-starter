import { OpenAPIHono } from '@hono/zod-openapi';
import { docsResource } from '@repo/open-api/docs-resource';
import { loggerMiddleware } from '@repo/logging/logger-middleware';

import { utilityResource } from './resource/utility/utility-resource';

export const app = new OpenAPIHono({
  defaultHook: (result, c) => {
    if (!result.success) {
      return c.json(
        {
          ok: false,
          errors: result,
          source: 'error_handler',
        },
        422,
      );
    }
  },
});

app.use('*', loggerMiddleware({ name: 'pet-friends-api' }));

app.get('/', (c) => {
  return c.text('Pet Friends API 1.0.0.  See /doc for more information.');
});

app.route('/', utilityResource);
app.route('/', docsResource);

app.doc('/openapi', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Pet Friends API',
    description:
      'The Pet Friends API is a RESTful API that allows you to make connections with ' +
      'other pet owners.',
    contact: {
      name: 'Pet Friends',
      url: 'https://petfriends.local',
      email: 'support@petfriends.local',
    },
    license: {
      name: 'MIT',
      url: 'https://petfriends.local/license',
    },
  },
});

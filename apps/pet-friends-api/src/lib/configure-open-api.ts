import { apiReference } from '@scalar/hono-api-reference';

import type { AppOpenAPI } from './types';

import packageJSON from '../../package.json' with { type: 'json' };
import { APP_NAME } from './constants';

/**
 * Set up routes for OpenAPI introspection and API docs.
 */
export default function configureOpenAPI(app: AppOpenAPI) {
  app.doc('/openapi', {
    openapi: '3.0.0',
    info: {
      version: packageJSON.version,
      title: APP_NAME,
    },
  });

  app.get(
    '/docs',
    apiReference({
      pageTitle: `API Reference - ${APP_NAME}`,
      theme: 'kepler',
      layout: 'modern',
      defaultHttpClient: {
        targetKey: 'javascript',
        clientKey: 'fetch',
      },
      spec: {
        url: '/openapi',
      },
    }),
  );
}

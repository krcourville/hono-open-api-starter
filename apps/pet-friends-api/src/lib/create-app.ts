import { OpenAPIHono } from '@hono/zod-openapi';
import { loggerMiddleware } from '@repo/logging/logger-middleware';
import { errorHandler } from '@repo/open-api/error-handler';
import { notFound, serveEmojiFavicon } from 'stoker/middlewares';
import { defaultHook } from 'stoker/openapi';

import type { AppBindings, AppOpenAPI } from './types';

import { APP_FAVICON, APP_ID } from './constants';

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,
  });
}

export default function createApp() {
  const app = createRouter();
  app.use(serveEmojiFavicon(APP_FAVICON));
  app.use(loggerMiddleware({ loggerName: APP_ID }));

  app.notFound(notFound);
  app.onError(errorHandler({ loggerName: APP_ID }));
  return app;
}

export function createTestApp<R extends AppOpenAPI>(router: R) {
  return createApp().route('/', router);
}

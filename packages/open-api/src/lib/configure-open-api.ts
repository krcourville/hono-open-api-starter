import type { Env } from 'hono';

import { OpenAPIHono } from '@hono/zod-openapi';
import { addLoggerContextProvider, loggerMiddleware } from '@repo/logging';
import { apiReference } from '@scalar/hono-api-reference';
import { contextStorage, getContext } from 'hono/context-storage';
import { notFound, serveEmojiFavicon } from 'stoker/middlewares';
import { defaultHook } from 'stoker/openapi';

import packageJSON from '../../package.json' with { type: 'json' };
import { errorHandler } from './error-handler';
import { correlationId } from './middleware';

/**
 * Helper function that applies common configuration
 * for a Hono Router.
 */
export function createRouter<TBindings extends Env>() {
  return new OpenAPIHono<TBindings>({
    strict: false,
    defaultHook,
  });
}

interface AppConfig {
  appId: string;
  favicon: string;
  appName: string;
}

/**
 * Helper function to create a Hono App with common configuration.
 */
export function createApp<TBindings extends Env>(config: AppConfig) {
  const app = createRouter<TBindings>();
  app.use(serveEmojiFavicon(config.favicon));
  app.use(contextStorage());
  app.use(correlationId());
  app.use(loggerMiddleware({ loggerName: config.appId }));

  app.notFound(notFound);
  app.onError(errorHandler({ loggerName: config.appId }));

  app.doc('/openapi', {
    openapi: '3.0.0',
    info: {
      version: packageJSON.version,
      title: config.appName,
    },
  });

  app.get(
    '/docs',
    apiReference({
      pageTitle: `API Reference - ${config.appName}`,
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

  // To assist in tracing, ensure all logs include the current route
  addLoggerContextProvider(() => {
    const context = getContext<TBindings>();
    return {
      route: `${context.req.method} ${context.req.routePath}`,
    };
  });

  return app;
}

/**
 * Helper function to create a test app/client for unit tests.
 */
export function createTestApp<R extends OpenAPIHono>(router: R) {
  return createApp({ appId: 'test', favicon: '🧪', appName: 'Test' }).route(
    '/',
    router,
  );
}

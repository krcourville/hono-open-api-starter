import type { Env } from 'hono';

import { addLoggerContextProvider } from '@repo/logging';
import { createApp } from '@repo/open-api';
import { getContext } from 'hono/context-storage';

import { APP_FAVICON, APP_ID, APP_NAME } from './lib/constants';
import { indexRouter } from './routes/index.route';
import { profilesRouter } from './routes/profiles/profiles.index';
import { referenceApp } from './routes/reference/references.index';
import { utilitiesRouter } from './routes/utilities/utilities.index';

interface AppBindings extends Env {
  Variables: {
    correlationId: string;
  };
}

export const app = createApp<AppBindings>({
  appId: APP_ID,
  favicon: APP_FAVICON,
  appName: APP_NAME,
});

app.use(async (c, next) => {
  const correlationId = c.req.header('x-correlation-id') ?? crypto.randomUUID();
  c.set('correlationId', correlationId);
  await next();
});

addLoggerContextProvider(() => {
  try {
    // TODO: this is always resulting in a "context nof available" error
    // what am I missing?
    const correlationId = getContext<AppBindings>().var.correlationId;
    return { correlationId };
  }
  catch {
    return {
      correlationId: undefined,
    };
  }
});

const routes = [
  indexRouter,
  utilitiesRouter,
  referenceApp,
  profilesRouter,
] as const;

routes.forEach((route) => {
  app.route('/', route);
});

export type AppType = (typeof routes)[number];

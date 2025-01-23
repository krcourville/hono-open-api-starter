import { createApp } from '@repo/open-api';

import { APP_FAVICON, APP_ID, APP_NAME } from './lib/constants';
import { indexRouter } from './routes/index.route';
import { utilitiesRouter } from './routes/utilities/utilities.index';

export const app = createApp({
  appId: APP_ID,
  favicon: APP_FAVICON,
  appName: APP_NAME,
});

const routes = [indexRouter, utilitiesRouter] as const;

routes.forEach((route) => {
  app.route('/', route);
});

export type AppType = (typeof routes)[number];

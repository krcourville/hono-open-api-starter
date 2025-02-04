import { createApp } from '@repo/open-api';

import type { AppBindings } from './lib/types';

import { APP_FAVICON, APP_ID, APP_NAME } from './lib/constants';
import { indexRouter } from './routes/index.route';
import { profilesRouter } from './routes/profiles/profiles.index';
import { referenceApp } from './routes/reference/references.index';
import { utilitiesRouter } from './routes/utilities/utilities.index';

export const app = createApp<AppBindings>({
  appId: APP_ID,
  favicon: APP_FAVICON,
  appName: APP_NAME,
});

const routes = [indexRouter, utilitiesRouter, profilesRouter] as const;

routes.forEach((route) => {
  app.route('/', route);
});

app.route('/reference', referenceApp);

export type AppType = (typeof routes)[number];

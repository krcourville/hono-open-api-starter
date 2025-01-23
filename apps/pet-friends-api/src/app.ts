import configureOpenAPI from './lib/configure-open-api';
import createApp from './lib/create-app';
import { indexRouter } from './routes/index.route';
import { utilitiesRouter } from './routes/utilities/utilities.index';

export const app = createApp();

configureOpenAPI(app);

const routes = [indexRouter, utilitiesRouter] as const;

routes.forEach((route) => {
  app.route('/', route);
});

export type AppType = (typeof routes)[number];

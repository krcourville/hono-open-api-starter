// import { OpenAPIHono } from '@hono/zod-openapi';
// import { loggerMiddleware } from '@repo/logging/logger-middleware';
// import { docsResource } from '@repo/open-api/docs-resource';
// import { errorHandler } from '@repo/open-api/error-handler';

import configureOpenAPI from './lib/configure-open-api';
import createApp from './lib/create-app';
import { indexRouter } from './routes/index.route';
import { utilitiesRouter } from './routes/utilities/utilities.index';

// import { utilities } from './resource/utilities/utilities-resource';

// export const app = new OpenAPIHono();

// const loggerName = 'pet-friends-api';

// app.use('*', loggerMiddleware({ loggerName }));

// app.onError(errorHandler({ loggerName }));

// app.get('/', (c) => {
//   return c.text('Pet Friends API 1.0.0.  See /doc for more information.');
// });

// app.route('/', utilities);
// app.route('/', docsResource);

// app.doc('/openapi', {
//   openapi: '3.0.0',
//   info: {
//     version: '1.0.0',
//     title: 'Pet Friends API',
//     description:
//       'The Pet Friends API is a RESTful API that allows you to make connections with '
//       + 'other pet owners.',
//     contact: {
//       name: 'Pet Friends',
//       url: 'https://petfriends.local',
//       email: 'support@petfriends.local',
//     },
//     license: {
//       name: 'MIT',
//       url: 'https://petfriends.local/license',
//     },
//   },
// });

export const app = createApp();

configureOpenAPI(app);

const routes = [indexRouter, utilitiesRouter] as const;

routes.forEach((route) => {
  app.route('/', route);
});

export type AppType = (typeof routes)[number];
